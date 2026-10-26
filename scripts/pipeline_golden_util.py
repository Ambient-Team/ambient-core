"""Shared helpers for pipeline golden snapshots (tests + refresh script)."""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any, cast

from pyspark.sql import DataFrame, SparkSession

from ambient_pipeline.pii import assert_pii_columns_pseudonymized, columns_matching_pii_indicators

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


def load_fixture_env(path: Path) -> dict[str, str]:
    """Parse ``KEY=value`` lines from a fixture env file (comments and blanks skipped)."""
    values: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        key, sep, val = stripped.partition("=")
        if sep:
            values[key.strip()] = val.strip()
    return values


def bronze_display_names(csv_path: Path) -> list[str]:
    """Distinct non-empty ``name`` values from a bronze-style metrics CSV."""
    names: set[str] = set()
    with csv_path.open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            name = (row.get("name") or "").strip()
            if name:
                names.add(name)
    return sorted(names)


def assert_no_forbidden_literals(df: DataFrame, forbidden: list[str]) -> None:
    """Fail when any string column contains a forbidden raw PII literal."""
    if not forbidden:
        return
    string_cols = [
        f.name
        for f in df.schema.fields
        if f.dataType.simpleString() in ("string", "varchar")
    ]
    for col in string_cols:
        for literal in forbidden:
            hit = df.filter(df[col].contains(literal)).limit(1).count()
            if hit:
                raise AssertionError(
                    f"Column {col!r} still contains forbidden literal {literal!r}"
                )


def assert_stage_outputs_pseudonymized(df: DataFrame, stage_label: str) -> None:
    """Ensure configured PII columns in a persisted stage table are digests only."""
    pii_cols = columns_matching_pii_indicators(df.columns)
    if not pii_cols:
        return
    try:
        assert_pii_columns_pseudonymized(df)
    except AssertionError as exc:
        raise AssertionError(f"{stage_label}: {exc}") from exc
