"""Map Gold contract schema columns to catalog metric keys via crosswalk."""

from __future__ import annotations

from typing import Any

from ambient_contracts.crosswalk import load_crosswalk_links
from ambient_contracts.loader import ContractLoader


def links_for_contract_file(contract_file: str) -> list[dict[str, Any]]:
    """Crosswalk rows whose ``contractFile`` matches the basename."""
    name = contract_file.strip()
    return [
        link
        for link in load_crosswalk_links()
        if str(link.get("contractFile") or "").strip() == name
    ]


def contract_column_catalog_map(contract_file: str) -> dict[str, str]:
    """Return ``{contract_column_name: catalogMetricKey}`` using crosswalk suffix match.

    Matches when the last segment of ``catalogMetricKey`` equals the contract column
    name (for example ``banking.depository.net_interest_margin`` → ``net_interest_margin``).
    """
    loader = ContractLoader()
    contract = loader.load(contract_file)
    schema_cols = contract.get("schema", {}).get("columns") or []
    column_names = [
        str(col.get("name"))
        for col in schema_cols
        if isinstance(col, dict) and col.get("name")
    ]
    links = links_for_contract_file(contract_file)
    suffix_to_key: dict[str, str] = {}
    for link in links:
        key = str(link.get("catalogMetricKey") or "").strip()
        if not key:
            continue
        suffix = key.rsplit(".", 1)[-1]
        suffix_to_key[suffix] = key

    out: dict[str, str] = {}
    for col in column_names:
        if col in suffix_to_key:
            out[col] = suffix_to_key[col]
    return out
