/**
 * AUTO-GENERATED from catalog/packs.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
export const CATALOG_INDUSTRY_OPTIONS = [
  {
    "value": "Real Estate",
    "label": "Real Estate (commercial)"
  },
  {
    "value": "Vertical Farming",
    "label": "Vertical Farming"
  },
  {
    "value": "Transportation",
    "label": "Transportation (freight)"
  },
  {
    "value": "Passenger Transit",
    "label": "Passenger Transit"
  },
  {
    "value": "Aviation",
    "label": "Aviation"
  },
  {
    "value": "Manufacturing",
    "label": "Manufacturing (machinery and discrete)"
  },
  {
    "value": "Construction",
    "label": "Construction (buildings and civil)"
  },
  {
    "value": "Healthcare",
    "label": "Healthcare"
  },
  {
    "value": "Restaurants",
    "label": "Restaurants"
  },
  {
    "value": "Life Sciences",
    "label": "Life Sciences"
  },
  {
    "value": "Banking",
    "label": "Banking (depository)"
  },
  {
    "value": "Financial Services",
    "label": "Financial Services"
  },
  {
    "value": "Funds",
    "label": "Funds"
  },
  {
    "value": "Trusts",
    "label": "Trusts"
  },
  {
    "value": "Insurance",
    "label": "Insurance"
  },
  {
    "value": "Credit Granting",
    "label": "Credit Granting"
  },
  {
    "value": "Software (SaaS)",
    "label": "Software (SaaS)"
  },
  {
    "value": "Retail",
    "label": "Retail"
  }
];

export const CATALOG_INDUSTRY_VALUES = CATALOG_INDUSTRY_OPTIONS.map((o) => o.value);

export const DEFAULT_CATALOG_INDUSTRY = "Real Estate";

export function isCatalogIndustry(industry) {
  return CATALOG_INDUSTRY_VALUES.includes(String(industry || '').trim());
}

/** Pick the catalog industry used to filter KPI templates (organization-level). */
export function resolveCatalogIndustry(orgIndustry) {
  const value = String(orgIndustry || '').trim();
  if (isCatalogIndustry(value)) return value;
  return DEFAULT_CATALOG_INDUSTRY;
}
