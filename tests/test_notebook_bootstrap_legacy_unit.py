"""Unit tests for notebook_bootstrap path resolution (no demo CSVs)."""

from __future__ import annotations

import sys
from pathlib import Path

import pytest

from ambient_pipeline.notebook_bootstrap import ensure_package_on_path, find_platform_root


def _fake_platform_root(root: Path) -> Path:
    (root / "ambient_pipeline").mkdir(parents=True)
    (root / "data").mkdir(parents=True)
    return root


def test_find_platform_root_explicit(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    assert find_platform_root(root) == root.resolve()


def test_find_platform_root_from_platform_root_env(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = _fake_platform_root(tmp_path)
    monkeypatch.setenv("PLATFORM_ROOT", str(root))
    assert find_platform_root() == root.resolve()


def test_find_platform_root_explicit_missing_pipeline_raises(tmp_path: Path) -> None:
    root = tmp_path / "empty"
    root.mkdir()
    with pytest.raises(FileNotFoundError, match="missing ambient_pipeline"):
        find_platform_root(tmp_path)


def test_find_platform_root_module_at_fs_root_skips_parent_candidate(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    """When __file__ has only one parent (e.g. /notebook_bootstrap.py), skip parents[1] append."""
    platform = tmp_path / "ambient-core"
    _fake_platform_root(platform)
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.__file__",
        "/notebook_bootstrap.py",
    )
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.Path.cwd",
        lambda: platform,
    )
    assert find_platform_root() == platform.resolve()


def test_find_platform_root_not_found(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    isolated = tmp_path / "isolated_module" / "notebook_bootstrap.py"
    isolated.parent.mkdir(parents=True)
    monkeypatch.setattr("ambient_pipeline.notebook_bootstrap.__file__", str(isolated))
    empty = tmp_path / "empty"
    empty.mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.Path.cwd",
        lambda: empty,
    )
    with pytest.raises(FileNotFoundError, match="Could not find"):
        find_platform_root()


def test_ensure_package_on_path_inserts_root_and_lib(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    (root / "lib").mkdir()
    initial_path = list(sys.path)
    try:
        sys.path[:] = [p for p in sys.path if p not in {str(root), str(root / "lib")}]
        assert ensure_package_on_path(root) == root.resolve()
        assert str(root) in sys.path
        assert str(root / "lib") in sys.path
    finally:
        sys.path[:] = initial_path


def test_ensure_package_on_path_idempotent(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    ensure_package_on_path(root)
    before = list(sys.path)
    assert ensure_package_on_path(root) == root.resolve()
    assert sys.path == before
