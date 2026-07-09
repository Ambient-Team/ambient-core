"""Tests for catalog manifest loader."""

from __future__ import annotations

import json
from pathlib import Path

from ambient_pipeline.catalog_manifest import load_manifest, resolve_manifest_path


def test_manifest_loads_from_repo() -> None:
    path = resolve_manifest_path()
    assert path.is_file()
    manifest = load_manifest()
    assert manifest.version == 1
    assert len(manifest.metrics) >= 1


def test_manifest_matches_catalog_file() -> None:
    root = Path(__file__).resolve().parents[2]
    on_disk = json.loads((root / "catalog" / "manifest.json").read_text(encoding="utf-8"))
    loaded = load_manifest()
    assert loaded.metrics[0].catalog_metric_key == on_disk["metrics"][0]["catalogMetricKey"]
