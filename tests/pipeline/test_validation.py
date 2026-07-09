"""Tests for Silver validation."""

import pytest

from ambient_pipeline.validation import SilverValidator


def test_completeness_threshold_enforced(spark):
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


def test_completeness_passes_at_threshold(spark):
    rows = [(f"m{i}", float(i)) for i in range(20)]
    df = spark.createDataFrame(rows, ["metric_id", "value"])
    validator = SilverValidator(completeness_threshold=0.95)
    ratio = validator.assert_completeness(df)
    assert ratio >= 0.95
