/**
 * AUTO-GENERATED from catalog/bridge_rules.yaml — do not edit by hand.
 */
const BRIDGE_RULES = [
  {
    "pattern": "dscr|debt service coverage",
    "flags": "i",
    "financial": "Covenant headroom — lender DSCR tests",
    "operational": "NOI and debt service — feeds DSCR"
  },
  {
    "pattern": "cap(italization)?\\s*rate",
    "flags": "i",
    "financial": "Yield and valuation — cap rate sensitivity",
    "operational": "NOI vs. asset value — cap rate input"
  },
  {
    "pattern": "energy|kwh|power",
    "flags": "i",
    "operational": "Energy spike / efficiency — variance before close",
    "financial": "Opex and NOI impact — debt covenant pressure"
  },
  {
    "pattern": "sensor|iot|telemetry|anomal",
    "flags": "i",
    "operational": "Field telemetry — explains P&L variance",
    "financial": "Validated financial impact after attestation"
  },
  {
    "pattern": "noi|net operating income",
    "flags": "i",
    "financial": "Core profitability — DSCR and cap rate driver",
    "operational": "Ops efficiency flows to NOI"
  }
].map((rule) => ({
  test: new RegExp(rule.pattern, rule.flags || 'i'),
  financial: rule.financial,
  operational: rule.operational,
}));

export function getMetricBridgeHint(metricsName, metricType) {
  const name = String(metricsName || '');
  const type = String(metricType || '').toLowerCase();
  const rule = BRIDGE_RULES.find((r) => r.test.test(name));
  if (!rule) {
    return type === 'operational'
      ? 'Operational signal — maps to validated financial metrics'
      : 'Institutional metric — validated against operational reality';
  }
  return type === 'operational' ? rule.operational : rule.financial;
}
