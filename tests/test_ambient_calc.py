"""Tests for the open-source reference calculator (ambient_calc)."""

from __future__ import annotations

from pathlib import Path

import yaml
import pytest

from ambient_calc import CalcError, compute_all, compute_metric, safe_eval

CORE = Path(__file__).resolve().parents[1] / "catalog" / "core" / "shared" / "core_metrics.yaml"


def test_safe_eval_basic_arithmetic():
    assert safe_eval("(revenue - cogs) / revenue * 100", {"revenue": 1000, "cogs": 600}) == 40.0
    assert safe_eval("a + b * c", {"a": 1, "b": 2, "c": 3}) == 7


def test_safe_eval_div_by_zero_returns_none():
    assert safe_eval("a / b", {"a": 1, "b": 0}) is None


def test_safe_eval_none_operand_propagates():
    assert safe_eval("a + b", {"a": None, "b": 2}) is None


def test_safe_eval_blocks_calls_and_attributes():
    with pytest.raises(CalcError):
        safe_eval("__import__('os').system('echo hi')", {})
    with pytest.raises(CalcError):
        safe_eval("x.__class__", {"x": 1})


def test_safe_eval_unknown_variable_raises():
    with pytest.raises(CalcError):
        safe_eval("a + missing", {"a": 1})


def test_compute_metric_requires_calc():
    with pytest.raises(CalcError):
        compute_metric({"slug": "headcount", "input": True}, {})


def test_dependency_order_and_cycle_detection():
    metrics = [
        {"slug": "a", "calc": {"expr": "x + 1", "inputs": ["x"]}},
        {"slug": "b", "calc": {"expr": "a * 2", "inputs": []}},
    ]
    out = compute_all(metrics, {"x": 4})
    assert out["a"] == 5 and out["b"] == 10

    cyclic = [
        {"slug": "a", "calc": {"expr": "b + 1", "inputs": []}},
        {"slug": "b", "calc": {"expr": "a + 1", "inputs": []}},
    ]
    with pytest.raises(CalcError):
        compute_all(cyclic, {})


def test_core_formulas_compute_from_catalog():
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    metrics = [dict(slug=k, **v) for k, v in templates.items()]
    inputs = {
        "current_assets": 500, "current_liabilities": 250, "inventory": 100,
        "revenue": 1000, "cogs": 600, "operating_income": 200, "ebitda": 260,
        "net_income": 150, "revenue_prior": 800, "accounts_receivable": 120,
        "total_credit_sales": 1000, "days": 30, "accounts_payable": 90,
        "days_inventory_outstanding": 40, "non_cash_charges": 50,
        "increase_in_working_capital": 30, "cash_out": 100, "cash_in": 60,
        "current_cash_balance": 1200,
    }
    r = compute_all(metrics, inputs)
    assert r["current_ratio"] == 2.0
    assert r["gross_margin"] == 40.0
    assert r["revenue_growth"] == 25.0
    assert r["ccc"] == pytest.approx(39.1)
    assert r["runway"] == 30.0
