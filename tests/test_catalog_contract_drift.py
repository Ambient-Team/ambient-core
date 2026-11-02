"""Contract drift: crosswalk links must align with manifest metrics and contract YAML."""

from __future__ import annotations

import json
from pathlib import Path

import yaml

from ambient_contracts.crosswalk import load_crosswalk_links

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "catalog" / "manifest.json"
CONTRACTS = ROOT / "contracts"


def test_every_crosswalk_metric_id_exists_in_manifest() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    ids = {m["id"] for m in manifest.get("metrics") or [] if isinstance(m.get("id"), int)}
    missing = []
    for link in load_crosswalk_links():
        mid = link.get("metricId")
        if isinstance(mid, int) and mid not in ids:
            missing.append(mid)
    assert not missing, f"crosswalk metricIds not in manifest: {missing[:10]}"


def test_every_crosswalk_contract_file_exists() -> None:
    for link in load_crosswalk_links():
        cf = link.get("contractFile")
        if not cf:
            continue
        assert (CONTRACTS / str(cf)).is_file(), cf


def test_crosswalk_catalog_metric_keys_match_manifest_when_present() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_id = {m["id"]: m for m in manifest.get("metrics") or [] if isinstance(m.get("id"), int)}
    for link in load_crosswalk_links():
        mid = link.get("metricId")
        key = link.get("catalogMetricKey")
        if not isinstance(mid, int) or not key:
            continue
        metric = by_id.get(mid)
        if metric is None:
            continue
        assert metric.get("catalogMetricKey") == key, (mid, key, metric.get("catalogMetricKey"))


def test_tenant_metrics_contract_columns_cover_crosswalk_suffixes() -> None:
    """Mapped contract columns from crosswalk suffixes exist on tenant-metrics-v1."""
    tenant_path = CONTRACTS / "tenant-metrics-v1.yaml"
    doc = yaml.safe_load(tenant_path.read_text(encoding="utf-8")) or {}
    columns = {c.get("name") for c in (doc.get("schema") or {}).get("columns") or []}
    unknown: list[str] = []
    for link in load_crosswalk_links():
        if link.get("contractFile") != "tenant-metrics-v1.yaml":
            continue
        suffix = link.get("contractColumnSuffix")
        if isinstance(suffix, str) and suffix and suffix not in columns:
            unknown.append(suffix)
    assert not unknown, f"tenant-metrics missing columns for crosswalk: {unknown[:15]}"
