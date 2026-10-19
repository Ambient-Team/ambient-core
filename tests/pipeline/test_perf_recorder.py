"""Spark tests for performance recorder helpers."""

from __future__ import annotations

from ambient_pipeline.perf import PipelinePerfRecorder, StageMetrics


def test_stage_metrics_to_dict_truncates_plan(spark) -> None:
    metrics = StageMetrics(
        run_id="r1",
        stage="bronze",
        volume_gb=1.0,
        wall_seconds=0.1,
        plan_excerpt="x" * 3000,
    )
    data = metrics.to_dict()
    assert len(data["plan_excerpt"]) <= 2000


def test_pipeline_perf_recorder_record_stage(spark) -> None:
    df = spark.createDataFrame([(1, 2.0)], ["id", "value"])
    recorder = PipelinePerfRecorder(spark, run_id="test-run", volume_gb=0.01)
    metrics = recorder.record_stage("silver", df, input_rows=1, output_rows=1, wall_seconds=0.01)
    assert metrics.stage == "silver"
    assert recorder._rows  # noqa: SLF001


def test_pipeline_perf_recorder_flush_no_rows_is_noop(spark) -> None:
    recorder = PipelinePerfRecorder(spark)
    recorder.flush()


def test_pipeline_perf_recorder_timed_action_and_csv_flush(spark, tmp_path) -> None:
    df = spark.createDataFrame([(1, 2.0)], ["id", "value"])
    csv_path = tmp_path / "perf.csv"
    recorder = PipelinePerfRecorder(
        spark,
        run_id="test-run",
        volume_gb=0.01,
        output_path=str(csv_path),
    )
    rows, metrics = recorder.timed_action("count", df, plan_label="lbl")
    assert rows == 1
    assert metrics.output_rows == 1
    recorder.flush()
    assert csv_path.is_file()
