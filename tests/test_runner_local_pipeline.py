"""Focused Spark tests for ambient_pipeline.runner (tmp-path CSV, no repo demo files)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest

from pyspark.sql.readwriter import DataFrameWriter

from ambient_pipeline.runner import (
    PipelineRunConfig,
    _ref_schema,
    run_local_pipeline,
    run_pipeline_from_config,
)
from ambient_pipeline.validation import SilverValidator


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


def _write_metric_id_csv(path: Path) -> str:
    path.write_text(
        "metric_id,value\n"
        "m-1,10.0\n"
        "m-2,20.0\n",
        encoding="utf-8",
    )
    return str(path)


def test_run_local_pipeline_real_estate_gold(
    spark,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "unit-test-salt")

    original_save = DataFrameWriter.save
    writing_stub = [False]

    def save(self, path=None, format=None, mode=None, partitionBy=None, **options):  # type: ignore[no-untyped-def]
        if path and "real_estate" in str(path) and not writing_stub[0]:
            writing_stub[0] = True
            try:
                stub = (
                    spark.createDataFrame([("org-re", 1)], ["_bronze_org_id", "kpi_rows"])
                    .write.format("delta")
                    .mode("overwrite")
                )
                original_save(stub, path)
            finally:
                writing_stub[0] = False
            return None
        return original_save(self, path, format=format, mode=mode, partitionBy=partitionBy, **options)

    monkeypatch.setattr(DataFrameWriter, "save", save)

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


def test_run_local_pipeline_summary_gold_without_name_industry(
    spark, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "unit-test-salt")

    original_validate = SilverValidator.__dict__["validate_and_tag"]

    def drop_name_industry(self, df, ref_df):  # type: ignore[no-untyped-def]
        tagged = original_validate(self, df, ref_df)
        return tagged.drop("name", "industry")

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

    def fake_create_local_spark(**_kwargs):
        captured["created"] = True
        return FakeSpark()

    def fake_run_local_pipeline(spark, bronze_csv_glob, config):
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

    def fake_run_local_pipeline(spark, _glob, config):
        assert spark is ext
        return {"stages": {}, "run_id": config.run_id, "total_wall_seconds": 0.0}

    monkeypatch.setattr("ambient_pipeline.runner.run_local_pipeline", fake_run_local_pipeline)
    cfg = PipelineRunConfig(base_dir=tmp_path, run_id="external")
    run_pipeline_from_config("*.csv", cfg, spark=ext)
    ext.stop.assert_not_called()
