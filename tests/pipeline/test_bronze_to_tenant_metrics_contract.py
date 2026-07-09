"""Spark: catalog-mapped Bronze rows satisfy tenant-metrics-v1 required columns."""

from __future__ import annotations

from datetime import datetime, timezone

from ambient_pipeline.bronze_catalog_map import bronze_to_tenant_metrics
from ambient_pipeline.contracts import ContractLoader


def test_bronze_to_tenant_metrics_satisfies_contract(spark) -> None:
    """HcCensus upload → bronze_to_tenant_metrics → assert_required_columns."""
    rows = [("2024-03-15", "100", "95")]
    df = spark.createDataFrame(rows, ["Date", "OccupiedBeds", "AvailableBeds"])
    mapping = {
        "date": "Date",
        "occupied_beds": "OccupiedBeds",
        "available_beds": "AvailableBeds",
    }
    stamped = bronze_to_tenant_metrics(
        df,
        org_id="org-test-1",
        mapping_json=mapping,
        catalog_option_key="HcCensus911CatalogOptionKey01",
        run_id="run-test-001",
        source_type="csv_upload",
        source_path="gs://bucket/bronze/org-test-1/census/file.csv",
        ingestion_ts=datetime.now(timezone.utc).isoformat(),
    )
    loader = ContractLoader()
    contract = loader.load("tenant-metrics-v1.yaml")
    loader.enforce_bronze_lineage(contract)
    cols = set(stamped.columns)
    loader.assert_required_columns(cols, contract, "bronze_to_tenant_metrics")
    assert stamped.count() >= 2
