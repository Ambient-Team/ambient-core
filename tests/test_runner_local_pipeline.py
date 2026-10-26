"""Focused Spark tests for ambient_pipeline.runner (tmp-path CSV, no repo demo files)."""

from __future__ import annotations

from pathlib import Path
from typing import Any, cast
from unittest.mock import MagicMock

import pytest
from pyspark.sql import DataFrame, SparkSession

from ambient_pipeline.runner import (
    REAL_ESTATE_GOLD_PIVOT,
    PipelineRunConfig,
    _ref_schema,
    _sanitize_pivoted_columns,
    run_local_pipeline,
    run_pipeline_from_config,
)
from ambient_pipeline.validation import SilverValidator


def test_sanitize_pivoted_columns_renames_spark_backtick_names(spark: SparkSession) -> None:
    df = spark.createDataFrame([(100.0,)], ["`Net Operating Income`"])
    out = _sanitize_pivoted_columns(df, REAL_ESTATE_GOLD_PIVOT)
    assert "noi" in out.columns
    assert "`Net Operating Income`" not in out.columns


def test_ref_schema_has_expected_fields() -> None:
    names = {f.name for f in _ref_schema().fields}
    assert names == {
        "ref_metric_name",
        "ref_industry",
        "ref_target_low",
        "ref_target_high",
        "ref_unit",
    }


def _write_real_estate_csv(path: Path) -> str:
    path.write_text(
        "metric_id,name,industry,value\n"
        "re-noi,Net Operating Income,Real Estate,120000.0\n"
        "re-ads,Annual Debt Service,Real Estate,80000.0\n"
        "re-mv,Market Value,Real Estate,1000000.0\n",
        encoding="utf-8",
    )
    return str(path)


def test_run_local_pipeline_real_estate_gold(
    spark: SparkSession,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "unit-test-salt")

    csv_glob = _write_real_estate_csv(tmp_path / "bronze.csv")
    cfg = PipelineRunConfig(
        base_dir=tmp_path / "lake",
        org_id="org-re",
        run_id="run-re",
        optimize=True,
        volume_gb=0.01,
    )
    out = run_local_pipeline(spark, csv_glob, cfg)
    assert out["run_id"] == "run-re"
    assert set(out["stages"]) == {"bronze", "silver", "gold"}
    assert out["stages"]["gold"]["output_rows"] >= 1
    gold_dir = tmp_path / "lake" / "gold" / "org_kpis" / "real_estate"
    assert gold_dir.is_dir()
    gold_cols = set(spark.read.format("delta").load(str(gold_dir)).columns)
    safe_names = {safe for _display, safe in REAL_ESTATE_GOLD_PIVOT}
    assert safe_names.issubset(gold_cols)
    assert "kpi_dscr" in gold_cols
    assert not any(" " in name for name in gold_cols)


def test_run_local_pipeline_summary_gold_without_name_industry(
    spark: SparkSession, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "unit-test-salt")

    original_validate = SilverValidator.__dict__["validate_and_tag"]

    def drop_name_industry(
        self: SilverValidator, df: DataFrame, ref_df: DataFrame
    ) -> DataFrame:
        tagged = original_validate(self, df, ref_df)
        return cast(DataFrame, tagged.drop("name", "industry"))

    monkeypatch.setattr(SilverValidator, "validate_and_tag", drop_name_industry)

    metrics = tmp_path / "metrics.csv"
    metrics.write_text(
        "metric_id,name,industry,value\n"
        "m-1,Placeholder,Healthcare,10.0\n"
        "m-2,Other,Healthcare,20.0\n",
        encoding="utf-8",
    )
    csv_glob = str(metrics)
    cfg = PipelineRunConfig(
        base_dir=tmp_path / "lake2",
        run_id="run-mfg",
        optimize=True,
        hot_org_ids=["org-hot"],
        apply_skew_salt=True,
    )
    out = run_local_pipeline(spark, csv_glob, cfg)
    assert out["stages"]["gold"]["output_rows"] >= 1
    assert (tmp_path / "lake2" / "gold" / "org_kpis" / "summary").is_dir()


def test_run_pipeline_from_config_owns_spark(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    class FakeSpark:
        def stop(self) -> None:
            captured["stopped"] = True

    def fake_create_local_spark(**_kwargs: object) -> FakeSpark:
        captured["created"] = True
        return FakeSpark()

    def fake_run_local_pipeline(
        spark: object,
        bronze_csv_glob: str,
        config: PipelineRunConfig,
    ) -> dict[str, Any]:
        captured["spark"] = spark
        captured["glob"] = bronze_csv_glob
        captured["config"] = config
        return {"stages": {}, "run_id": config.run_id, "total_wall_seconds": 0.0}

    monkeypatch.setattr("ambient_pipeline.runner.create_local_spark", fake_create_local_spark)
    monkeypatch.setattr("ambient_pipeline.runner.run_local_pipeline", fake_run_local_pipeline)

    cfg = PipelineRunConfig(base_dir=tmp_path, run_id="owned")
    result = run_pipeline_from_config(str(tmp_path / "*.csv"), cfg)
    assert result["run_id"] == "owned"
    assert captured.get("stopped") is True
    assert captured.get("created") is True


def test_run_pipeline_from_config_reuses_supplied_spark(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    ext = MagicMock(name="external-spark")

    def fake_run_local_pipeline(
        spark: SparkSession,
        _glob: str,
        config: PipelineRunConfig,
    ) -> dict[str, Any]:
        assert spark is ext
        return {"stages": {}, "run_id": config.run_id, "total_wall_seconds": 0.0}

    monkeypatch.setattr("ambient_pipeline.runner.run_local_pipeline", fake_run_local_pipeline)
    cfg = PipelineRunConfig(base_dir=tmp_path, run_id="external")
    run_pipeline_from_config("*.csv", cfg, spark=ext)
    ext.stop.assert_not_called()
