"""Gold contract column mapping via crosswalk."""

from __future__ import annotations

from ambient_pipeline.gold_contract_map import contract_column_catalog_map, links_for_contract_file


def test_finance_banking_crosswalk_links():
    links = links_for_contract_file("finance-banking-v1.yaml")
    assert links
    assert all(link.get("contractProductId") == "FINANCE_BANKING" for link in links)


def test_finance_banking_column_map_includes_nim():
    col_map = contract_column_catalog_map("finance-banking-v1.yaml")
    assert col_map.get("net_interest_margin") == "banking.depository.net_interest_margin"


def test_links_for_contract_file_strips_basename_whitespace():
    padded = links_for_contract_file("  finance-banking-v1.yaml  ")
    baseline = links_for_contract_file("finance-banking-v1.yaml")
    assert padded == baseline
    assert padded


def test_contract_column_catalog_map_omits_columns_without_crosswalk_suffix():
    col_map = contract_column_catalog_map("finance-banking-v1.yaml")
    assert "net_interest_margin" in col_map
    assert "tenant_id" not in col_map


def test_contract_column_catalog_map_last_suffix_wins(monkeypatch):
    monkeypatch.setattr(
        "ambient_pipeline.gold_contract_map.load_crosswalk_links",
        lambda: [
            {
                "contractFile": "finance-banking-v1.yaml",
                "catalogMetricKey": "first.net_interest_margin",
            },
            {
                "contractFile": "finance-banking-v1.yaml",
                "catalogMetricKey": "second.net_interest_margin",
            },
        ],
    )
    col_map = contract_column_catalog_map("finance-banking-v1.yaml")
    assert col_map["net_interest_margin"] == "second.net_interest_margin"
