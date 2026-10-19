# Metrics catalog (as implemented)

Groundwork for queue item **Q-099**. This document describes the reference catalog **as it exists in the repository today** (`catalog/` YAML and generated `manifest.json`). It does not change metric definitions, categorization codes, or generator behavior.

## Source of truth in code

- **Shared corporate templates** — [`catalog/shared/metrics.yaml`](../catalog/shared/metrics.yaml) (`templates` + per-industry numeric `industryIds`). Expanded into every vertical pack at generate time with keys `<industry_token>.core.<slug>`.

- **Vertical-native metrics** — [`catalog/industries/<pack>/metrics.yaml`](../catalog/industries/) (`metrics` map per pack).

- **Schema** — [`catalog/schema/metric-v1.json`](../catalog/schema/metric-v1.json) requires `type` (`Financial` | `Operational`) and allows `tech` (`FINTECH` | `DEEP TECH` in authored YAML).

- **Export** — `ambient-catalog-generate` / [`scripts/generate_reference_catalog.py`](../scripts/generate_reference_catalog.py) produces [`catalog/manifest.json`](../catalog/manifest.json) and `catalog/runtime/*.js`.

Authoring conventions (keys, id bands, `calc` blocks): [CONVENTIONS.md](CONVENTIONS.md). Pack layout: [catalog/README.md](../catalog/README.md).

## Lens: Finance vs OPS

- **Finance (fintech lens)** — metrics with `tech: FINTECH`, or `type: Financial` when `tech` is absent.

- **OPS (deeptech lens)** — metrics with `tech: DEEP TECH`, or `type: Operational` when `tech` is absent.

Industry packs may mix both lenses; peer views should respect pack `industryCodes` (ISIC, NAICS, NACE, GICS) without inventing new codes.

## Three documentation tiers

Tiers below are a **reading order for Q-099**, not a separate field in YAML. Assignment uses template slug / metric key heuristics on the current catalog:

- **Tier 1 — standard** — liquidity, working capital, margins, and headcount-style metrics most companies eventually share.

- **Tier 2 — revenue** — growth and revenue-quality metrics.

- **Tier 3 — optimization by growth stage** — efficiency, runway, utilization, and cohort economics; relevance shifts from pre-corporate through IPO (see stage notes per tier).

Growth stages referenced in tier 3: **pre-corporate**, **early revenue**, **growth**, **late private**, **IPO / public**. The catalog does not yet store a `growth_stage` enum; stage fit is narrative only in this doc.

## Tier 1

Baseline health metrics suitable once basic books or operating telemetry exist.

### Finance

- **Count (unique keys):** 144

- **`*.core.current-ratio`** — Current Ratio (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.dpo`** — Days Payable Outstanding (DPO) (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.dso`** — Days Sales Outstanding (DSO) (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.ebitda-margin`** — EBITDA Margin (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.headcount`** — Headcount (FTE) (`type: Operational`, `tech: FINTECH`; origin: shared template)
- **`*.core.net-margin`** — Net Profit Margin (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.operating-cash-flow`** — Operating Cash Flow (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.operating-margin`** — Operating Margin (EBIT) (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.quick-ratio`** — Quick Ratio (Acid Test) (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.working-capital`** — Working Capital (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`0MJiYgAPcgkzE3xEgOFE`** — Predictive Maintenance Cost Savings (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`1cvcTcHNt1VYX867UUG7`** — Debt Service Coverage Ratio (DSCR) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allhealthcaresaas-arr`** — Annual Recurring Revenue (ARR) (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-mrr`** — Monthly Recurring Revenue (MRR) (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-nrr`** — Net Revenue Retention (NRR) (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-rule-of-40`** — Rule of 40 (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allrealestatesaas-arr`** — Annual Recurring Revenue (ARR) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-mrr`** — Monthly Recurring Revenue (MRR) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-nrr`** — Net Revenue Retention (NRR) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-rule-of-40`** — Rule of 40 (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrestaurantssaas-arr`** — Annual Recurring Revenue (ARR) (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-mrr`** — Monthly Recurring Revenue (MRR) (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-nrr`** — Net Revenue Retention (NRR) (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-rule-of-40`** — Rule of 40 (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allverticalfarmingsaas-arr`** — Annual Recurring Revenue (ARR) (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-mrr`** — Monthly Recurring Revenue (MRR) (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-nrr`** — Net Revenue Retention (NRR) (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-rule-of-40`** — Rule of 40 (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`F6IlgQNV6qNtUhk3BVtT`** — Profit Margin (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`HcDenial915CatalogMetricKey05`** — Claim Denial Rate (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`MfgInvTurn903CatalogMetricKey03`** — Inventory Turnover (`type: Financial`, `tech: FINTECH`; origin: manufacturing)
- **`MfgUnitCogs905CatalogMetricKey05`** — Unit Cost of Goods Sold (`type: Financial`, `tech: FINTECH`; origin: manufacturing)
- **`Ob4nc825yNcKAA91kCua`** — Loan-to-Value Ratio (LTV) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`RestFood921CatalogMetricKey01`** — Food Cost Percentage (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`RestLabor922CatalogMetricKey02`** — Labor Cost Percentage (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`RestSss925CatalogMetricKey05`** — Same-Store Sales Growth (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`VLDD4ijNDixuJ7EDJtw3`** — Gross Rent Multiplier (GRM) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`YsoV0l2DLsptgTldBESm`** — Net Operating Income (NOI) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`aviation.airport.aeronautical_revenue_per_passenger`** — Aeronautical Revenue per Passenger (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.airport.commercial_revenue_share`** — Commercial Revenue Share (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.airport.passengers_enplaned_growth`** — Passengers Enplaned Growth (`type: Operational`, `tech: FINTECH`; origin: aviation)
- **`aviation.network_carrier.casm`** — Cost per Available Seat Kilometer (CASM) (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.network_carrier.fuel_cost_pct_operating`** — Fuel Cost Percent of Operating Cost (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.network_carrier.rasm`** — Revenue per Available Seat Kilometer (RASM) (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.travel_distribution.gbv_take_rate`** — Gross Booking Value Take Rate (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`banking.depository.cost_of_funds`** — Cost of Funds (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.interest_rate_risk_eve_sensitivity`** — Interest Rate Risk EVE Sensitivity (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.liquidity_coverage_ratio`** — Liquidity Coverage Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.loan_to_deposit_ratio`** — Loan-to-Deposit Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.net_interest_margin`** — Net Interest Margin (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.net_stable_funding_ratio`** — Net Stable Funding Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.non_performing_loan_ratio`** — Non-Performing Loan Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.operational_risk_loss_ratio`** — Operational Risk Loss Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.stable_funding_ratio`** — Stable Funding Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.stress_test_cet1_delta`** — Stress Test CET1 Delta (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`banking.depository.tier1_capital_ratio`** — Tier 1 Capital Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`construction.building_construction.cost_performance_index`** — Cost Performance Index (CPI) (`type: Financial`, `tech: FINTECH`; origin: construction)
- **`construction.building_construction.schedule_performance_index`** — Schedule Performance Index (SPI) (`type: Operational`, `tech: FINTECH`; origin: construction)
- **`construction.civil_engineering.earned_value_ratio`** — Civil Earned Value Ratio (`type: Operational`, `tech: FINTECH`; origin: construction)
- **`construction.civil_engineering.percent_complete_physical`** — Percent Complete (Physical) (`type: Operational`, `tech: FINTECH`; origin: construction)
- **`construction.financial.work_in_progress_ratio`** — Work-in-Progress Ratio (`type: Financial`, `tech: FINTECH`; origin: construction)
- **`construction.operations.change_order_rate`** — Change Order Rate (`type: Operational`, `tech: FINTECH`; origin: construction)
- **`construction.operations.safety_trir`** — Total Recordable Incident Rate (TRIR) (`type: Operational`, `tech: FINTECH`; origin: construction)
- **`credit_granting.commercial_lending.commercial_loan_growth`** — Commercial Loan Growth (`type: Operational`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.commercial_payment_volume`** — Commercial Payment Volume (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.delinquency_rate_30d`** — Commercial 30+ Day Delinquency Rate (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.net_charge_off_rate`** — Commercial Net Charge-Off Rate (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.non_performing_loan_ratio`** — Commercial NPL Ratio (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.origination_volume_growth`** — Commercial Origination Volume Growth (`type: Operational`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.portfolio_dscr`** — Portfolio DSCR (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.sector_concentration_index`** — Sector Concentration Index (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.sustainable_finance_share`** — Sustainable Finance Share (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.bnpl_origination_growth`** — BNPL Origination Growth (`type: Operational`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.delinquency_rate_30d`** — 30+ Day Delinquency Rate (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.embedded_finance_revenue_share`** — Embedded Finance Revenue Share (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.merchant_acquiring_volume`** — Merchant Acquiring Volume (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.net_charge_off_rate`** — Net Charge-Off Rate (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.origination_volume_growth`** — Origination Volume Growth (`type: Operational`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.payment_volume`** — Card Payment Volume (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.rtp_payment_volume`** — RTP Payment Volume (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.residential_mortgage.delinquency_rate_30d`** — Residential Mortgage 30+ Day Delinquency (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.residential_mortgage.origination_volume_growth`** — Residential Mortgage Origination Growth (`type: Operational`, `tech: FINTECH`; origin: credit_granting)
- **`financial_services.investment_banking.advisory_fee_ratio`** — Advisory Fee Ratio (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.counterparty_exposure_ratio`** — Counterparty Exposure Ratio (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.market_making_revenue_share`** — Market Making Revenue Share (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.prime_brokerage_balance_growth`** — Prime Brokerage Balance Growth (`type: Operational`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.stressed_var_99`** — Stressed VaR 99% (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.trading_revenue_ratio`** — Trading Revenue Ratio (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.trading_venue_volume_growth`** — Trading Venue Volume Growth (`type: Operational`, `tech: FINTECH`; origin: financial_services)
- **`financial_services.investment_banking.value_at_risk_99`** — Value at Risk 99% (`type: Financial`, `tech: FINTECH`; origin: financial_services)
- **`funds.fund.assets_under_custody`** — Assets Under Custody (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.assets_under_management`** — Assets Under Management (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.capital_deployment_rate`** — Capital Deployment Rate (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.dpi`** — DPI (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.fund_irr`** — Fund IRR (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.fund_leverage_ratio`** — Fund Leverage Ratio (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.liquidity_gate_frequency`** — Liquidity Gate Frequency (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.fund.net_flow_rate`** — Net Flow Rate (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.performance_fee_share`** — Performance Fee Share (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.rvpi`** — RVPI (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.safekeeping_asset_growth`** — Safekeeping Asset Growth (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.fund.settlement_fail_rate`** — Settlement Fail Rate (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.fund.strategy_return_volatility`** — Strategy Return Volatility (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.tvpi`** — TVPI (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.active_portfolio_company_count`** — Active Portfolio Company Count (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.average_investment_size`** — Average Investment Size (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.co_investment_participation_rate`** — Co-Investment Participation Rate (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.follow_on_investment_rate`** — Follow-On Investment Rate (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.fundraising_commitment_progress`** — Fundraising Commitment Progress (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.inbound_attributed_pipeline_share`** — Inbound Attributed Pipeline Share (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.investment_close_rate`** — Investment Close Rate (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.management_fee_operating_coverage`** — Management Fee Operating Coverage (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.new_investments_count`** — New Investments Count (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`funds.operations.portfolio_write_down_rate`** — Portfolio Write-Down Rate (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.qualified_opportunities_count`** — Qualified Opportunities Count (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`insurance.life.benefit_ratio`** — Benefit Ratio (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`insurance.property_casualty.catastrophe_loss_ratio`** — Catastrophe Loss Ratio (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`insurance.property_casualty.combined_ratio`** — Combined Ratio (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`insurance.property_casualty.loss_ratio`** — Loss Ratio (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`insurance.property_casualty.premium_growth`** — Premium Growth (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`insurance.property_casualty.reserve_development_ratio`** — Reserve Development Ratio (`type: Financial`, `tech: FINTECH`; origin: insurance)
- **`o4HkbNgvPm6RAPEcAzHV`** — Return on Investment (ROI) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`o5PSXR0Vw3Jy35QyRrJ8`** — Cash Flow (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`passenger_transit.public_transit.farebox_recovery_ratio`** — Transit Farebox Recovery Ratio (`type: Financial`, `tech: FINTECH`; origin: passenger_transit)
- **`passenger_transit.rail_passenger.farebox_recovery`** — Rail Farebox Recovery Ratio (`type: Financial`, `tech: FINTECH`; origin: passenger_transit)
- **`rbIvVbYWRuUUr4rzZGRH`** — Capitalization Rate (Cap Rate) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`real_estate.operations.operating_expense_ratio`** — Operating Expense Ratio (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`real_estate.operations.same_store_noi_growth`** — Same-Store NOI Growth (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`real_estate.reit.ffo_payout_ratio`** — FFO Payout Ratio (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`real_estate.reit.funds_from_operations`** — Funds From Operations (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`real_estate.reit.same_store_noi_growth`** — REIT Same-Store NOI Growth (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`retail.financial.inventory_turnover`** — Inventory Turnover (`type: Financial`, `tech: FINTECH`; origin: retail)
- **`retail.financial.sales_per_square_foot`** — Sales per Square Foot (`type: Financial`, `tech: FINTECH`; origin: retail)
- **`retail.operations.same_store_sales_growth`** — Same-Store Sales Growth (`type: Operational`, `tech: FINTECH`; origin: retail)
- **`retail.operations.shrink_rate`** — Shrink Rate (`type: Operational`, `tech: FINTECH`; origin: retail)
- **`software_saas.subscription.arr`** — Annual Recurring Revenue (ARR) (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.mrr`** — Monthly Recurring Revenue (MRR) (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.nrr`** — Net Revenue Retention (NRR) (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.rule_of_40`** — Rule of 40 (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`transportation.freight_forwarding.gross_margin_per_shipment`** — Gross Margin per Shipment (`type: Financial`, `tech: FINTECH`; origin: transportation)
- **`transportation.maritime_shipping.time_charter_equivalent`** — Time Charter Equivalent (TCE) (`type: Financial`, `tech: FINTECH`; origin: transportation)
- **`transportation.rail_freight.cost_per_ton_mile`** — Cost per Ton-Mile (`type: Financial`, `tech: FINTECH`; origin: transportation)
- **`trusts.trust.trust_assets_under_administration`** — Trust Assets Under Administration (`type: Financial`, `tech: FINTECH`; origin: trusts)
- **`wCpkOtGniudQu8pSh22k`** — Cash-on-Cash Return (`type: Financial`, `tech: FINTECH`; origin: real_estate)

### OPS

- **Count (unique keys):** 44

- **`6IfrKxlTi9pbGzpuLL5u`** — Cost per Kilogram of Produce (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`8B9bFHS6GSsjzHx9ppKu`** — Energy Cost per Unit of Light Delivered (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`DtBqsvp9S9HBlcxsvAgd`** — Driver Turnover Rate (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`E5khIDv93onvwtXBUsJH`** — Crop Health Index (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`EDCn8khPJg44trzt4JTA`** — Vacancy Rate (`type: Operational`, `tech: DEEP TECH`; origin: real_estate)
- **`HcLos912CatalogMetricKey02`** — Average Length of Stay (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`HcReadmit913CatalogMetricKey03`** — Readmission Rate (30-day proxy) (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`HcStaff914CatalogMetricKey04`** — Staffing Ratio (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`HcVol911CatalogMetricKey01`** — Patient Volume (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`MfgDownt904CatalogMetricKey04`** — Unplanned Downtime (`type: Operational`, `tech: DEEP TECH`; origin: manufacturing)
- **`MfgOee901CatalogMetricKey01`** — Overall Equipment Effectiveness (OEE) (`type: Operational`, `tech: DEEP TECH`; origin: manufacturing)
- **`MfgScrap902CatalogMetricKey02`** — Scrap Rate (`type: Operational`, `tech: DEEP TECH`; origin: manufacturing)
- **`RestTurn923CatalogMetricKey03`** — Table Turn Time (`type: Operational`, `tech: DEEP TECH`; origin: restaurants)
- **`RestWaste924CatalogMetricKey04`** — Food Waste and Spoilage (`type: Operational`, `tech: DEEP TECH`; origin: restaurants)
- **`SAZkxRxYFtf1EIxBXWMk`** — Fuel Efficiency (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`WeTkxvZyeWX51XfBGsuR`** — Labor Cost per Kilogram of Produce (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`aviation.air_cargo.cargo_load_factor`** — Cargo Load Factor (`type: Operational`, `tech: DEEP TECH`; origin: aviation)
- **`aviation.network_carrier.load_factor`** — Load Factor (`type: Operational`, `tech: DEEP TECH`; origin: aviation)
- **`aviation.network_carrier.on_time_performance`** — On-Time Performance (OTP) (`type: Operational`, `tech: DEEP TECH`; origin: aviation)
- **`biA3oIK816fwfInBKg2e`** — On-Time Delivery Rate (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`f3yEk5mEWwKhAFFQFyje`** — Water Usage Efficiency (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`healthcare.provider.bed_occupancy_rate`** — Bed Occupancy Rate (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.provider.case_mix_index`** — Case Mix Index (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.provider.cost_per_discharge`** — Cost per Discharge (`type: Financial`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.provider.ed_wait_time`** — ED Wait Time (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.quality.infection_rate`** — Healthcare-Associated Infection Rate (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.quality.mortality_rate`** — Inpatient Mortality Rate (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.revenue_cycle.ar_days`** — AR Days (`type: Financial`, `tech: DEEP TECH`; origin: healthcare)
- **`healthcare.revenue_cycle.clean_claim_rate`** — Clean Claim Rate (`type: Financial`, `tech: DEEP TECH`; origin: healthcare)
- **`iIaKhCCf0BGvHX1W1i7n`** — Fleet Utilization Rate (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`jnQw1pD0motTKBZ9csPD`** — Yield per Square Meter (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)
- **`life_sciences.rnd.phase_success_rate`** — Phase Success Rate (`type: Operational`, `tech: DEEP TECH`; origin: life_sciences)
- **`life_sciences.rnd.pipeline_active_count`** — Active Pipeline Programs (`type: Operational`, `tech: DEEP TECH`; origin: life_sciences)
- **`life_sciences.rnd.trial_cost_per_patient`** — Trial Cost per Patient (`type: Financial`, `tech: DEEP TECH`; origin: life_sciences)
- **`life_sciences.supply_chain.cogs_per_unit`** — COGS per Unit (`type: Financial`, `tech: DEEP TECH`; origin: life_sciences)
- **`passenger_transit.public_transit.on_time_performance`** — On-Time Performance (`type: Operational`, `tech: DEEP TECH`; origin: passenger_transit)
- **`passenger_transit.public_transit.ridership_per_vehicle_hour`** — Ridership per Vehicle Hour (`type: Operational`, `tech: DEEP TECH`; origin: passenger_transit)
- **`passenger_transit.rail_passenger.ridership_per_train_mile`** — Ridership per Train-Mile (`type: Operational`, `tech: DEEP TECH`; origin: passenger_transit)
- **`real_estate.operations.energy_cost_per_sf`** — Energy Cost per Square Foot (`type: Operational`, `tech: DEEP TECH`; origin: real_estate)
- **`transportation.freight_forwarding.on_time_delivery_shipper`** — On-Time Delivery (Shipper SLA) (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`transportation.maritime_shipping.schedule_reliability`** — Schedule Reliability (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`transportation.rail_freight.on_time_train_performance`** — On-Time Train Performance (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`vXlB5QC3mZJw1auWaIfK`** — Maintenance Cost per Mile (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`yGoqLDC3Mrk1OeH36jkB`** — Energy Consumption per Square Meter (`type: Operational`, `tech: DEEP TECH`; origin: vertical_farming)

## Tier 2

Top-line and unit economics; most relevant after first repeatable revenue.

### Finance

- **Count (unique keys):** 2

- **`*.core.gross-margin`** — Gross Profit Margin (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.revenue-growth`** — Revenue Growth Rate (`type: Financial`, `tech: FINTECH`; origin: shared template)

### OPS

- *(no unique metrics in this bucket at tier 2 under current heuristics)*

## Tier 3

Efficiency, liquidity runway, and operating leverage; emphasis shifts from early survival to scale and public-market readiness.

### Finance

- **Count (unique keys):** 39

- **`*.core.burn-rate`** — Monthly Burn Rate (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.ccc`** — Cash Conversion Cycle (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`*.core.runway`** — Cash Runway (`type: Financial`, `tech: FINTECH`; origin: shared template)
- **`Allhealthcaresaas-cac`** — Customer Acquisition Cost (CAC) (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-gross-churn`** — Gross Revenue Churn Rate (`type: Operational`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-ltv`** — Customer Lifetime Value (LTV) (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allhealthcaresaas-ltv-cac`** — LTV : CAC Ratio (`type: Financial`, `tech: FINTECH`; origin: healthcare)
- **`Allrealestatesaas-cac`** — Customer Acquisition Cost (CAC) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-gross-churn`** — Gross Revenue Churn Rate (`type: Operational`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-ltv`** — Customer Lifetime Value (LTV) (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrealestatesaas-ltv-cac`** — LTV : CAC Ratio (`type: Financial`, `tech: FINTECH`; origin: real_estate)
- **`Allrestaurantssaas-cac`** — Customer Acquisition Cost (CAC) (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-gross-churn`** — Gross Revenue Churn Rate (`type: Operational`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-ltv`** — Customer Lifetime Value (LTV) (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allrestaurantssaas-ltv-cac`** — LTV : CAC Ratio (`type: Financial`, `tech: FINTECH`; origin: restaurants)
- **`Allverticalfarmingsaas-cac`** — Customer Acquisition Cost (CAC) (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-gross-churn`** — Gross Revenue Churn Rate (`type: Operational`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-ltv`** — Customer Lifetime Value (LTV) (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`Allverticalfarmingsaas-ltv-cac`** — LTV : CAC Ratio (`type: Financial`, `tech: FINTECH`; origin: vertical_farming)
- **`aviation.air_cargo.cargo_yield_per_tonne_km`** — Cargo Yield per Tonne-Kilometer (`type: Financial`, `tech: FINTECH`; origin: aviation)
- **`aviation.travel_distribution.look_to_book_conversion`** — Look-to-Book Conversion (`type: Operational`, `tech: FINTECH`; origin: aviation)
- **`banking.depository.efficiency_ratio`** — Efficiency Ratio (`type: Financial`, `tech: FINTECH`; origin: banking)
- **`construction.financial.retention_receivable_days`** — Retention Receivable Days (`type: Financial`, `tech: FINTECH`; origin: construction)
- **`credit_granting.commercial_lending.portfolio_yield`** — Commercial Portfolio Yield (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.revolver_utilization_rate`** — Revolver Utilization Rate (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.treasury_fee_yield`** — Treasury Fee Yield (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.commercial_lending.weighted_average_ltv`** — Weighted Average LTV (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.consumer_lending.portfolio_yield`** — Portfolio Yield (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.residential_mortgage.portfolio_yield`** — Residential Mortgage Portfolio Yield (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`credit_granting.residential_mortgage.weighted_average_ltv`** — Residential Mortgage Weighted Average LTV (`type: Financial`, `tech: FINTECH`; origin: credit_granting)
- **`funds.fund.custody_fee_yield`** — Custody Fee Yield (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.fund.management_fee_yield`** — Management Fee Yield (`type: Financial`, `tech: FINTECH`; origin: funds)
- **`funds.operations.program_investment_conversion_rate`** — Program Investment Conversion Rate (`type: Operational`, `tech: FINTECH`; origin: funds)
- **`retail.operations.conversion_rate`** — Conversion Rate (`type: Operational`, `tech: FINTECH`; origin: retail)
- **`software_saas.subscription.cac`** — Customer Acquisition Cost (CAC) (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.gross_churn`** — Gross Revenue Churn Rate (`type: Operational`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.ltv`** — Customer Lifetime Value (LTV) (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`software_saas.subscription.ltv_cac`** — LTV : CAC Ratio (`type: Financial`, `tech: FINTECH`; origin: software_saas)
- **`trusts.trust.trustee_fee_yield`** — Trustee Fee Yield (`type: Financial`, `tech: FINTECH`; origin: trusts)

### OPS

- **Count (unique keys):** 5

- **`Allmanufacturingmfg-capacity-utilization`** — Capacity Utilization (`type: Operational`, `tech: DEEP TECH`; origin: manufacturing)
- **`healthcare.provider.or_utilization`** — Operating Room Utilization (`type: Operational`, `tech: DEEP TECH`; origin: healthcare)
- **`life_sciences.supply_chain.batch_yield`** — Batch Yield (`type: Operational`, `tech: DEEP TECH`; origin: life_sciences)
- **`transportation.maritime_shipping.vessel_utilization`** — Vessel Utilization (`type: Operational`, `tech: DEEP TECH`; origin: transportation)
- **`transportation.rail_freight.train_utilization`** — Train Utilization (`type: Operational`, `tech: DEEP TECH`; origin: transportation)

## Generated manifest

For machine-readable ids, `requiredSources`, `inputs`, and `benchmarkKey`, use `manifest.json` after `ambient-catalog-generate`. Counts in this doc deduplicate native keys across packs; manifest rows include one entry per industry expansion for shared templates.

## Related contracts

Gold product metrics in [`contracts/`](../contracts/) may align with catalog keys via [`catalog/crosswalk.yaml`](../catalog/crosswalk.yaml). Crosswalk validation: `python scripts/check_crosswalk.py`.

