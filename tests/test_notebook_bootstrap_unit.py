"""Unit tests for notebook_bootstrap (OSS Jupyter path helpers)."""

from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import MagicMock

import pytest

import ambient_pipeline.notebook_bootstrap as notebook_bootstrap
from ambient_pipeline.notebook_bootstrap import (
    apply_spark_tuning,
    ensure_pipeline_on_path,
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
