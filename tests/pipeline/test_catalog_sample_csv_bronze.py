"""Sample CSV header shapes align with tenant-metrics bronze/silver contract expectations."""

from __future__ import annotations

from ambient_pipeline.contracts import ContractLoader


def _required_metric_columns() -> set[str]:
    contract = ContractLoader().load("tenant-metrics-v1.1.yaml")
    return {
        col["name"]
        for col in contract.get("schema", {}).get("columns", [])
        if col.get("required") and not str(col["name"]).startswith("#")
    }


def test_golden_csv_headers_plus_bronze_provenance_satisfy_contract() -> None:
    """Mapped upload columns + notebook provenance cover required Silver schema keys."""
    sample_headers = {
        "metric_id",
        "name",
        "value",
        "industry",
        "type",
        "unit",
        "status",
    }
    bronze_provenance = {
        "_bronze_org_id",
        "_bronze_run_id",
        "_bronze_row_hash",
        "_bronze_ingestion_ts",
        "_silver_run_id",
        "_silver_transform_ts",
    }
    required = _required_metric_columns()
    missing = required - sample_headers - bronze_provenance
    assert not missing, f"golden CSV path missing contract columns: {missing}"
