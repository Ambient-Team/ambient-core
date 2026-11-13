"""Unit tests for notebook_bootstrap (OSS Jupyter path helpers)."""

from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import MagicMock

import pytest

import ambient_pipeline.notebook_bootstrap as notebook_bootstrap
from ambient_pipeline.notebook_bootstrap import (
    apply_spark_tuning,
    ensure_checkout_on_path,
    ensure_pipeline_on_path,
    find_checkout_root,
    find_repo_root,
)


def _isolate_module_file(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    fake = tmp_path / "orphan" / "notebook_bootstrap.py"
    fake.parent.mkdir(parents=True)
    monkeypatch.setattr(notebook_bootstrap, "__file__", str(fake))


def test_find_repo_root_from_start(tmp_path: Path) -> None:
    lib = tmp_path / "lib" / "ambient_pipeline"
    lib.mkdir(parents=True)
    assert find_repo_root(tmp_path) == tmp_path.resolve()


def test_find_repo_root_returns_none_when_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _isolate_module_file(tmp_path, monkeypatch)
    assert find_repo_root(tmp_path) is None


def test_ensure_pipeline_on_path_adds_lib(tmp_path: Path) -> None:
    lib = tmp_path / "lib" / "ambient_pipeline"
    lib.mkdir(parents=True)
    lib_str = str((tmp_path / "lib").resolve())
    while lib_str in sys.path:
        sys.path.remove(lib_str)
    assert ensure_pipeline_on_path(tmp_path) == tmp_path.resolve()
    assert lib_str in sys.path


def test_ensure_pipeline_on_path_returns_none_when_no_repo(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _isolate_module_file(tmp_path, monkeypatch)
    assert ensure_pipeline_on_path(tmp_path) is None


def test_apply_spark_tuning_sets_defaults() -> None:
    spark = MagicMock()
    apply_spark_tuning(spark)
    assert spark.conf.set.call_count == 3
    keys = {call.args[0] for call in spark.conf.set.call_args_list}
    assert "spark.sql.adaptive.enabled" in keys


def test_apply_spark_tuning_skips_failing_keys(capsys: pytest.CaptureFixture[str]) -> None:
    spark = MagicMock()

    def set_conf(key: str, val: str) -> None:
        if key == "spark.sql.adaptive.skewJoin.enabled":
            raise RuntimeError("restricted")

    spark.conf.set.side_effect = set_conf
    apply_spark_tuning(spark, extra=(("spark.custom", "1"),))
    out = capsys.readouterr().out
    assert "[spark conf] skipped" in out
    assert "skewJoin" in out


def _fake_checkout(root: Path) -> Path:
    (root / "lib" / "ambient_pipeline").mkdir(parents=True)
    return root


def test_find_checkout_root_explicit(tmp_path: Path) -> None:
    root = _fake_checkout(tmp_path)
    assert find_checkout_root(root) == root.resolve()


def test_find_checkout_root_from_ambient_core_root_env(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = _fake_checkout(tmp_path)
    monkeypatch.delenv("AMBIENT_CORE_ROOT", raising=False)
    monkeypatch.setenv("AMBIENT_CORE_ROOT", str(root))
    assert find_checkout_root() == root.resolve()


def test_find_checkout_root_explicit_missing_package_raises(tmp_path: Path) -> None:
    root = tmp_path / "empty"
    root.mkdir()
    with pytest.raises(FileNotFoundError, match="missing lib/ambient_pipeline"):
        find_checkout_root(root)


def test_find_checkout_root_module_at_fs_root_uses_cwd(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    checkout = _fake_checkout(tmp_path / "ambient-core")
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.__file__",
        "/notebook_bootstrap.py",
    )
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.Path.cwd",
        lambda: checkout,
    )
    assert find_checkout_root() == checkout.resolve()


def test_find_checkout_root_not_found(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    isolated = tmp_path / "isolated_module" / "notebook_bootstrap.py"
    isolated.parent.mkdir(parents=True)
    monkeypatch.delenv("AMBIENT_CORE_ROOT", raising=False)
    monkeypatch.setattr("ambient_pipeline.notebook_bootstrap.__file__", str(isolated))
    empty = tmp_path / "empty"
    empty.mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.Path.cwd",
        lambda: empty,
    )
    with pytest.raises(FileNotFoundError, match="Could not find"):
        find_checkout_root()


def test_ensure_checkout_on_path_inserts_root_and_lib(tmp_path: Path) -> None:
    root = _fake_checkout(tmp_path)
    initial_path = list(sys.path)
    try:
        sys.path[:] = [p for p in sys.path if p not in {str(root.resolve()), str((root / "lib").resolve())}]
        assert ensure_checkout_on_path(root) == root.resolve()
        assert str(root.resolve()) in sys.path
        assert str((root / "lib").resolve()) in sys.path
    finally:
        sys.path[:] = initial_path


def test_ensure_checkout_on_path_skips_missing_lib(tmp_path: Path) -> None:
    root = tmp_path / "no-lib"
    root.mkdir()
    initial_path = list(sys.path)
    try:
        assert ensure_checkout_on_path(root) == root.resolve()
        assert str(root.resolve()) in sys.path
        assert str((root / "lib").resolve()) not in sys.path
    finally:
        sys.path[:] = initial_path


def test_find_checkout_root_ignores_blank_env_and_duplicate_candidates(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    module_file = tmp_path / "notlib" / "notebook_bootstrap.py"
    module_file.parent.mkdir(parents=True)
    (tmp_path / "lib" / "ambient_pipeline").mkdir(parents=True)
    monkeypatch.setenv("AMBIENT_CORE_ROOT", "   ")
    monkeypatch.setattr("ambient_pipeline.notebook_bootstrap.__file__", str(module_file))
    monkeypatch.setattr(
        "ambient_pipeline.notebook_bootstrap.Path.cwd",
        lambda: module_file.parent,
    )
    assert find_checkout_root() == tmp_path.resolve()


def test_ensure_checkout_on_path_idempotent(tmp_path: Path) -> None:
    root = _fake_checkout(tmp_path)
    ensure_checkout_on_path(root)
    before = list(sys.path)
    assert ensure_checkout_on_path(root) == root.resolve()
    assert sys.path == before
