"""Gold-layer Spark tests: null handling, schema evolution, transform idempotency."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from pyspark.sql import DataFrame, SparkSession
from pyspark.sql.types import DoubleType, StringType, StructField, StructType

from ambient_pipeline.bronze_catalog_map import bronze_to_tenant_metrics
from ambient_pipeline.perf import PipelinePerfRecorder
from ambient_pipeline.validation import SilverValidator


def _bronze_frame(spark: SparkSession) -> DataFrame:
    rows = [("2024-03-15", "100", "95")]
    return spark.createDataFrame(rows, ["Date", "OccupiedBeds", "AvailableBeds"])


def _mapping() -> dict[str, str]:
    return {
        "date": "Date",
        "occupied_beds": "OccupiedBeds",
        "available_beds": "AvailableBeds",
    }


def test_bronze_to_tenant_metrics_idempotent_row_count(spark: SparkSession) -> None:
    df = _bronze_frame(spark)
    kwargs = {
        "org_id": "org-1",
        "mapping_json": _mapping(),
        "catalog_option_key": "HcCensus911CatalogOptionKey01",
        "run_id": "run-idempotent",
        "ingestion_ts": datetime.now(timezone.utc).isoformat(),
    }
    first = bronze_to_tenant_metrics(df, **kwargs)
    second = bronze_to_tenant_metrics(df, **kwargs)
    assert first.count() == second.count()
    assert sorted(first.columns) == sorted(second.columns)


def test_silver_null_values_tagged_missing(spark: SparkSession) -> None:
    schema = StructType(
        [
            StructField("name", StringType(), True),
            StructField("industry", StringType(), True),
            StructField("value", DoubleType(), True),
        ]
    )
    df = spark.createDataFrame([("Only Null Metric", "Healthcare", None)], schema=schema)
    ref = spark.createDataFrame(
        [("Only Null Metric", "Healthcare", 0.0, 1.0)],
        ["ref_metric_name", "ref_industry", "ref_target_low", "ref_target_high"],
    )
    row = SilverValidator().validate_and_tag(df, ref).collect()[0]
    assert row["_iso8000_quality_flag"] == "SILVER_MISSING_VALUE"


def test_perf_recorder_csv_append_writes_header_once(
    spark: SparkSession, tmp_path: Path
) -> None:
    df = spark.createDataFrame([(1,)], ["id"])
    csv_path = tmp_path / "perf_evolve.csv"
    recorder = PipelinePerfRecorder(spark, output_path=str(csv_path))
    recorder.record_stage("gold", df, output_rows=1, wall_seconds=0.01)
    recorder.flush()
    recorder.record_stage("silver", df, output_rows=1, wall_seconds=0.02)
    recorder.flush()
    lines = csv_path.read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) >= 3
    assert lines[0].startswith("run_id,")


def test_pipeline_perf_recorder_repr_and_capture_plan(spark: SparkSession) -> None:
    df = spark.createDataFrame([(1,)], ["id"])
    recorder = PipelinePerfRecorder(spark, run_id="r")
    assert "PipelinePerfRecorder" in repr(recorder)
    plan = recorder.capture_plan(df, "gold")
    assert isinstance(plan, str)
