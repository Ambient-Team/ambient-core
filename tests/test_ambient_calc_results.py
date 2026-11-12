"""Behavior tests for structured EvalResult APIs (branch coverage)."""

from __future__ import annotations

import pytest

from ambient_calc import (
    MISSING_INPUT,
    NULL_OPERAND,
    ZERO_DENOMINATOR,
    CalcError,
    EvalResult,
    compute_all_results,
    compute_metric_result,
    safe_eval_result,
)


def test_eval_result_rejects_value_and_reason_together() -> None:
    with pytest.raises(ValueError, match="null_reason must be absent"):
        EvalResult(1.0, ZERO_DENOMINATOR)


def test_eval_result_rejects_unknown_null_reason() -> None:
    with pytest.raises(ValueError, match="unknown null_reason"):
        EvalResult(None, "not_a_code")


def test_eval_result_accepts_null_operand_reason() -> None:
    res = EvalResult(None, NULL_OPERAND)
    assert res.null_reason == NULL_OPERAND


def test_safe_eval_result_missing_input_from_none_variable() -> None:
    assert safe_eval_result("a + 1", {"a": None}) == EvalResult(None, MISSING_INPUT)


def test_safe_eval_result_propagates_null_from_left_operand() -> None:
    assert safe_eval_result("a + b", {"a": None, "b": 2.0}).null_reason == MISSING_INPUT


def test_safe_eval_result_arithmetic_and_unary() -> None:
    ctx = {"a": 10.0, "b": 4.0, "c": 3.0}
    assert safe_eval_result("a + b", ctx).value == 14.0
    assert safe_eval_result("a - b", ctx).value == 6.0
    assert safe_eval_result("a * b", ctx).value == 40.0
    assert safe_eval_result("-c", ctx).value == -3.0
    assert safe_eval_result("+c", ctx).value == 3.0


def test_safe_eval_result_pow_and_min_max() -> None:
    assert safe_eval_result("2 ** 3", {}).value == 8.0
    assert safe_eval_result("min(a, b)", {"a": 5.0, "b": 2.0}).value == 2.0
    assert safe_eval_result("max(a, b)", {"a": 5.0, "b": 2.0}).value == 5.0


def test_safe_eval_result_min_propagates_null_reason_from_arg() -> None:
    res = safe_eval_result("min(a, b)", {"a": None, "b": 1.0})
    assert res.null_reason == MISSING_INPUT


def test_safe_eval_result_pow_bounds_raise() -> None:
    with pytest.raises(CalcError, match="exponent"):
        safe_eval_result("2 ** 200", {})
    with pytest.raises(CalcError, match="base out of allowed"):
        safe_eval_result("10000001 ** 2", {})


def test_safe_eval_result_unknown_variable_raises() -> None:
    with pytest.raises(CalcError, match="unknown variable"):
        safe_eval_result("missing + 1", {})


def test_safe_eval_result_disallowed_operator_raises() -> None:
    with pytest.raises(CalcError, match="not allowed"):
        safe_eval_result("a % b", {"a": 1.0, "b": 2.0})


def test_safe_eval_result_disallowed_call_raises() -> None:
    with pytest.raises(CalcError, match="only whitelisted"):
        safe_eval_result("evil(a)", {"evil": 1.0, "a": 1.0})


def test_compute_metric_result_raises_without_calc() -> None:
    with pytest.raises(CalcError, match="no calc block"):
        compute_metric_result({}, {})


def test_compute_metric_result_raises_without_expr() -> None:
    with pytest.raises(CalcError, match="missing expr"):
        compute_metric_result({"calc": {"inputs": []}}, {})


def test_compute_all_results_resolves_metric_dependencies() -> None:
    metrics = [
        {"slug": "a", "calc": {"expr": "x * 2", "inputs": ["x"]}},
        {"slug": "b", "calc": {"expr": "a + 3", "inputs": []}},
    ]
    out = compute_all_results(metrics, {"x": 5.0})
    assert out["a"].value == 10.0
    assert out["b"].value == 13.0


def test_compute_all_results_detects_cycle() -> None:
    metrics = [
        {"slug": "a", "calc": {"expr": "b + 1", "inputs": []}},
        {"slug": "b", "calc": {"expr": "a + 1", "inputs": []}},
    ]
    with pytest.raises(CalcError, match="dependency cycle"):
        compute_all_results(metrics, {})


def test_compute_all_results_skips_measured_metrics_without_calc() -> None:
    metrics = [
        {"slug": "raw_only"},
        {"slug": "derived", "calc": {"expr": "x + 1", "inputs": ["x"]}},
    ]
    out = compute_all_results(metrics, {"x": 4.0})
    assert set(out) == {"derived"}
    assert out["derived"].value == 5.0
