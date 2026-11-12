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
import copy

from ambient_statements import (
    IntegrityFailure,
    apply_json_patch,
    operating_nwc,
    run_all_checks,
    run_period_checks,
)

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


def test_run_all_checks_covers_every_period(dataset: dict) -> None:
    results = run_all_checks(dataset)
    assert set(results) == set(dataset["periods"])
    assert all(not r.failed for r in results.values())


def test_operating_nwc_optional_other_lines(dataset: dict) -> None:
    sheet = copy.deepcopy(dataset["balance_sheets"]["2025-12-31"])
    sheet["other_operating_current_assets"] = 5000
    sheet["other_operating_current_liabilities"] = 2000
    assert operating_nwc(sheet) == 137000


def test_oci_rollforward_when_aoci_moves(dataset: dict) -> None:
    bundle = copy.deepcopy(dataset)
    close = bundle["balance_sheets"]["2025-12-31"]
    close["accumulated_other_comprehensive_income"] = 8000
    bundle["periods"]["fy2025"]["other_comprehensive_income_movement"] = 8000
    broken = copy.deepcopy(bundle)
    broken["balance_sheets"]["2025-12-31"]["accumulated_other_comprehensive_income"] = 7000
    result = run_period_checks(broken, "fy2025")
    assert "oci_rollforward" in result.failed_ids


def test_basic_eps_skipped_when_no_shares(dataset: dict) -> None:
    bundle = copy.deepcopy(dataset)
    inc = bundle["periods"]["fy2025"]["income_statement"]
    inc["weighted_average_shares_outstanding"] = 0
    inc["basic_eps"] = 999.0
    result = run_period_checks(bundle, "fy2025")
    assert "basic_eps" in result.passed


def test_cash_tie_reports_cf_close_mismatch(dataset: dict) -> None:
    bundle = copy.deepcopy(dataset)
    cf = bundle["periods"]["fy2025"]["cash_flow_statement"]
    cf["closing_cash_and_cash_equivalents"] = cf["closing_cash_and_cash_equivalents"] + 1
    result = run_period_checks(bundle, "fy2025")
    assert "cash_ties_to_balance_sheet" in result.failed_ids
    failure = next(f for f in result.failed if f.check_id == "cash_ties_to_balance_sheet")
    assert failure.expected is not None
    assert failure.actual is not None


def test_apply_patch_income_statement_and_nested_path(dataset: dict) -> None:
    patched = apply_json_patch(
        dataset,
        {
            "income_statement.fy2025.revenue": 1_200_001,
            "entity.name": "patched",
        },
    )
    assert patched["periods"]["fy2025"]["income_statement"]["revenue"] == 1_200_001
    assert patched["entity"]["name"] == "patched"


def test_integrity_failure_fields() -> None:
    err = IntegrityFailure("x", "msg", 1.0, 2.0)
    assert err.check_id == "x"
    assert err.expected == 1.0
    assert err.actual == 2.0


def test_run_period_checks_missing_period_raises(dataset: dict) -> None:
    with pytest.raises(KeyError):
        run_period_checks(dataset, "not_a_period")


def test_run_period_checks_missing_balance_sheet_field_raises(dataset: dict) -> None:
    bundle = copy.deepcopy(dataset)
    del bundle["balance_sheets"]["2025-12-31"]["total_assets"]
    with pytest.raises(KeyError, match="total_assets"):
        run_period_checks(bundle, "fy2025")
