"""Tests for Silver validation."""

from __future__ import annotations

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.validation import SilverValidator


def test_completeness_threshold_enforced(spark: SparkSession) -> None:
    df = spark.createDataFrame(
        [
            ("m1", 1.0),
            ("m2", None),
            ("m3", None),
            ("m4", None),
            ("m5", None),
        ],
        ["metric_id", "value"],
    )
    validator = SilverValidator(completeness_threshold=0.95)
    with pytest.raises(RuntimeError, match="below threshold"):
        validator.assert_completeness(df)


def test_completeness_ratio_empty_dataframe(spark: SparkSession) -> None:
    df = spark.createDataFrame([], "value: double")
    validator = SilverValidator()
    assert validator.completeness_ratio(df) == 0.0


def test_completeness_passes_at_threshold(spark: SparkSession) -> None:
    rows = [(f"m{i}", float(i)) for i in range(20)]
    df = spark.createDataFrame(rows, ["metric_id", "value"])
    validator = SilverValidator(completeness_threshold=0.95)
    ratio = validator.assert_completeness(df, org_label="org-1")
    assert ratio >= 0.95
