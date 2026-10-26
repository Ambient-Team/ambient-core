"""Guard tests: persisted Silver/Gold must not contain unhashed PII columns."""

from __future__ import annotations

from pathlib import Path

import pytest
from pyspark.sql import SparkSession

import sys

from ambient_pipeline.runner import PipelineRunConfig, run_local_pipeline

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
import pipeline_golden_util as pg

FIXTURE_CSV = ROOT / "tests" / "fixtures" / "pipeline" / "bronze_real_estate_mini.csv"
SALT_FIXTURE = ROOT / "tests" / "fixtures" / "pipeline" / "golden_pii_salt.env"


def test_silver_and_gold_delta_tables_have_no_unhashed_pii_columns(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    for key, value in pg.load_fixture_env(SALT_FIXTURE).items():
        monkeypatch.setenv(key, value)

    cfg = PipelineRunConfig(
        base_dir=tmp_path / "lake",
        org_id="org-pii-guard",
        run_id="pii-guard-run",
        optimize=True,
        volume_gb=0.01,
        transform_ts="2026-01-15T12:00:00+00:00",
        ingestion_ts="2026-01-15T11:00:00+00:00",
    )
    run_local_pipeline(spark, str(FIXTURE_CSV), cfg)

    silver_df = spark.read.format("delta").load(str(cfg.base_dir / "silver" / "metrics"))
    gold_df = spark.read.format("delta").load(
        str(cfg.base_dir / "gold" / "org_kpis" / "real_estate")
    )
    pg.assert_stage_outputs_pseudonymized(silver_df, "silver")
    pg.assert_stage_outputs_pseudonymized(gold_df, "gold/real_estate")
    pg.assert_no_forbidden_literals(silver_df, pg.bronze_display_names(FIXTURE_CSV))
    pg.assert_no_forbidden_literals(gold_df, pg.bronze_display_names(FIXTURE_CSV))
