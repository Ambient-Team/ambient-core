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
    "real_estate.operations.same_store_noi_growth": {
      "id": 1058,
      "name": "Same-Store NOI Growth",
      "description": "Year-over-year NOI growth on stabilized comparable properties (property-operator view).",
      "industry": "Real Estate",
      "type": "Financial",
      "unit": "%",
      "methodology": "Same-Store NOI Growth = ((Current NOI − Prior NOI) / Prior NOI) × 100 on comparable set",
      "datasource": [
        "Property management systems"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Operating performance — excludes acquisition/disposition noise.",
      "segment": "operations",
      "slug": "same_store_noi_growth",
      "input": true
    },
    "real_estate.operations.operating_expense_ratio": {
      "id": 1059,
      "name": "Operating Expense Ratio",
      "description": "Operating expenses relative to effective gross income (property operations).",
      "industry": "Real Estate",
      "type": "Financial",
      "unit": "%",
      "methodology": "OER = (Operating Expenses / Effective Gross Income) × 100",
      "datasource": [
        "Property management systems"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Cost discipline — opex leakage vs revenue.",
      "segment": "operations",
      "slug": "operating_expense_ratio",
      "calc": {
        "expr": "operating_expenses / effective_gross_income * 100",
        "inputs": [
          "operating_expenses",
          "effective_gross_income"
        ]
      }
    },
    "real_estate.operations.energy_cost_per_sf": {
      "id": 1060,
      "name": "Energy Cost per Square Foot",
      "description": "Energy spend per rentable square foot (aggregated portfolio).",
      "industry": "Real Estate",
      "type": "Operational",
      "unit": "Currency",
      "methodology": "Energy Cost per SF = Total Energy Cost / Rentable Square Feet",
      "datasource": [
        "Energy bills"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Sustainability and opex — efficiency programs and capex planning.",
      "segment": "operations",
      "slug": "energy_cost_per_sf",
      "calc": {
        "expr": "total_energy_cost / rentable_square_feet",
        "inputs": [
          "total_energy_cost",
          "rentable_square_feet"
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
      "segment": "road_freight",
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
      "segment": "road_freight",
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
      "segment": "road_freight",
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
      "segment": "road_freight",
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
      "segment": "road_freight",
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
    "transportation.rail_freight.train_utilization": {
      "id": 1860,
      "name": "Train Utilization",
      "description": "Loaded train-miles or tonnage moved relative to available train capacity (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Train Utilization = (Loaded Train-Miles / Available Train-Miles) × 100",
      "datasource": [
        "Rail freight operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Rail asset use — distinct from road fleet utilization.",
      "segment": "rail_freight",
      "slug": "train_utilization",
      "calc": {
        "expr": "loaded_train_miles / available_train_miles * 100",
        "inputs": [
          "loaded_train_miles",
          "available_train_miles"
        ]
      }
    },
    "transportation.rail_freight.cost_per_ton_mile": {
      "id": 1861,
      "name": "Cost per Ton-Mile",
      "description": "Total rail freight operating cost per ton-mile moved (aggregated).",
      "industry": "Transportation",
      "type": "Financial",
      "unit": "USD per ton-mile",
      "methodology": "Cost per Ton-Mile = Total Operating Cost / Ton-Miles Moved",
      "datasource": [
        "Rail freight operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Unit economics — pricing versus truck and barge competition.",
      "segment": "rail_freight",
      "slug": "cost_per_ton_mile",
      "calc": {
        "expr": "total_operating_cost / ton_miles_moved",
        "inputs": [
          "total_operating_cost",
          "ton_miles_moved"
        ]
      }
    },
    "transportation.rail_freight.on_time_train_performance": {
      "id": 1862,
      "name": "On-Time Train Performance",
      "description": "Share of rail shipments arriving within contractual or service window (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "OTP = (On-Time Shipments / Total Shipments) × 100",
      "datasource": [
        "Rail freight operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Service reliability — rail-specific definition.",
      "segment": "rail_freight",
      "slug": "on_time_train_performance",
      "calc": {
        "expr": "on_time_shipments / total_shipments * 100",
        "inputs": [
          "on_time_shipments",
          "total_shipments"
        ]
      }
    },
    "transportation.rail_passenger.ridership_per_train_mile": {
      "id": 1863,
      "name": "Ridership per Train-Mile",
      "description": "Passenger boardings per train-mile operated (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "Passengers per train-mile",
      "methodology": "Ridership per Train-Mile = Total Boardings / Train-Miles Operated",
      "datasource": [
        "Rail passenger operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Passenger rail productivity — load and schedule design.",
      "segment": "rail_passenger",
      "slug": "ridership_per_train_mile",
      "calc": {
        "expr": "total_boardings / train_miles_operated",
        "inputs": [
          "total_boardings",
          "train_miles_operated"
        ]
      }
    },
    "transportation.rail_passenger.farebox_recovery": {
      "id": 1864,
      "name": "Rail Farebox Recovery Ratio",
      "description": "Passenger fare revenue as a share of fully allocated operating cost (aggregated).",
      "industry": "Transportation",
      "type": "Financial",
      "unit": "%",
      "methodology": "Farebox Recovery = (Fare Revenue / Operating Cost) × 100",
      "datasource": [
        "Rail passenger operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 200
      },
      "fpaWorkflow": "Subsidy dependence — intercity and commuter rail.",
      "segment": "rail_passenger",
      "slug": "farebox_recovery",
      "calc": {
        "expr": "fare_revenue / operating_cost * 100",
        "inputs": [
          "fare_revenue",
          "operating_cost"
        ]
      }
    },
    "transportation.maritime_shipping.vessel_utilization": {
      "id": 1865,
      "name": "Vessel Utilization",
      "description": "Operating days at sea or laden days relative to available vessel days (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Vessel Utilization = (Operating Days / Available Days) × 100",
      "datasource": [
        "Maritime fleet operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Fleet employment — dry dock and positioning time.",
      "segment": "maritime_shipping",
      "slug": "vessel_utilization",
      "calc": {
        "expr": "operating_days / available_days * 100",
        "inputs": [
          "operating_days",
          "available_days"
        ]
      }
    },
    "transportation.maritime_shipping.time_charter_equivalent": {
      "id": 1866,
      "name": "Time Charter Equivalent (TCE)",
      "description": "Daily revenue net of voyage costs per day chartered (aggregated).",
      "industry": "Transportation",
      "type": "Financial",
      "unit": "Currency per day",
      "methodology": "TCE = (Voyage Revenue − Voyage Costs) / On-Hire Days",
      "datasource": [
        "Maritime fleet operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Shipping yield — bunker and route economics.",
      "segment": "maritime_shipping",
      "slug": "time_charter_equivalent",
      "calc": {
        "expr": "(voyage_revenue - voyage_costs) / on_hire_days",
        "inputs": [
          "voyage_revenue",
          "voyage_costs",
          "on_hire_days"
        ]
      }
    },
    "transportation.maritime_shipping.schedule_reliability": {
      "id": 1867,
      "name": "Schedule Reliability",
      "description": "Share of port calls or voyages completed within published schedule window (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Reliability = (On-Schedule Voyages / Total Voyages) × 100",
      "datasource": [
        "Maritime fleet operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Liner service quality — customer SLAs.",
      "segment": "maritime_shipping",
      "slug": "schedule_reliability",
      "calc": {
        "expr": "on_schedule_voyages / total_voyages * 100",
        "inputs": [
          "on_schedule_voyages",
          "total_voyages"
        ]
      }
    },
    "transportation.public_transit.farebox_recovery_ratio": {
      "id": 1868,
      "name": "Transit Farebox Recovery Ratio",
      "description": "Fare and subsidy-eligible revenue as a share of operating expenses (aggregated).",
      "industry": "Transportation",
      "type": "Financial",
      "unit": "%",
      "methodology": "Farebox Recovery = (Operating Revenue / Operating Expenses) × 100",
      "datasource": [
        "Public transit operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 200
      },
      "fpaWorkflow": "Municipal funding gap — bus and rail transit.",
      "segment": "public_transit",
      "slug": "farebox_recovery_ratio",
      "calc": {
        "expr": "operating_revenue / operating_expenses * 100",
        "inputs": [
          "operating_revenue",
          "operating_expenses"
        ]
      }
    },
    "transportation.public_transit.ridership_per_vehicle_hour": {
      "id": 1869,
      "name": "Ridership per Vehicle Hour",
      "description": "Unlinked passenger trips per vehicle revenue hour (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "Passengers per vehicle hour",
      "methodology": "Ridership per Vehicle Hour = Unlinked Trips / Vehicle Revenue Hours",
      "datasource": [
        "Public transit operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Service productivity — headway and crowding tradeoffs.",
      "segment": "public_transit",
      "slug": "ridership_per_vehicle_hour",
      "calc": {
        "expr": "unlinked_trips / vehicle_revenue_hours",
        "inputs": [
          "unlinked_trips",
          "vehicle_revenue_hours"
        ]
      }
    },
    "transportation.public_transit.on_time_performance": {
      "id": 1870,
      "name": "On-Time Performance",
      "description": "Share of transit trips departing or arriving within agency on-time standard (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "OTP = (On-Time Trips / Total Trips) × 100",
      "datasource": [
        "Public transit operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Service quality — distinct from aviation OTP thresholds.",
      "segment": "public_transit",
      "slug": "on_time_performance",
      "calc": {
        "expr": "on_time_trips / total_trips * 100",
        "inputs": [
          "on_time_trips",
          "total_trips"
        ]
      }
    },
    "transportation.freight_forwarding.gross_margin_per_shipment": {
      "id": 1871,
      "name": "Gross Margin per Shipment",
      "description": "Average gross profit per shipment handled by the forwarder (aggregated).",
      "industry": "Transportation",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Margin per Shipment = Gross Profit / Shipments Handled",
      "datasource": [
        "Freight forwarding operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "3PL unit economics — buy versus sell rate spread.",
      "segment": "freight_forwarding",
      "slug": "gross_margin_per_shipment",
      "calc": {
        "expr": "gross_profit / shipments_handled",
        "inputs": [
          "gross_profit",
          "shipments_handled"
        ]
      }
    },
    "transportation.freight_forwarding.on_time_delivery_shipper": {
      "id": 1872,
      "name": "On-Time Delivery (Shipper SLA)",
      "description": "Share of forwarder-managed shipments delivered within customer SLA (aggregated).",
      "industry": "Transportation",
      "type": "Operational",
      "unit": "%",
      "methodology": "OTD = (On-Time Shipments / Total Shipments) × 100",
      "datasource": [
        "Freight forwarding operations summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Shipper-facing reliability — distinct from owned-fleet road OTD.",
      "segment": "freight_forwarding",
      "slug": "on_time_delivery_shipper",
      "calc": {
        "expr": "on_time_shipments / total_shipments * 100",
        "inputs": [
          "on_time_shipments",
          "total_shipments"
        ]
      }
    },
    "aviation.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1800,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.quick_ratio": {
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
      "id": 1801,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.gross_margin": {
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
      "id": 1802,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.operating_margin": {
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
      "id": 1803,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1804,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.net_margin": {
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
      "id": 1805,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.revenue_growth": {
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
      "id": 1806,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.working_capital": {
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
      "id": 1807,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.dso": {
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
      "id": 1808,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.dpo": {
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
      "id": 1809,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.ccc": {
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
      "id": 1810,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.operating_cash_flow": {
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
      "id": 1811,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.burn_rate": {
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
      "id": 1812,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.runway": {
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
      "id": 1813,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.core.headcount": {
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
      "id": 1814,
      "industry": "Aviation",
      "segment": "core"
    },
    "aviation.network_carrier.load_factor": {
      "id": 1820,
      "name": "Load Factor",
      "description": "Revenue passenger miles or cargo tonnage carried relative to available capacity (aggregated).",
      "industry": "Aviation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Load Factor = (RPM or RTM / ASM or ATM) × 100",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Capacity leverage — distinct from road fleet utilization percentage.",
      "segment": "network_carrier",
      "slug": "load_factor",
      "calc": {
        "expr": "revenue_capacity_units / available_capacity_units * 100",
        "inputs": [
          "revenue_capacity_units",
          "available_capacity_units"
        ]
      }
    },
    "aviation.network_carrier.casm": {
      "id": 1821,
      "name": "Cost per Available Seat Kilometer (CASM)",
      "description": "Operating cost per unit of available seat capacity (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "Currency per ASK",
      "methodology": "CASM = Total Operating Cost / Available Seat Kilometers",
      "datasource": [
        "Airline operational statistics summary",
        "General ledger"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Unit cost — compare to RASM and stage length peers.",
      "segment": "network_carrier",
      "slug": "casm",
      "calc": {
        "expr": "total_operating_cost / available_seat_kilometers",
        "inputs": [
          "total_operating_cost",
          "available_seat_kilometers"
        ]
      }
    },
    "aviation.network_carrier.rasm": {
      "id": 1822,
      "name": "Revenue per Available Seat Kilometer (RASM)",
      "description": "Operating revenue per unit of available seat capacity (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "Currency per ASK",
      "methodology": "RASM = Total Operating Revenue / Available Seat Kilometers",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Unit yield — pricing and mix versus CASM spread.",
      "segment": "network_carrier",
      "slug": "rasm",
      "calc": {
        "expr": "total_operating_revenue / available_seat_kilometers",
        "inputs": [
          "total_operating_revenue",
          "available_seat_kilometers"
        ]
      }
    },
    "aviation.network_carrier.on_time_performance": {
      "id": 1823,
      "name": "On-Time Performance (OTP)",
      "description": "Share of flights arriving within regulatory on-time threshold (aggregated).",
      "industry": "Aviation",
      "type": "Operational",
      "unit": "%",
      "methodology": "OTP = (On-Time Arrivals / Total Arrivals) × 100",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Reliability — not interchangeable with road on-time delivery rate.",
      "segment": "network_carrier",
      "slug": "on_time_performance",
      "calc": {
        "expr": "on_time_arrivals / total_arrivals * 100",
        "inputs": [
          "on_time_arrivals",
          "total_arrivals"
        ]
      }
    },
    "aviation.network_carrier.fuel_cost_pct_operating": {
      "id": 1824,
      "name": "Fuel Cost Percent of Operating Cost",
      "description": "Fuel expense as a share of total operating cost (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "%",
      "methodology": "Fuel % = (Fuel Expense / Total Operating Cost) × 100",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Energy exposure — distinct from road MPG fuel efficiency.",
      "segment": "network_carrier",
      "slug": "fuel_cost_pct_operating",
      "calc": {
        "expr": "fuel_expense / total_operating_cost * 100",
        "inputs": [
          "fuel_expense",
          "total_operating_cost"
        ]
      }
    },
    "aviation.airport.passengers_enplaned_growth": {
      "id": 1825,
      "name": "Passengers Enplaned Growth",
      "description": "Year-over-year growth in enplaned passengers (aggregated).",
      "industry": "Aviation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Growth = ((Current Enplanements − Prior Enplanements) / Prior Enplanements) × 100",
      "datasource": [
        "Airport traffic and revenue summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Traffic volume — drives aeronautical and commercial revenue.",
      "segment": "airport",
      "slug": "passengers_enplaned_growth",
      "input": true
    },
    "aviation.airport.aeronautical_revenue_per_passenger": {
      "id": 1826,
      "name": "Aeronautical Revenue per Passenger",
      "description": "Aeronautical charges divided by enplaned passengers (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "ARPP = Aeronautical Revenue / Enplaned Passengers",
      "datasource": [
        "Airport traffic and revenue summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Regulated aero yield — tariff and traffic mix.",
      "segment": "airport",
      "slug": "aeronautical_revenue_per_passenger",
      "calc": {
        "expr": "aeronautical_revenue / enplaned_passengers",
        "inputs": [
          "aeronautical_revenue",
          "enplaned_passengers"
        ]
      }
    },
    "aviation.airport.commercial_revenue_share": {
      "id": 1827,
      "name": "Commercial Revenue Share",
      "description": "Non-aeronautical revenue as a share of total airport revenue (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "%",
      "methodology": "Share = (Commercial Revenue / Total Revenue) × 100",
      "datasource": [
        "Airport traffic and revenue summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Retail and concessions diversification versus aero charges.",
      "segment": "airport",
      "slug": "commercial_revenue_share",
      "calc": {
        "expr": "commercial_revenue / total_revenue * 100",
        "inputs": [
          "commercial_revenue",
          "total_revenue"
        ]
      }
    },
    "aviation.travel_distribution.gbv_take_rate": {
      "id": 1828,
      "name": "Gross Booking Value Take Rate",
      "description": "Platform revenue as a share of gross bookings (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "%",
      "methodology": "Take Rate = (Platform Revenue / Gross Booking Value) × 100",
      "datasource": [
        "Travel distribution booking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Marketplace economics — OTA, GDS, and metasearch.",
      "segment": "travel_distribution",
      "slug": "gbv_take_rate",
      "calc": {
        "expr": "platform_revenue / gross_booking_value * 100",
        "inputs": [
          "platform_revenue",
          "gross_booking_value"
        ]
      }
    },
    "aviation.travel_distribution.look_to_book_conversion": {
      "id": 1829,
      "name": "Look-to-Book Conversion",
      "description": "Share of travel searches or sessions that complete a booking (aggregated).",
      "industry": "Aviation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Conversion = (Completed Bookings / Qualified Sessions) × 100",
      "datasource": [
        "Travel distribution booking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Funnel efficiency — marketing and UX on digital channels.",
      "segment": "travel_distribution",
      "slug": "look_to_book_conversion",
      "calc": {
        "expr": "completed_bookings / qualified_sessions * 100",
        "inputs": [
          "completed_bookings",
          "qualified_sessions"
        ]
      }
    },
    "aviation.air_cargo.cargo_load_factor": {
      "id": 1830,
      "name": "Cargo Load Factor",
      "description": "Cargo tonnage carried relative to available cargo capacity (aggregated).",
      "industry": "Aviation",
      "type": "Operational",
      "unit": "%",
      "methodology": "Cargo Load Factor = (Cargo Tonne-Km Carried / Available Tonne-Km) × 100",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "DEEP TECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Belly and freighter utilization — air cargo segment.",
      "segment": "air_cargo",
      "slug": "cargo_load_factor",
      "calc": {
        "expr": "cargo_tonne_km_carried / available_tonne_km * 100",
        "inputs": [
          "cargo_tonne_km_carried",
          "available_tonne_km"
        ]
      }
    },
    "aviation.air_cargo.cargo_yield_per_tonne_km": {
      "id": 1831,
      "name": "Cargo Yield per Tonne-Kilometer",
      "description": "Cargo revenue per tonne-kilometer carried (aggregated).",
      "industry": "Aviation",
      "type": "Financial",
      "unit": "Currency per tonne-km",
      "methodology": "Yield = Cargo Revenue / Cargo Tonne-Kilometers Carried",
      "datasource": [
        "Airline operational statistics summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Air freight pricing — distinct from maritime TCE.",
      "segment": "air_cargo",
      "slug": "cargo_yield_per_tonne_km",
      "calc": {
        "expr": "cargo_revenue / cargo_tonne_km_carried",
        "inputs": [
          "cargo_revenue",
          "cargo_tonne_km_carried"
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
    },
    "banking.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1500,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.quick_ratio": {
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
      "id": 1501,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.gross_margin": {
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
      "id": 1502,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.operating_margin": {
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
      "id": 1503,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1504,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.net_margin": {
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
      "id": 1505,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.revenue_growth": {
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
      "id": 1506,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.working_capital": {
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
      "id": 1507,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.dso": {
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
      "id": 1508,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.dpo": {
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
      "id": 1509,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.ccc": {
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
      "id": 1510,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.operating_cash_flow": {
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
      "id": 1511,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.burn_rate": {
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
      "id": 1512,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.runway": {
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
      "id": 1513,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.core.headcount": {
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
      "id": 1514,
      "industry": "Banking",
      "segment": "core"
    },
    "banking.depository.net_interest_margin": {
      "id": 1530,
      "name": "Net Interest Margin",
      "description": "Spread between interest earned and interest paid, relative to earning assets (aggregated regulatory summary).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "NIM = (Net Interest Income / Average Earning Assets) × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Net interest income planning — primary profitability driver for depositories.",
      "segment": "depository",
      "slug": "net_interest_margin",
      "calc": {
        "expr": "net_interest_income / average_earning_assets * 100",
        "inputs": [
          "net_interest_income",
          "average_earning_assets"
        ]
      }
    },
    "banking.depository.non_performing_loan_ratio": {
      "id": 1531,
      "name": "Non-Performing Loan Ratio",
      "description": "Share of loans past due or non-accrual (aggregated credit quality).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "NPL Ratio = (Non-Performing Loans / Total Loans) × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Credit risk monitoring — feeds provision and capital planning.",
      "segment": "depository",
      "slug": "non_performing_loan_ratio",
      "calc": {
        "expr": "non_performing_loans / total_loans * 100",
        "inputs": [
          "non_performing_loans",
          "total_loans"
        ]
      }
    },
    "banking.depository.loan_to_deposit_ratio": {
      "id": 1532,
      "name": "Loan-to-Deposit Ratio",
      "description": "Lending funded by deposits (liquidity and balance-sheet structure).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "LTD = (Total Loans / Total Deposits) × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Liquidity structure — deposit growth vs loan book expansion.",
      "segment": "depository",
      "slug": "loan_to_deposit_ratio",
      "calc": {
        "expr": "total_loans / total_deposits * 100",
        "inputs": [
          "total_loans",
          "total_deposits"
        ]
      }
    },
    "banking.depository.efficiency_ratio": {
      "id": 1533,
      "name": "Efficiency Ratio",
      "description": "Non-interest expense relative to revenue (cost-to-income).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "Efficiency Ratio = (Operating Expense / Total Revenue) × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 200
      },
      "fpaWorkflow": "Operating leverage — expense discipline vs revenue scale.",
      "segment": "depository",
      "slug": "efficiency_ratio",
      "calc": {
        "expr": "operating_expense / total_revenue * 100",
        "inputs": [
          "operating_expense",
          "total_revenue"
        ]
      }
    },
    "banking.depository.tier1_capital_ratio": {
      "id": 1534,
      "name": "Tier 1 Capital Ratio",
      "description": "Tier 1 capital to risk-weighted assets from aggregated regulatory filing (no account-level detail).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "Tier 1 Ratio = (Tier 1 Capital / Risk-Weighted Assets) × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Capital adequacy — covenant and dividend capacity.",
      "segment": "depository",
      "slug": "tier1_capital_ratio",
      "input": true
    },
    "banking.depository.cost_of_funds": {
      "id": 1554,
      "name": "Cost of Funds",
      "description": "Average rate paid on interest-bearing liabilities (aggregated).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "Cost of Funds = Interest Expense on Deposits and Borrowings / Average Interest-Bearing Liabilities × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Funding cost — margin pressure vs asset yields.",
      "segment": "depository",
      "slug": "cost_of_funds",
      "input": true
    },
    "banking.depository.stable_funding_ratio": {
      "id": 1556,
      "name": "Stable Funding Ratio",
      "description": "Share of funding from stable retail and long-term sources (proxy or regulatory).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "Stable Funding Ratio = Stable Funding / Total Funding × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Liability structure — run risk and NIM stability.",
      "segment": "depository",
      "slug": "stable_funding_ratio",
      "input": true
    },
    "banking.depository.liquidity_coverage_ratio": {
      "id": 1557,
      "name": "Liquidity Coverage Ratio",
      "description": "High-quality liquid assets relative to net cash outflows (LCR).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "LCR = HQLA / Net Cash Outflows over 30 days × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Liquidity risk — regulatory and stress readiness.",
      "segment": "depository",
      "slug": "liquidity_coverage_ratio",
      "input": true
    },
    "banking.depository.net_stable_funding_ratio": {
      "id": 1558,
      "name": "Net Stable Funding Ratio",
      "description": "Available stable funding relative to required stable funding (NSFR).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "NSFR = Available Stable Funding / Required Stable Funding × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Structural liquidity — long-term funding adequacy.",
      "segment": "depository",
      "slug": "net_stable_funding_ratio",
      "input": true
    },
    "banking.depository.interest_rate_risk_eve_sensitivity": {
      "id": 1559,
      "name": "Interest Rate Risk EVE Sensitivity",
      "description": "Change in economic value of equity for a defined parallel rate shock (aggregated ALM).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "EVE sensitivity = ΔEVE / Base EVE for standard shock",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "ALM — rate risk to capital and NIM.",
      "segment": "depository",
      "slug": "interest_rate_risk_eve_sensitivity",
      "input": true
    },
    "banking.depository.operational_risk_loss_ratio": {
      "id": 1567,
      "name": "Operational Risk Loss Ratio",
      "description": "Operational losses as a share of gross income (aggregated).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "Op Risk Loss Ratio = Operational Losses / Gross Income × 100",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Non-financial risk — capital and control investment.",
      "segment": "depository",
      "slug": "operational_risk_loss_ratio",
      "calc": {
        "expr": "operational_losses / gross_income * 100",
        "inputs": [
          "operational_losses",
          "gross_income"
        ]
      }
    },
    "banking.depository.stress_test_cet1_delta": {
      "id": 1568,
      "name": "Stress Test CET1 Delta",
      "description": "Decline in CET1 ratio under supervisory severely adverse scenario (aggregated).",
      "industry": "Banking",
      "type": "Financial",
      "unit": "%",
      "methodology": "CET1 Delta = Stressed CET1 − Baseline CET1",
      "datasource": [
        "Aggregated regulatory and financial summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Capital planning — dividend and buffer capacity under stress.",
      "segment": "depository",
      "slug": "stress_test_cet1_delta",
      "input": true
    },
    "financial_services.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1600,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.quick_ratio": {
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
      "id": 1601,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.gross_margin": {
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
      "id": 1602,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.operating_margin": {
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
      "id": 1603,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1604,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.net_margin": {
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
      "id": 1605,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.revenue_growth": {
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
      "id": 1606,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.working_capital": {
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
      "id": 1607,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.dso": {
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
      "id": 1608,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.dpo": {
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
      "id": 1609,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.ccc": {
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
      "id": 1610,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.operating_cash_flow": {
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
      "id": 1611,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.burn_rate": {
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
      "id": 1612,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.runway": {
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
      "id": 1613,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.core.headcount": {
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
      "id": 1614,
      "industry": "Financial Services",
      "segment": "core"
    },
    "financial_services.investment_banking.trading_revenue_ratio": {
      "id": 1535,
      "name": "Trading Revenue Ratio",
      "description": "Share of firm revenue from trading activities (investment bank / markets; no deposit book).",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "%",
      "methodology": "Trading Revenue Ratio = (Trading Revenue / Total Revenue) × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Revenue mix — volatility and market-risk sensitivity.",
      "segment": "investment_banking",
      "slug": "trading_revenue_ratio",
      "calc": {
        "expr": "trading_revenue / total_revenue * 100",
        "inputs": [
          "trading_revenue",
          "total_revenue"
        ]
      }
    },
    "financial_services.investment_banking.advisory_fee_ratio": {
      "id": 1553,
      "name": "Advisory Fee Ratio",
      "description": "Share of revenue from advisory and underwriting mandates (investment banking; no deposit book).",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "%",
      "methodology": "Advisory Fee Ratio = (Advisory Fee Revenue / Total Revenue) × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Mandate revenue — M&A and capital-markets advisory mix.",
      "segment": "investment_banking",
      "slug": "advisory_fee_ratio",
      "calc": {
        "expr": "advisory_fee_revenue / total_revenue * 100",
        "inputs": [
          "advisory_fee_revenue",
          "total_revenue"
        ]
      }
    },
    "Allfinancesaas-mrr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Normalized recurring subscription revenue billed in a month.",
      "id": 1580,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Recurring-revenue forecast — foundation of the fintech operating model.",
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
    "Allfinancesaas-arr": {
      "datasource": [
        "Subscription billing records",
        "CRM / Sales pipeline"
      ],
      "description": "Annualized run-rate of recurring subscription revenue.",
      "id": 1581,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Annual planning and valuation — headline scale for fintech boards.",
      "segment": "subscription",
      "slug": "arr",
      "calc": {
        "expr": "mrr * 12",
        "inputs": []
      }
    },
    "Allfinancesaas-nrr": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Revenue retained and expanded from existing customers, net of churn and contraction.",
      "id": 1582,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Expansion and retention modeling — durable fintech growth quality.",
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
    "Allfinancesaas-gross-churn": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Percentage of recurring revenue lost to cancellations and downgrades.",
      "id": 1583,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Retention review — renewal forecast and customer-success investment.",
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
    "Allfinancesaas-cac": {
      "datasource": [
        "Marketing spend records",
        "CRM / Sales pipeline",
        "General ledger"
      ],
      "description": "Fully-loaded sales and marketing cost to acquire one new customer.",
      "id": 1584,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Go-to-market efficiency — CAC payback and marketing allocation.",
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
    "Allfinancesaas-ltv": {
      "datasource": [
        "Subscription billing records",
        "Product usage logs"
      ],
      "description": "Expected gross-margin revenue from a customer over their lifetime.",
      "id": 1585,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Unit-economics modeling — growth-spend decisions with CAC.",
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
    "Allfinancesaas-ltv-cac": {
      "datasource": [
        "Subscription billing records",
        "Marketing spend records"
      ],
      "description": "Ratio of customer lifetime value to acquisition cost.",
      "id": 1586,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Investment efficiency — board guardrail for scaling spend.",
      "segment": "subscription",
      "slug": "ltv_cac",
      "calc": {
        "expr": "ltv / cac",
        "inputs": []
      }
    },
    "Allfinancesaas-rule-of-40": {
      "datasource": [
        "Subscription billing records",
        "Financial statements"
      ],
      "description": "Balance of growth and profitability for recurring-revenue businesses.",
      "id": 1587,
      "industry": "Financial Services",
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
      "fpaWorkflow": "Growth-vs-profitability review — composite score for fintech planning.",
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
    "financial_services.investment_banking.value_at_risk_99": {
      "id": 1590,
      "name": "Value at Risk 99%",
      "description": "One-day 99% VaR for trading inventory (aggregated division).",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Regulatory or internal VaR at 99% confidence, one-day horizon",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "daily",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Market risk — capital and limit utilization.",
      "segment": "investment_banking",
      "slug": "value_at_risk_99",
      "input": true
    },
    "financial_services.investment_banking.stressed_var_99": {
      "id": 1591,
      "name": "Stressed VaR 99%",
      "description": "Stressed one-day 99% VaR (aggregated).",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Stressed VaR per firm risk policy",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "daily",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Tail risk — regulatory and internal stress overlays.",
      "segment": "investment_banking",
      "slug": "stressed_var_99",
      "input": true
    },
    "financial_services.investment_banking.counterparty_exposure_ratio": {
      "id": 1592,
      "name": "Counterparty Exposure Ratio",
      "description": "Largest counterparty exposure relative to tier 1 capital (proxy).",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "%",
      "methodology": "Counterparty Exposure Ratio = Top Counterparty EAD / Tier 1 Capital × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Credit risk — concentration to single counterparties.",
      "segment": "investment_banking",
      "slug": "counterparty_exposure_ratio",
      "input": true
    },
    "financial_services.investment_banking.market_making_revenue_share": {
      "id": 1593,
      "name": "Market Making Revenue Share",
      "description": "Share of division revenue from principal market-making activities.",
      "industry": "Financial Services",
      "type": "Financial",
      "unit": "%",
      "methodology": "Market Making Share = Market Making Revenue / Total Revenue × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Revenue depth — inventory risk vs agency flow.",
      "segment": "investment_banking",
      "slug": "market_making_revenue_share",
      "calc": {
        "expr": "market_making_revenue / total_revenue * 100",
        "inputs": [
          "market_making_revenue",
          "total_revenue"
        ]
      }
    },
    "financial_services.investment_banking.prime_brokerage_balance_growth": {
      "id": 1594,
      "name": "Prime Brokerage Balance Growth",
      "description": "Year-over-year growth in prime brokerage client balances (aggregated).",
      "industry": "Financial Services",
      "type": "Operational",
      "unit": "%",
      "methodology": "Balance Growth = ((Current − Prior) / Prior) × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Hedge fund wallet — financing and custody attach.",
      "segment": "investment_banking",
      "slug": "prime_brokerage_balance_growth",
      "input": true
    },
    "financial_services.investment_banking.trading_venue_volume_growth": {
      "id": 1615,
      "name": "Trading Venue Volume Growth",
      "description": "Year-over-year growth in executed trading venue volume (aggregated).",
      "industry": "Financial Services",
      "type": "Operational",
      "unit": "%",
      "methodology": "Volume Growth = ((Current − Prior) / Prior) × 100",
      "datasource": [
        "Aggregated investment banking summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Market share — electronic and voice flow trends.",
      "segment": "investment_banking",
      "slug": "trading_venue_volume_growth",
      "input": true
    },
    "funds.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1970,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.quick_ratio": {
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
      "id": 1971,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.gross_margin": {
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
      "id": 1972,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.operating_margin": {
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
      "id": 1973,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1974,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.net_margin": {
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
      "id": 1975,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.revenue_growth": {
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
      "id": 1976,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.working_capital": {
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
      "id": 1977,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.dso": {
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
      "id": 1978,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.dpo": {
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
      "id": 1979,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.ccc": {
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
      "id": 1980,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.operating_cash_flow": {
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
      "id": 1981,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.burn_rate": {
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
      "id": 1982,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.runway": {
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
      "id": 1983,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.core.headcount": {
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
      "id": 1984,
      "industry": "Funds",
      "segment": "core"
    },
    "funds.fund.assets_under_management": {
      "id": 1900,
      "name": "Assets Under Management",
      "description": "Total fund assets at period end across open-end, advised, and institutional books (aggregated).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured AUM at reporting date.",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Scale — base for fees, flows, and custody.",
      "segment": "fund",
      "slug": "assets_under_management",
      "input": true
    },
    "funds.fund.net_flow_rate": {
      "id": 1901,
      "name": "Net Flow Rate",
      "description": "Net fund flows as a percentage of beginning AUM.",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Net Flow Rate = ((Inflows − Outflows) / Beginning AUM) × 100",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Organic growth — separate from market appreciation.",
      "segment": "fund",
      "slug": "net_flow_rate",
      "calc": {
        "expr": "(inflows - outflows) / beginning_aum * 100",
        "inputs": [
          "inflows",
          "outflows",
          "beginning_aum"
        ]
      }
    },
    "funds.fund.management_fee_yield": {
      "id": 1902,
      "name": "Management Fee Yield",
      "description": "Management and advisory fees relative to average AUM.",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Fee Yield = (Management Fees / Average AUM) × 100",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Pricing and mix — revenue per dollar of assets.",
      "segment": "fund",
      "slug": "management_fee_yield",
      "calc": {
        "expr": "management_fees / average_aum * 100",
        "inputs": [
          "management_fees",
          "average_aum"
        ]
      }
    },
    "funds.fund.performance_fee_share": {
      "id": 1903,
      "name": "Performance Fee Share",
      "description": "Carried interest and performance fees as a share of total fund revenue (aggregated).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Performance Fee Share = (Performance Fees / Total Fund Revenue) × 100",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Alternatives economics — GP incentive alignment.",
      "segment": "fund",
      "slug": "performance_fee_share",
      "calc": {
        "expr": "performance_fees / total_fund_revenue * 100",
        "inputs": [
          "performance_fees",
          "total_fund_revenue"
        ]
      }
    },
    "funds.fund.fund_irr": {
      "id": 1904,
      "name": "Fund IRR",
      "description": "Internal rate of return for a fund vintage (aggregated, no LP identifiers).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "IRR from aggregated cash flows and NAV (directly reported).",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Closed-end performance — LP reporting.",
      "segment": "fund",
      "slug": "fund_irr",
      "input": true
    },
    "funds.fund.tvpi": {
      "id": 1905,
      "name": "TVPI",
      "description": "Total value to paid-in capital (distributions plus NAV).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "Ratio",
      "methodology": "TVPI = (Distributions + NAV) / Paid-In Capital",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Fund multiple — gross performance before fees.",
      "segment": "fund",
      "slug": "tvpi",
      "calc": {
        "expr": "(distributions + nav) / paid_in_capital",
        "inputs": [
          "distributions",
          "nav",
          "paid_in_capital"
        ]
      }
    },
    "funds.fund.dpi": {
      "id": 1906,
      "name": "DPI",
      "description": "Distributions to paid-in capital (cash returned).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "Ratio",
      "methodology": "DPI = Distributions / Paid-In Capital",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Realized returns — liquidity to LPs.",
      "segment": "fund",
      "slug": "dpi",
      "calc": {
        "expr": "distributions / paid_in_capital",
        "inputs": [
          "distributions",
          "paid_in_capital"
        ]
      }
    },
    "funds.fund.capital_deployment_rate": {
      "id": 1907,
      "name": "Capital Deployment Rate",
      "description": "Called capital relative to commitments (deployment pace).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Deployment Rate = (Called Capital / Committed Capital) × 100",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Dry powder — pacing of new investments.",
      "segment": "fund",
      "slug": "capital_deployment_rate",
      "calc": {
        "expr": "called_capital / committed_capital * 100",
        "inputs": [
          "called_capital",
          "committed_capital"
        ]
      }
    },
    "funds.fund.fund_leverage_ratio": {
      "id": 1908,
      "name": "Fund Leverage Ratio",
      "description": "Fund-level leverage relative to net asset value (aggregated).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "Ratio",
      "methodology": "Leverage Ratio = Total Fund Debt / NAV",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Fund risk — gearing and margin sensitivity.",
      "segment": "fund",
      "slug": "fund_leverage_ratio",
      "input": true
    },
    "funds.fund.liquidity_gate_frequency": {
      "id": 1909,
      "name": "Liquidity Gate Frequency",
      "description": "Share of funds with active liquidity gates or suspensions in period.",
      "industry": "Funds",
      "type": "Operational",
      "unit": "%",
      "methodology": "Gate Frequency = Gated Funds / Total Funds × 100",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Investor liquidity risk — redemptions and fund structures.",
      "segment": "fund",
      "slug": "liquidity_gate_frequency",
      "input": true
    },
    "funds.fund.strategy_return_volatility": {
      "id": 1910,
      "name": "Strategy Return Volatility",
      "description": "Annualized volatility of fund or strategy returns (aggregated sleeve).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Standard deviation of periodic returns annualized",
      "datasource": [
        "Aggregated fund performance summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Risk limits — allocator due diligence.",
      "segment": "fund",
      "slug": "strategy_return_volatility",
      "input": true
    },
    "funds.fund.assets_under_custody": {
      "id": 1911,
      "name": "Assets Under Custody",
      "description": "Fund and client assets held in custody (aggregated).",
      "industry": "Funds",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured AUC at reporting date",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Securities services scale — safekeeping attach.",
      "segment": "fund",
      "slug": "assets_under_custody",
      "input": true
    },
    "funds.fund.custody_fee_yield": {
      "id": 1912,
      "name": "Custody Fee Yield",
      "description": "Custody and safekeeping fees relative to average AUC.",
      "industry": "Funds",
      "type": "Financial",
      "unit": "%",
      "methodology": "Custody Fee Yield = Custody Fees / Average AUC × 100",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Securities services revenue.",
      "segment": "fund",
      "slug": "custody_fee_yield",
      "calc": {
        "expr": "custody_fees / average_auc * 100",
        "inputs": [
          "custody_fees",
          "average_auc"
        ]
      }
    },
    "funds.fund.settlement_fail_rate": {
      "id": 1913,
      "name": "Settlement Fail Rate",
      "description": "Failed settlements as a share of total settlement instructions.",
      "industry": "Funds",
      "type": "Operational",
      "unit": "%",
      "methodology": "Fail Rate = Failed Settlements / Total Instructions × 100",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Operational risk — capital and client service.",
      "segment": "fund",
      "slug": "settlement_fail_rate",
      "calc": {
        "expr": "failed_settlements / total_settlement_instructions * 100",
        "inputs": [
          "failed_settlements",
          "total_settlement_instructions"
        ]
      }
    },
    "funds.fund.safekeeping_asset_growth": {
      "id": 1914,
      "name": "Safekeeping Asset Growth",
      "description": "Year-over-year growth in safekeeping and custody assets.",
      "industry": "Funds",
      "type": "Operational",
      "unit": "%",
      "methodology": "Growth = ((Current AUC − Prior) / Prior) × 100",
      "datasource": [
        "Aggregated fund summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Wallet growth — custody-led relationships.",
      "segment": "fund",
      "slug": "safekeeping_asset_growth",
      "input": true
    },
    "trusts.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1985,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.quick_ratio": {
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
      "id": 1986,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.gross_margin": {
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
      "id": 1987,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.operating_margin": {
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
      "id": 1988,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1989,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.net_margin": {
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
      "id": 1990,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.revenue_growth": {
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
      "id": 1991,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.working_capital": {
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
      "id": 1992,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.dso": {
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
      "id": 1993,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.dpo": {
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
      "id": 1994,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.ccc": {
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
      "id": 1995,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.operating_cash_flow": {
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
      "id": 1996,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.burn_rate": {
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
      "id": 1997,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.runway": {
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
      "id": 1998,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.core.headcount": {
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
      "id": 1999,
      "industry": "Trusts",
      "segment": "core"
    },
    "trusts.trust.funds_from_operations": {
      "id": 1940,
      "name": "Funds From Operations",
      "description": "Trust or REIT FFO for the period (vehicle reporting, aggregated).",
      "industry": "Trusts",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "FFO per NAREIT or trust reporting definition (directly reported aggregate).",
      "datasource": [
        "Aggregated trust vehicle summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Trust earnings — dividend coverage for vehicle investors.",
      "segment": "trust",
      "slug": "funds_from_operations",
      "input": true
    },
    "trusts.trust.ffo_payout_ratio": {
      "id": 1941,
      "name": "FFO Payout Ratio",
      "description": "Distributions paid relative to FFO.",
      "industry": "Trusts",
      "type": "Financial",
      "unit": "%",
      "methodology": "FFO Payout = (Distributions / FFO) × 100",
      "datasource": [
        "Aggregated trust vehicle summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 200
      },
      "fpaWorkflow": "Distribution safety — retained cash for growth and debt service.",
      "segment": "trust",
      "slug": "ffo_payout_ratio",
      "calc": {
        "expr": "distributions / ffo * 100",
        "inputs": [
          "distributions",
          "ffo"
        ]
      }
    },
    "trusts.trust.same_store_noi_growth": {
      "id": 1942,
      "name": "Same-Store NOI Growth",
      "description": "Year-over-year NOI growth on a same-store basis at the trust vehicle level.",
      "industry": "Trusts",
      "type": "Financial",
      "unit": "%",
      "methodology": "Same-Store NOI Growth = ((Current NOI − Prior NOI) / Prior NOI) × 100",
      "datasource": [
        "Aggregated trust vehicle summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Vehicle organic performance — excludes acquisition noise (property ops on Real Estate orgs).",
      "segment": "trust",
      "slug": "same_store_noi_growth",
      "calc": {
        "expr": "(current_noi - prior_noi) / prior_noi * 100",
        "inputs": [
          "current_noi",
          "prior_noi"
        ]
      }
    },
    "trusts.trust.trust_assets_under_administration": {
      "id": 1943,
      "name": "Trust Assets Under Administration",
      "description": "Assets administered under trust mandates at period end (aggregated).",
      "industry": "Trusts",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured AUA at reporting date",
      "datasource": [
        "Aggregated trust vehicle summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Trust administration scale — fiduciary book size.",
      "segment": "trust",
      "slug": "trust_assets_under_administration",
      "input": true
    },
    "trusts.trust.trustee_fee_yield": {
      "id": 1944,
      "name": "Trustee Fee Yield",
      "description": "Trustee and administration fees relative to average trust AUA.",
      "industry": "Trusts",
      "type": "Financial",
      "unit": "%",
      "methodology": "Trustee Fee Yield = Trustee Fees / Average Trust AUA × 100",
      "datasource": [
        "Aggregated trust vehicle summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Trust services revenue — pricing on administered assets.",
      "segment": "trust",
      "slug": "trustee_fee_yield",
      "calc": {
        "expr": "trustee_fees / average_trust_aua * 100",
        "inputs": [
          "trustee_fees",
          "average_trust_aua"
        ]
      }
    },
    "insurance.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1620,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.quick_ratio": {
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
      "id": 1621,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.gross_margin": {
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
      "id": 1622,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.operating_margin": {
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
      "id": 1623,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1624,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.net_margin": {
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
      "id": 1625,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.revenue_growth": {
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
      "id": 1626,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.working_capital": {
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
      "id": 1627,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.dso": {
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
      "id": 1628,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.dpo": {
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
      "id": 1629,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.ccc": {
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
      "id": 1630,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.operating_cash_flow": {
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
      "id": 1631,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.burn_rate": {
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
      "id": 1632,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.runway": {
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
      "id": 1633,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.core.headcount": {
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
      "id": 1634,
      "industry": "Insurance",
      "segment": "core"
    },
    "insurance.property_casualty.combined_ratio": {
      "id": 1547,
      "name": "Combined Ratio",
      "description": "Losses and expenses relative to earned premiums (P&C).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Combined Ratio = ((Incurred Losses + Underwriting Expense) / Earned Premiums) × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Underwriting profitability — below 100% indicates underwriting gain.",
      "segment": "property_casualty",
      "slug": "combined_ratio",
      "calc": {
        "expr": "(incurred_losses + underwriting_expense) / earned_premiums * 100",
        "inputs": [
          "incurred_losses",
          "underwriting_expense",
          "earned_premiums"
        ]
      }
    },
    "insurance.property_casualty.loss_ratio": {
      "id": 1548,
      "name": "Loss Ratio",
      "description": "Incurred losses relative to earned premiums (P&C).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Loss Ratio = (Incurred Losses / Earned Premiums) × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Claims experience — pricing and reserve adequacy.",
      "segment": "property_casualty",
      "slug": "loss_ratio",
      "calc": {
        "expr": "incurred_losses / earned_premiums * 100",
        "inputs": [
          "incurred_losses",
          "earned_premiums"
        ]
      }
    },
    "insurance.property_casualty.premium_growth": {
      "id": 1549,
      "name": "Premium Growth",
      "description": "Year-over-year earned premium growth (aggregated).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Premium Growth = ((Current Premiums − Prior Premiums) / Prior Premiums) × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Top-line momentum — new business and rate changes.",
      "segment": "property_casualty",
      "slug": "premium_growth",
      "input": true
    },
    "insurance.life.benefit_ratio": {
      "id": 1555,
      "name": "Benefit Ratio",
      "description": "Life insurance benefits and claims relative to premiums (aggregated line).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Benefit Ratio = (Benefits Paid / Earned Premiums) × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Life profitability — mortality and lapse experience vs pricing.",
      "segment": "life",
      "slug": "benefit_ratio",
      "calc": {
        "expr": "benefits_paid / earned_premiums * 100",
        "inputs": [
          "benefits_paid",
          "earned_premiums"
        ]
      }
    },
    "insurance.property_casualty.reserve_development_ratio": {
      "id": 1574,
      "name": "Reserve Development Ratio",
      "description": "Change in prior-year reserves relative to earned premiums (P&C).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Reserve Development = (Prior Reserve Development / Earned Premiums) × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "annual",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Reserving risk — adverse development signal.",
      "segment": "property_casualty",
      "slug": "reserve_development_ratio",
      "input": true
    },
    "insurance.property_casualty.catastrophe_loss_ratio": {
      "id": 1575,
      "name": "Catastrophe Loss Ratio",
      "description": "Cat losses relative to earned premiums (P&C).",
      "industry": "Insurance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Cat Loss Ratio = Catastrophe Losses / Earned Premiums × 100",
      "datasource": [
        "Aggregated insurance loss summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Tail risk — reinsurance and pricing adequacy.",
      "segment": "property_casualty",
      "slug": "catastrophe_loss_ratio",
      "calc": {
        "expr": "catastrophe_losses / earned_premiums * 100",
        "inputs": [
          "catastrophe_losses",
          "earned_premiums"
        ]
      }
    },
    "consumer_finance.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1700,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.quick_ratio": {
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
      "id": 1701,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.gross_margin": {
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
      "id": 1702,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.operating_margin": {
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
      "id": 1703,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1704,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.net_margin": {
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
      "id": 1705,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.revenue_growth": {
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
      "id": 1706,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.working_capital": {
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
      "id": 1707,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.dso": {
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
      "id": 1708,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.dpo": {
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
      "id": 1709,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.ccc": {
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
      "id": 1710,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.operating_cash_flow": {
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
      "id": 1711,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.burn_rate": {
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
      "id": 1712,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.runway": {
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
      "id": 1713,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.core.headcount": {
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
      "id": 1714,
      "industry": "Consumer Finance",
      "segment": "core"
    },
    "consumer_finance.consumer_lending.portfolio_yield": {
      "id": 1720,
      "name": "Portfolio Yield",
      "description": "Interest income on consumer receivables relative to average outstanding balance (aggregated).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Portfolio Yield = (Interest Income / Average Receivables) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Revenue driver — spread on consumer book vs funding cost.",
      "segment": "consumer_lending",
      "slug": "portfolio_yield",
      "calc": {
        "expr": "interest_income / average_receivables * 100",
        "inputs": [
          "interest_income",
          "average_receivables"
        ]
      }
    },
    "consumer_finance.consumer_lending.net_charge_off_rate": {
      "id": 1721,
      "name": "Net Charge-Off Rate",
      "description": "Charge-offs net of recoveries as a share of average receivables.",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "NCO Rate = (Net Charge-Offs / Average Receivables) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Credit loss — macro and underwriting quality signal.",
      "segment": "consumer_lending",
      "slug": "net_charge_off_rate",
      "calc": {
        "expr": "net_charge_offs / average_receivables * 100",
        "inputs": [
          "net_charge_offs",
          "average_receivables"
        ]
      }
    },
    "consumer_finance.consumer_lending.delinquency_rate_30d": {
      "id": 1722,
      "name": "30+ Day Delinquency Rate",
      "description": "Share of receivables past due 30 days or more (aggregated).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Delinquency Rate = (Delinquent Balance 30+ / Total Receivables) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Early warning — rolls into charge-offs and provisions.",
      "segment": "consumer_lending",
      "slug": "delinquency_rate_30d",
      "calc": {
        "expr": "delinquent_balance_30_plus / total_receivables * 100",
        "inputs": [
          "delinquent_balance_30_plus",
          "total_receivables"
        ]
      }
    },
    "consumer_finance.consumer_lending.origination_volume_growth": {
      "id": 1723,
      "name": "Origination Volume Growth",
      "description": "Year-over-year growth in new consumer loan originations (aggregated).",
      "industry": "Consumer Finance",
      "type": "Operational",
      "unit": "%",
      "methodology": "Origination Growth = ((Current Originations − Prior Originations) / Prior Originations) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Top-line momentum — market share and underwriting appetite.",
      "segment": "consumer_lending",
      "slug": "origination_volume_growth",
      "input": true
    },
    "consumer_finance.consumer_lending.payment_volume": {
      "id": 1724,
      "name": "Card Payment Volume",
      "description": "Total payment transaction volume for card portfolios (aggregated; fee revenue proxy).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured payment volume in period.",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Interchange and transaction fee scale — cards and wallets.",
      "segment": "consumer_lending",
      "slug": "payment_volume",
      "input": true
    },
    "consumer_finance.consumer_lending.bnpl_origination_growth": {
      "id": 1725,
      "name": "BNPL Origination Growth",
      "description": "Year-over-year growth in buy-now-pay-later originations (aggregated).",
      "industry": "Consumer Finance",
      "type": "Operational",
      "unit": "%",
      "methodology": "BNPL Growth = ((Current BNPL Originations − Prior) / Prior) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Embedded finance — BNPL wallet share and merchant partnerships.",
      "segment": "consumer_lending",
      "slug": "bnpl_origination_growth",
      "input": true
    },
    "consumer_finance.consumer_lending.embedded_finance_revenue_share": {
      "id": 1726,
      "name": "Embedded Finance Revenue Share",
      "description": "Share of consumer finance revenue from embedded or partner channels (aggregated).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Embedded Share = (Embedded Channel Revenue / Total Consumer Finance Revenue) × 100",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Distribution mix — platform and BaaS economics.",
      "segment": "consumer_lending",
      "slug": "embedded_finance_revenue_share",
      "calc": {
        "expr": "embedded_channel_revenue / total_consumer_finance_revenue * 100",
        "inputs": [
          "embedded_channel_revenue",
          "total_consumer_finance_revenue"
        ]
      }
    },
    "consumer_finance.consumer_lending.rtp_payment_volume": {
      "id": 1727,
      "name": "RTP Payment Volume",
      "description": "Real-time payments volume for consumer-facing rails (aggregated).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured RTP volume in period.",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Payments modernization — RTP adoption and fee scale.",
      "segment": "consumer_lending",
      "slug": "rtp_payment_volume",
      "input": true
    },
    "consumer_finance.consumer_lending.merchant_acquiring_volume": {
      "id": 1728,
      "name": "Merchant Acquiring Volume",
      "description": "Card acquiring volume where bank is acquirer or sponsor (consumer-facing, aggregated).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured acquiring volume in period.",
      "datasource": [
        "Aggregated consumer loan tape summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Merchant services — interchange and acquiring economics.",
      "segment": "consumer_lending",
      "slug": "merchant_acquiring_volume",
      "input": true
    },
    "consumer_finance.residential_mortgage.portfolio_yield": {
      "id": 1790,
      "name": "Residential Mortgage Portfolio Yield",
      "description": "Interest income on residential mortgage book relative to average balances (lender view).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Portfolio Yield = (Interest Income / Average Mortgage Balances) × 100",
      "datasource": [
        "Aggregated residential mortgage book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Spread on mortgage book vs funding and prepayment risk.",
      "segment": "residential_mortgage",
      "slug": "portfolio_yield",
      "calc": {
        "expr": "interest_income / average_mortgage_balances * 100",
        "inputs": [
          "interest_income",
          "average_mortgage_balances"
        ]
      }
    },
    "consumer_finance.residential_mortgage.delinquency_rate_30d": {
      "id": 1791,
      "name": "Residential Mortgage 30+ Day Delinquency",
      "description": "Share of mortgage balances past due 30+ days (lender book).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Delinquency Rate = (Delinquent Balance 30+ / Total Mortgage Balances) × 100",
      "datasource": [
        "Aggregated residential mortgage book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Early warning — rolls into NPLs and loss mitigation.",
      "segment": "residential_mortgage",
      "slug": "delinquency_rate_30d",
      "calc": {
        "expr": "delinquent_balance_30_plus / total_mortgage_balances * 100",
        "inputs": [
          "delinquent_balance_30_plus",
          "total_mortgage_balances"
        ]
      }
    },
    "consumer_finance.residential_mortgage.weighted_average_ltv": {
      "id": 1792,
      "name": "Residential Mortgage Weighted Average LTV",
      "description": "Loan-weighted LTV on residential mortgage portfolio (lender view).",
      "industry": "Consumer Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "WA LTV = Σ(Loan Balance × LTV) / Σ Loan Balances",
      "datasource": [
        "Aggregated residential mortgage book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Collateral cushion — equity buffer vs home price shocks.",
      "segment": "residential_mortgage",
      "slug": "weighted_average_ltv",
      "calc": {
        "expr": "weighted_ltv_numerator / total_mortgage_balances * 100",
        "inputs": [
          "weighted_ltv_numerator",
          "total_mortgage_balances"
        ]
      }
    },
    "consumer_finance.residential_mortgage.origination_volume_growth": {
      "id": 1793,
      "name": "Residential Mortgage Origination Growth",
      "description": "Year-over-year growth in new mortgage originations (aggregated).",
      "industry": "Consumer Finance",
      "type": "Operational",
      "unit": "%",
      "methodology": "Origination Growth = ((Current − Prior) / Prior) × 100",
      "datasource": [
        "Aggregated residential mortgage book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Production pipeline — purchase vs refi mix at portfolio level.",
      "segment": "residential_mortgage",
      "slug": "origination_volume_growth",
      "input": true
    },
    "commercial_finance.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1740,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.quick_ratio": {
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
      "id": 1741,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.gross_margin": {
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
      "id": 1742,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.operating_margin": {
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
      "id": 1743,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1744,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.net_margin": {
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
      "id": 1745,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.revenue_growth": {
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
      "id": 1746,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.working_capital": {
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
      "id": 1747,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.dso": {
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
      "id": 1748,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.dpo": {
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
      "id": 1749,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.ccc": {
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
      "id": 1750,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.operating_cash_flow": {
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
      "id": 1751,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.burn_rate": {
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
      "id": 1752,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.runway": {
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
      "id": 1753,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.core.headcount": {
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
      "id": 1754,
      "industry": "Commercial Finance",
      "segment": "core"
    },
    "commercial_finance.commercial_lending.commercial_loan_growth": {
      "id": 1760,
      "name": "Commercial Loan Growth",
      "description": "Year-over-year growth in outstanding commercial and C&I loan balances (aggregated).",
      "industry": "Commercial Finance",
      "type": "Operational",
      "unit": "%",
      "methodology": "Loan Growth = ((Current Outstanding − Prior Outstanding) / Prior Outstanding) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Book momentum — market share and underwriting appetite on C&I and middle market.",
      "segment": "commercial_lending",
      "slug": "commercial_loan_growth",
      "input": true
    },
    "commercial_finance.commercial_lending.portfolio_yield": {
      "id": 1761,
      "name": "Commercial Portfolio Yield",
      "description": "Interest income on commercial loans relative to average outstanding balance (aggregated C&I and middle market).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Portfolio Yield = (Interest Income / Average Commercial Loans) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Revenue driver — spread on commercial book vs funding and credit risk.",
      "segment": "commercial_lending",
      "slug": "portfolio_yield",
      "calc": {
        "expr": "interest_income / average_commercial_loans * 100",
        "inputs": [
          "interest_income",
          "average_commercial_loans"
        ]
      }
    },
    "commercial_finance.commercial_lending.non_performing_loan_ratio": {
      "id": 1762,
      "name": "Commercial NPL Ratio",
      "description": "Share of commercial loans past due or non-accrual (aggregated credit quality).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "NPL Ratio = (Non-Performing Commercial Loans / Total Commercial Loans) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Credit risk monitoring — provisions and relationship reviews.",
      "segment": "commercial_lending",
      "slug": "non_performing_loan_ratio",
      "calc": {
        "expr": "non_performing_commercial_loans / total_commercial_loans * 100",
        "inputs": [
          "non_performing_commercial_loans",
          "total_commercial_loans"
        ]
      }
    },
    "commercial_finance.commercial_lending.net_charge_off_rate": {
      "id": 1763,
      "name": "Commercial Net Charge-Off Rate",
      "description": "Commercial charge-offs net of recoveries as a share of average commercial loans.",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "NCO Rate = (Net Charge-Offs / Average Commercial Loans) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Credit loss — cyclical and sector concentration signal.",
      "segment": "commercial_lending",
      "slug": "net_charge_off_rate",
      "calc": {
        "expr": "net_charge_offs / average_commercial_loans * 100",
        "inputs": [
          "net_charge_offs",
          "average_commercial_loans"
        ]
      }
    },
    "commercial_finance.commercial_lending.origination_volume_growth": {
      "id": 1764,
      "name": "Commercial Origination Volume Growth",
      "description": "Year-over-year growth in new commercial loan commitments or fundings (aggregated).",
      "industry": "Commercial Finance",
      "type": "Operational",
      "unit": "%",
      "methodology": "Origination Growth = ((Current Originations − Prior Originations) / Prior Originations) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Pipeline and production — relationship manager capacity and risk appetite.",
      "segment": "commercial_lending",
      "slug": "origination_volume_growth",
      "input": true
    },
    "commercial_finance.commercial_lending.delinquency_rate_30d": {
      "id": 1765,
      "name": "Commercial 30+ Day Delinquency Rate",
      "description": "Share of commercial loan balances past due 30 days or more (aggregated).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Delinquency Rate = (Delinquent Balance 30+ / Total Commercial Loans) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Early warning — rolls into NPLs and provisions.",
      "segment": "commercial_lending",
      "slug": "delinquency_rate_30d",
      "calc": {
        "expr": "delinquent_balance_30_plus / total_commercial_loans * 100",
        "inputs": [
          "delinquent_balance_30_plus",
          "total_commercial_loans"
        ]
      }
    },
    "commercial_finance.commercial_lending.weighted_average_ltv": {
      "id": 1771,
      "name": "Weighted Average LTV",
      "description": "Loan-weighted LTV on commercial and CRE portfolios (lender book view).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "WA LTV = Σ(Loan Balance × LTV) / Σ Loan Balances",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Collateral adequacy — CRE and secured commercial exposure.",
      "segment": "commercial_lending",
      "slug": "weighted_average_ltv",
      "calc": {
        "expr": "weighted_ltv_numerator / total_commercial_loans * 100",
        "inputs": [
          "weighted_ltv_numerator",
          "total_commercial_loans"
        ]
      }
    },
    "commercial_finance.commercial_lending.portfolio_dscr": {
      "id": 1772,
      "name": "Portfolio DSCR",
      "description": "Loan-weighted average debt service coverage on commercial book (lender view).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "Number",
      "methodology": "Portfolio DSCR = Σ(DSCR × Loan Weight) on reporting book",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Cash-flow coverage — covenant monitoring at portfolio level.",
      "segment": "commercial_lending",
      "slug": "portfolio_dscr",
      "input": true
    },
    "commercial_finance.commercial_lending.sector_concentration_index": {
      "id": 1773,
      "name": "Sector Concentration Index",
      "description": "Herfindahl-style concentration of commercial exposures by industry sector (org book).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "Number",
      "methodology": "HHI = Σ(Sector Share²) × 10000 on outstanding balances",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "fpaWorkflow": "Concentration risk — diversification vs single-sector stress.",
      "segment": "commercial_lending",
      "slug": "sector_concentration_index",
      "input": true
    },
    "commercial_finance.commercial_lending.revolver_utilization_rate": {
      "id": 1774,
      "name": "Revolver Utilization Rate",
      "description": "Drawn committed lines relative to total commitments (aggregated).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Utilization = (Drawn Commitments / Total Commitments) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Line usage — liquidity demand and fee income potential.",
      "segment": "commercial_lending",
      "slug": "revolver_utilization_rate",
      "calc": {
        "expr": "drawn_commitments / total_commitments * 100",
        "inputs": [
          "drawn_commitments",
          "total_commitments"
        ]
      }
    },
    "commercial_finance.commercial_lending.treasury_fee_yield": {
      "id": 1775,
      "name": "Treasury Fee Yield",
      "description": "Cash management and liquidity service fees relative to commercial deposit balances.",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Treasury Fee Yield = (Treasury Fee Revenue / Average Commercial Deposits) × 100",
      "datasource": [
        "Aggregated commercial treasury summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Non-interest revenue — relationship treasury monetization.",
      "segment": "commercial_lending",
      "slug": "treasury_fee_yield",
      "calc": {
        "expr": "treasury_fee_revenue / average_commercial_deposits * 100",
        "inputs": [
          "treasury_fee_revenue",
          "average_commercial_deposits"
        ]
      }
    },
    "commercial_finance.commercial_lending.commercial_payment_volume": {
      "id": 1776,
      "name": "Commercial Payment Volume",
      "description": "B2B payment and wire volume processed for commercial clients (aggregated).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Directly measured payment volume in period.",
      "datasource": [
        "Aggregated commercial treasury summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Payments scale — embedded commercial flows and fee income.",
      "segment": "commercial_lending",
      "slug": "commercial_payment_volume",
      "input": true
    },
    "commercial_finance.commercial_lending.sustainable_finance_share": {
      "id": 1777,
      "name": "Sustainable Finance Share",
      "description": "Share of commercial outstandings tagged as sustainable or green-labeled (aggregated).",
      "industry": "Commercial Finance",
      "type": "Financial",
      "unit": "%",
      "methodology": "Sustainable Share = (Sustainable Loan Balance / Total Commercial Loans) × 100",
      "datasource": [
        "Aggregated commercial loan book summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "quarterly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "ESG lending — portfolio mix and disclosure.",
      "segment": "commercial_lending",
      "slug": "sustainable_finance_share",
      "calc": {
        "expr": "sustainable_loan_balance / total_commercial_loans * 100",
        "inputs": [
          "sustainable_loan_balance",
          "total_commercial_loans"
        ]
      }
    },
    "retail.core.current_ratio": {
      "datasource": [
        "Financial statements",
        "Trial balance",
        "Balance sheet"
      ],
      "description": "Short-term liquidity: ability to cover current liabilities with current assets.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1640,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.quick_ratio": {
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
      "id": 1641,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.gross_margin": {
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
      "id": 1642,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.operating_margin": {
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
      "id": 1643,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.ebitda_margin": {
      "datasource": [
        "Financial statements",
        "General ledger"
      ],
      "description": "Core operating cash profitability before interest, tax, depreciation and amortization.",
      "industryTags": [
        "Corporate Finance",
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
      "id": 1644,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.net_margin": {
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
      "id": 1645,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.revenue_growth": {
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
      "id": 1646,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.working_capital": {
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
      "id": 1647,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.dso": {
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
      "id": 1648,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.dpo": {
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
      "id": 1649,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.ccc": {
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
      "id": 1650,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.operating_cash_flow": {
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
      "id": 1651,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.burn_rate": {
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
      "id": 1652,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.runway": {
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
      "id": 1653,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.core.headcount": {
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
      "id": 1654,
      "industry": "Retail",
      "segment": "core"
    },
    "retail.operations.same_store_sales_growth": {
      "id": 1670,
      "name": "Same-Store Sales Growth",
      "description": "Year-over-year revenue growth for stores open in both periods (aggregated).",
      "industry": "Retail",
      "type": "Operational",
      "unit": "%",
      "methodology": "SSS Growth = ((Current Period Sales − Prior Period Sales) / Prior Period Sales) × 100",
      "datasource": [
        "Store sales summary export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Comp sales — separates mature-store momentum from new openings.",
      "segment": "operations",
      "slug": "same_store_sales_growth",
      "calc": {
        "expr": "(current_period_sales - prior_period_sales) / prior_period_sales * 100",
        "inputs": [
          "current_period_sales",
          "prior_period_sales"
        ]
      }
    },
    "retail.financial.inventory_turnover": {
      "id": 1671,
      "name": "Inventory Turnover",
      "description": "How often retail inventory is sold and replaced over a period.",
      "industry": "Retail",
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
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Working capital — ties shelf investment to sales velocity.",
      "segment": "financial",
      "slug": "inventory_turnover",
      "calc": {
        "expr": "cogs / average_inventory_value",
        "inputs": [
          "cogs",
          "average_inventory_value"
        ]
      }
    },
    "retail.operations.shrink_rate": {
      "id": 1672,
      "name": "Shrink Rate",
      "description": "Inventory loss from theft, damage, or administrative error (aggregated).",
      "industry": "Retail",
      "type": "Operational",
      "unit": "%",
      "methodology": "Shrink Rate = (Shrinkage Value / Sales) × 100",
      "datasource": [
        "Inventory adjustment export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": false,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Margin protection — shrink drives gross margin variance.",
      "segment": "operations",
      "slug": "shrink_rate",
      "calc": {
        "expr": "shrinkage_value / sales * 100",
        "inputs": [
          "shrinkage_value",
          "sales"
        ]
      }
    },
    "retail.financial.sales_per_square_foot": {
      "id": 1673,
      "name": "Sales per Square Foot",
      "description": "Revenue productivity per selling square foot (aggregated by store or banner).",
      "industry": "Retail",
      "type": "Financial",
      "unit": "Currency",
      "methodology": "Sales per Sq Ft = Net Sales / Selling Square Footage",
      "datasource": [
        "Store sales summary export"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "monthly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "fpaWorkflow": "Space productivity — real estate and format decisions.",
      "segment": "financial",
      "slug": "sales_per_square_foot",
      "calc": {
        "expr": "net_sales / selling_square_footage",
        "inputs": [
          "net_sales",
          "selling_square_footage"
        ]
      }
    },
    "retail.operations.conversion_rate": {
      "id": 1674,
      "name": "Conversion Rate",
      "description": "Share of store or site visitors who complete a purchase (omnichannel where available).",
      "industry": "Retail",
      "type": "Operational",
      "unit": "%",
      "methodology": "Conversion Rate = (Transactions / Visitors) × 100",
      "datasource": [
        "Store traffic and POS summary"
      ],
      "sensorFieldData": [
        "Not Applicable"
      ],
      "status": "data needed",
      "frequency": "weekly",
      "tech": "FINTECH",
      "higherIsBetter": true,
      "validationRule": "percentage",
      "validRange": {
        "hardMin": 0,
        "hardMax": 100
      },
      "fpaWorkflow": "Traffic quality — links marketing and labor to revenue.",
      "segment": "operations",
      "slug": "conversion_rate",
      "calc": {
        "expr": "transactions / visitors * 100",
        "inputs": [
          "transactions",
          "visitors"
        ]
      }
    }
  }
};

export const METRICS = enrichMetrics(REFERENCE_DATA.metrics);
