"""Tests for bronze CSV header validation against catalog mappings."""

from __future__ import annotations

import pytest

from ambient_pipeline.bronze_upload_validation import (
    parse_mapping_widget,
    validate_csv_headers_against_mapping,
)


def test_validate_csv_headers_accepts_all_mapped_columns() -> None:
    mapping = {"revenue": "revenue", "date": "date"}
    ok, err = validate_csv_headers_against_mapping(["date", "revenue", "extra"], mapping)
    assert ok is True
    assert err is None


def test_validate_csv_headers_reports_missing_mapped_column() -> None:
    mapping = {"revenue": "revenue", "date": "date"}
    ok, err = validate_csv_headers_against_mapping(["date"], mapping)
    assert ok is False
    assert err and "revenue" in err


def test_validate_csv_headers_rejects_empty_mapping() -> None:
    ok, err = validate_csv_headers_against_mapping(["date"], {})
    assert ok is False
    assert err == "mapping_json is empty"


def test_parse_mapping_widget_parses_json() -> None:
    assert parse_mapping_widget('{"a": "col_a"}') == {"a": "col_a"}


def test_parse_mapping_widget_raises_on_invalid_json() -> None:
    with pytest.raises(ValueError, match="invalid mapping_json"):
        parse_mapping_widget("not-json")
