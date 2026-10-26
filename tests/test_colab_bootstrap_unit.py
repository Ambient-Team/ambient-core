"""Unit tests for colab_bootstrap path resolution (no Drive mount, no demo CSVs)."""

from __future__ import annotations

import sys
from collections.abc import Iterator
from pathlib import Path

import pytest

from ambient_pipeline.colab_bootstrap import ensure_package_on_path, find_platform_root


def _fake_platform_root(root: Path) -> Path:
    (root / "ambient_pipeline").mkdir(parents=True)
    (root / "data").mkdir(parents=True)
    return root


def test_find_platform_root_explicit(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    assert find_platform_root(root) == root.resolve()


def test_find_platform_root_from_platform_root_env(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    root = _fake_platform_root(tmp_path)
    monkeypatch.delenv("PLATFORM_ROOT", raising=False)
    monkeypatch.setenv("PLATFORM_ROOT", str(root))
    assert find_platform_root() == root.resolve()


def test_find_platform_root_explicit_missing_pipeline_raises(tmp_path: Path) -> None:
    (tmp_path / "data").mkdir()
    with pytest.raises(FileNotFoundError, match="ambient_pipeline"):
        find_platform_root(tmp_path)


def test_find_platform_root_drive_marker_one_level(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    drive = tmp_path / "drive"
    drive.mkdir()
    platform = drive / "ambient-core"
    _fake_platform_root(platform)
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (drive,),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "nowhere",
    )
    assert find_platform_root() == platform.resolve()


def test_find_platform_root_drive_marker_nested(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    drive = tmp_path / "drive"
    nested_parent = drive / "06 Business"
    nested_parent.mkdir(parents=True)
    platform = nested_parent / "Ambient-Systems-Platform"
    _fake_platform_root(platform)
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (drive,),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "nowhere",
    )
    assert find_platform_root() == platform.resolve()


def test_find_platform_root_drive_iterdir_oserror(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    drive = tmp_path / "drive"
    drive.mkdir()
    marker = drive / "ambient-core"
    _fake_platform_root(marker)

    class BadDrive(Path):
        def iterdir(self) -> Iterator[Path]:  # type: ignore[override]
            raise OSError("permission denied")

    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (BadDrive(drive),),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "nowhere",
    )
    assert find_platform_root() == marker.resolve()


def test_find_platform_root_not_found(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    isolated = tmp_path / "isolated_module" / "colab_bootstrap.py"
    isolated.parent.mkdir(parents=True)
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.__file__", str(isolated))
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES", ())
    empty = tmp_path / "empty"
    empty.mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: empty,
    )
    with pytest.raises(FileNotFoundError, match="Could not find"):
        find_platform_root()


def test_ensure_package_on_path_inserts_root_and_lib(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    lib = root / "lib"
    lib.mkdir()
    (lib / "ambient_pipeline").mkdir(exist_ok=True)
    for entry in (str(root), str(lib)):
        while entry in sys.path:
            sys.path.remove(entry)
    assert ensure_package_on_path(root) == root.resolve()
    assert str(root) in sys.path
    assert str(lib) in sys.path


def test_ensure_package_on_path_idempotent(tmp_path: Path) -> None:
    root = _fake_platform_root(tmp_path)
    root_str = str(root.resolve())
    if root_str not in sys.path:
        sys.path.insert(0, root_str)
    assert ensure_package_on_path(root) == root.resolve()
