"""Tests for ambient_contracts.paths resolution helpers."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_contracts.paths import resolve_catalog_root, resolve_contracts_dir, resolve_repo_root


def test_resolve_repo_root_from_env(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    monkeypatch.setenv("AMBIENT_CORE_ROOT", str(tmp_path))
    assert resolve_repo_root() == tmp_path


def test_resolve_contracts_dir_prefers_env(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    custom = tmp_path / "my-contracts"
    custom.mkdir()
    monkeypatch.setenv("AMBIENT_CONTRACTS_DIR", str(custom))
    assert resolve_contracts_dir() == custom


def test_resolve_catalog_root_from_checkout() -> None:
    root = resolve_catalog_root()
    assert (root / "manifest.json").is_file()


def test_resolve_catalog_dir_from_env(monkeypatch: pytest.MonkeyPatch) -> None:
    repo = Path(__file__).resolve().parents[1]
    catalog = repo / "catalog"
    monkeypatch.setenv("AMBIENT_CATALOG_DIR", str(catalog))
    assert resolve_catalog_root() == catalog


def test_resolve_catalog_root_missing_manifest(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_CATALOG_DIR", raising=False)
    monkeypatch.setenv("AMBIENT_CORE_ROOT", str(tmp_path))
    with pytest.raises(FileNotFoundError, match="manifest.json"):
        resolve_catalog_root()
