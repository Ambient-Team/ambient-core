/**
 * AUTO-GENERATED from catalog/input_field_policy.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
const EXCLUDE_EXACT = new Set(["current_assets", "current_liabilities", "ebit", "ebitda", "equity", "gross_profit", "net_profit", "operating_income", "operating_profit", "total_assets", "total_expenses", "total_income", "total_liabilities"]);

const EXCLUDE_PATTERN_SOURCES = ["_margin$", "_ratio$", "_percent$", "_pct$"];

const EXCLUDE_PATTERNS = EXCLUDE_PATTERN_SOURCES.map((src) => new RegExp(src, 'i'));

function fieldNameFromEntry(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field.trim();
  if (typeof field === 'object') {
    return String(field.name ?? field.field ?? field.key ?? field.id ?? '').trim();
  }
  return String(field).trim();
}

export function filterCatalogInputFields(fields) {
  if (!fields || !fields.length) return [];
  return fields.filter((field) => {
    const name = fieldNameFromEntry(field);
    if (!name) return false;
    const lower = name.toLowerCase();
    if (EXCLUDE_EXACT.has(lower)) return false;
    return !EXCLUDE_PATTERNS.some((p) => p.test(lower));
  });
}
