/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import { enrichMetrics, deriveMetricValidation } from './catalogEnrichment.js';

export { deriveMetricValidation };

export const REFERENCE_DATA = {
  "metrics": {
    "real_estate.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 926,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 932,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 938,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 944,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 950,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 956,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 962,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 968,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 974,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 980,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 986,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 992,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 998,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1004,
      "industry": "Real Estate",
      "segment": "core"
    },
    "real_estate.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1082,
      "industry": "Real Estate",
      "segment": "core"
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
      "fpaWorkflow": "Liquidity & covenant review — lender DSCR tests and monthly board liquidity pack.",
      "financialImpact": "Covenant headroom — breach risk for debt service and refinancing",
      "operationalSignal": "NOI and opex from property operations feed DSCR numerator and denominator",
      "segment": "financial",
      "slug": "dscr",
      "calc": {
        "expr": "noi / annual_debt_service",
        "inputs": [
          "annual_debt_service"
        ]
      }
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
      "unit": "%",
      "segment": "operations",
      "slug": "vacancy_rate",
      "calc": {
        "expr": "vacant_units / total_units * 100",
        "inputs": [
          "vacant_units",
          "total_units"
        ]
      }
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
      "unit": "%",
      "segment": "financial",
      "slug": "loan_to_value",
      "calc": {
        "expr": "mortgage_amount / appraised_value * 100",
        "inputs": [
          "mortgage_amount",
          "appraised_value"
        ]
      }
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
      "unit": "Number",
      "segment": "financial",
      "slug": "grm",
      "calc": {
        "expr": "property_price / gross_rental_income",
        "inputs": [
          "property_price",
          "gross_rental_income"
        ]
      }
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
      "unit": "Currency (e.g., USD)",
      "segment": "financial",
      "slug": "noi",
      "calc": {
        "expr": "gross_rental_income - operating_expenses",
        "inputs": [
          "gross_rental_income",
          "operating_expenses"
        ]
      }
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
      "unit": "Percentage",
      "segment": "financial",
      "slug": "roi",
      "calc": {
        "expr": "net_profit / cost_of_investment * 100",
        "inputs": [
          "net_profit",
          "cost_of_investment"
        ]
      }
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
      "unit": "Currency (e.g., USD)",
      "segment": "financial",
      "slug": "re_cash_flow",
      "calc": {
        "expr": "rental_income - operating_expenses - debt_service",
        "inputs": [
          "rental_income",
          "operating_expenses",
          "debt_service"
        ]
      }
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
      "fpaWorkflow": "Valuation & lender reporting — yield sensitivity for divestiture and acquisition cases.",
      "financialImpact": "Yield and valuation — cap rate moves drive NAV and lender collateral tests",
      "operationalSignal": "NOI from operations and appraisal inputs drive cap rate numerator and denominator",
      "segment": "financial",
      "slug": "cap_rate",
      "calc": {
        "expr": "noi / property_value * 100",
        "inputs": [
          "property_value"
        ]
      }
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
      "unit": "Percentage",
      "segment": "financial",
      "slug": "cash_on_cash_return",
      "calc": {
        "expr": "net_cash_flow / initial_cash_investment * 100",
        "inputs": [
          "net_cash_flow",
          "initial_cash_investment"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Allrealestatesaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
    },
    "vertical_farming.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 927,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 933,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 939,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 945,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 951,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 957,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 963,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 969,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 975,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 981,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 987,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 993,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 999,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1005,
      "industry": "Vertical Farming",
      "segment": "core"
    },
    "vertical_farming.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1085,
      "industry": "Vertical Farming",
      "segment": "core"
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
      "unit": "Currency (e.g., USD)",
      "segment": "financial",
      "slug": "predictive_maintenance_savings",
      "calc": {
        "expr": "repair_cost_avoided - predictive_maintenance_cost",
        "inputs": [
          "repair_cost_avoided",
          "predictive_maintenance_cost"
        ]
      }
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
      "unit": "$/kg",
      "segment": "operations",
      "slug": "total_cost",
      "calc": {
        "expr": "total_production_cost + total_operational_cost",
        "inputs": [
          "total_production_cost",
          "total_operational_cost"
        ]
      }
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
      "fpaWorkflow": "Opex efficiency review — energy spikes explain variance before close.",
      "operationalSignal": "Field telemetry — light and power sensors",
      "financialImpact": "Opex and margin — flows to NOI and covenant headroom",
      "segment": "operations",
      "slug": "energy_light_efficiency",
      "calc": {
        "expr": "energy_consumed / total_light_delivered",
        "inputs": [
          "energy_consumed",
          "total_light_delivered"
        ]
      }
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
      "unit": "Index",
      "segment": "operations",
      "slug": "crop_health_index",
      "calc": {
        "expr": "sum_health_scores / total_crops * 100",
        "inputs": [
          "sum_health_scores",
          "total_crops"
        ]
      }
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
      "unit": "%",
      "segment": "financial",
      "slug": "vf_net_profit",
      "calc": {
        "expr": "produce_revenue - total_production_cost - total_operational_cost",
        "inputs": [
          "produce_revenue",
          "total_production_cost",
          "total_operational_cost"
        ]
      }
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
      "unit": "$/kg",
      "segment": "operations",
      "slug": "labor_cost_per_kg",
      "calc": {
        "expr": "total_labor_costs / total_harvested_kg",
        "inputs": [
          "total_labor_costs",
          "total_harvested_kg"
        ]
      }
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
      "unit": "kg/liter",
      "segment": "operations",
      "slug": "water_use_efficiency",
      "calc": {
        "expr": "total_harvested_kg / total_water_liters",
        "inputs": [
          "total_harvested_kg",
          "total_water_liters"
        ]
      }
    },
    "jnQw1pD0motTKBZ9csPD": {
      "datasource": [
        "Harvest logs",
        "Farm management systems"
      ],
      "description": "Amount of produce harvested per square meter of growing area.",
      "id": 15,
      "industry": "Vertical Farming",
      "methodology": "Yield per Square Meter = Total Harvested Produce (kg) / Total Growing Area (m²)",
      "name": "Yield per Square Meter",
      "sensorFieldData": [
        "Crop monitoring systems"
      ],
      "status": "data needed",
      "targetRangeHigh": 20,
      "targetRangeLow": 5,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kg/m²",
      "segment": "operations",
      "slug": "yield_per_sqm",
      "calc": {
        "expr": "total_harvested_kg / total_growing_area",
        "inputs": [
          "total_harvested_kg",
          "total_growing_area"
        ]
      }
    },
    "yGoqLDC3Mrk1OeH36jkB": {
      "datasource": [
        "Energy bills",
        "Farm management systems"
      ],
      "description": "Amount of energy consumed per square meter of growing area.",
      "id": 17,
      "industry": "Vertical Farming",
      "methodology": "Energy Consumption per Square Meter = Total Energy Consumed (kWh) / Total Growing Area (m²)",
      "name": "Energy Consumption per Square Meter",
      "sensorFieldData": [
        "Energy meters"
      ],
      "status": "data needed",
      "targetRangeHigh": 200,
      "targetRangeLow": 50,
      "tech": "DEEP TECH",
      "type": "Operational",
      "unit": "kWh/m²",
      "segment": "operations",
      "slug": "energy_per_sqm",
      "calc": {
        "expr": "total_energy_kwh / total_growing_area",
        "inputs": [
          "total_energy_kwh",
          "total_growing_area"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Allverticalfarmingsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
    },
    "transportation.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 928,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 934,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 940,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 946,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 952,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 958,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 964,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 970,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 976,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 982,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 988,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 994,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 1000,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1006,
      "industry": "Transportation",
      "segment": "core"
    },
    "transportation.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1084,
      "industry": "Transportation",
      "segment": "core"
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
      "unit": "%",
      "segment": "operations",
      "slug": "driver_turnover",
      "calc": {
        "expr": "drivers_left / total_drivers * 100",
        "inputs": [
          "drivers_left",
          "total_drivers"
        ]
      }
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
      "unit": "Miles per Gallon (MPG)",
      "segment": "operations",
      "slug": "fuel_efficiency",
      "calc": {
        "expr": "total_miles / total_fuel",
        "inputs": [
          "total_miles",
          "total_fuel"
        ]
      }
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
      "unit": "%",
      "segment": "operations",
      "slug": "on_time_delivery_rate",
      "calc": {
        "expr": "on_time_deliveries / total_deliveries * 100",
        "inputs": [
          "on_time_deliveries",
          "total_deliveries"
        ]
      }
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
      "unit": "Percentage",
      "segment": "operations",
      "slug": "fleet_utilization",
      "calc": {
        "expr": "fleet_time_in_use / fleet_available_time * 100",
        "inputs": [
          "fleet_time_in_use",
          "fleet_available_time"
        ]
      }
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
      "unit": "USD/mile",
      "segment": "operations",
      "slug": "maintenance_cost_per_mile",
      "calc": {
        "expr": "total_maintenance_costs / total_miles",
        "inputs": [
          "total_maintenance_costs",
          "total_miles"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Alltransportationsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
    },
    "manufacturing.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 929,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 935,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 941,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 947,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 953,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 959,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 965,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 971,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 977,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 983,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 989,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 995,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 1001,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1007,
      "industry": "Manufacturing",
      "segment": "core"
    },
    "manufacturing.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1081,
      "industry": "Manufacturing",
      "segment": "core"
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
      "fpaWorkflow": "Capacity planning — ties shop-floor efficiency to unit economics and capex cases.",
      "segment": "operations",
      "slug": "oee",
      "calc": {
        "expr": "availability * performance * quality",
        "inputs": [
          "availability",
          "performance",
          "quality"
        ]
      }
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
      "fpaWorkflow": "Margin protection — scrap drives COGS variance and customer chargebacks.",
      "segment": "operations",
      "slug": "scrap_rate",
      "calc": {
        "expr": "scrapped_units / total_units * 100",
        "inputs": [
          "scrapped_units",
          "total_units"
        ]
      }
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
      "fpaWorkflow": "Working-capital review — links ops throughput to cash tied in stock.",
      "segment": "financial",
      "slug": "inventory_turnover",
      "calc": {
        "expr": "cogs / average_inventory",
        "inputs": [
          "cogs",
          "average_inventory"
        ]
      }
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
      "fpaWorkflow": "Ops-to-finance bridge — downtime explains revenue and labor efficiency gaps.",
      "segment": "operations",
      "slug": "unplanned_downtime",
      "input": true
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
      "fpaWorkflow": "Pricing and margin — baseline for make-vs-buy and contract manufacturing bids.",
      "segment": "financial",
      "slug": "unit_cogs",
      "calc": {
        "expr": "total_manufacturing_cogs / units_produced",
        "inputs": [
          "total_manufacturing_cogs",
          "units_produced"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Allmanufacturingsaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
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
      "methodology": "Capacity Utilization = (Actual Output / Maximum Possible Output) × 100",
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
      "fpaWorkflow": "Capacity & capex planning — informs make-vs-buy and expansion investment cases.",
      "segment": "operations",
      "slug": "capacity_utilization",
      "calc": {
        "expr": "actual_output / max_output * 100",
        "inputs": [
          "actual_output",
          "max_output"
        ]
      }
    },
    "healthcare.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 930,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 936,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 942,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 948,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 954,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 960,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 966,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 972,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 978,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 984,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 990,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 996,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 1002,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1008,
      "industry": "Healthcare",
      "segment": "core"
    },
    "healthcare.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1080,
      "industry": "Healthcare",
      "segment": "core"
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
      "fpaWorkflow": "Capacity planning — volume drives staffing ratios and revenue forecasts.",
      "segment": "provider",
      "slug": "patient_volume",
      "input": true
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
      "fpaWorkflow": "Throughput and bed management — ALOS affects margin per bed and backlog.",
      "segment": "provider",
      "slug": "average_length_of_stay",
      "calc": {
        "expr": "inpatient_days / discharges",
        "inputs": [
          "inpatient_days",
          "discharges"
        ]
      }
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
      "fpaWorkflow": "Quality-to-cost — readmissions drive variable cost and value-based contract risk.",
      "segment": "quality",
      "slug": "readmission_rate_30d",
      "calc": {
        "expr": "readmissions / eligible_discharges * 100",
        "inputs": [
          "readmissions",
          "eligible_discharges"
        ]
      }
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
      "fpaWorkflow": "Labor efficiency — primary driver of operating margin in acute settings.",
      "segment": "provider",
      "slug": "staffing_ratio",
      "calc": {
        "expr": "staff_hours / occupied_beds",
        "inputs": [
          "staff_hours",
          "occupied_beds"
        ]
      }
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
      "fpaWorkflow": "Cash collection — denials delay revenue recognition and increase AR days.",
      "segment": "revenue_cycle",
      "slug": "claim_denial_rate",
      "calc": {
        "expr": "denied_claims / submitted_claims * 100",
        "inputs": [
          "denied_claims",
          "submitted_claims"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Allhealthcaresaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
    },
    "healthcare.provider.bed_occupancy_rate": {
      "id": 1400,
      "name": "Bed Occupancy Rate",
      "industry": "Healthcare",
      "segment": "provider",
      "slug": "bed_occupancy_rate",
      "type": "Operational",
      "unit": "%",
      "methodology": "Bed Occupancy = (Occupied Beds / Available Beds) × 100",
      "description": "Bed Occupancy Rate (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "occupied_beds / available_beds * 100",
        "inputs": [
          "occupied_beds",
          "available_beds"
        ]
      }
    },
    "healthcare.provider.or_utilization": {
      "id": 1401,
      "name": "Operating Room Utilization",
      "industry": "Healthcare",
      "segment": "provider",
      "slug": "or_utilization",
      "type": "Operational",
      "unit": "%",
      "methodology": "OR Utilization = (OR Time Used / OR Time Available) × 100",
      "description": "Operating Room Utilization (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "or_time_used / or_time_available * 100",
        "inputs": [
          "or_time_used",
          "or_time_available"
        ]
      }
    },
    "healthcare.provider.ed_wait_time": {
      "id": 1402,
      "name": "ED Wait Time",
      "industry": "Healthcare",
      "segment": "provider",
      "slug": "ed_wait_time",
      "type": "Operational",
      "unit": "Minutes",
      "methodology": "Mean minutes from ED arrival to provider (directly measured).",
      "description": "ED Wait Time (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "input": true
    },
    "healthcare.provider.case_mix_index": {
      "id": 1403,
      "name": "Case Mix Index",
      "industry": "Healthcare",
      "segment": "provider",
      "slug": "case_mix_index",
      "type": "Operational",
      "unit": "Index",
      "methodology": "Average DRG weight across discharges (directly measured).",
      "description": "Case Mix Index (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "input": true
    },
    "healthcare.provider.cost_per_discharge": {
      "id": 1404,
      "name": "Cost per Discharge",
      "industry": "Healthcare",
      "segment": "provider",
      "slug": "cost_per_discharge",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Cost per Discharge = Total Operating Cost / Discharges",
      "description": "Cost per Discharge (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "total_operating_cost / discharges",
        "inputs": [
          "total_operating_cost",
          "discharges"
        ]
      }
    },
    "healthcare.revenue_cycle.ar_days": {
      "id": 1405,
      "name": "AR Days",
      "industry": "Healthcare",
      "segment": "revenue_cycle",
      "slug": "ar_days",
      "type": "Financial",
      "unit": "Days",
      "methodology": "AR Days = (Accounts Receivable / Net Patient Revenue) × Days",
      "description": "AR Days (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "accounts_receivable / net_patient_revenue * days",
        "inputs": [
          "accounts_receivable",
          "net_patient_revenue",
          "days"
        ]
      }
    },
    "healthcare.revenue_cycle.clean_claim_rate": {
      "id": 1406,
      "name": "Clean Claim Rate",
      "industry": "Healthcare",
      "segment": "revenue_cycle",
      "slug": "clean_claim_rate",
      "type": "Financial",
      "unit": "%",
      "methodology": "Clean Claim Rate = (Clean Claims / Total Claims) × 100",
      "description": "Clean Claim Rate (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "clean_claims / total_claims * 100",
        "inputs": [
          "clean_claims",
          "total_claims"
        ]
      }
    },
    "healthcare.quality.mortality_rate": {
      "id": 1407,
      "name": "Inpatient Mortality Rate",
      "industry": "Healthcare",
      "segment": "quality",
      "slug": "mortality_rate",
      "type": "Operational",
      "unit": "%",
      "methodology": "Mortality Rate = (Inpatient Deaths / Discharges) × 100",
      "description": "Inpatient Mortality Rate (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "inpatient_deaths / discharges * 100",
        "inputs": [
          "inpatient_deaths",
          "discharges"
        ]
      }
    },
    "healthcare.quality.infection_rate": {
      "id": 1408,
      "name": "Healthcare-Associated Infection Rate",
      "industry": "Healthcare",
      "segment": "quality",
      "slug": "infection_rate",
      "type": "Operational",
      "unit": "Per 1000 patient-days",
      "methodology": "HAI Rate = (Infections / Patient Days) × 1000",
      "description": "Healthcare-Associated Infection Rate (aggregated, de-identified).",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "infections / patient_days * 1000",
        "inputs": [
          "infections",
          "patient_days"
        ]
      }
    },
    "restaurants.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 931,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 937,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 943,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 949,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 955,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 961,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 967,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 973,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 979,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 985,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 991,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 997,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 1003,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1009,
      "industry": "Restaurants",
      "segment": "core"
    },
    "restaurants.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1083,
      "industry": "Restaurants",
      "segment": "core"
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
      "fpaWorkflow": "Margin control — primary lever in restaurant P&L alongside labor.",
      "segment": "financial",
      "slug": "food_cost_pct",
      "calc": {
        "expr": "food_cogs / food_revenue * 100",
        "inputs": [
          "food_cogs",
          "food_revenue"
        ]
      }
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
      "fpaWorkflow": "Prime cost management — labor plus food defines controllable margin.",
      "segment": "financial",
      "slug": "labor_cost_pct",
      "calc": {
        "expr": "total_labor / total_revenue * 100",
        "inputs": [
          "total_labor",
          "total_revenue"
        ]
      }
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
      "fpaWorkflow": "Throughput — turn time drives covers and revenue per seat hour.",
      "segment": "operations",
      "slug": "table_turnover",
      "input": true
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
      "fpaWorkflow": "Cost control — waste directly inflates food cost percentage.",
      "segment": "operations",
      "slug": "food_waste",
      "input": true
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
      "fpaWorkflow": "Growth narrative — separates comp performance from new unit expansion.",
      "segment": "financial",
      "slug": "same_store_sales_growth",
      "calc": {
        "expr": "(current_sss - prior_sss) / prior_sss * 100",
        "inputs": [
          "current_sss",
          "prior_sss"
        ]
      }
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
      "methodology": "MRR = Σ (Active Subscriptions × Monthly Subscription Price)",
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
      "fpaWorkflow": "Recurring-revenue forecast — the foundation of the SaaS operating model and ARR bridge.",
      "segment": "subscription",
      "slug": "mrr",
      "calc": {
        "expr": "active_subscriptions * avg_monthly_price",
        "inputs": [
          "active_subscriptions",
          "avg_monthly_price"
        ]
      }
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
      "methodology": "ARR = MRR × 12",
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
      "fpaWorkflow": "Annual planning & valuation — the headline scale metric for SaaS boards and investors.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
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
      "methodology": "NRR = ((Starting MRR + Expansion − Contraction − Churn) / Starting MRR) × 100",
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
      "fpaWorkflow": "Expansion & retention modeling — the strongest signal of durable SaaS growth quality.",
      "segment": "subscription",
      "slug": "nrr",
      "calc": {
        "expr": "(starting_mrr + expansion_mrr - contraction_mrr - churned_mrr) / starting_mrr * 100",
        "inputs": [
          "starting_mrr",
          "expansion_mrr",
          "contraction_mrr",
          "churned_mrr"
        ]
      }
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
      "methodology": "Gross Churn = (Churned MRR / Starting MRR) × 100",
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
      "fpaWorkflow": "Retention review — informs the renewal forecast and customer-success investment case.",
      "segment": "subscription",
      "slug": "gross_churn",
      "calc": {
        "expr": "churned_mrr / starting_mrr * 100",
        "inputs": [
          "churned_mrr",
          "starting_mrr"
        ]
      }
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
      "fpaWorkflow": "Go-to-market efficiency — feeds CAC payback and the marketing budget allocation.",
      "segment": "subscription",
      "slug": "cac",
      "calc": {
        "expr": "sales_marketing_spend / new_customers",
        "inputs": [
          "sales_marketing_spend",
          "new_customers"
        ]
      }
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
      "methodology": "LTV = (Average Revenue per Account × Gross Margin %) / Churn Rate",
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
      "fpaWorkflow": "Unit-economics modeling — combined with CAC to gate growth-spend decisions.",
      "segment": "subscription",
      "slug": "ltv",
      "calc": {
        "expr": "(avg_revenue_per_account * gross_margin_pct / 100) / churn_rate",
        "inputs": [
          "avg_revenue_per_account",
          "gross_margin_pct",
          "churn_rate"
        ]
      }
    },
    "Allrestaurantssaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost — core SaaS unit economics.",
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
      "fpaWorkflow": "Investment efficiency — a board-level guardrail (target ≥ 3:1) for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
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
      "fpaWorkflow": "Growth-vs-profitability review — a single composite health score for SaaS planning.",
      "segment": "subscription",
      "slug": "rule_of_40",
      "calc": {
        "expr": "revenue_growth_pct + profit_margin_pct",
        "inputs": [
          "revenue_growth_pct",
          "profit_margin_pct"
        ]
      }
    },
    "life_sciences.core.current_ratio": {
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
      "fpaWorkflow": "Liquidity & solvency review — feeds covenant monitoring and the monthly board liquidity pack.",
      "calc": {
        "expr": "current_assets / current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 1300,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.quick_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Acid-test liquidity excluding inventory — most conservative short-term solvency view.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
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
      "fpaWorkflow": "Liquidity stress testing — pairs with cash-flow forecasting for downside scenarios.",
      "calc": {
        "expr": "(current_assets - inventory) / current_liabilities",
        "inputs": [
          "current_assets",
          "inventory",
          "current_liabilities"
        ]
      },
      "id": 1301,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.gross_margin": {
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
      "methodology": "Gross Margin = ((Revenue − COGS) / Revenue) × 100",
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
      "fpaWorkflow": "Unit-economics and pricing review — anchors contribution-margin and budget-vs-actual analysis.",
      "calc": {
        "expr": "(revenue - cogs) / revenue * 100",
        "inputs": [
          "revenue",
          "cogs"
        ]
      },
      "id": 1302,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.operating_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Operating profitability after operating expenses (EBIT margin).",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Operating Margin = (Operating Income / Revenue) × 100",
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
      "fpaWorkflow": "Opex efficiency review — drives the monthly variance bridge and cost-control actions.",
      "calc": {
        "expr": "operating_income / revenue * 100",
        "inputs": [
          "operating_income",
          "revenue"
        ]
      },
      "id": 1303,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.ebitda_margin": {
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
      "methodology": "EBITDA Margin = (EBITDA / Revenue) × 100",
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
      "fpaWorkflow": "Valuation & lender reporting — primary profitability proxy in models and covenant tests.",
      "calc": {
        "expr": "ebitda / revenue * 100",
        "inputs": [
          "ebitda",
          "revenue"
        ]
      },
      "id": 1304,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.net_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Bottom-line profitability after all costs, interest and tax.",
      "industryTags": [
        "Corporate Finance",
        "All"
      ],
      "methodology": "Net Profit Margin = (Net Income / Revenue) × 100",
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
      "fpaWorkflow": "Board P&L reporting — the headline profitability line for the monthly close pack.",
      "calc": {
        "expr": "net_income / revenue * 100",
        "inputs": [
          "net_income",
          "revenue"
        ]
      },
      "id": 1305,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.revenue_growth": {
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
      "methodology": "Revenue Growth = ((Current Period Revenue − Prior Period Revenue) / Prior Period Revenue) × 100",
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
      "fpaWorkflow": "Growth planning — drives top-line forecast, hiring plan and the rolling re-forecast.",
      "calc": {
        "expr": "(revenue - revenue_prior) / revenue_prior * 100",
        "inputs": [
          "revenue",
          "revenue_prior"
        ]
      },
      "id": 1306,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.working_capital": {
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
      "methodology": "Working Capital = Current Assets − Current Liabilities",
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
      "fpaWorkflow": "Working-capital management — feeds the 13-week cash forecast and treasury planning.",
      "calc": {
        "expr": "current_assets - current_liabilities",
        "inputs": [
          "current_assets",
          "current_liabilities"
        ]
      },
      "id": 1307,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.dso": {
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
      "methodology": "DSO = (Accounts Receivable / Total Credit Sales) × Number of Days",
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
      "fpaWorkflow": "Receivables & collections review — directly improves the cash-conversion cycle and forecast accuracy.",
      "calc": {
        "expr": "accounts_receivable / total_credit_sales * days",
        "inputs": [
          "accounts_receivable",
          "total_credit_sales",
          "days"
        ]
      },
      "id": 1308,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.dpo": {
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
      "methodology": "DPO = (Accounts Payable / COGS) × Number of Days",
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
      "fpaWorkflow": "Payables optimization — balances supplier terms against the cash-conversion cycle.",
      "calc": {
        "expr": "accounts_payable / cogs * days",
        "inputs": [
          "accounts_payable",
          "cogs",
          "days"
        ]
      },
      "id": 1309,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.ccc": {
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
      "methodology": "CCC = DSO + Days Inventory Outstanding − DPO",
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
      "fpaWorkflow": "Cash-efficiency program — a north-star working-capital KPI tracked in the treasury review.",
      "calc": {
        "expr": "dso + days_inventory_outstanding - dpo",
        "inputs": [
          "days_inventory_outstanding"
        ]
      },
      "id": 1310,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.operating_cash_flow": {
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
      "methodology": "Operating Cash Flow = Net Income + Non-Cash Charges − Increase in Working Capital",
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
      "fpaWorkflow": "Cash-flow forecasting — the anchor of the direct/indirect cash-flow statement.",
      "calc": {
        "expr": "net_income + non_cash_charges - increase_in_working_capital",
        "inputs": [
          "net_income",
          "non_cash_charges",
          "increase_in_working_capital"
        ]
      },
      "id": 1311,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.burn_rate": {
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
      "methodology": "Net Burn = Cash Out − Cash In (per month)",
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
      "fpaWorkflow": "Runway management — paired with cash balance to govern the spend plan and fundraising timing.",
      "calc": {
        "expr": "cash_out - cash_in",
        "inputs": [
          "cash_out",
          "cash_in"
        ]
      },
      "id": 1312,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.runway": {
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
      "fpaWorkflow": "Board & investor reporting — the survival metric that gates hiring and spend decisions.",
      "calc": {
        "expr": "current_cash_balance / burn_rate",
        "inputs": [
          "current_cash_balance"
        ]
      },
      "id": 1313,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.core.headcount": {
      "name": "Headcount (FTE)",
      "description": "Period-end count of active full-time-equivalent employees. A directly measured input, not a derived ratio.",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Period-end count of active employees expressed as full-time equivalents (directly measured, not calculated).",
      "datasource": [
        "HR records",
        "Payroll records"
      ],
      "industryTags": [
        "Corporate",
        "All"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "input": true,
      "id": 1314,
      "industry": "Life Sciences",
      "segment": "core"
    },
    "life_sciences.rnd.pipeline_active_count": {
      "id": 1330,
      "name": "Active Pipeline Programs",
      "industry": "Life Sciences",
      "segment": "rnd",
      "slug": "pipeline_active_count",
      "type": "Operational",
      "unit": "Count",
      "methodology": "Count of active R&D programs in the period (directly measured).",
      "description": "Active Pipeline Programs",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "input": true
    },
    "life_sciences.rnd.trial_cost_per_patient": {
      "id": 1331,
      "name": "Trial Cost per Patient",
      "industry": "Life Sciences",
      "segment": "rnd",
      "slug": "trial_cost_per_patient",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Trial Cost per Patient = Total Trial Cost / Patients Enrolled",
      "description": "Trial Cost per Patient",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "total_trial_cost / patients_enrolled",
        "inputs": [
          "total_trial_cost",
          "patients_enrolled"
        ]
      }
    },
    "life_sciences.rnd.phase_success_rate": {
      "id": 1332,
      "name": "Phase Success Rate",
      "industry": "Life Sciences",
      "segment": "rnd",
      "slug": "phase_success_rate",
      "type": "Operational",
      "unit": "%",
      "methodology": "Phase Success Rate = (Phases Passed / Phases Attempted) × 100",
      "description": "Phase Success Rate",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "phases_passed / phases_attempted * 100",
        "inputs": [
          "phases_passed",
          "phases_attempted"
        ]
      }
    },
    "life_sciences.supply_chain.batch_yield": {
      "id": 1333,
      "name": "Batch Yield",
      "industry": "Life Sciences",
      "segment": "supply_chain",
      "slug": "batch_yield",
      "type": "Operational",
      "unit": "%",
      "methodology": "Batch Yield = (Good Units / Total Units) × 100",
      "description": "Batch Yield",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "good_units / total_units * 100",
        "inputs": [
          "good_units",
          "total_units"
        ]
      }
    },
    "life_sciences.supply_chain.cogs_per_unit": {
      "id": 1334,
      "name": "COGS per Unit",
      "industry": "Life Sciences",
      "segment": "supply_chain",
      "slug": "cogs_per_unit",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "COGS per Unit = Total COGS / Units Produced",
      "description": "COGS per Unit",
      "datasource": [
        "De-identified operational export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "calc": {
        "expr": "total_cogs / units_produced",
        "inputs": [
          "total_cogs",
          "units_produced"
        ]
      }
    }
  }
};

export const METRICS = enrichMetrics(REFERENCE_DATA.metrics);
