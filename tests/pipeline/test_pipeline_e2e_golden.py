"""Integration test: bronze → silver → gold against checked-in golden JSON."""

from __future__ import annotations

import json
from pathlib import Path

import pytest
from pyspark.sql import DataFrame, SparkSession

import sys

from ambient_pipeline.pii import PiiPseudonymizer
from ambient_pipeline.runner import PipelineRunConfig, run_local_pipeline

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
import pipeline_golden_util as pg

FIXTURE_CSV = ROOT / "tests" / "fixtures" / "pipeline" / "bronze_real_estate_mini.csv"
GOLDEN_PATH = ROOT / "tests" / "fixtures" / "golden" / "pipeline_spark_e2e.json"
GOLDEN_PII_PATH = ROOT / "tests" / "fixtures" / "golden" / "pipeline_spark_e2e_pii.json"
SALT_FIXTURE = ROOT / "tests" / "fixtures" / "pipeline" / "golden_pii_salt.env"

FIXED_RUN_ID = "golden-pipeline-run"
FIXED_ORG = "org-golden"
FIXED_TRANSFORM_TS = "2026-01-15T12:00:00+00:00"
FIXED_INGESTION_TS = "2026-01-15T11:00:00+00:00"

RAW_DISPLAY_NAMES = pg.bronze_display_names(FIXTURE_CSV)


def _pipeline_config(tmp_path: Path) -> PipelineRunConfig:
    return PipelineRunConfig(
        base_dir=tmp_path / "lake",
        org_id=FIXED_ORG,
        run_id=FIXED_RUN_ID,
        optimize=True,
        volume_gb=0.01,
        transform_ts=FIXED_TRANSFORM_TS,
        ingestion_ts=FIXED_INGESTION_TS,
    )


def test_spark_pipeline_matches_golden_file(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", pg.load_fixture_env(SALT_FIXTURE)["AMBIENT_PII_SALT"])

    def _skip_pii_apply(
        self: PiiPseudonymizer,
        df: DataFrame,
        sensitive_field_names: list[str] | None = None,
    ) -> DataFrame:
        return df

    monkeypatch.setattr(PiiPseudonymizer, "apply", _skip_pii_apply)
    assert GOLDEN_PATH.is_file(), "run scripts/refresh_pipeline_golden.py to create golden file"

    cfg = _pipeline_config(tmp_path)
    result = run_local_pipeline(spark, str(FIXTURE_CSV), cfg)
    actual = pg.pipeline_snapshot(spark, result, cfg.base_dir / "gold" / "org_kpis")
    expected = pg.load_golden(GOLDEN_PATH)
    assert json.dumps(actual, sort_keys=True) == json.dumps(expected, sort_keys=True)


def test_spark_pipeline_matches_golden_with_real_pii(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    for key, value in pg.load_fixture_env(SALT_FIXTURE).items():
        monkeypatch.setenv(key, value)
    assert GOLDEN_PII_PATH.is_file(), (
        "run scripts/refresh_pipeline_golden.py to create PII golden file"
    )

    cfg = _pipeline_config(tmp_path)
    result = run_local_pipeline(spark, str(FIXTURE_CSV), cfg)
    actual = pg.pipeline_snapshot(spark, result, cfg.base_dir / "gold" / "org_kpis")
    expected = pg.load_golden(GOLDEN_PII_PATH)
    assert json.dumps(actual, sort_keys=True) == json.dumps(expected, sort_keys=True)

    silver_df = spark.read.format("delta").load(str(cfg.base_dir / "silver" / "metrics"))
    gold_df = spark.read.format("delta").load(
        str(cfg.base_dir / "gold" / "org_kpis" / "real_estate")
    )
    pg.assert_stage_outputs_pseudonymized(silver_df, "silver")
    pg.assert_stage_outputs_pseudonymized(gold_df, "gold/real_estate")
    pg.assert_no_forbidden_literals(silver_df, RAW_DISPLAY_NAMES)
    pg.assert_no_forbidden_literals(gold_df, RAW_DISPLAY_NAMES)


def test_spark_pipeline_persists_only_pseudonymized_pii_after_silver(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Silver and Gold Delta tables must not retain raw PII indicator columns."""
    for key, value in pg.load_fixture_env(SALT_FIXTURE).items():
        monkeypatch.setenv(key, value)

    cfg = _pipeline_config(tmp_path)
    run_local_pipeline(spark, str(FIXTURE_CSV), cfg)

    silver_df = spark.read.format("delta").load(str(cfg.base_dir / "silver" / "metrics"))
    gold_df = spark.read.format("delta").load(
        str(cfg.base_dir / "gold" / "org_kpis" / "real_estate")
    )
    pg.assert_stage_outputs_pseudonymized(silver_df, "silver")
    pg.assert_stage_outputs_pseudonymized(gold_df, "gold/real_estate")
