/**
 * AUTO-GENERATED from catalog/core/industries.yaml — do not edit by hand.
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
    "label": "Transportation"
  },
  {
    "value": "Manufacturing",
    "label": "Manufacturing"
  },
  {
    "value": "Healthcare",
    "label": "Healthcare"
  },
  {
    "value": "Restaurants",
    "label": "Restaurants"
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
