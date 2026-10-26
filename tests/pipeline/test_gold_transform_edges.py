"""Table-driven and property-style edge tests for Silver → Gold transform helpers."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, cast

import pytest
from hypothesis import given, settings
from hypothesis import strategies as st
from pyspark.sql import SparkSession
from pyspark.sql.types import DoubleType, StringType, StructField, StructType

from ambient_pipeline.runner import REAL_ESTATE_GOLD_PIVOT, _sanitize_pivoted_columns
from ambient_pipeline.validation import SilverValidator


def _silver_schema() -> StructType:
    return StructType(
        [
            StructField("name", StringType(), True),
            StructField("industry", StringType(), True),
            StructField("value", DoubleType(), True),
        ]
    )


def _ref_schema() -> StructType:
    return StructType(
        [
            StructField("ref_metric_name", StringType(), True),
            StructField("ref_industry", StringType(), True),
            StructField("ref_target_low", DoubleType(), True),
            StructField("ref_target_high", DoubleType(), True),
        ]
    )


@pytest.mark.parametrize(
    ("rows", "expected_ratio", "expected_flag"),
    [
        ([], 0.0, None),
        ([("m", "Healthcare", None)], 0.0, "SILVER_MISSING_VALUE"),
        ([("m", "Healthcare", 1.0)], 1.0, "SILVER_VALID"),
        ([("a", "Healthcare", 1.0), ("b", "Healthcare", None)], 0.5, "SILVER_VALID"),
    ],
    ids=["empty_frame", "all_null_value", "single_valid", "half_null"],
)
def test_silver_validator_table_driven_nulls_and_empty(
    spark: SparkSession,
    rows: list[tuple[str, str, float | None]],
    expected_ratio: float,
    expected_flag: str | None,
) -> None:
    validator = SilverValidator()
    df = spark.createDataFrame(rows, schema=_silver_schema())
    assert validator.completeness_ratio(df) == expected_ratio
    if not rows:
        return
    ref = spark.createDataFrame(
        [("m", "Healthcare", 0.0, 2.0)],
        schema=_ref_schema(),
    )
    tagged = validator.validate_and_tag(df, ref)
    flags = {row["_iso8000_quality_flag"] for row in tagged.collect()}
    if expected_flag:
        assert expected_flag in flags


@pytest.mark.parametrize(
    "transform_ts",
    [
        "2024-03-10T23:59:59Z",
        "2024-03-10T23:59:59+00:00",
        "2024-03-10T18:59:59-05:00",
        datetime(2024, 3, 11, 4, 59, 59, tzinfo=timezone.utc).isoformat(),
    ],
)
def test_silver_provenance_preserves_timezone_boundary_strings(
    spark: SparkSession, transform_ts: str
) -> None:
    df = spark.createDataFrame([("m", 1.0)], ["name", "value"])
    out = SilverValidator().add_silver_provenance(df, "run-tz", transform_ts)
    row = out.collect()[0]
    assert row["_silver_transform_ts"] == transform_ts


def test_deduplicate_metrics_keeps_latest_ingestion_ts(spark: SparkSession) -> None:
    schema = StructType(
        [
            StructField("_bronze_org_id", StringType(), False),
            StructField("metric_id", StringType(), False),
            StructField("value", DoubleType(), True),
            StructField("_bronze_row_hash", StringType(), False),
            StructField("_bronze_ingestion_ts", StringType(), False),
        ]
    )
    rows = [
        ("org-1", "m1", 1.0, "hash-a", "2024-01-01T00:00:00Z"),
        ("org-1", "m1", 9.0, "hash-b", "2024-06-01T00:00:00Z"),
    ]
    df = spark.createDataFrame(rows, schema=schema)
    deduped = SilverValidator().deduplicate_metrics(df)
    values = [row["value"] for row in deduped.collect()]
    assert values == [9.0]


@pytest.mark.parametrize(
    ("columns", "mapping", "expected"),
    [
        (["`Net Operating Income`"], REAL_ESTATE_GOLD_PIVOT, {"noi"}),
        (["Net Operating Income"], REAL_ESTATE_GOLD_PIVOT, {"noi"}),
        (["_bronze_org_id", "noi"], REAL_ESTATE_GOLD_PIVOT, {"_bronze_org_id", "noi"}),
    ],
)
def test_sanitize_pivoted_columns_table(
    spark: SparkSession,
    columns: list[str],
    mapping: tuple[tuple[str, str], ...],
    expected: set[str],
) -> None:
    row: list[Any] = [1.0] * len(columns)
    df = spark.createDataFrame([tuple(row)], columns)
    out = _sanitize_pivoted_columns(df, mapping)
    assert expected.issubset(set(out.columns))


def test_real_estate_gold_pivot_empty_industry_filter(spark: SparkSession) -> None:
    """Gold pivot path on empty Real Estate slice yields zero rows, not an error."""
    from pyspark.sql import functions as F

    schema = StructType(
        [
            StructField("_bronze_org_id", StringType(), False),
            StructField("industry", StringType(), True),
            StructField("name", StringType(), True),
            StructField("value", DoubleType(), True),
        ]
    )
    df = spark.createDataFrame(
        [("org-1", "Healthcare", "Other Metric", 1.0)],
        schema=schema,
    )
    pivot_metrics = [name for name, _safe in REAL_ESTATE_GOLD_PIVOT]
    re_df = df.filter(F.col("industry") == "Real Estate")
    wide = (
        re_df.groupBy("_bronze_org_id")
        .pivot("name", cast(list[bool | float | int | str], pivot_metrics))
        .agg(F.first("value"))
    )
    assert wide.count() == 0


@given(
    st.one_of(st.none(), st.floats(allow_nan=False, allow_infinity=False)),
    st.floats(allow_nan=False, allow_infinity=False),
)
@settings(max_examples=25, deadline=None)
def test_completeness_ratio_bounds(
    spark: SparkSession, maybe_null: float | None, other: float
) -> None:
    validator = SilverValidator()
    empty = spark.createDataFrame([], schema=_silver_schema())
    assert validator.completeness_ratio(empty) == 0.0
    rows = [("a", "Healthcare", maybe_null), ("b", "Healthcare", other)]
    df = spark.createDataFrame(rows, schema=_silver_schema())
    ratio = validator.completeness_ratio(df)
    assert 0.0 <= ratio <= 1.0
