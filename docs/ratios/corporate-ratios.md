# Corporate financial ratios (Ambient standard pack)

Ambient Core ships two layers of close metrics:

- **Primary (existing defaults)** — balance-sheet and net-profit metrics already in the shared catalog: current and quick ratios, percent-scale margins (`gross_margin`, `operating_margin`, `net_margin`, `ebitda_margin`), parameterized `dso` / `dpo`, working capital, cash conversion cycle, growth, and burn. These stay the default paths for FP&A and covenant templates inside the product.
- **Standard corporate ratio pack (this document)** — additional coverage clients expect in credit and corporate-finance workflows: return on equity and invested capital, expense burdens, full utilization and solvency multiples, strict quick assets, and interest-coverage variants. Templates are tagged `corporateRatioPack: true` in `catalog/shared/metrics.yaml`.

Golden tests use the synthetic Harbor Ridge fixture in `tests/fixtures/ratios/harbor_ridge_ratio_test_cases.json`. The Gold contract shape is `contracts/finance-corporate-ratios-v1.yaml` (`FINANCE_CORPORATE_RATIOS`).

## Ratio inventory

**27 primary ratio slugs:** `return_on_equity`, `return_on_assets`, `return_on_invested_capital`, `gross_margin` (legacy percent scale), `operating_profit_margin`, `net_profit_margin`, `effective_interest_rate`, `interest_burden`, `effective_tax_rate`, `tax_burden`, `total_asset_turnover`, `ppe_turnover`, `cash_turnover`, `cash_days`, `accounts_receivable_turnover`, `accounts_receivable_days`, `inventory_turnover`, `inventory_days`, `accounts_payable_turnover`, `accounts_payable_days`, `total_assets_to_equity`, `debt_to_equity`, `debt_to_tangible_net_worth`, `debt_to_ebitda`, `current_ratio`, `quick_ratio`, `ebitda_to_interest`.

**Five documented variants:** `ebitda_margin`, `net_debt_to_ebitda`, `ebit_to_interest`, `ebitda_less_capex_to_interest`, `fixed_charge_coverage`, plus the strict quick ratio `quick_ratio_quick_assets`.

**Derived line items (catalog slugs):** `gross_profit`, `ebitda_derived`, `nopat`, `net_debt`, `invested_capital`, `tangible_net_worth`, `quick_assets`.

**Out of scope:** market-value ratios (price/earnings and similar), dollar working capital as a ratio, cash conversion cycle as a bundled KPI, and credit-sales-only DSO as the standard definition.

## Global conventions

### Balance-sheet basis

Default stock inputs use **ending balances** for the analysis period (`balanceBasisDefault: ending` on pack metrics). **Average balances** are supported by supplying pre-averaged inputs upstream; never mix ending equity with average assets inside a DuPont identity.

### Units

- Return, profitability, and expense ratios in this pack store **decimal quotients** (0.12 = 12%). Legacy `*_margin` templates still use percent points (12 = 12%).
- Turnover, leverage, and coverage metrics use **multiples** (x).
- Day metrics use **days**.

### Day counts

Implement **days = 365 / turnover** and **days = stock × 365 / flow** for annual periods. Do **not** use turnover / 365. For non-annual periods, scale with the period’s day count (annualize or use actual days in the stub); the catalog default path is annual with 365.

### Quick ratio — two definitions

Many print examples mix prose and arithmetic. Ambient exposes both:

1. **`quick_ratio` (default)** — `(current_assets - inventory) / current_liabilities` (formula-box style).
2. **`quick_ratio_quick_assets` (alternate)** — `(cash + marketable_securities + accounts_receivable) / current_liabilities`.

Harbor Ridge ending values: current assets 330,000; inventory 120,000; cash 80,000; marketable securities 20,000; receivables 100,000; current liabilities 140,000.

- Default: (330,000 − 120,000) / 140,000 = **1.5x**
- Strict quick assets: (80,000 + 20,000 + 100,000) / 140,000 = **1.4286x**

A commonly circulated worked example that lists cash, securities, and receivables but omits securities from the sum is arithmetically inconsistent; our golden test uses the full strict numerator above.

### Cash, PP&E, ROIC tax rate

- **Net debt and cash turnover/days** use the **cash** line only by default. Treat **cash + cash equivalents** (and optionally short-term investments) only when mappers set an explicit policy field upstream.
- **PP&E turnover** uses **net** PP&E (`ppe_net`).
- **ROIC / NOPAT** uses the period **effective tax rate** (`tax_expense / earnings_before_tax` when EBT > 0). A **statutory rate** may be supplied explicitly when EBT ≤ 0.

### Undefined and edge cases

The reference evaluator (`ambient_calc`) returns **null** for divide-by-zero and missing operands (never infinity). Use `safe_eval_result` or `compute_metric_result` when you need structured `null_reason` codes (`zero_denominator`, `missing_input`, `null_operand`); bare `safe_eval` remains value-only for backward compatibility.

### IFRS / HKFRS vs US GAAP

- **IFRS 16 / HKFRS leases:** finance lease liabilities with interest accrue into `interest_bearing_liabilities`; right-of-use amortization affects EBITDA comparability across reporters — document lease policy in lineage.
- **Interest classification:** gross interest expense is the default for coverage; net finance income may require note disclosure under IFRS.
- **ROE and NCI:** align `net_income` and `total_shareholders_equity` to the same consolidation scope (parent-only vs consolidated including non-controlling interest).

## DuPont identities

Tests assert (annual, ending basis, Harbor Ridge fixture):

- ROE = ROA × equity multiplier
- ROA = net profit margin × total asset turnover
- ROE = net profit margin × total asset turnover × equity multiplier
- Net profit margin = tax burden × interest burden × EBIT margin
- Five-lever ROE product matches direct ROE within 1e-10 absolute tolerance
- Tax burden ≈ 1 − effective tax rate when tax articulation holds

## Mapping to legacy metrics

- **`accounts_receivable_days`** — legacy `dso` uses credit sales and a caller-supplied `days` count.
- **`accounts_payable_days`** — legacy `dpo` uses a caller-supplied `days` count; COGS denominator matches the standard.
- **`inventory_turnover`** — industry pack metrics may use average inventory; the core pack uses ending inventory.
- **`operating_profit_margin`** — legacy `operating_margin` stores percent points instead of a decimal quotient.
- **`net_profit_margin`** — legacy `net_margin` stores percent points instead of a decimal quotient.

## Files

- This spec: `docs/ratios/corporate-ratios.md`
- Fixture: `tests/fixtures/ratios/harbor_ridge_ratio_test_cases.json`
- Tests: `tests/test_corporate_ratios.py`
