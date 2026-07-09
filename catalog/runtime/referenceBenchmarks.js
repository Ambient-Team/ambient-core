/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
export const BENCHMARKS = {
  "current_ratio": {
    "label": "Current Ratio",
    "unit": "Ratio",
    "healthyLow": 1.2,
    "healthyHigh": 2,
    "higherIsBetter": true,
    "source": "General corporate-finance norms"
  },
  "quick_ratio": {
    "label": "Quick Ratio",
    "unit": "Ratio",
    "healthyLow": 1,
    "healthyHigh": 1.5,
    "higherIsBetter": true,
    "source": "General corporate-finance norms"
  },
  "working_capital": {
    "label": "Working Capital",
    "unit": "Currency",
    "healthyLow": 100000,
    "healthyHigh": 1000000,
    "higherIsBetter": true,
    "source": "Scale-dependent guidance"
  },
  "gross_margin": {
    "label": "Gross Profit Margin",
    "unit": "%",
    "healthyLow": 40,
    "healthyHigh": 70,
    "higherIsBetter": true,
    "source": "Cross-industry median bands"
  },
  "operating_margin": {
    "label": "Operating Margin",
    "unit": "%",
    "healthyLow": 10,
    "healthyHigh": 25,
    "higherIsBetter": true,
    "source": "Cross-industry median bands"
  },
  "ebitda_margin": {
    "label": "EBITDA Margin",
    "unit": "%",
    "healthyLow": 15,
    "healthyHigh": 30,
    "higherIsBetter": true,
    "source": "Cross-industry median bands"
  },
  "net_margin": {
    "label": "Net Profit Margin",
    "unit": "%",
    "healthyLow": 8,
    "healthyHigh": 20,
    "higherIsBetter": true,
    "source": "Cross-industry median bands"
  },
  "revenue_growth": {
    "label": "Revenue Growth Rate",
    "unit": "%",
    "healthyLow": 10,
    "healthyHigh": 30,
    "higherIsBetter": true,
    "source": "Growth-stage guidance"
  },
  "dso": {
    "label": "Days Sales Outstanding",
    "unit": "Days",
    "healthyLow": 30,
    "healthyHigh": 45,
    "higherIsBetter": false,
    "source": "Order-to-cash norms"
  },
  "dpo": {
    "label": "Days Payable Outstanding",
    "unit": "Days",
    "healthyLow": 30,
    "healthyHigh": 60,
    "higherIsBetter": true,
    "source": "Procure-to-pay norms"
  },
  "ccc": {
    "label": "Cash Conversion Cycle",
    "unit": "Days",
    "healthyLow": 20,
    "healthyHigh": 60,
    "higherIsBetter": false,
    "source": "Working-capital norms"
  },
  "operating_cash_flow": {
    "label": "Operating Cash Flow",
    "unit": "Currency",
    "healthyLow": 200000,
    "healthyHigh": 1000000,
    "higherIsBetter": true,
    "source": "Scale-dependent guidance"
  },
  "burn_rate": {
    "label": "Monthly Burn Rate",
    "unit": "Currency/month",
    "healthyLow": 50000,
    "healthyHigh": 200000,
    "higherIsBetter": false,
    "source": "Early-stage guidance"
  },
  "runway": {
    "label": "Cash Runway",
    "unit": "Months",
    "healthyLow": 12,
    "healthyHigh": 24,
    "higherIsBetter": true,
    "source": "Venture norms (target ≥ 18 months)"
  },
  "noi": {
    "label": "Net Operating Income",
    "unit": "Currency",
    "healthyLow": 400000,
    "healthyHigh": 800000,
    "higherIsBetter": true,
    "source": "Asset-dependent guidance"
  },
  "cap_rate": {
    "label": "Capitalization Rate",
    "unit": "%",
    "healthyLow": 5,
    "healthyHigh": 8,
    "higherIsBetter": true,
    "source": "Market-dependent guidance"
  },
  "dscr": {
    "label": "Debt Service Coverage Ratio",
    "unit": "Ratio",
    "healthyLow": 1.5,
    "healthyHigh": 2.5,
    "higherIsBetter": true,
    "source": "Lender covenant norms (≥ 1.25x)"
  },
  "ltv_realestate": {
    "label": "Loan-to-Value",
    "unit": "%",
    "healthyLow": 60,
    "healthyHigh": 75,
    "higherIsBetter": false,
    "source": "Lending norms"
  },
  "vacancy_rate": {
    "label": "Vacancy Rate",
    "unit": "%",
    "healthyLow": 3,
    "healthyHigh": 7,
    "higherIsBetter": false,
    "source": "Market-dependent guidance"
  },
  "mrr": {
    "label": "Monthly Recurring Revenue",
    "unit": "Currency/month",
    "healthyLow": 50000,
    "healthyHigh": 500000,
    "higherIsBetter": true,
    "source": "Scale-dependent guidance"
  },
  "arr": {
    "label": "Annual Recurring Revenue",
    "unit": "Currency/year",
    "healthyLow": 600000,
    "healthyHigh": 6000000,
    "higherIsBetter": true,
    "source": "Scale-dependent guidance"
  },
  "nrr": {
    "label": "Net Revenue Retention",
    "unit": "%",
    "healthyLow": 100,
    "healthyHigh": 120,
    "higherIsBetter": true,
    "source": "Best-in-class SaaS ≥ 120%"
  },
  "gross_churn": {
    "label": "Gross Revenue Churn",
    "unit": "%",
    "healthyLow": 1,
    "healthyHigh": 5,
    "higherIsBetter": false,
    "source": "SaaS retention norms"
  },
  "cac": {
    "label": "Customer Acquisition Cost",
    "unit": "Currency",
    "healthyLow": 500,
    "healthyHigh": 10000,
    "higherIsBetter": false,
    "source": "Segment-dependent guidance"
  },
  "ltv": {
    "label": "Customer Lifetime Value",
    "unit": "Currency",
    "healthyLow": 3000,
    "healthyHigh": 50000,
    "higherIsBetter": true,
    "source": "Segment-dependent guidance"
  },
  "ltv_cac": {
    "label": "LTV : CAC Ratio",
    "unit": "Ratio",
    "healthyLow": 3,
    "healthyHigh": 5,
    "higherIsBetter": true,
    "source": "SaaS guardrail (≥ 3:1)"
  },
  "rule_of_40": {
    "label": "Rule of 40",
    "unit": "%",
    "healthyLow": 40,
    "healthyHigh": 60,
    "higherIsBetter": true,
    "source": "SaaS composite health (≥ 40%)"
  },
  "oee": {
    "label": "Overall Equipment Effectiveness",
    "unit": "%",
    "healthyLow": 60,
    "healthyHigh": 85,
    "higherIsBetter": true,
    "source": "World-class OEE ≈ 85%"
  },
  "inventory_turnover": {
    "label": "Inventory Turnover",
    "unit": "Turns",
    "healthyLow": 4,
    "healthyHigh": 12,
    "higherIsBetter": true,
    "source": "Sector-dependent guidance"
  },
  "capacity_utilization": {
    "label": "Capacity Utilization",
    "unit": "%",
    "healthyLow": 70,
    "healthyHigh": 90,
    "higherIsBetter": true,
    "source": "Operations norms"
  },
  "food_cost_pct": {
    "label": "Food Cost Percentage",
    "unit": "%",
    "healthyLow": 28,
    "healthyHigh": 35,
    "higherIsBetter": false,
    "source": "Full-service restaurant norms"
  },
  "labor_cost_pct": {
    "label": "Labor Cost Percentage",
    "unit": "%",
    "healthyLow": 25,
    "healthyHigh": 35,
    "higherIsBetter": false,
    "source": "Full-service restaurant norms"
  },
  "investment_close_rate": {
    "label": "Investment Close Rate",
    "unit": "%",
    "healthyLow": 2,
    "healthyHigh": 15,
    "higherIsBetter": true,
    "source": "Illustrative private-capital sourcing guidance"
  },
  "program_investment_conversion_rate": {
    "label": "Program Investment Conversion Rate",
    "unit": "%",
    "healthyLow": 1,
    "healthyHigh": 10,
    "higherIsBetter": true,
    "source": "Illustrative accelerator and cohort funnel guidance"
  },
  "inbound_attributed_pipeline_share": {
    "label": "Inbound Attributed Pipeline Share",
    "unit": "%",
    "healthyLow": 20,
    "healthyHigh": 60,
    "higherIsBetter": true,
    "source": "Illustrative inbound sourcing mix guidance"
  }
};

export function classifyAgainstBenchmark(value, benchmark) {
  if (value === undefined || value === null || Number.isNaN(Number(value)) || !benchmark) return 'unknown';
  const v = Number(value);
  const { healthyLow, healthyHigh, higherIsBetter } = benchmark;
  if (v >= healthyLow && v <= healthyHigh) return 'healthy';
  if (higherIsBetter) return v > healthyHigh ? 'strong' : 'below';
  return v < healthyLow ? 'strong' : 'below';
}

export default BENCHMARKS;
