"""Golden tests for corporate three-statement integrity (Harborfield synthetic fixture)."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from ambient_calc import (
    ZERO_DENOMINATOR,
    EvalResult,
    compute_metric_result,
    safe_eval_result,
)
from ambient_statements import apply_json_patch, run_all_checks, run_period_checks

FIXTURE = (
    Path(__file__).resolve().parent / "fixtures" / "statements" / "harborfield_three_statement.json"
)


@pytest.fixture(scope="module")
def dataset() -> dict:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


@pytest.mark.parametrize("period_id", ["fy2024", "fy2025"])
def test_golden_period_passes_catalog_checks(dataset: dict, period_id: str) -> None:
    expected = set(dataset["periods"][period_id]["checks_passed"])
    result = run_period_checks(dataset, period_id)
    assert not result.failed, [f.message for f in result.failed]
    assert expected.issubset(set(result.passed))


def test_golden_all_periods_match_checks_passed_lists(dataset: dict) -> None:
    for period_id, period in dataset["periods"].items():
        expected = set(period["checks_passed"])
        actual = run_period_checks(dataset, period_id)
        missing = expected - set(actual.passed)
        assert not missing, f"{period_id} missing passes: {missing}"


@pytest.mark.parametrize(
    ("variant_id", "intended"),
    [
        ("broken_accounting_equation", "balance_sheet_balances"),
        ("broken_retained_earnings_rollforward", "retained_earnings_rollforward"),
        ("broken_cash_ties_to_balance_sheet", "cash_ties_to_balance_sheet"),
        ("broken_indirect_cfo_reconciliation", "indirect_cfo_reconciliation"),
        ("broken_ppe_rollforward", "ppe_rollforward"),
    ],
)
def test_broken_variants_fail_intended_check(
    dataset: dict,
    variant_id: str,
    intended: str,
) -> None:
    variant = next(v for v in dataset["broken_variants"] if v["id"] == variant_id)
    mutated = apply_json_patch(dataset, variant["patch"])
    period_id = variant["based_on_period"]
    result = run_period_checks(mutated, period_id)
    assert intended in result.failed_ids


def test_fy2025_ebitda_not_naive_addback(dataset: dict) -> None:
    inc = dataset["periods"]["fy2025"]["income_statement"]
    assert inc["ebitda"] == 248000
    assert inc["ebitda_naive_addback"] == 252000
    assert inc["ebitda"] != inc["ebitda_naive_addback"]


def test_safe_eval_result_zero_denominator() -> None:
    res = safe_eval_result("revenue / cogs", {"revenue": 100.0, "cogs": 0.0})
    assert res == EvalResult(None, ZERO_DENOMINATOR)


def test_compute_metric_result_missing_declared_input() -> None:
    metric = {"calc": {"expr": "a / b", "inputs": ["a", "b"]}}
    res = compute_metric_result(metric, {"a": 10.0})
    assert res.value is None
    assert res.null_reason == "missing_input"
