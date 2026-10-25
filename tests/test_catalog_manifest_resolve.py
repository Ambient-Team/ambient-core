"""resolve_manifest_path fallback branches."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_contracts import catalog_manifest
from ambient_contracts.catalog_manifest import (
    resolve_catalog_root_flexible,
    resolve_manifest_path,
)


def test_resolve_manifest_path_finds_repo_manifest() -> None:
    path = resolve_manifest_path()
    assert path.name == "manifest.json"
    assert path.is_file()


def test_resolve_manifest_path_ambient_core_layout(tmp_path: Path, monkeypatch) -> None:
    nested = tmp_path / "ambient-core" / "catalog"
    nested.mkdir(parents=True)
    (nested / "manifest.json").write_text('{"version": 1, "industries": [], "metrics": [], "dataOptions": []}', encoding="utf-8")

    def fake_roots():
        return [tmp_path]

    monkeypatch.setattr("ambient_contracts.catalog_manifest._repo_roots", fake_roots)
    assert resolve_manifest_path() == nested / "manifest.json"


def test_resolve_catalog_root_flexible_delegates_to_resolve_catalog_root(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    repo_catalog = Path(__file__).resolve().parents[1] / "catalog"

    monkeypatch.chdir(tmp_path)

    def _catalog_root() -> Path:
        return repo_catalog

    monkeypatch.setattr(catalog_manifest, "resolve_catalog_root", _catalog_root)
    assert resolve_catalog_root_flexible() == repo_catalog


def test_resolve_manifest_path_uses_flexible_catalog_root(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    catalog = tmp_path / "catalog"
    catalog.mkdir()
    (catalog / "manifest.json").write_text(
        '{"version": 1, "industries": [], "metrics": [], "dataOptions": []}',
        encoding="utf-8",
    )

    monkeypatch.setattr(catalog_manifest, "_repo_roots", lambda: [tmp_path])
    monkeypatch.setattr(
        catalog_manifest,
        "resolve_catalog_root_flexible",
        lambda: catalog,
    )
    assert resolve_manifest_path() == catalog / "manifest.json"


def test_resolve_manifest_path_uses_resolve_catalog_root_when_flexible_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    catalog = tmp_path / "catalog"
    catalog.mkdir()
    (catalog / "manifest.json").write_text(
        '{"version": 1, "industries": [], "metrics": [], "dataOptions": []}',
        encoding="utf-8",
    )

    def _missing_flexible() -> Path:
        raise FileNotFoundError("no catalog")

    monkeypatch.setattr(catalog_manifest, "_repo_roots", lambda: [tmp_path])
    monkeypatch.setattr(
        catalog_manifest,
        "resolve_catalog_root_flexible",
        _missing_flexible,
    )
    monkeypatch.setattr(catalog_manifest, "resolve_catalog_root", lambda: catalog)
    assert resolve_manifest_path() == catalog / "manifest.json"
