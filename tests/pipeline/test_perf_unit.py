"""Unit tests for perf helpers without Delta writes."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.perf import PipelinePerfRecorder


def test_capture_plan_handles_jdf_failure(spark: SparkSession) -> None:
    recorder = PipelinePerfRecorder(spark)
    broken = MagicMock()
    broken._jdf.queryExecution.side_effect = RuntimeError("no plan")
    broken.explain = MagicMock()
    plan = recorder.capture_plan(broken, "label")
    assert "[label]" in plan
    broken.explain.assert_called()


def test_flush_default_path_calls_write_delta(
    monkeypatch: pytest.MonkeyPatch, spark: SparkSession
) -> None:
    recorder = PipelinePerfRecorder(spark, run_id="r1")
    recorder.record_stage("gold", wall_seconds=0.0)
    called: list[str] = []

    def fake_write(path: str) -> None:
        called.append(path)

    monkeypatch.setattr(recorder, "_write_delta", fake_write)
    recorder.flush()
    assert called


def test_collect_spark_metrics_reads_stage_accumulators(spark: SparkSession) -> None:
    recorder = PipelinePerfRecorder(spark)

    class Metric:
        def __init__(self, name: str, value: int) -> None:
            self.name = name
            self.value = value

    class Stage:
        def accumulatorUpdates(self) -> list[Metric]:
            return [
                Metric("shuffle read bytes", 10),
                Metric("shuffle write bytes", 20),
                Metric("memory spill bytes", 5),
            ]

    status = MagicMock()
    status.getStageInfos.return_value = [Stage()]
    recorder.spark.sparkContext.statusTracker = MagicMock(return_value=status)
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["shuffle_read_bytes"] == 10
    assert metrics["shuffle_write_bytes"] == 20
    assert metrics["spill_bytes"] == 5


def test_collect_spark_metrics_swallows_errors(spark: SparkSession) -> None:
    recorder = PipelinePerfRecorder(spark)
    broken = MagicMock()
    broken.sparkContext.statusTracker.side_effect = RuntimeError("no status")
    recorder.spark = broken
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["shuffle_read_bytes"] == 0
