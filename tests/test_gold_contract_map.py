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
