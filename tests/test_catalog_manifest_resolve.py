"""resolve_manifest_path fallback branches."""

from __future__ import annotations

from pathlib import Path

from ambient_contracts.catalog_manifest import resolve_manifest_path


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
