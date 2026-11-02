"""Branch coverage for bronze_catalog_map helpers."""

from __future__ import annotations

import builtins
from typing import Any

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.bronze_catalog_map import (
    MappingSpec,
    append_firestore_lineage_event,
    apply_column_mapping,
    catalog_types_for_option,
    coerce_mapped_columns,
    fetch_firestore_data_source,
    filter_raw_uploads,
    parse_mapping_json,
    resolve_mapping_spec,
    unpivot_to_tenant_metrics,
)
from tests.dict_helpers import JsonDict


def test_parse_mapping_json_skips_blank_keys_and_values() -> None:
    assert parse_mapping_json({"revenue": "Revenue", "": "X", "skip": ""}) == {
        "revenue": "Revenue"
    }


def test_catalog_types_for_option_empty() -> None:
    assert catalog_types_for_option(None) == {}


def test_resolve_mapping_spec_fills_catalog_key_from_firestore() -> None:
    def fetcher(_org: str, _src: str) -> JsonDict:
        return {
            "catalogOptionKey": "HcCensus911CatalogOptionKey01",
            "name": "Census",
            "latestUpload": {"mapping": {"date": "Date"}},
        }

    spec = resolve_mapping_spec(
        org_id="org-1",
        mapping_json={"date": "Date"},
        catalog_option_key="",
        source_id="src-1",
        gcs_path="",
        catalog_manifest_version="3",
        firestore_fetcher=fetcher,
    )
    assert spec.catalog_option_key == "HcCensus911CatalogOptionKey01"
    assert spec.catalog_field_to_csv_header["date"] == "Date"


def test_firestore_helpers_return_when_bridge_unimportable(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    real_import = builtins.__import__

    def blocked_import(name: str, *args: Any, **kwargs: Any) -> Any:
        if name == "ambient_pipeline.firestore_bridge":
            raise ImportError("firebase not installed")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr(builtins, "__import__", blocked_import)
    append_firestore_lineage_event(
        "org",
        "src",
        run_id="r1",
        status="ok",
        rows_written=3,
        gcs_path="gs://b/o",
    )
    assert fetch_firestore_data_source("org", "src") is None


def test_apply_column_mapping_ignores_missing_csv_headers(spark: SparkSession) -> None:
    df = spark.createDataFrame([("1",)], ["Only"])
    out = apply_column_mapping(df, {"revenue": "MissingHeader", "cost": "Only"})
    assert out.columns == ["cost"]


def test_unpivot_raises_when_no_numeric_fields(spark: SparkSession) -> None:
    df = spark.createDataFrame([("note",)], ["Status"])
    mapped = apply_column_mapping(df, {"status": "Status"})
    spec = MappingSpec(
        catalog_field_to_csv_header={"status": "Status"},
        catalog_option_key="k",
        source_id="s",
        source_name="n",
        industry="X",
        catalog_manifest_version="1",
    )
    with pytest.raises(ValueError, match="No numeric catalog fields"):
        unpivot_to_tenant_metrics(mapped, spec, "org")


def test_coerce_mapped_columns_skips_missing_fields(spark: SparkSession) -> None:
    df = spark.createDataFrame([("1",)], ["revenue"])
    out = coerce_mapped_columns(df, ["revenue", "not_in_frame"])
    assert out.columns == ["revenue"]


def test_filter_raw_uploads_by_gcs_path_and_run_id(spark: SparkSession) -> None:
    rows = [
        ("org-a", "run-1", "gs://b/p1", 1),
        ("org-a", "run-2", "gs://b/p2", 2),
        ("org-b", "run-1", "gs://b/p1", 3),
    ]
    df = spark.createDataFrame(
        rows,
        ["_bronze_org_id", "_bronze_run_id", "_bronze_source_path", "value"],
    )
    by_path = filter_raw_uploads(df, "org-a", "", "gs://b/p1").collect()
    assert len(by_path) == 1
    assert by_path[0]["value"] == 1

    by_run = filter_raw_uploads(df, "org-a", "run-2", "").collect()
    assert len(by_run) == 1
    assert by_run[0]["value"] == 2


def test_unpivot_without_date_column_uses_blank_period(spark: SparkSession) -> None:
    df = spark.createDataFrame([("42",)], ["Revenue"])
    mapped = apply_column_mapping(df, {"revenue": "Revenue"})
    spec = MappingSpec(
        catalog_field_to_csv_header={"revenue": "Revenue"},
        catalog_option_key="TestCatalogOptionKey01",
        source_id="src",
        source_name="Test source",
        industry="Healthcare",
        catalog_manifest_version="3",
    )
    coerced = coerce_mapped_columns(mapped, ["revenue"])
    long_df = unpivot_to_tenant_metrics(coerced, spec, "org-1")
    row = long_df.collect()[0]
    assert row["name"] == "revenue"
    assert float(row["value"]) == 42.0
    assert row["org_id"] == "org-1"
