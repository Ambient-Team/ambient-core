"""Integrity checks linking income statement, balance sheet and cash flow (corporate only)."""

from __future__ import annotations

import copy
from dataclasses import dataclass
from typing import Any, Mapping

TOLERANCE = 0.0


@dataclass(frozen=True, slots=True)
class IntegrityFailure:
    check_id: str
    message: str
    expected: float | None = None
    actual: float | None = None


@dataclass(frozen=True, slots=True)
class IntegrityResult:
    passed: tuple[str, ...]
    failed: tuple[IntegrityFailure, ...]

    @property
    def failed_ids(self) -> frozenset[str]:
        return frozenset(f.check_id for f in self.failed)


def _num(value: Any) -> float:
    if value is None:
        return 0.0
    return float(value)


def _req(sheet: Mapping[str, Any], key: str) -> float:
    if key not in sheet:
        raise KeyError(key)
    return _num(sheet[key])


def _close(diff: float) -> bool:
    return abs(diff) <= TOLERANCE


def operating_nwc(sheet: Mapping[str, Any]) -> float:
    oca = (
        _req(sheet, "accounts_receivable")
        + _req(sheet, "inventory")
        + _req(sheet, "prepaid_expenses")
        + _num(sheet.get("other_operating_current_assets"))
    )
    ocl = (
        _req(sheet, "accounts_payable")
        + _req(sheet, "accrued_expenses")
        + _req(sheet, "deferred_revenue")
        + _req(sheet, "income_tax_payable")
        + _num(sheet.get("other_operating_current_liabilities"))
    )
    return oca - ocl


def _foot_current_assets(sheet: Mapping[str, Any]) -> float:
    return (
        _req(sheet, "cash_and_cash_equivalents")
        + _num(sheet.get("marketable_securities"))
        + _req(sheet, "accounts_receivable")
        + _req(sheet, "inventory")
        + _req(sheet, "prepaid_expenses")
        + _num(sheet.get("other_operating_current_assets"))
    )


def _foot_noncurrent_assets(sheet: Mapping[str, Any]) -> float:
    return (
        _req(sheet, "ppe_net")
        + _req(sheet, "right_of_use_assets")
        + _req(sheet, "intangible_assets")
        + _num(sheet.get("goodwill"))
        + _num(sheet.get("deferred_tax_assets"))
        + _num(sheet.get("other_noncurrent_assets"))
    )


def _foot_current_liabilities(sheet: Mapping[str, Any]) -> float:
    return (
        _req(sheet, "accounts_payable")
        + _req(sheet, "accrued_expenses")
        + _req(sheet, "deferred_revenue")
        + _req(sheet, "income_tax_payable")
        + _num(sheet.get("dividends_payable"))
        + _num(sheet.get("short_term_debt"))
        + _req(sheet, "current_portion_long_term_debt")
        + _req(sheet, "current_portion_of_lease_liability")
        + _num(sheet.get("other_operating_current_liabilities"))
    )


def _foot_equity(sheet: Mapping[str, Any]) -> float:
    return (
        _req(sheet, "share_capital")
        + _num(sheet.get("additional_paid_in_capital"))
        + _req(sheet, "retained_earnings")
        + _num(sheet.get("accumulated_other_comprehensive_income"))
        - _num(sheet.get("treasury_stock"))
        + _num(sheet.get("preferred_stock"))
        + _num(sheet.get("non_controlling_interest"))
    )


def _operating_income_expected(inc: Mapping[str, Any]) -> float:
    return (
        _req(inc, "gross_profit")
        - _req(inc, "sga_excluding_da")
        - _req(inc, "research_and_development")
        - _req(inc, "depreciation_not_in_cogs")
        - _req(inc, "right_of_use_depreciation")
        - _req(inc, "amortization")
        + _num(inc.get("other_operating_income"))
        - _num(inc.get("other_operating_expense"))
    )


def _ebt_expected(inc: Mapping[str, Any]) -> float:
    return (
        _req(inc, "operating_income")
        + _req(inc, "interest_income")
        - _req(inc, "interest_expense")
        + _num(inc.get("other_nonoperating_income"))
        - _num(inc.get("other_nonoperating_expense"))
        + _num(inc.get("gain_on_disposal"))
    )


def run_period_checks(
    dataset: Mapping[str, Any],
    period_id: str,
) -> IntegrityResult:
    """Run integrity checks for one reporting period in a three-statement bundle."""
    periods = dataset["periods"]
    period = periods[period_id]
    balance_sheets = dataset["balance_sheets"]
    open_key = period["opening_balance_sheet_date"]
    close_key = period["closing_balance_sheet_date"]
    opening = balance_sheets[open_key]
    closing = balance_sheets[close_key]
    inc = period["income_statement"]
    cf = period["cash_flow_statement"]

    passed: list[str] = []
    failed: list[IntegrityFailure] = []

    def ok(check_id: str) -> None:
        passed.append(check_id)

    def fail(
        check_id: str,
        message: str,
        expected: float | None = None,
        actual: float | None = None,
    ) -> None:
        failed.append(IntegrityFailure(check_id, message, expected, actual))

    def check_eq(check_id: str, expected: float, actual: float, label: str) -> None:
        if _close(expected - actual):
            ok(check_id)
        else:
            fail(check_id, label, expected, actual)

    # Balance sheet
    ta = _req(closing, "total_assets")
    tle = _req(closing, "total_liabilities") + _req(closing, "total_equity")
    check_eq("balance_sheet_balances", ta, tle, "closing assets must equal liabilities plus equity")

    ta_o = _req(opening, "total_assets")
    tle_o = _req(opening, "total_liabilities") + _req(opening, "total_equity")
    check_eq(
        "opening_balance_sheet_balances",
        ta_o,
        tle_o,
        "opening assets must equal liabilities plus equity",
    )

    check_eq(
        "current_assets_footing",
        _req(closing, "current_assets"),
        _foot_current_assets(closing),
        "current assets footing",
    )
    check_eq(
        "noncurrent_assets_footing",
        _req(closing, "noncurrent_assets"),
        _foot_noncurrent_assets(closing),
        "non-current assets footing",
    )
    check_eq(
        "current_liabilities_footing",
        _req(closing, "current_liabilities"),
        _foot_current_liabilities(closing),
        "current liabilities footing",
    )
    check_eq(
        "equity_footing",
        _req(closing, "total_equity"),
        _foot_equity(closing),
        "equity footing",
    )

    # Income statement identities
    cogs = _req(inc, "cogs_excluding_depreciation") + _req(inc, "depreciation_in_cogs")
    check_eq("gross_profit_identity", _req(inc, "gross_profit"), _req(inc, "revenue") - cogs, "gross profit")
    check_eq(
        "operating_income_identity",
        _req(inc, "operating_income"),
        _operating_income_expected(inc),
        "operating income",
    )
    check_eq("ebt_identity", _req(inc, "earnings_before_tax"), _ebt_expected(inc), "earnings before tax")
    check_eq(
        "net_income_identity",
        _req(inc, "net_income"),
        _req(inc, "earnings_before_tax") - _req(inc, "tax_expense"),
        "net income",
    )
    check_eq(
        "tax_expense_split",
        _req(inc, "tax_expense"),
        _req(inc, "current_tax_expense") + _req(inc, "deferred_tax_expense"),
        "tax expense split",
    )
    check_eq(
        "ebitda_construction",
        _req(inc, "ebitda"),
        _req(inc, "operating_income") + _req(inc, "depreciation_and_amortization"),
        "EBITDA construction",
    )

    shares = _num(inc.get("weighted_average_shares_outstanding"))
    if shares > 0:
        iatc = _req(inc, "net_income") - _num(inc.get("preferred_dividends"))
        check_eq(
            "basic_eps",
            _req(inc, "basic_eps"),
            iatc / shares,
            "basic EPS",
        )
    else:
        ok("basic_eps")

    # Equity roll-forwards
    other_re = _num(period.get("other_retained_earnings_movements"))
    re_expected = (
        _req(opening, "retained_earnings")
        + _req(inc, "net_income")
        - _req(cf, "dividends_declared")
        + other_re
    )
    check_eq(
        "retained_earnings_rollforward",
        _req(closing, "retained_earnings"),
        re_expected,
        "retained earnings roll-forward",
    )

    sc_expected = (
        _req(opening, "share_capital")
        + _req(cf, "share_issuance_proceeds")
        - _req(cf, "share_buybacks")
        + _num(period.get("other_share_capital_movements"))
    )
    check_eq(
        "share_capital_rollforward",
        _req(closing, "share_capital"),
        sc_expected,
        "share capital roll-forward",
    )

    o_aoci = _num(opening.get("accumulated_other_comprehensive_income"))
    c_aoci = _num(closing.get("accumulated_other_comprehensive_income"))
    if o_aoci == c_aoci == 0.0:
        ok("oci_rollforward")
    else:
        oci_move = _num(period.get("other_comprehensive_income_movement"))
        check_eq("oci_rollforward", c_aoci, o_aoci + oci_move, "OCI roll-forward")

    # Cash flow
    net = _req(cf, "net_change_in_cash")
    footed = (
        _req(cf, "cash_from_operations")
        + _req(cf, "cash_from_investing")
        + _req(cf, "cash_from_financing")
        + _num(cf.get("effect_of_exchange_rates_on_cash"))
    )
    check_eq("cash_flow_footing", net, footed, "cash flow footing")

    open_cash = _req(cf, "opening_cash_and_cash_equivalents")
    close_cf = _req(cf, "closing_cash_and_cash_equivalents")
    close_bs = _req(closing, "cash_and_cash_equivalents")
    expected_close = open_cash + net
    if _close(close_bs - expected_close) and _close(close_cf - close_bs):
        ok("cash_ties_to_balance_sheet")
    elif not _close(close_bs - expected_close):
        fail(
            "cash_ties_to_balance_sheet",
            "opening cash plus net change must equal balance-sheet cash",
            expected_close,
            close_bs,
        )
    else:
        fail(
            "cash_ties_to_balance_sheet",
            "cash flow closing cash must match balance sheet",
            close_bs,
            close_cf,
        )

    inc_nwc = operating_nwc(closing) - operating_nwc(opening)
    check_eq(
        "operating_nwc_definition",
        _req(closing, "operating_nwc"),
        operating_nwc(closing),
        "operating NWC on closing sheet",
    )

    cfo_expected = (
        _req(inc, "net_income")
        + _req(inc, "depreciation_and_amortization")
        + _req(inc, "deferred_tax_expense")
        - _num(inc.get("gain_on_disposal"))
        - inc_nwc
        + _num(cf.get("other_operating_adjustments"))
    )
    check_eq(
        "indirect_cfo_reconciliation",
        _req(cf, "cash_from_operations"),
        cfo_expected,
        "indirect cash from operations",
    )

    # PP&E roll-forwards
    ppe_dep = _req(inc, "ppe_depreciation")
    check_eq(
        "ppe_rollforward",
        _req(closing, "ppe_net"),
        _req(opening, "ppe_net")
        + _req(cf, "capital_expenditures")
        - _req(cf, "nbv_of_disposals")
        - ppe_dep
        - _num(period.get("ppe_impairments")),
        "PP&E net roll-forward",
    )
    check_eq(
        "ppe_gross_rollforward",
        _req(closing, "ppe_gross"),
        _req(opening, "ppe_gross")
        + _req(cf, "capital_expenditures")
        - _req(cf, "gross_disposals")
        + _num(period.get("other_ppe_gross_movements")),
        "PP&E gross roll-forward",
    )
    check_eq(
        "ppe_accum_dep_rollforward",
        _req(closing, "accumulated_depreciation"),
        _req(opening, "accumulated_depreciation")
        + ppe_dep
        - _req(cf, "accumulated_depreciation_on_disposals"),
        "accumulated depreciation roll-forward",
    )

    check_eq(
        "intangible_rollforward",
        _req(closing, "intangible_assets"),
        _req(opening, "intangible_assets") - _req(inc, "amortization"),
        "intangible roll-forward",
    )
    check_eq(
        "rou_rollforward",
        _req(closing, "right_of_use_assets"),
        _req(opening, "right_of_use_assets")
        - _req(inc, "right_of_use_depreciation")
        + _num(period.get("new_lease_assets")),
        "right-of-use roll-forward",
    )
    check_eq(
        "lease_liability_rollforward",
        _num(closing.get("current_portion_of_lease_liability"))
        + _num(closing.get("lease_liability_noncurrent")),
        _num(opening.get("current_portion_of_lease_liability"))
        + _num(opening.get("lease_liability_noncurrent"))
        - _req(cf, "lease_principal_repayment")
        + _num(period.get("new_lease_liabilities")),
        "lease liability roll-forward",
    )

    debt_open = (
        _num(opening.get("short_term_debt"))
        + _req(opening, "current_portion_long_term_debt")
        + _req(opening, "long_term_debt")
    )
    debt_close = (
        _num(closing.get("short_term_debt"))
        + _req(closing, "current_portion_long_term_debt")
        + _req(closing, "long_term_debt")
    )
    check_eq(
        "debt_rollforward",
        debt_close,
        debt_open + _req(cf, "debt_issuance") - _req(cf, "debt_principal_repayment"),
        "debt roll-forward",
    )

    check_eq(
        "deferred_tax_rollforward",
        _req(closing, "deferred_tax_liabilities") - _num(closing.get("deferred_tax_assets")),
        _req(opening, "deferred_tax_liabilities")
        - _num(opening.get("deferred_tax_assets"))
        + _req(inc, "deferred_tax_expense"),
        "deferred tax roll-forward",
    )

    div_pay_open = _num(opening.get("dividends_payable"))
    div_pay_close = _num(closing.get("dividends_payable"))
    check_eq(
        "dividends_declared_vs_paid",
        _req(cf, "dividends_paid"),
        _req(cf, "dividends_declared") - (div_pay_close - div_pay_open),
        "dividends declared vs paid",
    )

    tax_pay_open = _num(opening.get("income_tax_payable"))
    tax_pay_close = _num(closing.get("income_tax_payable"))
    check_eq(
        "taxes_paid_reconciliation",
        _req(cf, "taxes_paid"),
        _req(inc, "current_tax_expense") - (tax_pay_close - tax_pay_open),
        "taxes paid reconciliation",
    )

    ncc = (
        _req(inc, "depreciation_and_amortization")
        + _req(inc, "deferred_tax_expense")
        - _num(inc.get("gain_on_disposal"))
        + _num(cf.get("other_operating_adjustments"))
    )
    iwc = _num(cf.get("increase_in_working_capital", cf.get("increase_in_operating_nwc")))
    check_eq(
        "existing_ocf_metric_identity",
        _req(cf, "cash_from_operations"),
        _req(inc, "net_income") + ncc - iwc,
        "existing operating cash flow metric identity",
    )

    return IntegrityResult(tuple(passed), tuple(failed))


def run_all_checks(dataset: Mapping[str, Any]) -> dict[str, IntegrityResult]:
    return {pid: run_period_checks(dataset, pid) for pid in dataset["periods"]}


def _resolve_patch_root(out: dict[str, Any], parts: list[str]) -> tuple[Any, str]:
    """Map fixture patch paths (balance_sheet.* / cash_flow_statement.*) onto the bundle tree."""
    if parts[0] == "balance_sheet":
        node: Any = out["balance_sheets"]
        for part in parts[1:-1]:
            node = node[part]
        return node, parts[-1]
    if parts[0] == "cash_flow_statement":
        period_id = parts[1]
        node = out["periods"][period_id]["cash_flow_statement"]
        return node, parts[-1]
    if parts[0] == "income_statement":
        period_id = parts[1]
        node = out["periods"][period_id]["income_statement"]
        return node, parts[-1]
    node = out
    for part in parts[:-1]:
        node = node[part]
    return node, parts[-1]


def apply_json_patch(dataset: Mapping[str, Any], patch: Mapping[str, Any]) -> dict[str, Any]:
    """Apply dotted-path patches (as in the accounting essentials fixture)."""
    out = copy.deepcopy(dataset)
    for path, value in patch.items():
        parts = path.split(".")
        node, leaf = _resolve_patch_root(out, parts)
        node[leaf] = value
    return out
