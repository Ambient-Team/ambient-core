"""Unity Catalog org-scoped view DDL for tenant metrics."""

from __future__ import annotations


def bronze_raw_metrics_org_view_sql(catalog: str) -> str:
    """Read-only view enforcing session org filter on bronze.raw_metrics."""
    return f"""
CREATE OR REPLACE VIEW {catalog}.bronze.v_raw_metrics_org AS
SELECT *
FROM {catalog}.bronze.raw_metrics
WHERE _bronze_org_id = {catalog}.bronze.get_current_org_id()
"""


def silver_metrics_org_view_sql(catalog: str) -> str:
    return f"""
CREATE OR REPLACE VIEW {catalog}.silver.v_metrics_org AS
SELECT *
FROM {catalog}.silver.metrics
WHERE _bronze_org_id = {catalog}.bronze.get_current_org_id()
"""
