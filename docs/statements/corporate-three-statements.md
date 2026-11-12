# Corporate three-statement essentials

Ambient's **primary** financial metrics stay the simpler accounting-based measures: balance-sheet stocks, net income, and the catalog formulas that consume them (`current-ratio`, `gross-margin`, `operating-cash-flow`, and the rest). Those metrics do **not** require a full three-statement upload.

This pack is **additional coverage** for corporate, non-financial companies when income statement, balance sheet and cash flow leaves are available. It supplies:

- A snake_case line-item taxonomy (reusing existing catalog ids where meaning matches).
- Thirty integrity checks that tie the statements together.
- A default reporting framework of `ifrs_hkfrs` (IFRS / HKFRS as applied in Hong Kong). `us_gaap` and `other` are allowed with explicit classification choices documented upstream.

**Out of scope:** banks, insurers, funds, and trading books; market-value-only inputs; valuation models.

## Implementation

- Contract: `contracts/finance-corporate-statements-v1.yaml` (column groups and integrity check ids).
- Integrity runner: `ambient_statements.integrity.run_period_checks`.
- Golden fixture: `tests/fixtures/statements/harborfield_three_statement.json` (synthetic **Harborfield Components Ltd**; not based on any real entity).

## Conventions (summary)

- **Signs:** expenses and cash outflows are positive amounts subtracted in formulas; contra-assets are positive amounts subtracted from gross balances.
- **Cash tie:** `cash_and_cash_equivalents` on the balance sheet matches the cash flow close; aliases `current_cash_balance` in the runway metric.
- **Operating NWC (indirect CFO):** receivables, inventory, prepaids and operating payables/accruals **excluding** cash, marketable securities, and interest-bearing current debt (including current lease liability). Not the same as catalog `working_capital` (which includes cash and all current liabilities).
- **EBITDA:** `operating_income + depreciation_and_amortization` (includes depreciation embedded in COGS). Not a naive net-income add-back.
- **Current portion of debt:** principal due within twelve months; accrued interest sits in `accrued_expenses`.

## Structured null reasons (`ambient_calc`)

Ratio and statement-derived metrics use the same evaluator. When a result is undefined:

- `safe_eval` / `compute_metric` still return **`null`** (no infinity).
- `safe_eval_result`, `compute_metric_result`, and `compute_all_results` return `EvalResult` with `null_reason` in `zero_denominator`, `missing_input`, or `null_operand` (structured codes for downstream APIs).

## Related

- [Corporate ratio pack](../ratios/corporate-ratios.md) — additional statement ratios on top of primary metrics.
