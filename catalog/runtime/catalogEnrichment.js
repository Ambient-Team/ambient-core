/**
 * Enrichment helpers for reference catalog entries (source data lives under catalog/).
 */

import { filterCatalogInputFields } from './catalogInputFieldPolicy.js';

const SENSITIVITY_BY_TEMPLATE = {
  'Financial Statement Template': 'confidential',
  'Transactional Data Template': 'internal',
  Document: 'internal',
  Software: 'internal',
};

function inferOwnership(name = '') {
  const n = String(name).toLowerCase();
  if (/(financial|accounting|ledger|bank|receivable|payable|loan|mortgage|tax)/.test(n)) return 'Finance';
  if (/(hr|payroll|employee|people)/.test(n)) return 'HR';
  if (/(maintenance|sensor|telematics|energy|irrigation|farm|production|machine|mes|quality|pos|inventory)/.test(n)) {
    return 'Operations';
  }
  return 'Operations';
}

function inferFrequency(option = {}) {
  const fmt = String(option.format || '').toLowerCase();
  if (fmt.includes('transactional')) return 'daily';
  if (fmt.includes('software')) return 'continuous';
  if (fmt.includes('financial statement')) return 'monthly';
  return 'monthly';
}

function inferDataTypes(option = {}) {
  const types = new Set();
  const fmt = String(option.format || '').toLowerCase();
  const name = String(option.name || '').toLowerCase();
  if (fmt.includes('financial') || /(ledger|balance|bank|receivable|payable|income|loan|mortgage)/.test(name)) {
    types.add('financial');
  }
  if (fmt.includes('transactional')) types.add('transactional');
  if (fmt.includes('software')) types.add('operational');
  if (/(sensor|telematics|gps|energy|irrigation|crop|production|machine|mes|oee|scrap)/.test(name)) types.add('sensor');
  if (/(hr|payroll|employee|customer|tenant|buyer|seller|driver|patient|staff)/.test(name)) types.add('personal-data');
  if (types.size === 0) types.add('operational');
  return Array.from(types);
}

/**
 * @param {string} field
 */
export function inferFieldRule(field = '') {
  const f = field.toLowerCase();
  const rule = { field, type: 'string', required: true };

  if (f === 'date' || f.endsWith('_date') || f.endsWith('date')) {
    return { ...rule, type: 'date', format: 'YYYY-MM-DD' };
  }
  if (/(rate|probability|adoption|pct|percent|margin|utilization|effectiveness)/.test(f)) {
    return { ...rule, type: 'number', min: 0, max: 100 };
  }
  if (/(interest_rate)/.test(f)) {
    return { ...rule, type: 'number', min: 0, max: 100 };
  }
  if (/(amount|price|cost|revenue|income|expense|debit|credit|balance|value|spend|mrr|payment|fee|liabilit|asset|equity|salary|loan|valuation)/.test(f)) {
    return { ...rule, type: 'currency', min: 0 };
  }
  if (/(quantity|units?|count|sessions|users|leads|customers|reading|odometer|distance|speed|consumed|yield|harvested|days_outstanding|term|runtime|on_hand|reorder|covers|turns|downtime_minutes|patient_volume)/.test(f)) {
    return { ...rule, type: 'number', min: 0 };
  }
  if (/(status|stage|direction|bucket|grade|type|method|period|shift|channel)/.test(f)) {
    return { ...rule, type: 'enum' };
  }
  if (/(id|code)$/.test(f) || f.endsWith('_id')) {
    return { ...rule, type: 'id' };
  }
  return rule;
}

function inferResidency(dataTypes = []) {
  const hasPersonal = dataTypes.includes('personal-data');
  const hasFinancial = dataTypes.includes('financial');
  const regimes = [];
  if (hasPersonal) regimes.push('GDPR Art. 25', 'PIPEDA');
  if (hasFinancial) regimes.push('SOC 2', 'ISO 8000');
  if (regimes.length === 0) regimes.push('ISO 8000');
  return {
    regulated: hasPersonal || hasFinancial,
    regimes,
    residencyRequired: hasPersonal || hasFinancial,
    notes: hasPersonal
      ? 'Contains personal data — must remain within its region’s sovereign boundary.'
      : 'Governed within the organization’s configured data-residency region.',
  };
}

function buildMetadata(option) {
  const dataTypes = inferDataTypes(option);
  const fields = filterCatalogInputFields(Array.isArray(option.fields) ? option.fields : []);
  return {
    frequency: inferFrequency(option),
    dataTypes,
    sensitivity:
      SENSITIVITY_BY_TEMPLATE[option.template] ||
      (dataTypes.includes('personal-data') ? 'restricted' : 'internal'),
    ownershipRole: inferOwnership(option.name),
    residency: inferResidency(dataTypes),
    validationRules: fields.map(inferFieldRule),
    locationTagging: {
      required: true,
      multiple: true,
      note: 'Tag this source to one or more organization locations to enforce data residency.',
    },
  };
}

export function enrichDataOptions(optionMap) {
  return Object.entries(optionMap).reduce((acc, [key, option]) => {
    const fields = filterCatalogInputFields(option.fields || []);
    const normalized = { ...option, fields };
    acc[key] = {
      ...normalized,
      catalogOptionKey: key,
      metadata: option.metadata || buildMetadata(normalized),
    };
    return acc;
  }, {});
}

const DEFAULT_FREQUENCY = { Financial: 'monthly', Operational: 'weekly' };

/**
 * @param {Object} metric
 */
export function deriveMetricValidation(metric) {
  if (!metric) return { kind: 'number', hardMin: -Infinity, hardMax: Infinity };
  const explicit = metric.validRange || {};
  const unit = String(metric.unit || '').toLowerCase();

  let kind = metric.validationRule;
  if (!kind) {
    if (unit.includes('%') || unit.includes('percent')) kind = 'percentage';
    else if (unit.includes('ratio') || unit === 'number') kind = 'ratio';
    else if (unit.includes('day')) kind = 'days';
    else if (unit.includes('month')) kind = 'number';
    else if (unit.includes('currency') || unit.includes('usd') || unit.includes('$')) kind = 'currency';
    else kind = 'number';
  }

  const defaultMin = kind === 'currency_signed' || kind === 'days_signed' ? -Infinity : 0;
  const hardMin = explicit.hardMin !== undefined ? explicit.hardMin : defaultMin;
  const hardMax = explicit.hardMax !== undefined ? explicit.hardMax
    : kind === 'percentage' ? 100 : Infinity;

  return { kind, hardMin, hardMax };
}

export function enrichMetrics(metricMap) {
  return Object.entries(metricMap).reduce((acc, [key, metric]) => {
    acc[key] = {
      ...metric,
      frequency: metric.frequency || DEFAULT_FREQUENCY[metric.type] || 'monthly',
      higherIsBetter: metric.higherIsBetter !== undefined ? metric.higherIsBetter : true,
      industryTags: metric.industryTags || [metric.industry],
      validation: deriveMetricValidation(metric),
      fpaWorkflow:
        metric.fpaWorkflow ||
        `Tracked in the ${metric.type === 'Financial' ? 'monthly close' : 'operational review'} ` +
          'and fed back into the next planning cycle.',
    };
    return acc;
  }, {});
}
