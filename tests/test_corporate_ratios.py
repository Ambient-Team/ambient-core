"""Golden tests for the standard corporate ratio pack (see docs/ratios/corporate-ratios.md)."""

from __future__ import annotations

import json
from pathlib import Path

import pytest
import yaml

from ambient_calc import compute_all

FIXTURE = Path(__file__).resolve().parent / "fixtures" / "ratios" / "harbor_ridge_ratio_test_cases.json"
CORE = Path(__file__).resolve().parents[1] / "catalog" / "shared" / "metrics.yaml"

CORPORATE_TEMPLATE_KEYS = {
    "derived-gross-profit",
    "derived-ebitda",
    "derived-effective-tax-rate",
    "derived-nopat",
    "derived-net-debt",
    "derived-invested-capital",
    "derived-tangible-net-worth",
    "derived-quick-assets",
    "return-on-equity",
    "return-on-assets",
    "return-on-invested-capital",
    "operating-profit-margin",
    "net-profit-margin",
    "effective-interest-rate",
    "interest-burden",
    "tax-burden",
    "total-asset-turnover",
    "ppe-turnover",
    "cash-turnover",
    "cash-days",
    "accounts-receivable-turnover",
    "accounts-receivable-days",
    "inventory-turnover",
    "inventory-days",
    "accounts-payable-turnover",
    "accounts-payable-days",
    "total-assets-to-equity",
    "debt-to-equity",
    "debt-to-tangible-net-worth",
    "debt-to-ebitda",
    "net-debt-to-ebitda",
    "quick-ratio-quick-assets",
    "ebitda-to-interest",
    "ebit-to-interest",
    "ebitda-less-capex-to-interest",
    "fixed-charge-coverage",
}

LEGACY_PERCENT_SCALE = {"gross_margin", "ebitda_margin", "current_ratio", "quick_ratio"}


def _load_corporate_metrics() -> list[dict]:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    return [
        {**templates[k], "slug": templates[k].get("slug") or k.replace("-", "_")}
        for k in CORPORATE_TEMPLATE_KEYS
        if k in templates
    ]


def _load_fixture() -> dict:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


def _ending_inputs(fixture: dict) -> dict[str, float]:
    is_row = fixture["income_statement_year_2"]
    bs = fixture["balance_sheet"]["year_2_ending"]
    cf = fixture["cash_flow_statement_year_2"]
    return {
        "revenue": is_row["revenue"],
        "cogs": is_row["cost_of_goods_sold"],
        "operating_income": is_row["operating_profit_ebit"],
        "depreciation": is_row["depreciation"],
        "amortization": is_row["amortization"],
        "interest_expense": is_row["interest_expense_gross"],
        "earnings_before_tax": is_row["earnings_before_tax"],
        "tax_expense": is_row["tax_expense"],
        "net_income": is_row["net_income"],
        "cash": bs["cash"],
        "marketable_securities": bs["marketable_securities"],
        "accounts_receivable": bs["accounts_receivable"],
        "inventory": bs["inventory"],
        "current_assets": bs["current_assets"],
        "current_liabilities": bs["current_liabilities"],
        "current_portion_long_term_debt": bs["current_portion_long_term_debt"],
        "ppe_net": bs["ppe_net"],
        "intangible_assets": bs["intangible_assets"],
        "total_assets": bs["total_assets"],
        "accounts_payable": bs["accounts_payable"],
        "interest_bearing_liabilities": bs["interest_bearing_liabilities"],
        "total_shareholders_equity": bs["total_shareholders_equity"],
        "capital_expenditures": cf["capital_expenditures"],
    }


def _average_inputs(fixture: dict, base: dict[str, float]) -> dict[str, float]:
    avg = fixture["derived_line_items_average_balances"]
    out = dict(base)
    out.update(
        {
            "total_assets": avg["average_total_assets"],
            "total_shareholders_equity": avg["average_total_shareholders_equity"],
            "interest_bearing_liabilities": avg["average_interest_bearing_liabilities"],
            "cash": avg["average_cash"],
            "accounts_receivable": avg["average_accounts_receivable"],
            "inventory": avg["average_inventory"],
            "accounts_payable": avg["average_accounts_payable"],
            "ppe_net": avg["average_ppe_net"],
        }
    )
    return out


def _expected_decimal(entry: dict) -> float:
    if "value_decimal" in entry:
        return float(entry["value_decimal"])
    if "value_multiple" in entry:
        return float(entry["value_multiple"])
    if "value_days" in entry:
        return float(entry["value_days"])
    return float(entry["value"])


@pytest.fixture(scope="module")
def corporate_metrics() -> list[dict]:
    metrics = _load_corporate_metrics()
    assert len(metrics) == len(CORPORATE_TEMPLATE_KEYS)
    return metrics


@pytest.fixture(scope="module")
def fixture() -> dict:
    return _load_fixture()


@pytest.fixture(scope="module")
def ending_results(corporate_metrics: list[dict], fixture: dict) -> dict[str, float | None]:
    return compute_all(corporate_metrics, _ending_inputs(fixture))


@pytest.fixture(scope="module")
def average_results(corporate_metrics: list[dict], fixture: dict) -> dict[str, float | None]:
    base = _ending_inputs(fixture)
    return compute_all(corporate_metrics, _average_inputs(fixture, base))


def _assert_close(actual: float | None, expected: float) -> None:
    assert actual is not None
    assert actual == pytest.approx(float(expected), rel=0, abs=1e-10)


@pytest.mark.parametrize("ratio_id", list(json.loads(FIXTURE.read_text())["expected_ratios_ending_current_year"]))
def test_ending_golden_ratio(ratio_id: str, fixture: dict, ending_results: dict[str, float | None]) -> None:
    if ratio_id in LEGACY_PERCENT_SCALE:
        pytest.skip("legacy core template tested separately")
    expected = _expected_decimal(fixture["expected_ratios_ending_current_year"][ratio_id])
    actual = ending_results[ratio_id]
    _assert_close(actual, expected)


def test_legacy_margins_percent_scale(fixture: dict) -> None:
    templates = yaml.safe_load(CORE.read_text(encoding="utf-8"))["templates"]
    keys = ["gross-margin", "ebitda-margin", "current-ratio", "quick-ratio"]
    metrics = [{**templates[k], "slug": k.replace("-", "_")} for k in keys]
    raw = _ending_inputs(fixture)
    raw["ebitda"] = fixture["derived_line_items_year_2_ending"]["ebitda"]
    out = compute_all(metrics, raw)
    exp = fixture["expected_ratios_ending_current_year"]
    assert out["gross_margin"] == pytest.approx(float(exp["gross_margin"]["value_percent"]), rel=0, abs=1e-9)
    assert out["ebitda_margin"] == pytest.approx(float(exp["ebitda_margin"]["value_percent"]), rel=0, abs=1e-9)
    assert out["current_ratio"] == pytest.approx(float(exp["current_ratio"]["value_multiple"]), rel=0, abs=1e-9)
    assert out["quick_ratio"] == pytest.approx(float(exp["quick_ratio"]["value_multiple"]), rel=0, abs=1e-9)


def test_quick_ratio_alternate_convention(fixture: dict, ending_results: dict[str, float | None]) -> None:
    """Strict quick assets form per docs/ratios/corporate-ratios.md."""
    exp = fixture["expected_ratios_ending_current_year"]["quick_ratio_quick_assets"]
    _assert_close(ending_results["quick_ratio_quick_assets"], float(exp["value_multiple"]))


@pytest.mark.parametrize("ratio_id", list(json.loads(FIXTURE.read_text())["expected_ratios_average_balances"]))
def test_average_golden_ratio(
    ratio_id: str, fixture: dict, average_results: dict[str, float | None]
) -> None:
    expected = _expected_decimal(fixture["expected_ratios_average_balances"][ratio_id])
    _assert_close(average_results[ratio_id], expected)


def test_dupont_identities(ending_results: dict[str, float | None]) -> None:
    roe = ending_results["return_on_equity"]
    roa = ending_results["return_on_assets"]
    mult = ending_results["total_assets_to_equity"]
    npm = ending_results["net_profit_margin"]
    tat = ending_results["total_asset_turnover"]
    tax_b = ending_results["tax_burden"]
    int_b = ending_results["interest_burden"]
    opm = ending_results["operating_profit_margin"]
    etr = ending_results["effective_tax_rate"]
    assert roe is not None and roa is not None and mult is not None
    assert roe == pytest.approx(roa * mult, rel=0, abs=1e-10)
    assert roa == pytest.approx(npm * tat, rel=0, abs=1e-10)
    assert roe == pytest.approx(npm * tat * mult, rel=0, abs=1e-10)
    assert npm == pytest.approx(tax_b * int_b * opm, rel=0, abs=1e-10)
    assert roe == pytest.approx(tax_b * int_b * opm * tat * mult, rel=0, abs=1e-10)
    assert tax_b == pytest.approx(1 - etr, rel=0, abs=1e-10)


def test_day_identities(ending_results: dict[str, float | None]) -> None:
    pairs = [
        ("cash_days", "cash_turnover"),
        ("accounts_receivable_days", "accounts_receivable_turnover"),
        ("inventory_days", "inventory_turnover"),
        ("accounts_payable_days", "accounts_payable_turnover"),
    ]
    for days_key, turnover_key in pairs:
        days = ending_results[days_key]
        turn = ending_results[turnover_key]
        assert days is not None and turn is not None
        assert days == pytest.approx(365 / turn, rel=0, abs=1e-10)


def test_zero_denominator_returns_none(corporate_metrics: list[dict]) -> None:
    """Null reasons are follow-up; zero interest must not yield infinite coverage."""
    base = _ending_inputs(_load_fixture())
    base["interest_expense"] = 0
    out = compute_all(corporate_metrics, base)
    assert out["ebitda_to_interest"] is None
    assert out["ebit_to_interest"] is None
    assert out["ebitda_less_capex_to_interest"] is None
