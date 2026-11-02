"""Branch coverage for catalog_manifest resolution helpers."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_contracts.catalog_manifest import load_manifest, resolve_catalog_root_flexible


def test_resolve_catalog_root_flexible_from_repo_root() -> None:
    root = Path(__file__).resolve().parents[1]
    resolved = resolve_catalog_root_flexible(root)
    assert (resolved / "manifest.json").is_file()


def test_resolve_catalog_root_flexible_start_dir_with_manifest(tmp_path: Path) -> None:
    (tmp_path / "manifest.json").write_text(
        '{"version": 1, "industries": [], "metrics": [], "dataOptions": []}',
        encoding="utf-8",
    )
    assert resolve_catalog_root_flexible(tmp_path) == tmp_path


def test_resolve_catalog_root_flexible_finds_nested_ambient_core_catalog(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    nested = tmp_path / "ambient-core" / "catalog"
    nested.mkdir(parents=True)
    (nested / "manifest.json").write_text(
        '{"version": 1, "industries": [], "metrics": [], "dataOptions": []}',
        encoding="utf-8",
    )
    monkeypatch.chdir(tmp_path)
    assert resolve_catalog_root_flexible() == nested


def test_load_manifest_exposes_industries() -> None:
    manifest = load_manifest()
    assert manifest.industries
    assert manifest.metrics
