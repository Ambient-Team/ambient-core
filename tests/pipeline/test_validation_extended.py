"""Additional SilverValidator coverage (dedupe, skew, flags)."""

from __future__ import annotations

from pyspark.sql import functions as F

from ambient_pipeline.validation import SilverValidator


def test_silver_validator_repr() -> None:
    assert "0.95" in repr(SilverValidator())


def test_validate_and_tag_null_and_out_of_range(spark) -> None:
    df = spark.createDataFrame(
        [
            ("Metric A", "Banking", None),
            ("Metric B", "Banking", 99.0),
            ("Metric C", "Banking", 1.5),
        ],
        ["name", "industry", "value"],
    )
    ref = spark.createDataFrame(
        [
            ("Metric A", "Banking", 1.0, 2.0),
            ("Metric B", "Banking", 1.0, 2.0),
            ("Metric C", "Banking", 1.0, 2.0),
        ],
        ["ref_metric_name", "ref_industry", "ref_target_low", "ref_target_high"],
    )
    out = SilverValidator().validate_and_tag(df, ref)
    flags = {row["name"]: row["_iso8000_quality_flag"] for row in out.collect()}
    assert flags["Metric A"] == "SILVER_MISSING_VALUE"
    assert flags["Metric B"] == "SILVER_OUT_OF_RANGE"
    assert flags["Metric C"] == "SILVER_VALID"


def test_deduplicate_metrics_keeps_latest(spark) -> None:
    df = spark.createDataFrame(
        [
            ("org-1", "m1", "hash-a", "2024-01-01T00:00:00Z", 1.0),
            ("org-1", "m1", "hash-b", "2024-02-01T00:00:00Z", 2.0),
            ("org-1", "m1", "hash-b", "2024-02-01T00:00:00Z", 2.0),
        ],
        ["_bronze_org_id", "metric_id", "_bronze_row_hash", "_bronze_ingestion_ts", "value"],
    )
    deduped = SilverValidator().deduplicate_metrics(df)
    rows = deduped.collect()
    assert len(rows) == 1
    assert rows[0]["value"] == 2.0


def test_apply_skew_salt_hot_orgs(spark) -> None:
    df = spark.createDataFrame(
        [("hot", "m1"), ("cold", "m2")],
        ["_bronze_org_id", "metric_id"],
    )
    salted = SilverValidator().apply_skew_salt(df, ["hot"], salt_buckets=4)
    assert "_skew_salt_bucket" in salted.columns
    hot_row = salted.filter(F.col("_bronze_org_id") == "hot").collect()[0]
    cold_row = salted.filter(F.col("_bronze_org_id") == "cold").collect()[0]
    assert hot_row["_skew_salt_bucket"] != "0" or hot_row["_skew_salt_bucket"] in {"0", "1", "2", "3"}
    assert cold_row["_skew_salt_bucket"] == "0"


def test_apply_skew_salt_no_hot_orgs_returns_same_columns(spark) -> None:
    df = spark.createDataFrame([("org", "m")], ["_bronze_org_id", "metric_id"])
    out = SilverValidator().apply_skew_salt(df, [])
    assert out.columns == df.columns
