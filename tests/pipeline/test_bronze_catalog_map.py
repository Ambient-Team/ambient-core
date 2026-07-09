"""Bronze catalog mapping helpers."""

from __future__ import annotations

import pytest

from ambient_pipeline.bronze_catalog_map import (
    mapping_json_hash,
    parse_mapping_json,
    parse_source_id_from_gcs_path,
    stable_metric_id,
)
from ambient_pipeline.bronze_upload_validation import validate_csv_headers_against_mapping
from ambient_pipeline.catalog_field_rules import coerce_numeric_string, parse_float_from_cell


def test_parse_source_id_from_gcs_path() -> None:
    path = "gs://bucket/bronze/org-1/my_source/123_file.csv"
    assert parse_source_id_from_gcs_path(path, "org-1") == "my_source"


def test_parse_mapping_json_from_dict() -> None:
    assert parse_mapping_json({"a": "A"}) == {"a": "A"}


def test_stable_metric_id_deterministic() -> None:
    a = stable_metric_id("org", "key", "field", "2024-01-01")
    b = stable_metric_id("org", "key", "field", "2024-01-01")
    assert a == b
    assert len(a) == 32


def test_mapping_json_hash_stable() -> None:
    mapping = {"date": "Date", "admissions": "Admissions"}
    assert mapping_json_hash(mapping) == mapping_json_hash(dict(mapping))


def test_validate_csv_headers_against_mapping() -> None:
    ok, reason = validate_csv_headers_against_mapping(
        ["Date", "Admissions"],
        {"date": "Date", "admissions": "Admissions"},
    )
    assert ok is True
    assert reason is None

    bad, bad_reason = validate_csv_headers_against_mapping(
        ["Date"],
        {"date": "Date", "admissions": "Admissions"},
    )
    assert bad is False
    assert "Admissions" in (bad_reason or "")


def test_parse_mapping_json_rejects_non_object() -> None:
    with pytest.raises(ValueError):
        parse_mapping_json("[1,2]")


def test_coerce_numeric_string_and_parse_float() -> None:
    assert coerce_numeric_string("$1,234.50") == "1234.50"
    assert coerce_numeric_string("(500.00)") == "-500.00"
    assert parse_float_from_cell("$1,234.50") == 1234.5
    assert parse_float_from_cell("(500.00)") == -500.0
    assert parse_float_from_cell("") is None
    assert parse_float_from_cell("not-a-number") is None


def test_coerce_mapped_columns_uses_manifest_types(spark) -> None:
    from ambient_pipeline.bronze_catalog_map import apply_column_mapping, coerce_mapped_columns

    rows = [("2024-03-15", "42", "Active")]
    df = spark.createDataFrame(rows, ["Date", "Headcount", "Status"])
    mapped = apply_column_mapping(df, {"date": "Date", "headcount": "Headcount", "status": "Status"})
    coerced = coerce_mapped_columns(
        mapped,
        ["date", "headcount", "status"],
        catalog_field_types={"headcount": "integer", "status": "string", "date": "date"},
    )
    row = coerced.collect()[0]
    assert str(row["date"]) == "2024-03-15"
    assert row["headcount"] == 42.0
    assert row["status"] == "Active"


def test_coerce_mapped_columns_dates_and_currency(spark) -> None:
    from ambient_pipeline.bronze_catalog_map import apply_column_mapping, coerce_mapped_columns

    rows = [("2024-03-15", "$1,234.50", "(99.5)", "Active")]
    df = spark.createDataFrame(rows, ["Date", "Revenue", "Cost", "Status"])
    mapped = apply_column_mapping(df, {"date": "Date", "revenue": "Revenue", "cost": "Cost", "status": "Status"})
    coerced = coerce_mapped_columns(mapped, ["date", "revenue", "cost", "status"])
    row = coerced.collect()[0]
    assert str(row["date"]) == "2024-03-15"
    assert row["revenue"] == 1234.5
    assert row["cost"] == -99.5
    assert row["status"] == "Active"
