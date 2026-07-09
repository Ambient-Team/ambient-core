/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import { enrichMetrics, deriveMetricValidation } from './catalogEnrichment.js';

export { deriveMetricValidation };

export const REFERENCE_DATA = {
  "metrics": {
    "Allrealestatefpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 926,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 932,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 938,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 944,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 950,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 956,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 962,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 968,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 974,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 980,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 986,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 992,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 998,
      "industry": "Real Estate"
    },
    "Allrealestatefpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1004,
      "industry": "Real Estate"
    },
    "1cvcTcHNt1VYX867UUG7": {
      "datasource": [
        "Financial statements",
        "Loan documents"
      ],
      "description": "Ratio of net operating income to annual debt payments.",
      "id": 8,
      "industry": "Real Estate",
      "methodology": "DSCR = Net Operating Income / Annual Debt Service",
      "name": "Debt Service Coverage Ratio (DSCR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2.5,
      "targetRangeLow": 1.5,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Number",
      "benchmarkKey": "dscr",
      "fpaWorkflow": "Liquidity & covenant review â€” lender DSCR tests and monthly board liquidity pack.",
      "financialImpact": "Covenant headroom â€” breach risk for debt service and refinancing",
      "operationalSignal": "NOI and opex from property operations feed DSCR numerator and denominator"
    },
    "EDCn8khPJg44trzt4JTA": {
      "datasource": [
        "Property management systems",
        "Rental vacancy reports"
      ],
      "description": "Percentage of rental units that are unoccupied.",
      "id": 9,
      "industry": "Real Estate",
      "methodology": "Vacancy Rate = (Number of Vacant Units / Total Units) * 100",
      "name": "Vacancy Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 7,
      "targetRangeLow": 3,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "%"
    },
    "Ob4nc825yNcKAA91kCua": {
      "datasource": [
        "Mortgage documents",
        "Property appraisal reports"
      ],
      "description": "Ratio of mortgage loan amount to the property's appraised value.",
      "id": 7,
      "industry": "Real Estate",
      "methodology": "LTV = (Mortgage Amount / Property Appraised Value) * 100",
      "name": "Loan-to-Value Ratio (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 75,
      "targetRangeLow": 60,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%"
    },
    "VLDD4ijNDixuJ7EDJtw3": {
      "datasource": [
        "Property valuation reports",
        "Rental income records"
      ],
      "description": "Property price divided by gross rental income, used for quick valuation.",
      "id": 6,
      "industry": "Real Estate",
      "methodology": "GRM = Property Price / Gross Rental Income",
      "name": "Gross Rent Multiplier (GRM)",
      "sensorFieldData": [
        "None directly applicable. (i.e. cannot verify and requires personnel supervision)"
      ],
      "status": "data needed",
      "targetRangeHigh": 15,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Number"
    },
    "YsoV0l2DLsptgTldBESm": {
      "datasource": [
        "Financial statements",
        "Property management systems"
      ],
      "description": "Income generated from a property after deducting operating expenses.",
      "id": 2,
      "industry": "Real Estate",
      "methodology": "NOI = Gross Rental Income - Operating Expenses",
      "name": "Net Operating Income (NOI)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 800000,
      "targetRangeLow": 400000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)"
    },
    "o4HkbNgvPm6RAPEcAzHV": {
      "datasource": [
        "Financial statements",
        "Property purchase records",
        "Sale records"
      ],
      "description": "Percentage return on investment relative to its cost.",
      "id": 1,
      "industry": "Real Estate",
      "methodology": "ROI = ((Net Profit / Cost of Investment) * 100)",
      "name": "Return on Investment (ROI)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10,
      "targetRangeLow": 6,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Percentage"
    },
    "o5PSXR0Vw3Jy35QyRrJ8": {
      "datasource": [
        "Financial statements",
        "Rental income records"
      ],
      "description": "Net income from a property after mortgage and operating expenses.",
      "id": 4,
      "industry": "Real Estate",
      "methodology": "Cash Flow = Rental Income - Operating Expenses - Debt Service",
      "name": "Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 250000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)"
    },
    "rbIvVbYWRuUUr4rzZGRH": {
      "datasource": [
        "Property valuation reports",
        "Financial statements"
      ],
      "description": "Ratio of NOI to property value, used to estimate potential return.",
      "id": 3,
      "industry": "Real Estate",
      "methodology": "Cap Rate = (NOI / Property Value) * 100",
      "name": "Capitalization Rate (Cap Rate)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 8,
      "targetRangeLow": 5,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Percentage",
      "benchmarkKey": "cap_rate",
      "fpaWorkflow": "Valuation & lender reporting â€” yield sensitivity for divestiture and acquisition cases.",
      "financialImpact": "Yield and valuation â€” cap rate moves drive NAV and lender collateral tests",
      "operationalSignal": "NOI from operations and appraisal inputs drive cap rate numerator and denominator"
    },
    "wCpkOtGniudQu8pSh22k": {
      "datasource": [
        "Financial statements",
        "Investment records"
      ],
      "description": "Annual return on invested cash.",
      "id": 5,
      "industry": "Real Estate",
      "methodology": "Cash-on-Cash Return = (Net Cash Flow / Initial Cash Investment) * 100",
      "name": "Cash-on-Cash Return",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 12,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Percentage"
    },
    "Allrealestatesaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1010,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Allrealestatesaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1016,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Allrealestatesaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1022,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Allrealestatesaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1028,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Allrealestatesaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1034,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Allrealestatesaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1040,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Allrealestatesaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1046,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Allrealestatesaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1052,
      "industry": "Real Estate",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    },
    "Allverticalfarmingfpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 927,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 933,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 939,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 945,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 951,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 957,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 963,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 969,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 975,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 981,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 987,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 993,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 999,
      "industry": "Vertical Farming"
    },
    "Allverticalfarmingfpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1005,
      "industry": "Vertical Farming"
    },
    "0MJiYgAPcgkzE3xEgOFE": {
      "datasource": [
        "Farm Management Systems",
        "Maintenance logs"
      ],
      "description": "Cost savings achieved by preventing equipment failures through predictive maintenance.",
      "id": 23,
      "industry": "Vertical Farming",
      "methodology": "Potential Repair Cost Avoided - Predictive Maintenance Cost",
      "name": "Predictive Maintenance Cost Savings",
      "sensorFieldData": [
        "Vibration sensors",
        "Power consumption sensors (depending on equipment)"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 1000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)"
    },
    "6IfrKxlTi9pbGzpuLL5u": {
      "datasource": [
        "Farm Management Systems",
        "Accounting Software"
      ],
      "description": "Total cost associated with producing one kilogram of crops.",
      "id": 20,
      "industry": "Vertical Farming",
      "methodology": "Total Production Cost (Seeds, Fertilizers, Nutrients) + Total Operational Cost (Labor, Energy, Water, Maintenance) / Total Yield (kg)",
      "name": "Cost per Kilogram of Produce",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10,
      "targetRangeLow": 2,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "$/kg"
    },
    "8B9bFHS6GSsjzHx9ppKu": {
      "datasource": [
        "Energy Bills",
        "Farm Management Systems"
      ],
      "description": "Energy consumption required to deliver the desired light intensity.",
      "id": 22,
      "industry": "Vertical Farming",
      "methodology": "Energy Consumed (kWh) / Total Light Delivered (lux-hours or similar unit)",
      "name": "Energy Cost per Unit of Light Delivered",
      "sensorFieldData": [
        "Light intensity sensors (lux meters)"
      ],
      "status": "data needed",
      "targetRangeHigh": 0.5,
      "targetRangeLow": 0.1,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kWh/lux-hour",
      "fpaWorkflow": "Opex efficiency review â€” energy spikes explain variance before close.",
      "operationalSignal": "Field telemetry â€” light and power sensors",
      "financialImpact": "Opex and margin â€” flows to NOI and covenant headroom"
    },
    "E5khIDv93onvwtXBUsJH": {
      "datasource": [
        "Crop monitoring systems",
        "Farm management systems"
      ],
      "description": "An index indicating the overall health of crops based on various parameters.",
      "id": 19,
      "industry": "Vertical Farming",
      "methodology": "Crop Health Index = (Sum of Health Scores / Total Number of Crops) * 100",
      "name": "Crop Health Index",
      "sensorFieldData": [
        "Crop monitoring systems",
        "Environmental sensors"
      ],
      "status": "data needed",
      "targetRangeHigh": 100,
      "targetRangeLow": 50,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "Index"
    },
    "F6IlgQNV6qNtUhk3BVtT": {
      "datasource": [
        "Farm Management Systems",
        "Accounting Software"
      ],
      "description": "Difference between revenue and total costs.",
      "id": 21,
      "industry": "Vertical Farming",
      "methodology": "Revenue from Produce Sales - Total Production Cost - Total Operational Cost",
      "name": "Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%"
    },
    "WeTkxvZyeWX51XfBGsuR": {
      "datasource": [
        "Payroll records",
        "Harvest logs"
      ],
      "description": "Average labor cost associated with producing one kilogram of produce.",
      "id": 18,
      "industry": "Vertical Farming",
      "methodology": "Labor Cost per Kilogram of Produce = Total Labor Costs / Total Harvested Produce (kg)",
      "name": "Labor Cost per Kilogram of Produce",
      "sensorFieldData": [
        "Payroll records",
        "Harvest logs"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 0.5,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "$/kg"
    },
    "f3yEk5mEWwKhAFFQFyje": {
      "datasource": [
        "Irrigation logs",
        "Farm management systems"
      ],
      "description": "Amount of produce harvested per liter of water used.",
      "id": 16,
      "industry": "Vertical Farming",
      "methodology": "Water Usage Efficiency = Total Harvested Produce (kg) / Total Water Used (liters)",
      "name": "Water Usage Efficiency",
      "sensorFieldData": [
        "Water flow meters",
        "soil moisture sensors"
      ],
      "status": "data needed",
      "targetRangeHigh": 10,
      "targetRangeLow": 1,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kg/liter"
    },
    "jnQw1pD0motTKBZ9csPD": {
      "datasource": [
        "Harvest logs",
        "Farm management systems"
      ],
      "description": "Amount of produce harvested per square meter of growing area.",
      "id": 15,
      "industry": "Vertical Farming",
      "methodology": "Yield per Square Meter = Total Harvested Produce (kg) / Total Growing Area (mÂ²)",
      "name": "Yield per Square Meter",
      "sensorFieldData": [
        "Crop monitoring systems"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 5,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kg/mÂ²"
    },
    "yGoqLDC3Mrk1OeH36jkB": {
      "datasource": [
        "Energy bills",
        "Farm management systems"
      ],
      "description": "Amount of energy consumed per square meter of growing area.",
      "id": 17,
      "industry": "Vertical Farming",
      "methodology": "Energy Consumption per Square Meter = Total Energy Consumed (kWh) / Total Growing Area (mÂ²)",
      "name": "Energy Consumption per Square Meter",
      "sensorFieldData": [
        "Energy meters"
      ],
      "status": "data needed",
      "targetRangeHigh": 200,
      "targetRangeLow": 50,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kWh/mÂ²"
    },
    "Allverticalfarmingsaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1011,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Allverticalfarmingsaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1017,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Allverticalfarmingsaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1023,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Allverticalfarmingsaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1029,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Allverticalfarmingsaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1035,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Allverticalfarmingsaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1041,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Allverticalfarmingsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1047,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Allverticalfarmingsaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1053,
      "industry": "Vertical Farming",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    },
    "Alltransportationfpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 928,
      "industry": "Transportation"
    },
    "Alltransportationfpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 934,
      "industry": "Transportation"
    },
    "Alltransportationfpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 940,
      "industry": "Transportation"
    },
    "Alltransportationfpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 946,
      "industry": "Transportation"
    },
    "Alltransportationfpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 952,
      "industry": "Transportation"
    },
    "Alltransportationfpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 958,
      "industry": "Transportation"
    },
    "Alltransportationfpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 964,
      "industry": "Transportation"
    },
    "Alltransportationfpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 970,
      "industry": "Transportation"
    },
    "Alltransportationfpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 976,
      "industry": "Transportation"
    },
    "Alltransportationfpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 982,
      "industry": "Transportation"
    },
    "Alltransportationfpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 988,
      "industry": "Transportation"
    },
    "Alltransportationfpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 994,
      "industry": "Transportation"
    },
    "Alltransportationfpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 1000,
      "industry": "Transportation"
    },
    "Alltransportationfpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1006,
      "industry": "Transportation"
    },
    "DtBqsvp9S9HBlcxsvAgd": {
      "datasource": [
        "HR records",
        "Payroll records",
        "Exit interviews"
      ],
      "description": "The percentage of drivers that leave the company within a specific period.",
      "id": 14,
      "industry": "Transportation",
      "methodology": "(Number of drivers who left / Total number of drivers) * 100",
      "name": "Driver Turnover Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 100,
      "targetRangeLow": 20,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "%"
    },
    "SAZkxRxYFtf1EIxBXWMk": {
      "datasource": [
        "Fuel logs",
        "GPS tracking data",
        "Vehicle telematics data"
      ],
      "description": "Average miles per gallon for the fleet.",
      "id": 10,
      "industry": "Transportation",
      "methodology": "Total miles driven / Total fuel used",
      "name": "Fuel Efficiency",
      "sensorFieldData": [
        "Fuel logs",
        "GPS tracking data"
      ],
      "status": "data needed",
      "targetRangeHigh": 50,
      "targetRangeLow": 5,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "Miles per Gallon (MPG)"
    },
    "biA3oIK816fwfInBKg2e": {
      "datasource": [
        "Delivery logs",
        "GPS tracking data",
        "Customer confirmations"
      ],
      "description": "The percentage of deliveries made on or before the scheduled delivery time.",
      "id": 12,
      "industry": "Transportation",
      "methodology": "(Number of on-time deliveries / Total deliveries) * 100",
      "name": "On-Time Delivery Rate",
      "sensorFieldData": [
        "GPS tracking data",
        "Delivery confirmations"
      ],
      "status": "data needed",
      "targetRangeHigh": 99,
      "targetRangeLow": 85,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "%"
    },
    "iIaKhCCf0BGvHX1W1i7n": {
      "datasource": [
        "Fleet management systems",
        "GPS tracking data",
        "Usage logs"
      ],
      "description": "The percentage of time the fleet is actively in use.",
      "id": 11,
      "industry": "Transportation",
      "methodology": "(Total time fleet in use / Total available fleet time) * 100",
      "name": "Fleet Utilization Rate",
      "sensorFieldData": [
        "GPS tracking data",
        "Usage logs"
      ],
      "status": "data needed",
      "targetRangeHigh": 80,
      "targetRangeLow": 20,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "Percentage"
    },
    "vXlB5QC3mZJw1auWaIfK": {
      "datasource": [
        "Maintenance logs",
        "GPS tracking data",
        "Accounting Software"
      ],
      "description": "Total maintenance costs divided by total miles driven.",
      "id": 13,
      "industry": "Transportation",
      "methodology": "Total maintenance costs / Total miles driven",
      "name": "Maintenance Cost per Mile",
      "sensorFieldData": [
        "Maintenance logs",
        "GPS tracking data"
      ],
      "status": "data needed",
      "targetRangeHigh": 0.1,
      "targetRangeLow": 0.02,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "USD/mile"
    },
    "Alltransportationsaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1012,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Alltransportationsaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1018,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Alltransportationsaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1024,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Alltransportationsaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1030,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Alltransportationsaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1036,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Alltransportationsaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1042,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Alltransportationsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1048,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Alltransportationsaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1054,
      "industry": "Transportation",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    },
    "Allmanufacturingfpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 929,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 935,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 941,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 947,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 953,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 959,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 965,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 971,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 977,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 983,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 989,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 995,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 1001,
      "industry": "Manufacturing"
    },
    "Allmanufacturingfpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1007,
      "industry": "Manufacturing"
    },
    "MfgOee901CatalogMetricKey01": {
      "id": 901,
      "name": "Overall Equipment Effectiveness (OEE)",
      "description": "Composite utilization of manufacturing equipment (availability × performance × quality).",
      "industry": "Manufacturing",
      "type": "Operational",
      "unit": "%",
      "methodology": "OEE = Availability × Performance × Quality (each as % of ideal)",
      "datasource": [
        "MES production export",
        "Machine run-time counters"
      ],
      "sensorFieldData": [
        "Machine state sensors",
        "Cycle time counters"
      ],
      "status": "data needed",
      "targetRangeLow": 60,
      "targetRangeHigh": 85,
      "tech": "DEEP TECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "benchmarkKey": "oee",
      "frequency": "weekly",
      "higherIsBetter": true,
      "fpaWorkflow": "Capacity planning — ties shop-floor efficiency to unit economics and capex cases."
    },
    "MfgScrap902CatalogMetricKey02": {
      "id": 902,
      "name": "Scrap Rate",
      "description": "Share of production output rejected or reworked due to quality defects.",
      "industry": "Manufacturing",
      "type": "Operational",
      "unit": "%",
      "methodology": "Scrap Rate = (Scrapped Units / Total Units Produced) × 100",
      "datasource": [
        "Quality inspection logs",
        "MES production export"
      ],
      "sensorFieldData": [
        "Inline quality sensors"
      ],
      "status": "data needed",
      "targetRangeLow": 1,
      "targetRangeHigh": 5,
      "tech": "DEEP TECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "frequency": "weekly",
      "higherIsBetter": false,
      "fpaWorkflow": "Margin protection — scrap drives COGS variance and customer chargebacks."
    },
    "MfgInvTurn903CatalogMetricKey03": {
      "id": 903,
      "name": "Inventory Turnover",
      "description": "How often inventory is sold or consumed and replaced over a period.",
      "industry": "Manufacturing",
      "type": "Financial",
      "unit": "Turns",
      "methodology": "Inventory Turnover = COGS / Average Inventory Value",
      "datasource": [
        "ERP general ledger",
        "Inventory valuation export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 4,
      "targetRangeHigh": 12,
      "tech": "FINTECH",
      "benchmarkKey": "inventory_turnover",
      "frequency": "monthly",
      "higherIsBetter": true,
      "fpaWorkflow": "Working-capital review — links ops throughput to cash tied in stock."
    },
    "MfgDownt904CatalogMetricKey04": {
      "id": 904,
      "name": "Unplanned Downtime",
      "description": "Hours or minutes of production stoppage not scheduled for maintenance.",
      "industry": "Manufacturing",
      "type": "Operational",
      "unit": "Minutes",
      "methodology": "Sum of unplanned stop events from CMMS or MES downtime codes",
      "datasource": [
        "CMMS maintenance logs",
        "MES downtime events"
      ],
      "sensorFieldData": [
        "Machine fault codes"
      ],
      "status": "data needed",
      "targetRangeLow": 30,
      "targetRangeHigh": 240,
      "tech": "DEEP TECH",
      "frequency": "weekly",
      "higherIsBetter": false,
      "fpaWorkflow": "Ops-to-finance bridge — downtime explains revenue and labor efficiency gaps."
    },
    "MfgUnitCogs905CatalogMetricKey05": {
      "id": 905,
      "name": "Unit Cost of Goods Sold",
      "description": "Fully loaded cost to produce one unit of finished goods.",
      "industry": "Manufacturing",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "methodology": "Unit COGS = Total Manufacturing COGS / Units Produced",
      "datasource": [
        "ERP general ledger",
        "MES production export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 10,
      "targetRangeHigh": 500,
      "tech": "FINTECH",
      "validationRule": "currency",
      "frequency": "monthly",
      "higherIsBetter": false,
      "fpaWorkflow": "Pricing and margin — baseline for make-vs-buy and contract manufacturing bids."
    },
    "Allmanufacturingsaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1013,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Allmanufacturingsaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1019,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Allmanufacturingsaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1025,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Allmanufacturingsaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1031,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Allmanufacturingsaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1037,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Allmanufacturingsaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1043,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Allmanufacturingsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1049,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Allmanufacturingsaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1055,
      "industry": "Manufacturing",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    },
    "Allmanufacturingmfg-capacity-utilization": {
      "datasource": [
        "Production output logs"
      ],
      "description": "Share of available production capacity actually used.",
      "id": 1073,
      "industry": "Manufacturing",
      "industryTags": [
        "Manufacturing"
      ],
      "methodology": "Capacity Utilization = (Actual Output / Maximum Possible Output) Ã— 100",
      "name": "Capacity Utilization",
      "sensorFieldData": [
        "Machine run-time counters"
      ],
      "status": "data needed",
      "targetRangeHigh": 90,
      "targetRangeLow": 70,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "weekly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "capacity_utilization",
      "fpaWorkflow": "Capacity & capex planning â€” informs make-vs-buy and expansion investment cases."
    },
    "Allhealthcarefpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 930,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 936,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 942,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 948,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 954,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 960,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 966,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 972,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 978,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 984,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 990,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 996,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 1002,
      "industry": "Healthcare"
    },
    "Allhealthcarefpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1008,
      "industry": "Healthcare"
    },
    "HcVol911CatalogMetricKey01": {
      "id": 911,
      "name": "Patient Volume",
      "description": "Count of patient encounters or admissions in the reporting period (aggregated, de-identified).",
      "industry": "Healthcare",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Sum of distinct encounter or admission records in period",
      "datasource": [
        "De-identified operational census export",
        "Scheduling utilization summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 500,
      "targetRangeHigh": 50000,
      "tech": "DEEP TECH",
      "frequency": "weekly",
      "higherIsBetter": true,
      "fpaWorkflow": "Capacity planning — volume drives staffing ratios and revenue forecasts."
    },
    "HcLos912CatalogMetricKey02": {
      "id": 912,
      "name": "Average Length of Stay",
      "description": "Mean inpatient days per discharge (aggregated by service line).",
      "industry": "Healthcare",
      "type": "Operational",
      "unit": "Days",
      "methodology": "ALOS = Total Inpatient Days / Discharges",
      "datasource": [
        "De-identified operational census export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 3,
      "targetRangeHigh": 8,
      "tech": "DEEP TECH",
      "validationRule": "days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "fpaWorkflow": "Throughput and bed management — ALOS affects margin per bed and backlog."
    },
    "HcReadmit913CatalogMetricKey03": {
      "id": 913,
      "name": "Readmission Rate (30-day proxy)",
      "description": "Share of discharges with a related readmission within 30 days (aggregated quality signal).",
      "industry": "Healthcare",
      "type": "Operational",
      "unit": "%",
      "methodology": "Readmissions / Eligible Discharges × 100 (de-identified cohort)",
      "datasource": [
        "De-identified quality outcomes summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 5,
      "targetRangeHigh": 15,
      "tech": "DEEP TECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "frequency": "monthly",
      "higherIsBetter": false,
      "fpaWorkflow": "Quality-to-cost — readmissions drive variable cost and value-based contract risk."
    },
    "HcStaff914CatalogMetricKey04": {
      "id": 914,
      "name": "Staffing Ratio",
      "description": "Clinical staff hours per occupied bed or per encounter (aggregated).",
      "industry": "Healthcare",
      "type": "Operational",
      "unit": "Ratio",
      "methodology": "Staff Hours / Occupied Beds (or / Encounters) for the period",
      "datasource": [
        "Scheduling utilization summary",
        "Payroll hours summary (no employee names in bronze templates)"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 0.5,
      "targetRangeHigh": 3,
      "tech": "DEEP TECH",
      "frequency": "weekly",
      "higherIsBetter": true,
      "fpaWorkflow": "Labor efficiency — primary driver of operating margin in acute settings."
    },
    "HcDenial915CatalogMetricKey05": {
      "id": 915,
      "name": "Claim Denial Rate",
      "description": "Share of claims denied on first submission (revenue cycle quality).",
      "industry": "Healthcare",
      "type": "Financial",
      "unit": "%",
      "methodology": "Denied Claims / Submitted Claims × 100",
      "datasource": [
        "Revenue cycle summary export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 3,
      "targetRangeHigh": 12,
      "tech": "FINTECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "frequency": "monthly",
      "higherIsBetter": false,
      "fpaWorkflow": "Cash collection — denials delay revenue recognition and increase AR days."
    },
    "Allhealthcaresaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1014,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Allhealthcaresaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1020,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Allhealthcaresaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1026,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Allhealthcaresaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1032,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Allhealthcaresaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1038,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Allhealthcaresaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1044,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Allhealthcaresaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1050,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Allhealthcaresaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1056,
      "industry": "Healthcare",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    },
    "Allrestaurantsfpa-current-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "Current Ratio = Current Assets / Current Liabilities",
      "name": "Current Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 2,
      "targetRangeLow": 1.2,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "current_ratio",
      "fpaWorkflow": "Liquidity & solvency review â€” feeds covenant monitoring and the monthly board liquidity pack.",
      "id": 931,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-quick-ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory â€” most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets âˆ’ Inventory) / Current Liabilities",
      "name": "Quick Ratio (Acid Test)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1.5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 20
      },
      "validationRule": "ratio",
      "benchmarkKey": "quick_ratio",
      "fpaWorkflow": "Liquidity stress testing â€” pairs with cash-flow forecasting for downside scenarios.",
      "id": 937,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-gross-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Share of revenue retained after the direct cost of goods sold.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Gross Margin = ((Revenue âˆ’ COGS) / Revenue) Ã— 100",
      "name": "Gross Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 70,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_margin",
      "fpaWorkflow": "Unit-economics and pricing review â€” anchors contribution-margin and budget-vs-actual analysis.",
      "id": 943,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-operating-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) Ã— 100",
      "name": "Operating Margin (EBIT)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 25,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "operating_margin",
      "fpaWorkflow": "Opex efficiency review â€” drives the monthly variance bridge and cost-control actions.",
      "id": 949,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-ebitda-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
        "Financial Services",
        "All"
      ],
      "methodology": "EBITDA Margin = (EBITDA / Revenue) Ã— 100",
      "name": "EBITDA Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 15,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "ebitda_margin",
      "fpaWorkflow": "Valuation & lender reporting â€” primary profitability proxy in models and covenant tests.",
      "id": 955,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-net-margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) Ã— 100",
      "name": "Net Profit Margin",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 8,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "net_margin",
      "fpaWorkflow": "Board P&L reporting â€” the headline profitability line for the monthly close pack.",
      "id": 961,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-revenue-growth": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Period-over-period revenue growth rate.",
      "industryTags": [
        "Corporate Finance",
        "SaaS",
        "All"
      ],
      "methodology": "Revenue Growth = ((Current Period Revenue âˆ’ Prior Period Revenue) / Prior Period Revenue) Ã— 100",
      "name": "Revenue Growth Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 30,
      "targetRangeLow": 10,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 1000
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "revenue_growth",
      "fpaWorkflow": "Growth planning â€” drives top-line forecast, hiring plan and the rolling re-forecast.",
      "id": 967,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-working-capital": {
      "datasource": [
        "Financial statements",
        "Balance sheet",
        "Trial balance"
      ],
      "description": "Operating liquidity available to fund day-to-day operations.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Working Capital = Current Assets âˆ’ Current Liabilities",
      "name": "Working Capital",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 100000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "working_capital",
      "fpaWorkflow": "Working-capital management â€” feeds the 13-week cash forecast and treasury planning.",
      "id": 973,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-dso": {
      "datasource": [
        "Accounts receivable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days to collect cash after a sale.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) Ã— Number of Days",
      "name": "Days Sales Outstanding (DSO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 45,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dso",
      "fpaWorkflow": "Receivables & collections review â€” directly improves the cash-conversion cycle and forecast accuracy.",
      "id": 979,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-dpo": {
      "datasource": [
        "Accounts payable aging",
        "Financial statements",
        "General ledger"
      ],
      "description": "Average number of days the business takes to pay its suppliers.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "DPO = (Accounts Payable / COGS) Ã— Number of Days",
      "name": "Days Payable Outstanding (DPO)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 30,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 365
      },
      "validationRule": "days",
      "benchmarkKey": "dpo",
      "fpaWorkflow": "Payables optimization â€” balances supplier terms against the cash-conversion cycle.",
      "id": 985,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-ccc": {
      "datasource": [
        "Accounts receivable aging",
        "Accounts payable aging",
        "Inventory records"
      ],
      "description": "Days to convert investments in inventory and receivables back into cash.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "CCC = DSO + Days Inventory Outstanding âˆ’ DPO",
      "name": "Cash Conversion Cycle",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 20,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Days",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": -180,
        "hardMax": 365
      },
      "validationRule": "days_signed",
      "benchmarkKey": "ccc",
      "fpaWorkflow": "Cash-efficiency program â€” a north-star working-capital KPI tracked in the treasury review.",
      "id": 991,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-operating-cash-flow": {
      "datasource": [
        "Financial statements",
        "Bank statements",
        "General ledger"
      ],
      "description": "Cash generated by core operations during the period.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges âˆ’ Increase in Working Capital",
      "name": "Operating Cash Flow",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 1000000,
      "targetRangeLow": 200000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -1000000000,
        "hardMax": 1000000000
      },
      "validationRule": "currency_signed",
      "benchmarkKey": "operating_cash_flow",
      "fpaWorkflow": "Cash-flow forecasting â€” the anchor of the direct/indirect cash-flow statement.",
      "id": 997,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-burn-rate": {
      "datasource": [
        "Bank statements",
        "Financial statements",
        "General ledger"
      ],
      "description": "Net cash consumed per month (negative net operating cash flow).",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Burn = Cash Out âˆ’ Cash In (per month)",
      "name": "Monthly Burn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 200000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "burn_rate",
      "fpaWorkflow": "Runway management â€” paired with cash balance to govern the spend plan and fundraising timing.",
      "id": 1003,
      "industry": "Restaurants"
    },
    "Allrestaurantsfpa-runway": {
      "datasource": [
        "Bank statements",
        "Financial statements"
      ],
      "description": "Number of months of cash remaining at the current net burn rate.",
      "industryTags": [
        "SaaS",
        "Corporate Finance",
        "All"
      ],
      "methodology": "Runway (months) = Current Cash Balance / Monthly Net Burn",
      "name": "Cash Runway",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 24,
      "targetRangeLow": 12,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Months",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 240
      },
      "validationRule": "number",
      "benchmarkKey": "runway",
      "fpaWorkflow": "Board & investor reporting â€” the survival metric that gates hiring and spend decisions.",
      "id": 1009,
      "industry": "Restaurants"
    },
    "RestFood921CatalogMetricKey01": {
      "id": 921,
      "name": "Food Cost Percentage",
      "description": "Cost of food sold as a percentage of restaurant revenue.",
      "industry": "Restaurants",
      "type": "Financial",
      "unit": "%",
      "methodology": "Food Cost % = Food COGS / Food Revenue × 100",
      "datasource": [
        "POS daily close",
        "Inventory count export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 28,
      "targetRangeHigh": 35,
      "tech": "FINTECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "benchmarkKey": "food_cost_pct",
      "frequency": "weekly",
      "higherIsBetter": false,
      "fpaWorkflow": "Margin control — primary lever in restaurant P&L alongside labor."
    },
    "RestLabor922CatalogMetricKey02": {
      "id": 922,
      "name": "Labor Cost Percentage",
      "description": "Total labor cost as a percentage of revenue for the period.",
      "industry": "Restaurants",
      "type": "Financial",
      "unit": "%",
      "methodology": "Labor Cost % = Total Labor / Total Revenue × 100",
      "datasource": [
        "POS daily close",
        "Labor scheduling export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 25,
      "targetRangeHigh": 35,
      "tech": "FINTECH",
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "benchmarkKey": "labor_cost_pct",
      "frequency": "weekly",
      "higherIsBetter": false,
      "fpaWorkflow": "Prime cost management — labor plus food defines controllable margin."
    },
    "RestTurn923CatalogMetricKey03": {
      "id": 923,
      "name": "Table Turn Time",
      "description": "Average minutes from seat to payment for dine-in service.",
      "industry": "Restaurants",
      "type": "Operational",
      "unit": "Minutes",
      "methodology": "Mean elapsed time per closed check for dine-in dayparts",
      "datasource": [
        "POS daily close"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 45,
      "targetRangeHigh": 90,
      "tech": "DEEP TECH",
      "frequency": "daily",
      "higherIsBetter": false,
      "fpaWorkflow": "Throughput — turn time drives covers and revenue per seat hour."
    },
    "RestWaste924CatalogMetricKey04": {
      "id": 924,
      "name": "Food Waste and Spoilage",
      "description": "Value or weight of inventory written off as waste or spoilage.",
      "industry": "Restaurants",
      "type": "Operational",
      "unit": "Currency (e.g., USD)",
      "methodology": "Sum of waste/spoilage adjustments from inventory counts",
      "datasource": [
        "Inventory count export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": 100,
      "targetRangeHigh": 5000,
      "tech": "DEEP TECH",
      "validationRule": "currency",
      "frequency": "weekly",
      "higherIsBetter": false,
      "fpaWorkflow": "Cost control — waste directly inflates food cost percentage."
    },
    "RestSss925CatalogMetricKey05": {
      "id": 925,
      "name": "Same-Store Sales Growth",
      "description": "Year-over-year revenue change for locations open in both periods.",
      "industry": "Restaurants",
      "type": "Financial",
      "unit": "%",
      "methodology": "(Current Period SSS Revenue − Prior Year SSS Revenue) / Prior Year SSS Revenue × 100",
      "datasource": [
        "POS daily close"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeLow": -5,
      "targetRangeHigh": 15,
      "tech": "FINTECH",
      "validationRule": "percentage",
      "frequency": "monthly",
      "higherIsBetter": true,
      "fpaWorkflow": "Growth narrative — separates comp performance from new unit expansion."
    },
    "Allrestaurantssaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1015,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "MRR = Î£ (Active Subscriptions Ã— Monthly Subscription Price)",
      "name": "Monthly Recurring Revenue (MRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 500000,
      "targetRangeLow": 50000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/month",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 1000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "mrr",
      "fpaWorkflow": "Recurring-revenue forecast â€” the foundation of the SaaS operating model and ARR bridge."
    },
    "Allrestaurantssaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1021,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "ARR = MRR Ã— 12",
      "name": "Annual Recurring Revenue (ARR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 6000000,
      "targetRangeLow": 600000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency/year",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000000
      },
      "validationRule": "currency",
      "benchmarkKey": "arr",
      "fpaWorkflow": "Annual planning & valuation â€” the headline scale metric for SaaS boards and investors."
    },
    "Allrestaurantssaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1027,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "NRR = ((Starting MRR + Expansion âˆ’ Contraction âˆ’ Churn) / Starting MRR) Ã— 100",
      "name": "Net Revenue Retention (NRR)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 120,
      "targetRangeLow": 100,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 300
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "nrr",
      "fpaWorkflow": "Expansion & retention modeling â€” the strongest signal of durable SaaS growth quality."
    },
    "Allrestaurantssaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1033,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) Ã— 100",
      "name": "Gross Revenue Churn Rate",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 1,
      "tech": "FINTECH",
      "type": "Operational",
      "unit": "%",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "percentage",
      "benchmarkKey": "gross_churn",
      "fpaWorkflow": "Retention review â€” informs the renewal forecast and customer-success investment case."
    },
    "Allrestaurantssaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales & marketing cost to acquire one new customer.",
      "id": 1039,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "CAC = Total Sales & Marketing Spend / New Customers Acquired",
      "name": "Customer Acquisition Cost (CAC)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 10000,
      "targetRangeLow": 500,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "monthly",
      "higherIsBetter": false,
      "validRange": {
        "hardMin": 0,
        "hardMax": 10000000
      },
      "validationRule": "currency",
      "benchmarkKey": "cac",
      "fpaWorkflow": "Go-to-market efficiency â€” feeds CAC payback and the marketing budget allocation."
    },
    "Allrestaurantssaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1045,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV = (Average Revenue per Account Ã— Gross Margin %) / Churn Rate",
      "name": "Customer Lifetime Value (LTV)",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 50000,
      "targetRangeLow": 3000,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Currency (e.g., USD)",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100000000
      },
      "validationRule": "currency",
      "benchmarkKey": "ltv",
      "fpaWorkflow": "Unit-economics modeling â€” combined with CAC to gate growth-spend decisions."
    },
    "Allrestaurantssaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost â€” core SaaS unit economics.",
      "id": 1051,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost",
      "name": "LTV : CAC Ratio",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 5,
      "targetRangeLow": 3,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "Ratio",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "validationRule": "ratio",
      "benchmarkKey": "ltv_cac",
      "fpaWorkflow": "Investment efficiency â€” a board-level guardrail (target â‰¥ 3:1) for scaling spend."
    },
    "Allrestaurantssaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1057,
      "industry": "Restaurants",
      "industryTags": [
        "SaaS"
      ],
      "methodology": "Rule of 40 = Revenue Growth % + Profit Margin %",
      "name": "Rule of 40",
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "targetRangeHigh": 60,
      "targetRangeLow": 40,
      "tech": "FINTECH",
      "type": "Financial",
      "unit": "%",
      "frequency": "quarterly",
      "higherIsBetter": true,
      "validRange": {
        "hardMin": -100,
        "hardMax": 200
      },
      "validationRule": "percentage_unbounded",
      "benchmarkKey": "rule_of_40",
      "fpaWorkflow": "Growth-vs-profitability review â€” a single composite health score for SaaS planning."
    }
  }
};

export const METRICS = enrichMetrics(REFERENCE_DATA.metrics);
