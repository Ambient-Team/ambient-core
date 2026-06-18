"""ISO 8000 / BCBS 239 Silver validation helpers."""

from __future__ import annotations

from dataclasses import dataclass

from pyspark.sql import DataFrame
from pyspark.sql import functions as F
from pyspark.sql.types import BooleanType, DoubleType


@dataclass
class SilverValidator:
    """Range validation and completeness checks for Silver metrics."""

    completeness_threshold: float = 0.95

    def __repr__(self) -> str:
        return f"SilverValidator(completeness_threshold={self.completeness_threshold})"

    def validate_and_tag(self, df: DataFrame, ref_df: DataFrame) -> DataFrame:
        """Join reference benchmarks and tag rows with ISO 8000 quality flags."""
        joined = df.join(
            ref_df,
            (F.col("name") == F.col("ref_metric_name"))
            & (F.col("industry") == F.col("ref_industry")),
            how="left",
        )

        validated = (
            joined.withColumn(
                "_midpoint",
                F.when(
                    F.col("ref_target_low").isNotNull() & F.col("ref_target_high").isNotNull(),
                    (F.col("ref_target_low") + F.col("ref_target_high")) / 2,
                ).otherwise(F.col("ref_target_low")),
            )
            .withColumn(
                "_range_width",
                F.when(
                    F.col("ref_target_low").isNotNull() & F.col("ref_target_high").isNotNull(),
                    F.col("ref_target_high") - F.col("ref_target_low"),
                ).otherwise(F.lit(None).cast(DoubleType())),
            )
            .withColumn(
                "_iso8000_in_range",
                F.when(F.col("value").isNull(), F.lit(None).cast(BooleanType()))
                .when(
                    F.col("ref_target_low").isNotNull() & F.col("ref_target_high").isNotNull(),
                    (F.col("value") >= F.col("ref_target_low"))
                    & (F.col("value") <= F.col("ref_target_high")),
                )
                .when(
                    F.col("ref_target_low").isNotNull(),
                    F.col("value") >= F.col("ref_target_low"),
                )
                .otherwise(F.lit(True)),
            )
            .withColumn(
                "_anomaly_score",
                F.when(
                    F.col("_range_width").isNotNull()
                    & (F.col("_range_width") > 0)
                    & F.col("value").isNotNull(),
                    F.abs(F.col("value") - F.col("_midpoint")) / F.col("_range_width"),
                ).otherwise(F.lit(0.0)),
            )
            .withColumn(
                "_iso8000_quality_flag",
                F.when(F.col("value").isNull(), F.lit("SILVER_MISSING_VALUE"))
                .when(F.col("_iso8000_in_range") == F.lit(False), F.lit("SILVER_OUT_OF_RANGE"))
                .otherwise(F.lit("SILVER_VALID")),
            )
            .drop(
                "ref_metric_name",
                "ref_industry",
                "ref_target_low",
                "ref_target_high",
                "ref_unit",
                "_midpoint",
                "_range_width",
            )
        )
        return validated

    def completeness_ratio(self, df: DataFrame) -> float:
        """Fraction of rows with non-null value column."""
        total = df.count()
        if total == 0:
            return 0.0
        non_null = df.filter(F.col("value").isNotNull()).count()
        return non_null / total

    def assert_completeness(self, df: DataFrame, org_label: str = "") -> float:
        """Raise if completeness is below threshold."""
        ratio = self.completeness_ratio(df)
        if ratio < self.completeness_threshold:
            label = f" for {org_label}" if org_label else ""
            raise RuntimeError(
                f"Completeness {ratio:.1%}{label} below threshold "
                f"{self.completeness_threshold:.0%}"
            )
        return ratio

    def deduplicate_metrics(self, df: DataFrame) -> DataFrame:
        """Remove exact duplicates and keep latest per (org_id, metric_id)."""
        from pyspark.sql.window import Window

        deduped = df.dropDuplicates(["_bronze_row_hash"])
        window = Window.partitionBy("_bronze_org_id", "metric_id").orderBy(
            F.col("_bronze_ingestion_ts").desc()
        )
        return (
            deduped.withColumn("_row_rank", F.row_number().over(window))
            .filter(F.col("_row_rank") == 1)
            .drop("_row_rank")
        )

    def add_silver_provenance(self, df: DataFrame, run_id: str, transform_ts: str) -> DataFrame:
        return (
            df.withColumn("_silver_run_id", F.lit(run_id))
            .withColumn("_silver_transform_ts", F.lit(transform_ts))
            .withColumn("_silver_schema_version", F.lit("1.0"))
            .withColumn("_iso8000_quality_tier", F.lit("SILVER"))
        )

    def apply_skew_salt(
        self,
        df: DataFrame,
        hot_org_ids: list[str],
        salt_buckets: int = 8,
    ) -> DataFrame:
        """Salt join key for hot org partitions to reduce skew in downstream aggregations."""
        if not hot_org_ids:
            return df

        hot_set = set(hot_org_ids)
        bucket_expr = F.when(
            F.col("_bronze_org_id").isin(list(hot_set)),
            (F.hash(F.col("metric_id")) % F.lit(salt_buckets)).cast("string"),
        ).otherwise(F.lit("0"))

        return df.withColumn("_skew_salt_bucket", bucket_expr)
