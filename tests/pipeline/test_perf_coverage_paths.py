"""Additional perf.py coverage (module included in lib/ gate after omit shrink)."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from ambient_pipeline.perf import PipelinePerfRecorder, StageMetrics, create_local_spark
from tests.spark_fixtures import create_local_spark as pytest_spark


def test_stage_metrics_repr() -> None:
    metrics = StageMetrics(run_id="r", stage="s", volume_gb=0.0, wall_seconds=0.0)
    assert "StageMetrics" in repr(metrics)


def test_timed_action_non_count_still_counts(spark) -> None:
    df = spark.createDataFrame([(1, 2.0)], ["id", "value"])
    recorder = PipelinePerfRecorder(spark)
    rows, metrics = recorder.timed_action("stage", df, action="collect", input_rows=1)
    assert rows == 1
    assert metrics.output_rows == 1


def test_flush_writes_delta_when_output_path_is_directory(spark, tmp_path, monkeypatch: pytest.MonkeyPatch) -> None:
    df = spark.createDataFrame([(1,)], ["id"])
    out_dir = tmp_path / "perf_out"
    recorder = PipelinePerfRecorder(spark, output_path=str(out_dir))
    recorder.record_stage("gold", df, output_rows=1, wall_seconds=0.01)

    written: list[str] = []

    def capture_delta(path: str) -> None:
        written.append(path)

    monkeypatch.setattr(recorder, "_write_delta", capture_delta)
    recorder.flush()
    assert written == [str(out_dir)]


def test_create_local_spark_invokes_delta_helper(monkeypatch: pytest.MonkeyPatch) -> None:
    import delta

    real_session = pytest_spark("ambient-perf-coverage")

    class Builder:
        def appName(self, _name: str) -> Builder:
            return self

        def master(self, _master: str) -> Builder:
            return self

        def config(self, _key: str, _value: str) -> Builder:
            return self

        def getOrCreate(self):
            return real_session

    monkeypatch.setattr(delta, "configure_spark_with_delta_pip", lambda _b: Builder())
    session = create_local_spark("ambient-perf-coverage")
    assert session is not None


def test_capture_plan_fallback_on_broken_jdf(spark) -> None:
    recorder = PipelinePerfRecorder(spark)
    broken = MagicMock()
    broken._jdf.queryExecution.side_effect = RuntimeError("no plan")
    broken.explain = MagicMock()
    plan = recorder.capture_plan(broken, "lbl")
    assert "[lbl]" in plan
