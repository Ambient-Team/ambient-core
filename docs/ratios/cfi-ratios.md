# Financial ratio specification for ambient-core

This document restates, in original language, every financial ratio in CFI's Definitive Guide to Financial Ratios (43 pages, April 2024) so the open-source Ambient-Team/ambient-core catalog can implement them accurately. It is an implementation contract, not a copy of the guide. Do not commit the PDF, quote its prose, or include its worked retailer examples.

Guide page numbers below refer to the printed folio on each page (for example, "p.14"). Formulas were confirmed from rendered page images, not from extracted text alone, because several formula boxes are laid out across columns and at least one page reuses another page's formula headings.

Golden numeric tests for every ratio live in `tests/fixtures/cfi/harbor_ridge_ratio_test_cases.json`. That file is a fully synthetic, internally consistent three-statement dataset invented for this work. It is not taken from the guide.

---

## 1. How many ratios

**27 primary ratios** have their own formula in the guide (including the four "days" companions that share a page with a turnover ratio).

**5 documented variants** appear in the guide's interpretation text, not as their own chapters.

**10 sub-formulas / building-block line items** are required to compute the ratios above.

Market-value ratios (price-earnings and similar) are named in a category list on p.05 but are never defined and are not part of this spec. Dollar working capital and the cash conversion cycle are also not in the guide.

### 1.1 Primary ratio ids

Return

- `return_on_equity`
- `return_on_assets`
- `return_on_invested_capital`

Profitability

- `gross_margin`
- `operating_profit_margin`
- `net_profit_margin`

Expense

- `effective_interest_rate`
- `interest_burden`
- `effective_tax_rate`
- `tax_burden`

Asset utilization

- `total_asset_turnover`
- `ppe_turnover`
- `cash_turnover`
- `cash_days`
- `accounts_receivable_turnover`
- `accounts_receivable_days`
- `inventory_turnover`
- `inventory_days`
- `accounts_payable_turnover`
- `accounts_payable_days`

Solvency

- `total_assets_to_equity`
- `debt_to_equity`
- `debt_to_tangible_net_worth`
- `debt_to_ebitda`

Liquidity

- `current_ratio`
- `quick_ratio`
- `ebitda_to_interest`

### 1.2 Documented variant ids

- `ebitda_margin` (p.18)
- `net_debt_to_ebitda` (p.35)
- `ebit_to_interest` (p.39)
- `ebitda_less_capex_to_interest` (p.39)
- `fixed_charge_coverage` (p.39)

### 1.3 Sub-formula ids

- `gross_profit`
- `operating_profit` (alias `ebit`)
- `ebitda`
- `earnings_before_tax`
- `interest_bearing_liabilities`
- `nopat`
- `net_debt`
- `invested_capital`
- `tangible_net_worth`
- `quick_assets` (strict form; see `quick_ratio`)

---

## 2. Global conventions

These rules apply unless a ratio's entry says otherwise.

### 2.1 Period and statements

Ratios that use an income-statement flow (revenue, net income, EBIT, COGS, interest, tax) use the flow for the analysis period. The guide's examples and the 365-day convention are annual. This spec's default is an annual period. The guide does not say how to compute day ratios for a quarter or a year-to-date stub; do not invent a 90-day or actual/actual convention and call it the guide's. If ambient-core later supports non-annual periods, treat that as an extension and keep it out of the "CFI default" path.

Almost every primary ratio is built from the income statement and/or the balance sheet. The cash flow statement is required only for the coverage variants that deduct capital expenditures (`ebitda_less_capex_to_interest`, `fixed_charge_coverage`). "Total taxes" is income-statement tax expense, not cash taxes.

### 2.2 Balance-sheet basis: ending (default), average (optional)

When a formula uses a balance-sheet stock (assets, equity, debt, cash, receivables, inventory, payables, PP&E), the formula boxes show that account for the current year. On p.20 (effective interest rate) and p.24 (asset-utilization overview) the guide states that averaging the current and prior year-end balances is more accurate when the stock moves a lot, but that most analysts still use the current-year (ending) figure.

**Default for ambient-core, matching the guide's common practice:** ending balance of the analysis period.

**Optional alternative, which should be a documented switch, not a silent change:** simple average of the prior year-end and the current year-end. If this switch is on, every balance-sheet term in a DuPont identity must use it, or the identities will not hold.

Do not mix ending equity in `return_on_equity` with average assets in `return_on_assets` and still expect `ROE = ROA × equity multiplier`.

### 2.3 Units

- Return, profitability, and expense ratios: store as a decimal quotient and display as a percentage. Example: 0.12 is shown as 12%.
- Turnover, leverage, coverage, current ratio, and quick ratio: display as a multiple with a trailing "x", not as a percent. Example: 1.27x, not 127%.
- Day ratios: display in days.

### 2.4 Day-count convention

Day ratios use **365**, not 360 and not the actual number of days in the calendar year.

The identity is:

```
days = 365 / turnover = stock × 365 / flow
```

On the cash, receivables, inventory, and payables pages, one sentence says to take the turnover ratio "and divide it by 365". That sentence is inconsistent with the formula box and with the worked arithmetic on the same pages (365 ÷ 40 = 9.125 days, 365 ÷ 12 ≈ 30 days, 365 ÷ 4 = 91.25 days). Implement `365 / turnover`, never `turnover / 365`.

### 2.5 Signs, zeros, and missing data

Do not replace a non-computable ratio with 0, and do not emit IEEE infinity as a user-facing value. Return a null/undefined result and a machine-readable reason.

- **Denominator is 0** — undefined (the reference calculator returns null).
- **Denominator is missing** — undefined.
- **Numerator is 0 and denominator > 0** — compute 0. Day ratios with zero stock and positive flow yield 0 days. Turnover with zero stock stays undefined (no infinity).
- **Revenue ≤ 0 when it is a denominator** — margins and revenue-based turnovers and day ratios are undefined.
- **Interest expense = 0** — interest coverage ratios (`ebitda_to_interest`, `ebit_to_interest`, `ebitda_less_capex_to_interest`) are undefined.
- **Equity ≤ 0** — `return_on_equity`, `debt_to_equity`, and `total_assets_to_equity` are undefined.
- **Tangible net worth ≤ 0** — `debt_to_tangible_net_worth` is undefined.
- **Invested capital ≤ 0** — `return_on_invested_capital` is undefined.
- **EBIT = 0** — `interest_burden` is undefined (negative EBIT may still compute and should be flagged).
- **EBT = 0** — `effective_tax_rate` and `tax_burden` are undefined (negative EBT may still compute and should be flagged).
- **EBITDA ≤ 0 when it is a denominator** — `debt_to_ebitda` and `net_debt_to_ebitda` are undefined; negative EBITDA numerators on coverage ratios may compute negative coverage and should be flagged.
- **Net debt is negative (net cash)** — allowed; `net_debt_to_ebitda` may be negative while `return_on_invested_capital` can remain defined when invested capital stays positive.
- **Negative inventory or negative quick-ratio numerator** — compute and flag as a distress signal.

The identity `tax_burden = 1 − effective_tax_rate` holds only when tax expense equals EBT minus net income (no discontinued operations, no non-controlling interest split that makes "net income" and "tax" incomparable, no other below-tax line). If that articulation fails, compute both ratios from their raw inputs and do not force the identity.

### 2.6 Interpretation direction

"Higher is better" and "lower is better" below follow the guide's stated shareholder or credit reading, with the caveats the guide itself gives (industry norms, and the fact that too little leverage or too much idle liquidity can also be a problem). Implement a direction flag for sorting and traffic-lights, and keep the caveat in the description rather than treating the flag as absolute.

### 2.7 Shared input names

Use these canonical line-item names in catalog inputs. Amounts are in currency units for the reporting entity.

**Income statement (period flow)**

- `revenue` (the guide also says "revenues", "sales", and "total revenue"; treat as the same top-line figure)
- `cost_of_goods_sold` (COGS)
- `gross_profit` (if not supplied, `revenue - cost_of_goods_sold`)
- `operating_profit` / `ebit` (earnings before interest and tax; "operating profit" and EBIT are the same term in this guide)
- `depreciation`
- `amortization`
- `interest_expense_gross` (gross finance expense, not net of interest income)
- `interest_income` (only needed if the statements present interest net and gross must be reconstructed)
- `earnings_before_tax` / `ebt`
- `tax_expense` ("total taxes")
- `net_income`

**Balance sheet (stock; ending unless the average switch is on)**

- `cash` (see ambiguities: the guide says "cash", not "cash and cash equivalents")
- `marketable_securities`
- `accounts_receivable`
- `inventory`
- `prepaid_expenses`
- `current_assets`
- `ppe_net` (see ambiguities: net vs gross)
- `intangible_assets` (patents, trademarks, copyrights, goodwill, and similar)
- `total_assets`
- `accounts_payable`
- `current_portion_long_term_debt`
- `current_liabilities`
- `interest_bearing_liabilities` (all interest-bearing debt, current and non-current; excludes accounts payable and unearned/deferred revenue)
- `total_shareholders_equity`

**Cash flow statement (period flow; variants only)**

- `capital_expenditures` (cash capex, as a positive number meaning cash spent)

---

## 3. Sub-formulas

### `gross_profit`

- Formula: `revenue - cost_of_goods_sold`
- Unit: currency
- Used by: `gross_margin`
- Page: p.17 (implied by the gross-margin definition)

### `operating_profit` (alias `ebit`)

- Formula: supplied, or reconstructed as revenue minus COGS minus operating expenses, including depreciation and amortization, but before interest and tax
- Unit: currency
- Used by: `operating_profit_margin`, `interest_burden`, `return_on_invested_capital`, DuPont, `ebit_to_interest`
- Page: p.18, p.21, p.41

### `ebitda`

- Formula: `ebit + depreciation + amortization`
- Unit: currency
- Notes: The guide defines EBITDA in words as earnings before interest, tax, depreciation, and amortization. It does not define further adjustments (share-based compensation, one-offs, rent add-backs). Default is this unadjusted construction. If a statement already presents EBITDA, still document whether it matches this construction.
- Page: p.18, p.35, p.39

### `earnings_before_tax`

- Formula: supplied, or `ebit - interest_expense_gross + interest_income` when there are no other non-operating items
- Unit: currency
- Page: p.21, p.22, p.23

### `interest_bearing_liabilities`

- Formula: sum of every interest-bearing obligation, current and non-current, wherever it appears on the balance sheet. Include the current portion of long-term debt. Exclude accounts payable and unearned/deferred revenue.
- Unit: currency
- Page: p.16, p.20, p.33, p.34, p.35
- Ambiguity: IFRS 16 / finance lease liabilities are not mentioned. If a lease liability accrues interest, include it; flag the policy.

### `nopat`

- Display name: Net operating profit after tax
- Formula: `ebit × (1 - tax_rate)`
- Default `tax_rate`: the period effective tax rate `tax_expense / earnings_before_tax`, and only when EBT > 0
- Unit: currency
- Page: p.16
- Ambiguity: the guide says "the tax rate" and does not choose statutory versus effective. Effective is the implementable default because it is observable from the same statements. If EBT ≤ 0, do not blindly apply a computed effective rate; require an explicit `tax_rate` input or return undefined NOPAT.

### `net_debt`

- Formula: `interest_bearing_liabilities - cash`
- Unit: currency
- Notes: The ROIC and net-debt/EBITDA discussions treat cash as available to repay debt immediately. The guide's wording is "cash", not cash equivalents or marketable securities. Default is cash only. A policy switch to subtract cash and cash equivalents should be explicit.
- Page: p.16, p.35

### `invested_capital`

- Formula: `net_debt + total_shareholders_equity`
- Unit: currency
- Page: p.16

### `tangible_net_worth`

- Formula: `total_shareholders_equity - intangible_assets`
- Unit: currency
- Page: p.34

---

## 4. Return ratios

### `return_on_equity`

- Display name: Return on Equity (ROE)
- Category: return
- Formula: `net_income / total_shareholders_equity`
- Inputs: income statement `net_income`; balance sheet `total_shareholders_equity`
- Unit: %
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if equity is 0 or negative
- Interpretation: higher is better (more profit per unit of book equity). Compare inside an industry and watch the trend, not only the level.
- Page: p.14
- Aliases: ROE
- Notes: The same equity figure and the same net income must be used in the DuPont identities.

### `return_on_assets`

- Display name: Return on Assets (ROA)
- Category: return
- Formula: `net_income / total_assets`
- Inputs: `net_income`, `total_assets`
- Unit: %
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if total assets are 0 or negative
- Interpretation: higher is better, but capital-intensive industries normally print a lower ROA than asset-light ones. Compare over time and against peers in the same industry.
- Page: p.15
- Aliases: ROA

### `return_on_invested_capital`

- Display name: Return on Invested Capital (ROIC)
- Category: return
- Formula: `nopat / (net_debt + total_shareholders_equity)`
- Sub-formulas: `nopat = ebit × (1 - tax_rate)`; `net_debt = interest_bearing_liabilities - cash`
- Inputs: `ebit`, `tax_expense`, `earnings_before_tax` (or an explicit `tax_rate`), `interest_bearing_liabilities`, `cash`, `total_shareholders_equity`
- Unit: %
- Balance basis: ending (default); average optional, applied to net debt and equity
- Day-count: n/a
- Sign / edges: undefined if invested capital ≤ 0; undefined NOPAT if the tax rate cannot be formed (see `nopat`)
- Interpretation: higher is better. This is the return to both equity and debt providers, so the numerator excludes interest (it starts from EBIT). The guide notes it is sometimes called return on capital employed (ROCE). Treat `roce` as an alias of this formula, not as a second definition, unless a later standard says otherwise.
- Page: p.16
- Aliases: ROIC, ROCE (alias only, as used in the guide)

---

## 5. Profitability ratios

### `gross_margin`

- Display name: Gross Margin
- Category: profitability
- Formula: `gross_profit / revenue`
- Inputs: `gross_profit` (or `revenue` and `cost_of_goods_sold`), `revenue`
- Unit: %
- Balance basis: n/a (income statement only)
- Day-count: n/a
- Sign / edges: undefined if revenue is 0 or missing
- Interpretation: higher is better. Levels differ sharply by industry (low production-cost services versus high direct-cost manufacturing), so compare to peers, not across unrelated sectors.
- Page: p.17
- Aliases: gross profit margin

### `operating_profit_margin`

- Display name: Operating Profit Margin
- Category: profitability
- Formula: `ebit / revenue`
- Inputs: `ebit` (operating profit), `revenue`
- Unit: %
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if revenue is 0 or missing
- Interpretation: higher is better. This is the share of each unit of revenue left after operating costs, including depreciation and amortization, but before interest and tax. The guide also calls this the EBIT margin.
- Page: p.18
- Aliases: EBIT margin, operating margin
- Related variant: `ebitda_margin`

### `net_profit_margin`

- Display name: Net Profit Margin
- Category: profitability
- Formula: `net_income / revenue`
- Inputs: `net_income`, `revenue`
- Unit: %
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if revenue is 0 or missing
- Interpretation: higher is better. This is what remains for shareholders after every expense. Typical levels vary widely by industry.
- Page: p.19
- Aliases: net margin, profit margin

### `ebitda_margin` (variant, not a separate chapter)

- Display name: EBITDA Margin
- Category: profitability
- Formula: `ebitda / revenue`
- Inputs: `ebitda`, `revenue`
- Unit: %
- Interpretation: higher is better. On p.18 the guide says some analysts prefer EBITDA to EBIT in a margin because depreciation and amortization are non-cash, and that the two versions usually move together; a large gap can point to a very different asset base or asset life. Compute both when the inputs exist.
- Page: p.18
- Sign / edges: undefined if revenue is 0 or missing

---

## 6. Expense ratios

The section opener on p.13 mentions cost of goods sold, SG&A, interest, and tax as the kinds of costs these ratios compare to a base. Only the four ratios below are actually specified. Do not add a COGS-to-revenue or SG&A-to-revenue metric and attribute it to this guide.

### `effective_interest_rate`

- Display name: Effective Interest Rate
- Category: expense
- Formula: `interest_expense_gross / interest_bearing_liabilities`
- Inputs: income statement (or notes) gross interest / finance expense; balance sheet all interest-bearing liabilities, current and non-current
- Unit: %
- Balance basis: ending (default); average optional, and specifically called out on this page when debt moves a lot
- Day-count: n/a
- Sign / edges: undefined if interest-bearing liabilities are 0
- Interpretation: this is the average rate the firm is paying on its debt, not a "higher is better" performance score. A higher rate usually goes with a lower `interest_burden` ratio (more of EBIT consumed by interest). Always use gross interest expense, never interest expense net of interest income. If the income statement only shows a net finance cost, take gross interest from the notes.
- Page: p.20

### `interest_burden`

- Display name: Interest Burden
- Category: expense (also a DuPont lever)
- Formula: `earnings_before_tax / ebit`
- Inputs: `earnings_before_tax`, `ebit`
- Unit: %
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if EBIT is 0
- Interpretation: higher is better for shareholders. A reading of 65% means EBT is 65% of EBIT, so 35% of EBIT was absorbed by interest. A value near 1 (100%) means little interest load. The ratio generally moves opposite the effective interest rate.
- Page: p.21, and again on p.41
- Notes: Used in the five-lever DuPont decomposition.

### `effective_tax_rate`

- Display name: Effective Tax Rate
- Category: expense
- Formula: `tax_expense / earnings_before_tax`
- Inputs: `tax_expense` (total taxes), `earnings_before_tax`
- Unit: %
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if EBT is 0; flag if EBT is negative
- Interpretation: from a shareholder's point of view, lower is better (more of pre-tax profit is kept). Compare the reading to the statutory corporate rate in the jurisdictions where the firm operates; the effective rate should usually trend toward that statutory rate. Large one-year swings are often one-off items and should be investigated.
- Page: p.22

### `tax_burden`

- Display name: Tax Burden
- Category: expense (also a DuPont lever)
- Formula: `net_income / earnings_before_tax`
- Inputs: `net_income`, `earnings_before_tax`
- Unit: %
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if EBT is 0; flag if EBT is negative
- Interpretation: higher is better for shareholders. A reading of 70% means shareholders keep 70% of EBT, so 30% went to tax. When tax expense equals EBT minus net income, `tax_burden = 1 - effective_tax_rate`. The guide notes that one-off items can make a single year noisy, so analysts often prefer a multi-year average of this ratio.
- Page: p.23, and again on p.41

---

## 7. Asset utilization ratios

These are also called efficiency ratios. The guide's "top 6" on p.24 are total asset turnover, PP&E turnover, cash turnover and cash days, receivables turnover and days, inventory turnover and days, and payables turnover and days.

For all six, the default stock is the current-year ending balance (p.24).

### `total_asset_turnover`

- Display name: Total Asset Turnover
- Category: asset utilization
- Formula: `revenue / total_assets`
- Inputs: `revenue`, `total_assets`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if total assets are 0 or negative
- Interpretation: higher is better. Quote as a multiple. A reading of 1.27x means each unit of assets produced 1.27 units of annual revenue.
- Page: p.25
- Aliases: asset turnover
- Notes: A DuPont lever.

### `ppe_turnover`

- Display name: Property, Plant & Equipment Turnover
- Category: asset utilization
- Formula: `revenue / ppe`
- Inputs: `revenue`, `ppe_net` (see ambiguity)
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if PP&E is 0
- Interpretation: higher is better. Quote as a multiple. It often moves in line with total asset turnover when PP&E is a large share of assets.
- Page: p.26
- Ambiguity: the formula box says "Property, Plant, & Equipment" and does not say gross or net. Default to net carrying amount, which is the figure on a typical balance sheet. If only gross PP&E is available, document that and do not mix gross and net across periods.

### `cash_turnover`

- Display name: Cash Turnover
- Category: asset utilization
- Formula: `revenue / cash`
- Inputs: `revenue`, `cash`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if cash is 0
- Interpretation: higher means cash is being worked harder. A reading of 40x means each unit of cash is associated with 40 units of annual revenue, or that the cash balance "turns" 40 times in a year.
- Page: p.27

### `cash_days`

- Display name: Cash Days
- Category: asset utilization
- Formula: `cash × 365 / revenue`
- Equivalent: `365 / cash_turnover`
- Inputs: `cash`, `revenue`
- Unit: days
- Balance basis: ending (default); average optional
- Day-count: 365
- Sign / edges: undefined if revenue is 0; 0 days if cash is 0 and revenue > 0
- Interpretation: generally, lower is better, because idle cash is not being put to work. Seasonal businesses and early-stage firms may need a larger cash buffer, so industry context matters. A cash-days reading is also the number of days the current cash balance would last if revenue stopped.
- Page: p.27

### `accounts_receivable_turnover`

- Display name: Accounts Receivable Turnover
- Category: asset utilization
- Formula: `revenue / accounts_receivable`
- Inputs: `revenue`, `accounts_receivable`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if accounts receivable is 0
- Interpretation: higher is better. A reading of 12x means receivables turn twelve times a year. The guide uses **revenue**, not credit sales only.
- Page: p.28
- Layout note: the formula box on p.28 is correct (revenue over A/R), but its headings still say "Cash Turnover" and "Cash Days". The body text on that page was also partly reused from the cash page. Implement the A/R formulas, not the headings.

### `accounts_receivable_days`

- Display name: Accounts Receivable Days
- Category: asset utilization
- Formula: `accounts_receivable × 365 / revenue`
- Equivalent: `365 / accounts_receivable_turnover`
- Inputs: `accounts_receivable`, `revenue`
- Unit: days
- Balance basis: ending (default); average optional
- Day-count: 365
- Sign / edges: undefined if revenue is 0; 0 days if receivables are 0 and revenue > 0
- Interpretation: lower is generally better (faster collection), subject to normal credit terms in the industry (for example, immediate payment in grocery versus 30-day terms elsewhere).
- Page: p.28
- Aliases: A/R days. Do not silently treat this as catalog `dso` if `dso` is still defined on credit sales and a caller-supplied day count.

### `inventory_turnover`

- Display name: Inventory Turnover
- Category: asset utilization
- Formula: `cost_of_goods_sold / inventory`
- Inputs: `cost_of_goods_sold`, `inventory`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if inventory is 0
- Interpretation: higher is better (stock moves faster), subject to industry norms (perishable grocery versus slow-turn durable goods). The guide says some analysts use revenue in the numerator for consistency with other turnovers, but COGS is the more accurate choice because it is in the same "cost" unit as inventory. Implement COGS as the default. A revenue-based variant, if offered, must be a separate id.
- Page: p.29

### `inventory_days`

- Display name: Inventory Days
- Category: asset utilization
- Formula: `inventory × 365 / cost_of_goods_sold`
- Equivalent: `365 / inventory_turnover`
- Inputs: `inventory`, `cost_of_goods_sold`
- Unit: days
- Balance basis: ending (default); average optional
- Day-count: 365
- Sign / edges: undefined if COGS is 0; 0 days if inventory is 0 and COGS > 0
- Interpretation: lower is generally better, subject to industry norms.
- Page: p.29
- Aliases: days inventory outstanding (name only; the formula must stay on COGS and 365)

### `accounts_payable_turnover`

- Display name: Accounts Payable Turnover
- Category: asset utilization
- Formula: `cost_of_goods_sold / accounts_payable`
- Inputs: `cost_of_goods_sold`, `accounts_payable`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if accounts payable is 0
- Interpretation: **lower is generally better for the firm** (it is paying suppliers more slowly), subject to normal commercial terms and the cost of stretching payables. As with inventory, some analysts use revenue; COGS is the more precise default.
- Page: p.30

### `accounts_payable_days`

- Display name: Accounts Payable Days
- Category: asset utilization
- Formula: `accounts_payable × 365 / cost_of_goods_sold`
- Equivalent: `365 / accounts_payable_turnover`
- Inputs: `accounts_payable`, `cost_of_goods_sold`
- Unit: days
- Balance basis: ending (default); average optional
- Day-count: 365
- Sign / edges: undefined if COGS is 0; 0 days if payables are 0 and COGS > 0
- Interpretation: **higher is generally better for the firm**, subject to supplier terms and geography. A turnover of 12x is about 30 days.
- Page: p.30
- Aliases: A/P days. Same caution as receivables versus catalog `dpo`: the catalog currently parameterizes the day count.

---

## 8. Solvency ratios

The guide groups solvency and liquidity under financial leverage (also called financial gearing). Solvency ratios look at longer-term obligations and capital structure (p.31). All leverage ratios are quoted as multiples, not percents.

### `total_assets_to_equity`

- Display name: Total Assets to Equity
- Category: solvency (also a DuPont lever)
- Formula: `total_assets / total_shareholders_equity`
- Inputs: `total_assets`, `total_shareholders_equity`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if equity is 0 or negative
- Interpretation: generally, lower means less leverage and less insolvency risk, but a firm can also have too little debt. Judge the reading against the industry's typical capital structure. This is a coarse leverage measure because the implied "non-equity" side is all liabilities, not only interest-bearing debt.
- Page: p.32, and again on p.40–41
- Aliases: equity multiplier, financial leverage (the names the DuPont pages use)

### `debt_to_equity`

- Display name: Debt to Equity
- Category: solvency
- Formula: `interest_bearing_liabilities / total_shareholders_equity`
- Inputs: `interest_bearing_liabilities`, `total_shareholders_equity`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if equity is 0 or negative
- Interpretation: generally, lower is better from a risk standpoint, but too little debt can also be sub-optimal. This is the leverage ratio the guide calls the one analysts use most, because it compares debt funding with equity funding directly. Include every interest-bearing liability, current or non-current. Exclude payables and deferred revenue.
- Page: p.33

### `debt_to_tangible_net_worth`

- Display name: Debt to Tangible Net Worth
- Category: solvency
- Formula: `interest_bearing_liabilities / (total_shareholders_equity - intangible_assets)`
- Inputs: `interest_bearing_liabilities`, `total_shareholders_equity`, `intangible_assets`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if tangible net worth is 0 or negative
- Interpretation: a conservative debt-to-equity used especially by commercial lenders. Subtracting intangibles (goodwill, patents, trademarks, copyrights, and similar) shrinks the denominator, so the ratio is at least as high as `debt_to_equity` when intangibles are positive. Lower still means less leverage, with the same industry-structure caveat.
- Page: p.34

### `debt_to_ebitda`

- Display name: Debt to EBITDA
- Category: solvency
- Formula: `interest_bearing_liabilities / ebitda`
- Inputs: `interest_bearing_liabilities`, `ebitda`
- Unit: x
- Balance basis: ending debt (default); average debt optional. EBITDA is a period flow.
- Day-count: n/a
- Sign / edges: undefined if EBITDA ≤ 0
- Interpretation: lower means less leverage and a stronger ability to repay debt from earnings. Lenders, investors, and M&A teams use this multiple often. The guide's headline formula and its examples use **gross** interest-bearing debt.
- Page: p.35
- Related variant: `net_debt_to_ebitda`

### `net_debt_to_ebitda` (variant)

- Display name: Net Debt to EBITDA
- Category: solvency
- Formula: `net_debt / ebitda` where `net_debt = interest_bearing_liabilities - cash`
- Inputs: `interest_bearing_liabilities`, `cash`, `ebitda`
- Unit: x
- Sign / edges: undefined if EBITDA ≤ 0; negative values are allowed when the firm is in a net-cash position
- Interpretation: same direction as gross debt to EBITDA (lower is less risky). The guide presents this as an adjustment some analysts make, on the assumption that cash could be used to repay debt.
- Page: p.35

---

## 9. Liquidity ratios

These look at near-term cash and the ability to meet short-term obligations (p.36). The three ratios the guide specifies are the current ratio, the quick ratio, and EBITDA to interest. The last of these is also called the interest coverage ratio and sits with liquidity in this guide even though coverage is often grouped with solvency elsewhere.

### `current_ratio`

- Display name: Current Ratio
- Category: liquidity
- Formula: `current_assets / current_liabilities`
- Inputs: `current_assets`, `current_liabilities`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if current liabilities are 0
- Interpretation: typically, a reading above 1 suggests the firm can cover near-term obligations. A very high reading can mean too much idle cash or current assets that should be invested in the business. Industry norms matter; some cash-daily businesses operate comfortably below 1. A reading of 2 means current assets can cover current liabilities twice. The guide also calls this the working capital ratio. That name refers to this multiple, not to the dollar amount current assets minus current liabilities.
- Page: p.37
- Aliases: working capital ratio

### `quick_ratio`

- Display name: Quick Ratio
- Category: liquidity
- Formula (implement this as the default, matching the formula box): `(current_assets - inventory) / current_liabilities`
- Inputs: `current_assets`, `inventory`, `current_liabilities`
- Unit: x
- Balance basis: ending (default); average optional
- Day-count: n/a
- Sign / edges: undefined if current liabilities are 0
- Interpretation: higher means a stronger ability to meet short-term liabilities from liquid assets. A reading above 1 is described as strong; a very high reading can again mean unused cash. Retailers who must hold a lot of inventory will print a quick ratio well below their current ratio.
- Page: p.38
- Aliases: acid-test ratio
- Important inconsistency in the guide: the formula box subtracts only inventory from current assets. The interpretation text also says to exclude prepaid expenses, and it defines "quick" assets as cash, marketable securities, and accounts receivable. The worked numeric example on the same page (cash 20, marketable securities 10, receivables 18, current liabilities 25, stated result 1.52) does not arithmetically match (20+10+18)/25 = 1.92; it does match (20+18)/25 = 1.52, which looks like an omitted marketable-securities term. Implement two clearly named results:
  - `quick_ratio` = `(current_assets - inventory) / current_liabilities` (formula box)
  - `quick_ratio_quick_assets` = `(cash + marketable_securities + accounts_receivable) / current_liabilities` (prose definition, which also drops prepaid expenses and any other non-quick current assets)
  Use the first as the default so a single published formula box is honored. Offer the second as a documented alternative.

### `ebitda_to_interest`

- Display name: EBITDA to Interest
- Category: liquidity
- Formula: `ebitda / interest_expense`
- Inputs: `ebitda`, `interest_expense_gross` (the page says "interest expense"; use gross expense for consistency with p.20 unless a note makes a different figure the contractual coupon)
- Unit: x
- Balance basis: n/a
- Day-count: n/a
- Sign / edges: undefined if interest expense is 0; compute and flag if EBITDA is negative
- Interpretation: higher is better, judged against industry coverage norms. The guide also calls this the interest coverage ratio and treats EBITDA as a proxy for cash available to service interest.
- Page: p.39
- Aliases: interest coverage ratio (in this guide, this EBITDA form is the named default)
- Related variants on the same page:
  - `ebit_to_interest` = `ebit / interest_expense`
  - `ebitda_less_capex_to_interest` = `(ebitda - capital_expenditures) / interest_expense` (replaces non-cash D&A with actual capex)
  - `fixed_charge_coverage` = `(ebitda - capital_expenditures) / (interest_expense + current_portion_long_term_debt)` (ability to service interest and the principal due this year)

---

## 10. DuPont pyramid and identity checks

Pages 40–41 decompose ROE. Implement the identities as tests, not as a competing definition of ROE. ROE is always `net_income / total_shareholders_equity`. The products below must reproduce that ROE when every term uses the same period and the same balance-sheet basis.

The guide uses "Equity", "shareholders' equity", and "total shareholders' equity" interchangeably here. Use `total_shareholders_equity`. "Financial leverage" and "equity multiplier" are the same ratio as `total_assets_to_equity`. "EBIT margin" in the five-lever diagram is `operating_profit_margin`.

### Two-lever identity (p.40)

```
return_on_equity
  = return_on_assets × total_assets_to_equity
  = (net_income / total_assets) × (total_assets / total_shareholders_equity)
```

Total assets cancel, leaving net income over equity.

### Three-lever identity (p.40)

This is the form the guide calls the most commonly used.

```
return_on_equity
  = net_profit_margin × total_asset_turnover × total_assets_to_equity
  = (net_income / revenue) × (revenue / total_assets) × (total_assets / total_shareholders_equity)
```

Intermediate identity:

```
return_on_assets = net_profit_margin × total_asset_turnover
```

### Five-lever identity (p.41)

Net profit margin is split into tax burden, interest burden, and EBIT / operating profit margin.

```
net_profit_margin
  = tax_burden × interest_burden × operating_profit_margin
  = (net_income / ebt) × (ebt / ebit) × (ebit / revenue)
```

```
return_on_equity
  = tax_burden
    × interest_burden
    × operating_profit_margin
    × total_asset_turnover
    × total_assets_to_equity
  = (net_income / ebt)
    × (ebt / ebit)
    × (ebit / revenue)
    × (revenue / total_assets)
    × (total_assets / total_shareholders_equity)
```

A tax-burden ratio closer to 1 means more pre-tax profit is kept after tax and lifts ROE. An interest-burden ratio closer to 1 means little debt service between EBIT and EBT.

### Additional identity

```
tax_burden = 1 - effective_tax_rate
```

Only when `tax_expense = ebt - net_income`.

### Test tolerance

On the synthetic fixture these products are exact. Implementations may assert a relative tolerance of 1e-12, or an absolute tolerance of 1e-10 on the decimal (not percent) form.

---

## 11. Ambiguities and guide defects to preserve in the implementation notes

1. **Ending vs average balances.** Default to ending / current-year. Expose average as an explicit option. Never mix bases inside a DuPont identity.
2. **ROIC tax rate.** The guide says "the tax rate" without choosing statutory or effective. Default to the period effective tax rate when EBT > 0; otherwise require an explicit rate.
3. **Cash vs cash equivalents.** Net debt and cash turnover/days use "cash". Default to the cash line only. A cash-and-equivalents policy must be explicit.
4. **PP&E gross vs net.** Default to net carrying amount.
5. **Quick ratio formula vs prose.** Default to current assets minus inventory. Offer the cash + marketable securities + receivables form under a separate id. Do not use the p.38 worked example as a test; its arithmetic is inconsistent.
6. **Day-count prose typo.** Implement `365 / turnover`, not `turnover / 365`.
7. **p.28 heading typo.** Formula headings still say "Cash Turnover" / "Cash Days"; the formulae themselves use A/R and are the authority.
8. **p.26 typo.** A sentence that converts 3.75x to a percent is garbled; ignore it. The multiple is the unit.
9. **Non-annual periods.** The guide only demonstrates annual 365-day ratios. Do not relabel a stub-period calculation as the guide default.
10. **Revenue vs credit sales for receivables.** The guide uses revenue. Do not switch to credit sales and still claim the guide's definition.
11. **Revenue vs COGS for inventory and payables.** Default to COGS. A revenue-based variant, if offered, is not the guide default.
12. **Lease liabilities, preferred stock, and non-controlling interest.** Not discussed. Policy: include interest-bearing lease liabilities in `interest_bearing_liabilities`; if net income is attributable to the parent only, use equity attributable to the parent; if net income is consolidated including NCI, use total equity including NCI. Preferred equity sits inside total shareholders' equity unless a later standard splits it out. Document the choice.
13. **Market-value ratios.** Named on p.05, never defined. Out of scope.
14. **COGS and SG&A as a share of revenue.** Mentioned conceptually on p.13, never given a formula. Out of scope.
15. **EBITDA adjustments.** No add-back policy is defined. Use EBIT + depreciation + amortization.
16. **Interest in coverage ratios.** p.39 says "interest expense" without repeating the gross-versus-net warning from p.20. Default to gross interest expense.
17. **Dangling footnote.** p.24 has a "top 6¹" marker with no footnote text on that page. It does not change the six ratios listed.

---

## 12. Catalog mapping in Ambient Core

Shared templates live in `catalog/shared/metrics.yaml` (`cfiGuideRatio: true`, `balanceBasisDefault: ending`). Each industry pack expands them under `industry.core.<slug>`. The Gold contract shape is `contracts/finance-corporate-ratios-v1.yaml` (`FINANCE_CORPORATE_RATIOS`).

### 12.1 Metrics that matched the guide before this module

- **`current_ratio`**, **`quick_ratio`**, **`gross_margin`**, **`ebitda_margin`** — unchanged formulas (legacy percent scale on margins where noted in templates).
- **`operating_margin`** / **`net_margin`** — unchanged ids; decimal-quotient companions `operating_profit_margin` and `net_profit_margin` document CFI ids without breaking callers.

### 12.2 Legacy metrics left unchanged (not CFI defaults)

- **`dso`**, **`dpo`** — parameterized day counts and (for DSO) credit sales; guide-faithful companions are `accounts_receivable_days` and `accounts_payable_days`.
- **Industry `inventory_turnover`** (retail/manufacturing averages) — unchanged; shared **`inventory_turnover`** uses ending inventory per the guide.
- **`working_capital`**, **`ccc`**, growth/burn/runway KPIs — remain outside this spec.

### 12.3 New primary and variant ratios

All ids listed in sections 1.1–1.2 are implemented as shared templates, including `quick_ratio_quick_assets` and the four interest-coverage variants on p.39.

---

## 13. Files

- Spec (this document): `docs/ratios/cfi-ratios.md`
- Golden fixture: `tests/fixtures/cfi/harbor_ridge_ratio_test_cases.json`
- Pytest module: `tests/test_cfi_financial_ratios.py`
