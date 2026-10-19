"""Cover create_local_spark builder path via monkeypatched Delta helper."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from tests.spark_fixtures import create_local_spark as pytest_spark


def test_create_local_spark_uses_delta_configure(monkeypatch: pytest.MonkeyPatch) -> None:
    import delta

    real_session = pytest_spark("ambient-perf-create-local")

    class Builder:
        def appName(self, name: str) -> Builder:
            return self

        def master(self, master: str) -> Builder:
            return self

        def config(self, key: str, value: str) -> Builder:
            return self

        def getOrCreate(self):
            return real_session

    def fake_configure(builder: MagicMock) -> Builder:
        return Builder()

    monkeypatch.setattr(delta, "configure_spark_with_delta_pip", fake_configure)

    from ambient_pipeline.perf import create_local_spark

    session = create_local_spark("ambient-unit")
    assert session.range(1).count() == 1


def test_write_delta_path_monkeypatched(spark, monkeypatch: pytest.MonkeyPatch) -> None:
    from ambient_pipeline.perf import PipelinePerfRecorder

    recorder = PipelinePerfRecorder(spark, output_path="/tmp/not-used")
    recorder._rows.append(  # noqa: SLF001
        {
            "run_id": "r",
            "stage": "gold",
            "volume_gb": 0.0,
            "wall_seconds": 0.0,
            "input_rows": 0,
            "output_rows": 0,
            "shuffle_read_bytes": 0,
            "shuffle_write_bytes": 0,
            "spill_bytes": 0,
            "plan_excerpt": "",
            "environment": "{}",
            "recorded_at": "t",
        }
    )
    called: list[str] = []

    def fake_delta(path: str) -> None:
        called.append(path)

    monkeypatch.setattr(recorder, "_write_delta", fake_delta)
    recorder.flush()
    assert called
