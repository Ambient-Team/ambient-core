"""BCBS 239 Bronze provenance stamping."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone

from pyspark.sql import DataFrame
from pyspark.sql import functions as F


@dataclass
class BronzeProvenanceStamper:
    """Append mandatory Bronze lineage columns to every row."""

    run_id: str
    org_id: str
    source_type: str
    source_path: str = "manual_entry"
    ingestion_ts: str | None = None
    schema_version: str = "1.0"

    def __post_init__(self) -> None:
        if self.ingestion_ts is None:
            self.ingestion_ts = datetime.now(timezone.utc).isoformat()

    def __repr__(self) -> str:
        return (
            f"BronzeProvenanceStamper(run_id={self.run_id!r}, org_id={self.org_id!r}, "
            f"source_type={self.source_type!r})"
        )

    def stamp(self, df: DataFrame) -> DataFrame:
        """Append provenance columns and row hash to *df*."""
        content_cols = [c for c in df.columns if not c.startswith("_bronze_")]
        hash_expr = F.sha2(
            F.concat_ws("|", *[F.col(c).cast("string") for c in content_cols]),
            256,
        )
        org_col = F.col("org_id") if "org_id" in df.columns else F.lit(self.org_id)
        return (
            df.withColumn("_bronze_run_id", F.lit(self.run_id))
            .withColumn("_bronze_org_id", org_col)
            .withColumn("_bronze_source_type", F.lit(self.source_type))
            .withColumn(
                "_bronze_source_path",
                F.lit(self.source_path if self.source_path else "manual_entry"),
            )
            .withColumn("_bronze_ingestion_ts", F.lit(self.ingestion_ts))
            .withColumn("_bronze_row_hash", hash_expr)
            .withColumn("_iso8000_quality_flag", F.lit("RAW"))
            .withColumn("_gdpr_pii_scanned", F.lit(False))
            .withColumn("_schema_version", F.lit(self.schema_version))
        )

    def required_columns(self) -> set[str]:
        return {
            "_bronze_run_id",
            "_bronze_org_id",
            "_bronze_row_hash",
            "_bronze_ingestion_ts",
            "_bronze_source_type",
            "_bronze_source_path",
            "_iso8000_quality_flag",
            "_gdpr_pii_scanned",
            "_schema_version",
        }
