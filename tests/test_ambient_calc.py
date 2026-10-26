"""Tests for the open-source reference calculator (ambient_calc)."""

from __future__ import annotations

from pathlib import Path

import yaml
import pytest

from ambient_calc import (
    CalcError,
    compute_all,
    compute_metric,
    formula_names,
    safe_eval,
    slug_of,
)

CORE = Path(__file__).resolve().parents[1] / "catalog" / "shared" / "metrics.yaml"


def test_safe_eval_basic_arithmetic() -> None:
    assert safe_eval("(revenue - cogs) / revenue * 100", {"revenue": 1000, "cogs": 600}) == 40.0
    assert safe_eval("a + b * c", {"a": 1, "b": 2, "c": 3}) == 7


def test_safe_eval_div_by_zero_returns_none() -> None:
    assert safe_eval("a / b", {"a": 1, "b": 0}) is None


def test_safe_eval_none_operand_propagates() -> None:
    assert safe_eval("a + b", {"a": None, "b": 2}) is None


def test_safe_eval_blocks_calls_and_attributes() -> None:
    with pytest.raises(CalcError):
        safe_eval("__import__('os').system('echo hi')", {})
    with pytest.raises(CalcError):
        safe_eval("x.__class__", {"x": 1})


def test_safe_eval_bounds_large_exponent() -> None:
    with pytest.raises(CalcError, match="exponent"):
        safe_eval("2 ** 1000", {})


def test_safe_eval_bounds_large_base_for_pow() -> None:
    with pytest.raises(CalcError, match="base out of allowed"):
        safe_eval("10000001 ** 2", {})


def test_safe_eval_unknown_variable_raises() -> None:
    with pytest.raises(CalcError):
        safe_eval("a + missing", {"a": 1})


def test_safe_eval_invalid_syntax_raises() -> None:
    with pytest.raises(CalcError, match="invalid expression"):
        safe_eval("1 + * 2", {})


def test_safe_eval_rejects_non_numeric_constants() -> None:
    with pytest.raises(CalcError, match="non-numeric constant"):
        safe_eval('"hello"', {})


def test_safe_eval_rejects_disallowed_operators() -> None:
    with pytest.raises(CalcError, match="not allowed"):
        safe_eval("a % b", {"a": 5, "b": 2})


def test_safe_eval_whitelisted_numeric_functions() -> None:
    assert safe_eval("min(a, b)", {"a": 3, "b": 7}) == 3
    assert safe_eval("max(a, b)", {"a": 3, "b": 7}) == 7
    assert safe_eval("abs(x)", {"x": -4}) == 4
    assert safe_eval("round(x)", {"x": 3.7}) == 4


def test_formula_names_ignores_whitelisted_functions() -> None:
    names = formula_names("min(a, b) + c * max(d, e)")
    assert names == {"a", "b", "c", "d", "e"}


def test_slug_of_prefers_dotted_metric_key() -> None:
    assert slug_of({}, key="banking.depository.net_interest_margin") == "net_interest_margin"


def test_slug_of_uses_undotted_key() -> None:
    assert slug_of({}, key="net-interest-margin") == "net_interest_margin"


def test_slug_of_reads_slug_field_from_metric() -> None:
    assert slug_of({"slug": "my-metric"}, key=None) == "my_metric"


def test_safe_eval_unary_plus_passthrough() -> None:
    assert safe_eval("+a", {"a": 5}) == 5


def test_safe_eval_unary_minus_and_none_operand() -> None:
    assert safe_eval("-a", {"a": 3}) == -3
    assert safe_eval("-a", {"a": None}) is None


def test_safe_eval_rejects_disallowed_unary_operator() -> None:
    with pytest.raises(CalcError, match="unary operator not allowed"):
        safe_eval("~a", {"a": 1})


def test_safe_eval_whitelisted_function_none_argument() -> None:
    assert safe_eval("abs(x)", {"x": None}) is None


def test_slug_of_raises_when_metric_unidentifiable() -> None:
    with pytest.raises(CalcError, match="no identifiable slug"):
        slug_of({})


def test_compute_metric_uses_prior_computed_slugs() -> None:
    metric = {"calc": {"expr": "gross_margin + 1", "inputs": []}}
    assert compute_metric(metric, {}, computed={"gross_margin": 40.0}) == 41.0


def test_compute_all_skips_measured_inputs() -> None:
    from typing import Any, Mapping

    metrics: list[Mapping[str, Any]] = [
        {"slug": "raw_x", "input": True},
        {"slug": "doubled", "calc": {"expr": "raw_x * 2", "inputs": ["raw_x"]}},
    ]
    out = compute_all(metrics, {"raw_x": 5})
    assert "raw_x" not in out
    assert out["doubled"] == 10


def test_compute_metric_rejects_empty_expr() -> None:
    with pytest.raises(CalcError, match="missing expr"):
        compute_metric({"calc": {"expr": "", "inputs": []}}, {})


def test_compute_metric_requires_calc() -> None:
    with pytest.raises(CalcError):
        compute_metric({"slug": "headcount", "input": True}, {})


def test_compute_all_declared_inputs_override_same_named_metric() -> None:
    """Declared raw inputs win over computed metrics with the same slug."""
    metrics = [
        {"slug": "a", "calc": {"expr": "x + 1", "inputs": ["x"]}},
        {"slug": "b", "calc": {"expr": "a + 10", "inputs": ["a"]}},
    ]
    with_override = compute_all(metrics, {"x": 1, "a": 50})
    assert with_override["a"] == 2
    assert with_override["b"] == 60

    chained = compute_all(metrics, {"x": 1})
    assert chained["a"] == 2
    assert chained["b"] == 12


def test_dependency_order_and_cycle_detection() -> None:
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


def test_core_formulas_compute_from_catalog() -> None:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    metrics = [{**v, "slug": k} for k, v in templates.items()]
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
