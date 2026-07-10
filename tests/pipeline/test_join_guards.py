"""Tests for left-join enrichment guards."""

import pytest

from ambient_pipeline.join_guards import (
    assert_left_join_preserves_row_count,
    assert_unique_keys,
    log_left_join_audit,
)


def test_left_join_one_to_one_preserves_count(spark):
    left = spark.createDataFrame(
        [("o1", "p1", "gold"), ("o2", "p1", "silver")],
        ["_bronze_org_id", "pipeline_name", "stage"],
    )
    right = spark.createDataFrame(
        [("o1", "p1", "gold", "2026-01-01"), ("o2", "p1", "silver", "2026-01-02")],
        ["_bronze_org_id", "pipeline_name", "stage", "last_success_ts"],
    )
    keys = ["_bronze_org_id", "pipeline_name", "stage"]
    joined = left.join(right, keys, "left")
    assert_left_join_preserves_row_count(left, joined, "health_enrichment")


def test_left_join_duplicate_right_raises(spark):
    left = spark.createDataFrame([("o1", "p1", "gold")], ["_bronze_org_id", "pipeline_name", "stage"])
    right = spark.createDataFrame(
        [
            ("o1", "p1", "gold", "ts1"),
            ("o1", "p1", "gold", "ts2"),
        ],
        ["_bronze_org_id", "pipeline_name", "stage", "last_success_ts"],
    )
    keys = ["_bronze_org_id", "pipeline_name", "stage"]
    joined = left.join(right, keys, "left")
    with pytest.raises(RuntimeError, match="row count grew"):
        assert_left_join_preserves_row_count(left, joined, "duplicate_right")


def test_assert_unique_keys_catches_duplicates(spark):
    df = spark.createDataFrame(
        [("a", 1), ("a", 2)],
        ["key", "value"],
    )
    with pytest.raises(RuntimeError, match="unique keys"):
        assert_unique_keys(df, ["key"], "right_agg")


def test_log_left_join_audit_warns_on_inflation(spark, capsys):
    left = spark.createDataFrame([("x",)], ["id"])
    right = spark.createDataFrame([("x",), ("x",)], ["id"])
    joined = left.join(right, "id", "left")
    log_left_join_audit(left, right, joined, "id", "perf_join")
    out = capsys.readouterr().out
    assert "delta=1" in out
    assert "WARN" in out
