"""Property-based tests for catalog loader and contract validation."""

from __future__ import annotations

from pathlib import Path

import pytest
from hypothesis import given, settings
from hypothesis import strategies as st

from ambient_contracts.validate import validate_contract_doc
from ambient_pipeline.catalog_field_rules import (
    coerce_numeric_string,
    normalize_field_name,
    parse_float_from_cell,
)
from ambient_pipeline.catalog_loader import load_data_option


@pytest.fixture(scope="module")
def catalog_root() -> Path:
    return Path(__file__).resolve().parents[1] / "catalog"


@given(st.text(min_size=0, max_size=40))
@settings(max_examples=50)
def test_normalize_field_name_idempotent(raw: str) -> None:
    once = normalize_field_name(raw)
    twice = normalize_field_name(once)
    assert once == twice
    assert once == once.lower()


@given(st.from_regex(r"-?\$?[0-9,]+(\.[0-9]+)?", fullmatch=True))
@settings(max_examples=40)
def test_coerce_numeric_string_never_raises(numeric: str) -> None:
    _ = coerce_numeric_string(numeric)
    _ = parse_float_from_cell(numeric)


@given(
    product_name=st.text(min_size=1, max_size=20),
    owner=st.emails(),
)
@settings(max_examples=30)
def test_validate_contract_doc_minimal_valid(product_name: str, owner: str) -> None:
    doc = {
        "product": {"name": product_name, "version": "1.0.0", "owner": owner},
        "schema": {"columns": []},
        "lineage": {},
        "governance": {},
    }
    errors = validate_contract_doc(doc, "hypothesis.yaml")
    assert errors == []


def test_load_data_option_property_known_key(catalog_root: Path) -> None:
    opt = load_data_option("HcCensus911CatalogOptionKey01", catalog_root)
    assert opt is not None
    assert opt.get("metricIds")
