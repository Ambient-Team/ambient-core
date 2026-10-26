"""Per-pack data-quality rules: field lists normalize and exclude PHI-shaped names."""

from __future__ import annotations

import re
from pathlib import Path

import yaml

from ambient_pipeline.catalog_field_rules import (
    infer_field_coverage,
    normalize_field_entries,
)

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "catalog" / "packs.yaml"
INDUSTRIES = ROOT / "catalog" / "industries"
POLICY = ROOT / "catalog" / "input_field_policy.yaml"


def _matchers() -> tuple[set[str], list[re.Pattern[str]]]:
    pol = yaml.safe_load(POLICY.read_text(encoding="utf-8")) or {}
    exact = {str(x).strip().lower() for x in (pol.get("phiExact") or [])}
    patterns = [re.compile(str(p), re.IGNORECASE) for p in (pol.get("phiPatterns") or [])]
    return exact, patterns


def _hit(name: str, exact: set[str], patterns: list[re.Pattern[str]]) -> bool:
    low = str(name).strip().lower()
    return low in exact or any(p.search(low) for p in patterns)


def _pack_ids() -> list[str]:
    data = yaml.safe_load(PACKS.read_text(encoding="utf-8")) or {}
    return [row["pack"] for row in data.get("packs") or [] if row.get("pack")]


def test_each_pack_data_options_normalize_fields() -> None:
    exact, patterns = _matchers()
    for pack_id in _pack_ids():
        opts_path = INDUSTRIES / pack_id / "data_options.yaml"
        doc = yaml.safe_load(opts_path.read_text(encoding="utf-8")) or {}
        for key, opt in (doc.get("dataOptions") or {}).items():
            normalized = normalize_field_entries(opt.get("fields"))
            for row in normalized:
                assert row["name"]
                assert row["type"]
                assert not _hit(row["name"], exact, patterns), f"{pack_id}/{key}: {row['name']}"
            coverage = infer_field_coverage(opt, catalog_option_key=key)
            assert coverage in ("upload", "enumerated")
