"""Tests for ambient_contracts catalog manifest loader."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from ambient_contracts.catalog_manifest import load_manifest, resolve_manifest_path
from ambient_contracts.manifest_models import parse_catalog_manifest


def test_manifest_loads_from_repo() -> None:
    path = resolve_manifest_path()
    assert path.is_file()
    manifest = load_manifest()
    assert manifest.version == 3
    assert len(manifest.metrics) >= 1
    assert manifest.industries[0].industry_codes.get("isic") is not None


def test_manifest_matches_catalog_file() -> None:
    root = Path(__file__).resolve().parents[1]
    on_disk = json.loads((root / "catalog" / "manifest.json").read_text(encoding="utf-8"))
    loaded = load_manifest()
    assert loaded.metrics[0].catalog_metric_key == on_disk["metrics"][0]["catalogMetricKey"]


def test_parse_catalog_manifest_rejects_invalid_root() -> None:
    with pytest.raises(ValueError, match="expected object"):
        parse_catalog_manifest([])


def test_resolve_metric_helper() -> None:
    manifest = load_manifest()
    first = manifest.metrics[0]
    assert manifest.resolve_metric(str(first.id)) == first
    assert manifest.resolve_metric("not-a-real-id") is None
