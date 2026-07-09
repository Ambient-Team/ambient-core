"""Tests for contract loading and enforcement."""

from pathlib import Path

import pytest

from ambient_pipeline.contracts import ContractLoader


def test_load_tenant_metrics_contract():
    loader = ContractLoader(contracts_dir=Path("contracts"))
    contract = loader.load("tenant-metrics-v1.1.yaml")
    assert contract["product"]["name"] == "Tenant Metrics"
    assert str(contract["product"]["version"]) == "1.1"


def test_enforce_bronze_lineage_passes():
    loader = ContractLoader(contracts_dir=Path("contracts"))
    contract = loader.load("tenant-metrics-v1.1.yaml")
    loader.enforce_bronze_lineage(contract)


def test_enforce_bronze_lineage_raises_on_missing():
    loader = ContractLoader()
    with pytest.raises(RuntimeError, match="Bronze contract must declare"):
        loader.enforce_bronze_lineage({"lineage": {"provenance_columns": []}})


def test_assert_required_columns_raises():
    loader = ContractLoader(contracts_dir=Path("contracts"))
    contract = loader.load("tenant-metrics-v1.1.yaml")
    with pytest.raises(RuntimeError, match="missing required contract columns"):
        loader.assert_required_columns(set(), contract, "test context")
