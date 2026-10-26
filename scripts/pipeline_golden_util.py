"""Shared helpers for pipeline golden snapshots (tests + refresh script)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, cast

from pyspark.sql import SparkSession

GOLDEN_COLUMNS = (
    "_bronze_org_id",
    "noi",
    "annual_debt_service",
    "market_value",
    "kpi_dscr",
)


def pipeline_snapshot(
    spark: SparkSession,
    result: dict[str, Any],
    gold_dir: Path,
) -> dict[str, Any]:
    """Build a deterministic JSON-serializable snapshot (no wall-clock fields)."""
    stages = result.get("stages", {})
    snapshot: dict[str, Any] = {
        "run_id": result.get("run_id"),
        "stages": {
            name: {"output_rows": stage.get("output_rows")}
            for name, stage in stages.items()
        },
        "gold_real_estate": [],
    }
    re_path = gold_dir / "real_estate"
    if re_path.is_dir():
        df = spark.read.format("delta").load(str(re_path))
        rows = df.select(*[c for c in GOLDEN_COLUMNS if c in df.columns]).collect()
        for row in rows:
            item: dict[str, Any] = {}
            for col in GOLDEN_COLUMNS:
                if col not in row.asDict():
                    continue
                val = row[col]
                if isinstance(val, str):
                    try:
                        val = float(val)
                    except ValueError:
                        pass
                if isinstance(val, float):
                    item[col] = round(val, 6)
                else:
                    item[col] = val
            snapshot["gold_real_estate"].append(item)
        snapshot["gold_real_estate"].sort(key=lambda r: str(r.get("_bronze_org_id", "")))
    return snapshot


def write_golden(path: Path, snapshot: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(snapshot, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def load_golden(path: Path) -> dict[str, Any]:
    return cast(dict[str, Any], json.loads(path.read_text(encoding="utf-8")))
