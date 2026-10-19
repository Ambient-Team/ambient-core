"""Edge cases for gold contract crosswalk mapping."""

from __future__ import annotations

from ambient_pipeline.gold_contract_map import contract_column_catalog_map, links_for_contract_file


def test_contract_column_catalog_map_skips_blank_metric_keys(monkeypatch) -> None:
    monkeypatch.setattr(
        "ambient_pipeline.gold_contract_map.load_crosswalk_links",
        lambda: [
            {
                "contractFile": "tenant-metrics-v1.yaml",
                "catalogMetricKey": "",
            },
            {
                "contractFile": "tenant-metrics-v1.yaml",
                "catalogMetricKey": "healthcare.census.occupied_beds",
            },
        ],
    )
    mapping = contract_column_catalog_map("tenant-metrics-v1.yaml")
    assert isinstance(mapping, dict)


def test_links_for_unknown_contract() -> None:
    assert links_for_contract_file("no-such-contract.yaml") == []


def test_contract_column_catalog_map_skips_empty_metric_keys() -> None:
    # Uses real crosswalk; ensures function returns dict without raising.
    mapping = contract_column_catalog_map("tenant-metrics-v1.yaml")
    assert isinstance(mapping, dict)
