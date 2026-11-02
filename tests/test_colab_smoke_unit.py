"""Unit tests for colab_smoke helpers (module stays off the coverage gate omit list)."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
import pytest

from ambient_pipeline.colab_smoke import (
    CONTRACT_FILE,
    DEMO_TABLES,
    SmokeResult,
    _assert_required_columns,
    _load_contract,
    _to_numeric,
)


def test_smoke_result_to_dict() -> None:
    result = SmokeResult(run_id="r1", org_id="o1", output_dir="/tmp/out")
    data = result.to_dict()
    assert data["run_id"] == "r1"
    assert data["bronze_tables"] == {}


def test_to_numeric_coerces_strings() -> None:
    series = pd.Series(["1", "2.5", "bad"])
    out = _to_numeric(series)
    assert out.iloc[0] == 1.0
    assert pd.isna(out.iloc[2])


def test_assert_required_columns_raises() -> None:
    df = pd.DataFrame({"a": [1]})
    with pytest.raises(RuntimeError, match="missing required columns"):
        _assert_required_columns(df, ["a", "b"], "t1")


def test_load_contract_from_repo() -> None:
    root = Path(__file__).resolve().parents[1]
    contract = _load_contract(root / "contracts")
    assert contract.get("product")
    assert CONTRACT_FILE.endswith(".yaml")


def test_demo_tables_keys_are_stable() -> None:
    assert "general_ledger" in DEMO_TABLES
    assert DEMO_TABLES["ar_aging"].endswith(".csv")
