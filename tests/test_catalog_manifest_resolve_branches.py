"""Branch coverage for catalog_manifest resolution helpers."""

from __future__ import annotations

from pathlib import Path

from ambient_contracts.catalog_manifest import load_manifest, resolve_catalog_root_flexible


def test_resolve_catalog_root_flexible_from_repo_root() -> None:
    root = Path(__file__).resolve().parents[1]
    resolved = resolve_catalog_root_flexible(root)
    assert (resolved / "manifest.json").is_file()


def test_load_manifest_exposes_industries() -> None:
    manifest = load_manifest()
    assert manifest.industries
    assert manifest.metrics
