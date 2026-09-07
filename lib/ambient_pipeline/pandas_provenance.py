"""Pandas Bronze provenance stamping (Colab / local; no Spark required)."""

from __future__ import annotations

import hashlib
from dataclasses import dataclass
from datetime import datetime, timezone

import pandas as pd


REQUIRED_BRONZE_COLS = frozenset(
    {
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
)


def _row_hash(row: pd.Series, content_cols: list[str]) -> str:
    parts = [str(row[c]) if pd.notna(row[c]) else "" for c in content_cols]
    payload = "|".join(parts).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


@dataclass
class PandasBronzeStamper:
    """Append BCBS 239-style Bronze lineage columns to a pandas DataFrame."""

    run_id: str
    org_id: str
    source_type: str = "csv"
    source_path: str = "manual_entry"
    ingestion_ts: str | None = None
    schema_version: str = "1.0"

    def __post_init__(self) -> None:
        if self.ingestion_ts is None:
            self.ingestion_ts = datetime.now(timezone.utc).isoformat()

    def stamp(self, df: pd.DataFrame) -> pd.DataFrame:
        out = df.copy()
        content_cols = [c for c in out.columns if not str(c).startswith("_bronze_")]
        out["_bronze_run_id"] = self.run_id
        out["_bronze_org_id"] = self.org_id
        out["_bronze_source_type"] = self.source_type
        out["_bronze_source_path"] = self.source_path or "manual_entry"
        out["_bronze_ingestion_ts"] = self.ingestion_ts
        out["_bronze_row_hash"] = out.apply(
            lambda r: _row_hash(r, content_cols), axis=1
        )
        out["_iso8000_quality_flag"] = "RAW"
        out["_gdpr_pii_scanned"] = False
        out["_schema_version"] = self.schema_version
        return out

    def required_columns(self) -> set[str]:
        return set(REQUIRED_BRONZE_COLS)
