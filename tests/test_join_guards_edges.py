"""Edge cases for join_guards helpers."""

from __future__ import annotations

from pyspark.sql import SparkSession

from ambient_pipeline.join_guards import assert_unique_keys


def test_assert_unique_keys_noop_on_empty_frame(spark: SparkSession) -> None:
    empty = spark.createDataFrame([], "key string")
    assert_unique_keys(empty, "key", "empty_left")
