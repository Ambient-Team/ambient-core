"""Optional local Spark/Delta runner for Bronze → Silver → Gold smoke / scale tests.

Not required for the free Colab pandas path (``ambient_pipeline.colab_smoke``).
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import (
    DoubleType,
    StringType,
    StructField,
    StructType,
)

from ambient_pipeline.contracts import ContractLoader
from ambient_pipeline.perf import PipelinePerfRecorder, create_local_spark
from ambient_pipeline.pii import PiiPseudonymizer
from ambient_pipeline.provenance import BronzeProvenanceStamper
from ambient_pipeline.secrets import get_secret_or_warn
from ambient_pipeline.validation import SilverValidator


REFERENCE_BENCHMARKS = [
    ("Net Operating Income", "Real Estate", 0.0, None, "Currency"),
    ("Annual Debt Service", "Real Estate", 0.0, None, "Currency"),
    ("Debt Service Coverage Ratio", "Real Estate", 1.5, 2.5, "Number"),
    ("Capitalization Rate", "Real Estate", 4.0, 8.0, "Percentage"),
    ("Cost per Kilogram of Produce", "Vertical Farming", 2.0, 10.0, "$/kg"),
    ("Revenue Growth Rate", "Finance", 5.0, None, "Percentage"),
    ("EBITDA Margin", "Finance", 15.0, None, "Percentage"),
]


@dataclass
class PipelineRunConfig:
    """Configuration for a local Bronze → Silver → Gold run."""

    base_dir: Path
    org_id: str = "demo-org"
    run_id: str = "local-scale"
    volume_gb: float = 1.0
    hot_org_ids: list[str] = field(default_factory=list)
    shuffle_partitions: int = 8
    optimize: bool = True
    cache_silver: bool | None = None
    apply_skew_salt: bool | None = None

    def __post_init__(self) -> None:
        if self.cache_silver is None:
            self.cache_silver = self.optimize
        if self.apply_skew_salt is None:
            self.apply_skew_salt = self.optimize


def _ref_schema() -> StructType:
    return StructType(
        [
            StructField("ref_metric_name", StringType(), True),
            StructField("ref_industry", StringType(), True),
            StructField("ref_target_low", DoubleType(), True),
            StructField("ref_target_high", DoubleType(), True),
            StructField("ref_unit", StringType(), True),
        ]
    )


def run_local_pipeline(
    spark: SparkSession,
    bronze_csv_glob: str,
    config: PipelineRunConfig,
) -> dict[str, Any]:
    """Execute simplified Bronze → Silver → Gold path for local OSS testing."""
    perf = PipelinePerfRecorder(
        spark,
        run_id=config.run_id,
        volume_gb=config.volume_gb,
        output_path=str(config.base_dir / "gold" / "pipeline_perf"),
    )
    transform_ts = datetime.now(timezone.utc).isoformat()
    results: dict[str, Any] = {"stages": {}}

    bronze_path = str(config.base_dir / "bronze" / "raw_metrics")
    silver_path = str(config.base_dir / "silver" / "metrics")
    gold_path = str(config.base_dir / "gold" / "org_kpis")

    # —— Bronze
    t0 = time.perf_counter()
    raw_df = spark.read.option("header", True).csv(bronze_csv_glob)
    input_rows = raw_df.count()
    stamper = BronzeProvenanceStamper(
        run_id=config.run_id,
        org_id=config.org_id,
        source_type="csv",
        source_path=bronze_csv_glob,
    )
    bronze_df = stamper.stamp(raw_df)
    (
        bronze_df.write.format("delta")
        .mode("overwrite")
        .partitionBy("_bronze_org_id")
        .save(bronze_path)
    )
    bronze_rows = spark.read.format("delta").load(bronze_path).count()
    results["stages"]["bronze"] = perf.record_stage(
        "bronze_ingestion",
        bronze_df,
        input_rows=input_rows,
        output_rows=bronze_rows,
        wall_seconds=time.perf_counter() - t0,
    ).to_dict()

    # —— Silver
    t0 = time.perf_counter()
    bronze_metrics = spark.read.format("delta").load(bronze_path)
    validator = SilverValidator(completeness_threshold=0.95)
    deduped = validator.deduplicate_metrics(bronze_metrics)
    salt = get_secret_or_warn(
        "ambient-systems",
        "pii_salt",
        dev_fallback="dev-only-salt-do-not-use-in-prod",
    )
    pseudonymized = PiiPseudonymizer(salt=salt, transform_ts=transform_ts).apply(deduped)
    ref_df = spark.createDataFrame(REFERENCE_BENCHMARKS, _ref_schema())
    validated = validator.validate_and_tag(pseudonymized, ref_df)
    if config.apply_skew_salt and config.hot_org_ids:
        validated = validator.apply_skew_salt(validated, config.hot_org_ids)
    silver_df = validator.add_silver_provenance(validated, config.run_id, transform_ts)

    if config.cache_silver:
        silver_df = silver_df.cache()

    (
        silver_df.write.format("delta")
        .mode("overwrite")
        .partitionBy("_bronze_org_id")
        .save(silver_path)
    )
    silver_rows = spark.read.format("delta").load(silver_path).count()
    results["stages"]["silver"] = perf.record_stage(
        "silver_transformation",
        silver_df,
        input_rows=bronze_rows,
        output_rows=silver_rows,
        wall_seconds=time.perf_counter() - t0,
    ).to_dict()

    # —— Gold (simplified KPI pivot when Real Estate metrics exist)
    t0 = time.perf_counter()
    silver_metrics = spark.read.format("delta").load(silver_path)
    if config.cache_silver:
        silver_metrics = silver_metrics.cache()

    pivot_parts = config.shuffle_partitions if config.optimize else 1
    if "industry" in silver_metrics.columns and "name" in silver_metrics.columns:
        re_df = silver_metrics.filter(F.col("industry") == "Real Estate")
        re_wide = (
            re_df.repartition(pivot_parts, "_bronze_org_id")
            .groupBy("_bronze_org_id")
            .pivot("name", ["Net Operating Income", "Annual Debt Service", "Market Value"])
            .agg(F.first("value"))
        )
        re_kpis = re_wide.withColumn(
            "kpi_dscr",
            F.when(
                F.col("`Annual Debt Service`").isNotNull()
                & (F.col("`Annual Debt Service`") > 0),
                F.col("`Net Operating Income`") / F.col("`Annual Debt Service`"),
            ),
        )
        (
            re_kpis.write.format("delta")
            .mode("overwrite")
            .partitionBy("_bronze_org_id")
            .save(f"{gold_path}/real_estate")
        )
        gold_rows = spark.read.format("delta").load(f"{gold_path}/real_estate").count()
    else:
        # Manufacturing / long-metric demos: write a compact gold summary.
        gold_summary = (
            silver_metrics.groupBy("_bronze_org_id")
            .agg(
                F.count("*").alias("metric_rows"),
                F.countDistinct("metric_id").alias("distinct_metrics"),
            )
            if "metric_id" in silver_metrics.columns
            else silver_metrics.groupBy("_bronze_org_id").agg(F.count("*").alias("metric_rows"))
        )
        (
            gold_summary.write.format("delta")
            .mode("overwrite")
            .partitionBy("_bronze_org_id")
            .save(f"{gold_path}/summary")
        )
        gold_rows = spark.read.format("delta").load(f"{gold_path}/summary").count()
        re_kpis = gold_summary

    results["stages"]["gold"] = perf.record_stage(
        "gold_metrics",
        re_kpis,
        input_rows=silver_rows,
        output_rows=gold_rows,
        wall_seconds=time.perf_counter() - t0,
    ).to_dict()

    if config.cache_silver:
        silver_metrics.unpersist()

    perf.flush()
    results["run_id"] = perf.run_id
    results["total_wall_seconds"] = sum(
        s["wall_seconds"] for s in results["stages"].values()
    )
    return results


def run_pipeline_from_config(
    bronze_csv_glob: str,
    config: PipelineRunConfig,
    spark: SparkSession | None = None,
) -> dict[str, Any]:
    """Entry point: create Spark if needed, validate contract, run pipeline."""
    owns_spark = spark is None
    if spark is None:
        spark = create_local_spark(shuffle_partitions=config.shuffle_partitions)

    loader = ContractLoader()
    contract = loader.load("tenant-metrics-v1.yaml")
    loader.enforce_bronze_lineage(contract)

    try:
        return run_local_pipeline(spark, bronze_csv_glob, config)
    finally:
        if owns_spark:
            spark.stop()
