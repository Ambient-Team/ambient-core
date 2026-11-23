"""Golden tests for shared free cash flow metrics."""

from __future__ import annotations

import json
from pathlib import Path

import pytest
import yaml

from ambient_calc import compute_all, compute_metric_result

FIXTURE = Path(__file__).resolve().parent / "fixtures" / "ratios" / "harbor_ridge_ratio_test_cases.json"
CORE = Path(__file__).resolve().parents[1] / "catalog" / "shared" / "metrics.yaml"

FCF_TEMPLATE_KEYS = (
    "operating-cash-flow",
    "free-cash-flow",
    "fcff",
    "fcfe",
    "fcf-margin",
    "fcf-conversion",
)


def _load_fcf_metrics() -> list[dict]:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    return [
        {**templates[k], "slug": templates[k].get("slug") or k.replace("-", "_")}
        for k in FCF_TEMPLATE_KEYS
        if k in templates
    ]


def _fixture_inputs() -> dict[str, float]:
    data = json.loads(FIXTURE.read_text(encoding="utf-8"))
    is_row = data["income_statement_year_2"]
    cf = data["cash_flow_statement_year_2"]
    da = float(cf.get("depreciation_and_amortization", 0))
    increase_nwc = (
        cf.get("increase_in_accounts_receivable", 0)
        + cf.get("increase_in_inventory", 0)
        + cf.get("increase_in_prepaid_expenses", 0)
        - cf.get("increase_in_accounts_payable", 0)
        - cf.get("increase_in_other_current_liabilities", 0)
    )
    net_borrow = -float(cf.get("net_repayment_of_interest_bearing_debt", 0))
    return {
        "net_income": is_row["net_income"],
        "non_cash_charges": da,
        "increase_in_working_capital": increase_nwc,
        "operating_income": is_row["operating_profit_ebit"],
        "depreciation": is_row["depreciation"],
        "amortization": is_row["amortization"],
        "tax_expense": is_row["tax_expense"],
        "earnings_before_tax": is_row["earnings_before_tax"],
        "capital_expenditures": cf["capital_expenditures"],
        "net_borrowing": net_borrow,
        "revenue": is_row["revenue"],
    }


@pytest.mark.parametrize("template_key", FCF_TEMPLATE_KEYS)
def test_fcf_metrics_compute(template_key: str) -> None:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    deps = (
        "operating-cash-flow",
        "derived-effective-tax-rate",
        "free-cash-flow",
        "fcf-margin",
        "fcf-conversion",
    )
    slugs = {template_key, *deps}
    metrics = [
        {
            **templates[k],
            "slug": templates[k].get("slug") or k.replace("-", "_"),
        }
        for k in slugs
        if k in templates
    ]
    inputs = _fixture_inputs()
    results = compute_all(metrics, inputs)
    slug = templates[template_key].get("slug") or template_key.replace("-", "_")
    assert slug in results
    assert results[slug] is not None


@pytest.mark.parametrize("net_income", [0.0, -50_000.0])
def test_fcf_conversion_null_when_net_income_not_positive(net_income: float) -> None:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    metrics = [
        {
            **templates[k],
            "slug": templates[k].get("slug") or k.replace("-", "_"),
        }
        for k in ("operating-cash-flow", "free-cash-flow", "fcf-conversion")
    ]
    inputs = {**_fixture_inputs(), "net_income": net_income}
    results = compute_all(metrics, inputs)
    assert results["fcf_conversion"] is None
    conversion = templates["fcf-conversion"]
    res = compute_metric_result(conversion, inputs, results)
    assert res.value is None
    assert res.null_reason == "zero_denominator"


def test_free_cash_flow_identity() -> None:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    metrics = [
        {
            **templates[k],
            "slug": templates[k].get("slug") or k.replace("-", "_"),
        }
        for k in ("operating-cash-flow", "free-cash-flow")
    ]
    inputs = _fixture_inputs()
    results = compute_all(metrics, inputs)
    cfo = results["operating_cash_flow"]
    fcf = results["free_cash_flow"]
    assert fcf == cfo - inputs["capital_expenditures"]