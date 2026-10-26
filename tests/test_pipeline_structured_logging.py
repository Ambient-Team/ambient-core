"""Assert structured JSON logs from pipeline entry points (no secrets)."""

from __future__ import annotations

import json
import logging
from pathlib import Path

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.colab_smoke import run_colab_smoke
from ambient_pipeline.pipeline_logging import log_pipeline_event
from ambient_pipeline.runner import PipelineRunConfig, run_local_pipeline


def _parse_log_records(records: list[logging.LogRecord]) -> list[dict[str, object]]:
    parsed: list[dict[str, object]] = []
    for record in records:
        try:
            payload = json.loads(record.getMessage())
        except json.JSONDecodeError:
            continue
        if isinstance(payload, dict) and "event" in payload:
            parsed.append(payload)
    return parsed


def test_log_pipeline_event_redacts_sensitive_field_names(
    caplog: pytest.LogCaptureFixture,
) -> None:
    caplog.set_level(logging.INFO, logger="ambient.pipeline")
    log_pipeline_event(
        "pipeline_start",
        component="runner",
        run_id="redact-run",
        api_key="should-not-appear",
        stage="bronze",
    )
    payload = json.loads(caplog.records[-1].getMessage())
    assert payload["api_key"] == "<redacted>"
    assert payload["stage"] == "bronze"


def test_runner_emits_structured_stage_logs(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    caplog: pytest.LogCaptureFixture,
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "log-test-salt")
    caplog.set_level(logging.INFO, logger="ambient.pipeline")

    csv_path = tmp_path / "bronze.csv"
    csv_path.write_text(
        "metric_id,name,industry,value\n"
        "re-noi,Net Operating Income,Real Estate,100.0\n",
        encoding="utf-8",
    )
    cfg = PipelineRunConfig(
        base_dir=tmp_path / "lake",
        run_id="log-run-1",
        org_id="org-log",
        optimize=False,
        transform_ts="2026-01-01T00:00:00Z",
        ingestion_ts="2026-01-01T00:00:00Z",
    )
    run_local_pipeline(spark, str(csv_path), cfg)

    events = _parse_log_records(caplog.records)
    names = {str(e.get("event")) for e in events}
    assert "pipeline_start" in names
    assert "pipeline_stage_complete" in names
    assert "pipeline_complete" in names
    for payload in events:
        assert payload.get("component") == "runner"
        assert payload.get("run_id") == "log-run-1"
        blob = json.dumps(payload)
        assert "log-test-salt" not in blob
        assert "salt" not in blob.lower() or "<redacted>" in blob


def test_colab_smoke_emits_start_and_complete(
    tmp_path: Path, caplog: pytest.LogCaptureFixture
) -> None:
    caplog.set_level(logging.INFO, logger="ambient.pipeline")
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    (contracts / "manufacturing-demo-raw-v1.yaml").write_text(
        "product:\n  name: Log smoke\n  version: 1\n"
        "schema:\n  tables: []\n",
        encoding="utf-8",
    )
    (tmp_path / "data" / "raw").mkdir(parents=True)
    (tmp_path / "data" / "processed").mkdir(parents=True)

    run_colab_smoke(tmp_path, org_id="org-smoke", run_id="smoke-log-run")

    events = _parse_log_records(caplog.records)
    assert any(e.get("event") == "pipeline_start" for e in events)
    assert any(e.get("event") == "pipeline_complete" for e in events)
    assert all(e.get("component") == "colab_smoke" for e in events)
