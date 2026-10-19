"""Tests for ambient_contracts.loader.ContractLoader."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_contracts.loader import ContractLoader


def test_resolve_path_unknown_contract_file(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    loader = ContractLoader(contracts_dir=contracts)
    with pytest.raises(FileNotFoundError, match="Contract file not found: missing-v9.yaml"):
        loader.resolve_path("missing-v9.yaml")


def test_safe_contract_name_rejects_empty() -> None:
    with pytest.raises(ValueError, match="non-empty"):
        ContractLoader._safe_contract_name("   ")


def test_load_parses_yaml(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    (contracts / "sample-v1.yaml").write_text(
        "product:\n  name: Sample\n  version: 1\nschema:\n  columns: []\n",
        encoding="utf-8",
    )
    doc = ContractLoader(contracts_dir=contracts).load("sample-v1.yaml")
    assert doc["product"]["name"] == "Sample"


def test_enforce_bronze_lineage_requires_provenance_columns() -> None:
    loader = ContractLoader()
    bad = {
        "lineage": {
            "provenance_columns": ["_bronze_run_id", "_bronze_org_id"],
        },
        "schema": {"partition_key": "tenant_id"},
    }
    with pytest.raises(RuntimeError, match="missing required provenance columns"):
        loader.enforce_bronze_lineage(bad)


def test_enforce_bronze_lineage_accepts_org_via_partition_key() -> None:
    loader = ContractLoader()
    ok = {
        "lineage": {
            "provenance_columns": ["_bronze_run_id", "_bronze_row_hash"],
        },
        "schema": {"partition_key": "_bronze_org_id"},
    }
    loader.enforce_bronze_lineage(ok)


def test_assert_required_columns_raises_with_context() -> None:
    loader = ContractLoader()
    contract = {
        "schema": {
            "columns": [
                {"name": "tenant_id", "required": True},
                {"name": "#comment_only", "required": True},
                {"name": "optional_metric", "required": False},
            ],
        },
    }
    with pytest.raises(RuntimeError, match="bronze ingest: missing required contract columns"):
        loader.assert_required_columns({"optional_metric"}, contract, "bronze ingest")
