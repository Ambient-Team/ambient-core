"""Governance view SQL helpers."""

from __future__ import annotations

import pytest

from ambient_pipeline.governance_views import bronze_raw_metrics_org_view_sql, silver_metrics_org_view_sql


def test_bronze_view_sql_contains_catalog() -> None:
    sql = bronze_raw_metrics_org_view_sql("ambient_catalog")
    assert "ambient_catalog.bronze.v_raw_metrics_org" in sql


def test_silver_view_sql_contains_catalog() -> None:
    sql = silver_metrics_org_view_sql("ambient_catalog")
    assert "ambient_catalog.silver.v_metrics_org" in sql


def test_unsafe_catalog_rejected() -> None:
    with pytest.raises(ValueError, match="unsafe Unity Catalog name"):
        bronze_raw_metrics_org_view_sql("bad-name")
