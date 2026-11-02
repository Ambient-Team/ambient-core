"""Additional perf.py coverage (module included in lib/ gate after omit shrink)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.perf import PipelinePerfRecorder, StageMetrics, create_local_spark
from tests.spark_fixtures import create_local_spark as pytest_spark


def test_stage_metrics_repr() -> None:
    metrics = StageMetrics(run_id="r", stage="s", volume_gb=0.0, wall_seconds=0.0)
    assert "StageMetrics" in repr(metrics)


def test_timed_action_non_count_still_counts(spark: SparkSession) -> None:
    df = spark.createDataFrame([(1, 2.0)], ["id", "value"])
    recorder = PipelinePerfRecorder(spark)
    rows, metrics = recorder.timed_action("stage", df, action="collect", input_rows=1)
    assert rows == 1
    assert metrics.output_rows == 1


def test_flush_writes_delta_when_output_path_is_directory(
    spark: SparkSession, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
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


def test_create_local_spark_wraps_delta_configuration_errors(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    import delta

    def _boom(_builder: object) -> object:
        raise RuntimeError("delta not available")

    monkeypatch.setattr(delta, "configure_spark_with_delta_pip", _boom)
    with pytest.raises(RuntimeError, match="Local Spark\\+Delta session failed"):
        create_local_spark("ambient-perf-delta-fail")


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

        def getOrCreate(self) -> SparkSession:
            return real_session

    monkeypatch.setattr(delta, "configure_spark_with_delta_pip", lambda _b: Builder())
    session = create_local_spark("ambient-perf-coverage")
    assert session is not None


def test_flush_appends_csv_with_header(spark: SparkSession, tmp_path: Path) -> None:
    df = spark.createDataFrame([(1,)], ["id"])
    csv_path = tmp_path / "perf.csv"
    recorder = PipelinePerfRecorder(spark, output_path=str(csv_path))
    recorder.record_stage("bronze", df, output_rows=1, wall_seconds=0.01)
    recorder.flush()
    text = csv_path.read_text(encoding="utf-8")
    assert "run_id" in text
    assert "bronze" in text


def test_collect_spark_metrics_aggregates_stage_accumulators(
    spark: SparkSession, monkeypatch: pytest.MonkeyPatch
) -> None:
    recorder = PipelinePerfRecorder(spark)

    spill = MagicMock()
    spill.name = "internal metrics spill size"
    spill.value = 11
    shuffle_read = MagicMock()
    shuffle_read.name = "shuffle read bytes"
    shuffle_read.value = 22
    stage = MagicMock()
    stage.accumulatorUpdates.return_value = [spill, shuffle_read]

    tracker = MagicMock()
    tracker.getStageInfos.return_value = [stage]
    monkeypatch.setattr(spark.sparkContext, "statusTracker", lambda: tracker)

    metrics = recorder._collect_spark_metrics()
    assert metrics["spill_bytes"] == 11
    assert metrics["shuffle_read_bytes"] == 22


def test_create_local_spark_sets_hadoop_home_from_repo_bundle(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    import os
    from pathlib import Path

    import delta

    repo = Path(__file__).resolve().parents[2]
    hadoop_home = repo / ".hadoop_home"
    hadoop_home.mkdir(exist_ok=True)
    (hadoop_home / "bin").mkdir(exist_ok=True)
    monkeypatch.delenv("HADOOP_HOME", raising=False)

    real_session = pytest_spark("ambient-hadoop-env")

    class Builder:
        def appName(self, _name: str) -> Builder:
            return self

        def master(self, _master: str) -> Builder:
            return self

        def config(self, _key: str, _value: str) -> Builder:
            return self

        def getOrCreate(self) -> SparkSession:
            return real_session

    monkeypatch.setattr(delta, "configure_spark_with_delta_pip", lambda _b: Builder())
    create_local_spark("ambient-hadoop-env")
    assert os.environ.get("HADOOP_HOME") == str(hadoop_home)


def test_capture_plan_fallback_on_broken_jdf(spark: SparkSession) -> None:
    recorder = PipelinePerfRecorder(spark)
    broken = MagicMock()
    broken._jdf.queryExecution.side_effect = RuntimeError("no plan")
    broken.explain = MagicMock()
    plan = recorder.capture_plan(broken, "lbl")
    assert "[lbl]" in plan
