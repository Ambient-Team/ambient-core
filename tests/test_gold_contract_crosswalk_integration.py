"""Integration between contract schema columns and crosswalk-driven Gold maps."""

from __future__ import annotations

from ambient_contracts.loader import ContractLoader
from ambient_pipeline.gold_contract_map import contract_column_catalog_map, links_for_contract_file


def test_crosswalk_links_reference_known_contract_files() -> None:
    for contract_file in ("tenant-metrics-v1.yaml", "finance-banking-v1.yaml"):
        links = links_for_contract_file(contract_file)
        assert links, f"expected crosswalk links for {contract_file}"
        assert all(link.get("contractFile") == contract_file for link in links)


def test_finance_banking_column_map_keys_are_contract_schema_columns() -> None:
    contract_file = "finance-banking-v1.yaml"
    contract = ContractLoader().load(contract_file)
    schema_cols = {
        col["name"]
        for col in contract.get("schema", {}).get("columns", [])
        if isinstance(col, dict) and col.get("name")
    }
    col_map = contract_column_catalog_map(contract_file)
    assert col_map
    unknown = set(col_map.keys()) - schema_cols
    assert not unknown, f"crosswalk mapped columns not in schema: {unknown}"


def test_tenant_metrics_crosswalk_uses_opaque_catalog_keys() -> None:
    """Tenant metrics links use catalog ids; suffix-based column map may be empty."""
    links = links_for_contract_file("tenant-metrics-v1.yaml")
    assert links
    assert any("." not in str(link.get("catalogMetricKey") or "") for link in links)
    assert contract_column_catalog_map("tenant-metrics-v1.yaml") == {}
