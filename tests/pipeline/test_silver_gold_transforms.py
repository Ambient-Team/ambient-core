"""Bronze → Silver → Gold transform coverage where local Spark is available."""

from __future__ import annotations

from ambient_pipeline.provenance import BronzeProvenanceStamper
from ambient_pipeline.validation import SilverValidator


def test_bronze_provenance_stamper_adds_columns(spark) -> None:
    df = spark.createDataFrame([("m1", 1.0)], ["metric_id", "value"])
    stamper = BronzeProvenanceStamper(
        org_id="org-1",
        run_id="run-1",
        source_type="csv_upload",
    )
    out = stamper.stamp(df)
    cols = set(out.columns)
    assert "_bronze_org_id" in cols
    assert "_bronze_run_id" in cols


def test_silver_validator_validate_and_tag(spark) -> None:
    df = spark.createDataFrame([("Debt Service Coverage Ratio", "Real Estate", 1.5)], ["name", "industry", "value"])
    ref = spark.createDataFrame(
        [("Debt Service Coverage Ratio", "Real Estate", 1.0, 2.0)],
        ["ref_metric_name", "ref_industry", "ref_target_low", "ref_target_high"],
    )
    validator = SilverValidator()
    tagged = validator.validate_and_tag(df, ref)
    assert "_iso8000_quality_flag" in tagged.columns


def test_silver_validator_completeness_and_provenance(spark) -> None:
    df = spark.createDataFrame([("m1", 1.0), ("m2", None)], ["name", "value"])
    validator = SilverValidator()
    assert validator.completeness_ratio(df) == 0.5
    tagged = validator.add_silver_provenance(df, "run-1", "2026-01-01T00:00:00Z")
    assert "_silver_run_id" in tagged.columns
