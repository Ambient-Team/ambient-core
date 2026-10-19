"""Spark smoke for local pipeline config defaults."""

from __future__ import annotations

from pathlib import Path

from ambient_pipeline.runner import PipelineRunConfig


def test_pipeline_run_config_optimize_defaults(spark) -> None:
    cfg = PipelineRunConfig(base_dir=Path("/tmp/ambient-test"), optimize=True)
    assert cfg.cache_silver is True
    assert cfg.apply_skew_salt is True


def test_pipeline_run_config_disable_optimize(spark) -> None:
    cfg = PipelineRunConfig(base_dir=Path("/tmp/ambient-test"), optimize=False)
    assert cfg.cache_silver is False
    assert cfg.apply_skew_salt is False
