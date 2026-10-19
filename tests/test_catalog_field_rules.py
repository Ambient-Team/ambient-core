"""Unit tests for catalog field typing helpers."""

from __future__ import annotations

import re

from ambient_pipeline.catalog_field_rules import (
    FIELD_COVERAGE_ENUMERATED,
    FIELD_COVERAGE_UPLOAD,
    coerce_numeric_string,
    field_entry_name,
    field_type_map,
    infer_catalog_field_type,
    infer_field_coverage,
    infer_field_type,
    infer_grain_for_frequency,
    input_excluded_from_field_list,
    is_value_field_for_unpivot,
    is_value_field_for_unpivot_field,
    normalize_field_entries,
    normalize_field_entry,
    parse_float_from_cell,
    spark_coerce_kind,
    strictest_linked_metric_frequency,
)


def test_infer_field_coverage_explicit_and_heuristics() -> None:
    assert infer_field_coverage({"fieldCoverage": "upload"}) == FIELD_COVERAGE_UPLOAD
    assert infer_field_coverage({"fieldCoverage": "enumerated"}) == FIELD_COVERAGE_ENUMERATED
    assert (
        infer_field_coverage({"template": "Financial Statement Template"})
        == FIELD_COVERAGE_UPLOAD
    )
    assert (
        infer_field_coverage({"template": "Transactional Data Template"})
        == FIELD_COVERAGE_ENUMERATED
    )
    assert infer_field_coverage(
        {"format": "Software", "fields": ["revenue"]},
        catalog_option_key="x",
    ) == FIELD_COVERAGE_ENUMERATED
    assert infer_field_coverage(
        {"segment": "ops", "fields": ["a"]},
        catalog_option_key="k",
    ) == FIELD_COVERAGE_ENUMERATED
    assert infer_field_coverage(
        {},
        catalog_option_key="HcProvider.foo",
    ) == FIELD_COVERAGE_ENUMERATED
    assert infer_field_coverage(
        {},
        catalog_option_key="retail.operations.sales",
    ) == FIELD_COVERAGE_ENUMERATED
    assert infer_field_coverage(
        {"template": "Document", "format": "Document"},
    ) == FIELD_COVERAGE_UPLOAD
    assert infer_field_coverage({}) == FIELD_COVERAGE_UPLOAD


def test_infer_grain_for_frequency() -> None:
    assert infer_grain_for_frequency("daily") == "day"
    assert infer_grain_for_frequency("weekly") == "week"
    assert infer_grain_for_frequency("quarterly") == "quarter"
    assert infer_grain_for_frequency("annual") == "quarter"
    assert infer_grain_for_frequency("") == "month"


def test_strictest_linked_metric_frequency() -> None:
    option = {"metricIds": [1, 2]}
    metrics = {
        1: {"frequency": "monthly"},
        2: {"frequency": "daily"},
        99: {"frequency": "weekly"},
    }
    assert strictest_linked_metric_frequency(option, metrics) == "daily"
    assert strictest_linked_metric_frequency({"metricIds": []}, metrics) == "monthly"
    assert strictest_linked_metric_frequency(
        {"metricIds": [3]},
        {3: {"frequency": "not-a-real-frequency"}},
    ) == "monthly"
    assert strictest_linked_metric_frequency({"metricIds": [9]}, {}) == "monthly"


def test_type_inference_and_normalization() -> None:
    assert infer_catalog_field_type("transaction_date") == "date"
    assert infer_catalog_field_type("property_id") == "id"
    assert infer_catalog_field_type("loan_status") == "enum"
    assert infer_catalog_field_type("total_revenue_usd") == "currency"
    assert infer_catalog_field_type("bed_count") in ("integer", "decimal")
    assert infer_field_type("margin_pct") == "number"
    assert spark_coerce_kind("integer") == "number"
    assert spark_coerce_kind("string") == "string"

    row = normalize_field_entry({"name": "x", "type": "not-a-type", "nullable": False})
    assert row["type"] in ("string", "id", "enum", "decimal", "integer", "date")
    assert row["nullable"] is False
    assert normalize_field_entry("plain")["name"] == "plain"
    assert field_entry_name({"name": " a "}) == "a"
    entries = normalize_field_entries([{"name": "a", "unit": "USD"}, "b"])
    assert len(entries) == 2
    assert "a" in field_type_map(entries)
    rich = normalize_field_entry(
        {
            "name": "posted_date",
            "type": "date",
            "format": "ISO-8601",
            "unit": "days",
            "description": "Posting date",
        }
    )
    assert rich["format"] == "ISO-8601"
    assert rich["unit"] == "days"


def test_input_excluded_and_unpivot() -> None:
    exact = {"ignore_me"}
    patterns = [re.compile(r"^secret_")]
    assert input_excluded_from_field_list("ignore_me", exact, patterns)
    assert input_excluded_from_field_list("secret_token", exact, patterns)
    assert not input_excluded_from_field_list("visible", exact, patterns)
    assert is_value_field_for_unpivot("total_amount")
    assert not is_value_field_for_unpivot("loan_status")
    assert is_value_field_for_unpivot_field({"name": "revenue", "type": "decimal"})


def test_coerce_numeric_string_and_parse() -> None:
    assert coerce_numeric_string("$1,234.50") == "1234.50"
    assert coerce_numeric_string("(100)") == "-100"
    assert parse_float_from_cell("$2.5") == 2.5
    assert parse_float_from_cell("n/a") is None
    assert parse_float_from_cell("") is None
