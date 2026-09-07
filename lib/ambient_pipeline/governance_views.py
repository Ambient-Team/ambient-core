"""Unity Catalog org-scoped view DDL for tenant metrics."""

from __future__ import annotations

import re

_SAFE_CATALOG = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


def _require_safe_catalog(catalog: str) -> str:
    name = str(catalog).strip()
    if not _SAFE_CATALOG.match(name):
        raise ValueError(
            f"unsafe Unity Catalog name {catalog!r}: expected identifier [A-Za-z_][A-Za-z0-9_]*"
        )
    return name


def bronze_raw_metrics_org_view_sql(catalog: str) -> str:
    """Read-only view enforcing session org filter on bronze.raw_metrics."""
    catalog = _require_safe_catalog(catalog)
    return f"""
CREATE OR REPLACE VIEW {catalog}.bronze.v_raw_metrics_org AS
SELECT *
FROM {catalog}.bronze.raw_metrics
WHERE _bronze_org_id = {catalog}.bronze.get_current_org_id()
"""


def silver_metrics_org_view_sql(catalog: str) -> str:
    catalog = _require_safe_catalog(catalog)
    return f"""
CREATE OR REPLACE VIEW {catalog}.silver.v_metrics_org AS
SELECT *
FROM {catalog}.silver.metrics
WHERE _bronze_org_id = {catalog}.bronze.get_current_org_id()
"""
