"""Tests for ambient_pipeline.catalog_loader."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from ambient_contracts.catalog_manifest import resolve_catalog_root_flexible
from ambient_pipeline.catalog_loader import (
    load_data_option,
    load_manifest_version,
    load_metric_by_numeric_id,
    resolve_catalog_root,
)


@pytest.fixture(scope="module")
def catalog_root() -> Path:
    return resolve_catalog_root()


def test_resolve_catalog_root_flexible_accepts_catalog_dir() -> None:
    explicit = Path(__file__).resolve().parents[1] / "catalog"
    assert resolve_catalog_root_flexible(explicit) == explicit


def test_resolve_catalog_root_points_at_manifest(catalog_root: Path) -> None:
    assert (catalog_root / "manifest.json").is_file()
    assert (catalog_root / "packs.yaml").is_file()


def test_load_manifest_version_is_three(catalog_root: Path) -> None:
    assert load_manifest_version(catalog_root) == "3"


def test_load_data_option_from_healthcare_pack(catalog_root: Path) -> None:
    opt = load_data_option("HcCensus911CatalogOptionKey01", catalog_root)
    assert opt is not None
    assert opt.get("id") == 911
    assert opt.get("industry") == "Healthcare"
    assert 911 in (opt.get("metricIds") or [])


def test_load_data_option_empty_key_returns_none(catalog_root: Path) -> None:
    assert load_data_option("", catalog_root) is None


def test_load_data_option_unknown_key_returns_none(catalog_root: Path) -> None:
    assert load_data_option("NoSuchCatalogOptionKey", catalog_root) is None


def test_load_metric_by_numeric_id_healthcare(catalog_root: Path) -> None:
    metric = load_metric_by_numeric_id(911, catalog_root)
    assert metric is not None
    assert metric.get("name")


def test_load_metric_by_unknown_id_returns_none(catalog_root: Path) -> None:
    assert load_metric_by_numeric_id(999999999, catalog_root) is None


def test_load_manifest_version_unknown_when_missing_key(tmp_path: Path) -> None:
    (tmp_path / "manifest.json").write_text("{}", encoding="utf-8")
    assert load_manifest_version(tmp_path) == "unknown"


def test_load_data_option_manifest_fallback_when_not_in_pack_yaml(tmp_path: Path) -> None:
    (tmp_path / "industries").mkdir()
    manifest = {
        "version": 3,
        "dataOptions": [
            {
                "catalogOptionKey": "OnlyInManifestKey",
                "id": 4242,
                "name": "Manifest-only option",
                "industry": "Test",
                "metricIds": [],
                "fields": [],
            }
        ],
    }
    (tmp_path / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    opt = load_data_option("OnlyInManifestKey", tmp_path)
    assert opt is not None
    assert opt.get("id") == 4242
    assert opt.get("name") == "Manifest-only option"
