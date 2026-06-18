#!/usr/bin/env python3
"""Validate catalog/ YAML and generate catalog/runtime/*.js + catalog/manifest.json.

Industry packs are verticals (Real Estate, Manufacturing, …). Shared fpa_metrics.yaml
holds cross-industry corporate finance / close metrics expanded into each pack—not an
FP&A catalog industry.
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
RUNTIME = CATALOG / "runtime"
INDUSTRY_DIR = CATALOG / "industries"
CORE_DIR = CATALOG / "core"
SHARED_DIR = CORE_DIR / "shared"

INDUSTRY_PACK_MIN_METRICS = 3
INDUSTRY_PACK_MIN_DATA_OPTIONS = 2

GENERATED_RUNTIME_FILES = (
    "referenceData.js",
    "referenceMetrics.js",
    "referenceBenchmarks.js",
    "metricBridgeHints.js",
    "catalogIndustries.js",
    "catalogInputFieldPolicy.js",
    "catalogManifest.js",
)


def load_industry_registry() -> tuple[str, list[dict]]:
    data = _load_yaml(CORE_DIR / "industries.yaml")
    default = str(data.get("defaultIndustry") or "").strip()
    packs = data.get("packs")
    if not default:
        raise ValueError("catalog/core/industries.yaml missing defaultIndustry")
    if not isinstance(packs, list) or not packs:
        raise ValueError("catalog/core/industries.yaml missing packs")
    return default, packs


def build_industry_entries(packs: list[dict]) -> list[dict]:
    entries: list[dict] = []
    for pack_entry in packs:
        file_name = pack_entry.get("file")
        if not file_name:
            raise ValueError("industry pack entry missing file")
        pack_path = INDUSTRY_DIR / file_name
        if not pack_path.is_file():
            raise FileNotFoundError(f"Missing industry pack: {file_name}")
        pack = _load_yaml(pack_path)
        value = pack.get("industry")
        if not value:
            raise ValueError(f"Industry pack {file_name} missing top-level industry")
        label = pack_entry.get("displayLabel") or value
        entries.append({"value": value, "label": label, "pack": file_name})
    return entries


def _industry_pack_paths() -> list[Path]:
    _, packs = load_industry_registry()
    paths: list[Path] = []
    for pack_entry in packs:
        file_name = pack_entry.get("file")
        if not file_name:
            raise ValueError("industry pack entry missing file")
        path = INDUSTRY_DIR / file_name
        if not path.is_file():
            raise FileNotFoundError(f"Missing industry pack: {file_name}")
        paths.append(path)
    return paths


def _load_yaml(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data if isinstance(data, dict) else {}


def _merge_pack(base: dict, overlay: dict) -> dict:
    out = dict(base)
    for key, value in overlay.items():
        if key in out and isinstance(out[key], dict) and isinstance(value, dict):
            out[key] = _merge_pack(out[key], value)
        else:
            out[key] = value
    return out


def _industry_key_prefix(industry: str) -> str:
    return "All" + re.sub(r"[^a-z0-9]", "", industry.lower())


def _load_shared_fpa() -> tuple[dict, dict]:
    templates_path = SHARED_DIR / "fpa_metrics.yaml"
    ids_path = SHARED_DIR / "fpa_industry_ids.yaml"
    if not templates_path.is_file() or not ids_path.is_file():
        return {}, {}
    templates = _load_yaml(templates_path).get("templates") or {}
    industry_ids = _load_yaml(ids_path).get("industryIds") or {}
    return templates, industry_ids


def _load_shared_data_option_templates() -> tuple[dict, dict]:
    path = SHARED_DIR / "common_data_options.yaml"
    if not path.is_file():
        return {}, {}
    data = _load_yaml(path)
    return data.get("dataOptionTemplates") or {}, data.get("optionIds") or {}


def _metrics_by_normalized_name(metrics: dict) -> dict[str, list[tuple[int, str]]]:
    by_name: dict[str, list[tuple[int, str]]] = {}
    for key, metric in metrics.items():
        norm = normalize_name(metric.get("name"))
        if not norm:
            continue
        mid = metric.get("id")
        if mid is None:
            continue
        by_name.setdefault(norm, []).append((int(mid), key))
    return by_name


def _resolve_metric_refs(
    refs: list,
    industry: str,
    metrics: dict,
    context: str,
) -> list[int]:
    by_name = _metrics_by_normalized_name(metrics)
    resolved: list[int] = []
    for ref in refs or []:
        norm = normalize_name(ref)
        matches = [
            (mid, key)
            for mid, key in by_name.get(norm, [])
            if str(metrics[key].get("industry", "")) == industry
        ]
        if not matches:
            raise ValueError(
                f"{context}: metric ref {ref!r} not found for industry {industry!r}"
            )
        if len(matches) > 1:
            raise ValueError(
                f"{context}: metric ref {ref!r} is ambiguous for industry {industry!r}"
            )
        resolved.append(matches[0][0])
    if not resolved:
        raise ValueError(f"{context}: no metricRefs resolved for industry {industry!r}")
    return resolved


def _expand_fpa_metrics(pack_industry: str, pack_metrics: dict) -> dict:
    """Expand cross-industry corporate finance / close metrics into one vertical pack."""
    templates, industry_ids = _load_shared_fpa()
    if not templates:
        return {}
    id_map = industry_ids.get(pack_industry) or {}
    prefix = _industry_key_prefix(pack_industry)
    expanded: dict = {}
    for slug, template in templates.items():
        key = f"{prefix}fpa-{slug}"
        if key in pack_metrics:
            continue
        metric_id = id_map.get(slug)
        if metric_id is None:
            raise ValueError(
                f"Missing FPA id for {pack_industry!r} slug {slug!r} in fpa_industry_ids.yaml"
            )
        metric = copy.deepcopy(template)
        metric["id"] = metric_id
        metric["industry"] = pack_industry
        expanded[key] = metric
    return expanded


def _expand_common_data_options(
    pack_industry: str,
    pack_metrics: dict,
    pack_options: dict,
) -> dict:
    templates, option_ids = _load_shared_data_option_templates()
    if not templates:
        return {}
    prefix = _industry_key_prefix(pack_industry)
    industry_option_ids = option_ids.get(pack_industry) or {}
    expanded: dict = {}
    for template_key, template in templates.items():
        suffix = template.get("keySuffix")
        if not suffix:
            raise ValueError(f"Data option template {template_key} missing keySuffix")
        catalog_key = f"{prefix}{suffix}"
        if catalog_key in pack_options:
            continue
        option_id = industry_option_ids.get(template_key)
        if option_id is None:
            raise ValueError(
                f"Missing option id for {pack_industry!r} template {template_key!r}"
            )
        refs_cfg = template.get("metricRefs") or {}
        ref_names = refs_cfg.get(pack_industry) or refs_cfg.get("default") or []
        metric_ids = _resolve_metric_refs(
            ref_names,
            pack_industry,
            pack_metrics,
            f"common data option {template_key} ({pack_industry})",
        )
        option = {
            k: v
            for k, v in template.items()
            if k not in ("keySuffix", "metricRefs")
        }
        option = copy.deepcopy(option)
        option["id"] = option_id
        option["industry"] = pack_industry
        option["metricIds"] = metric_ids
        expanded[catalog_key] = option
    return expanded


def load_input_field_policy() -> tuple[set[str], list[re.Pattern]]:
    path = SHARED_DIR / "catalog_input_field_policy.yaml"
    if not path.is_file():
        return set(), []
    data = _load_yaml(path)
    exact = {str(f).strip().lower() for f in (data.get("excludeExact") or []) if f}
    patterns: list[re.Pattern] = []
    for raw in data.get("excludePatterns") or []:
        pat = str(raw).strip()
        if pat:
            patterns.append(re.compile(pat, re.IGNORECASE))
    return exact, patterns


def filter_input_fields(fields: list | None, exact: set[str], patterns: list[re.Pattern]) -> list:
    if not fields:
        return []
    out: list = []
    for field in fields:
        name = str(field).strip()
        if not name:
            continue
        lower = name.lower()
        if lower in exact:
            continue
        if any(p.search(lower) for p in patterns):
            continue
        out.append(name)
    return out


def apply_input_field_policy(data_options: dict, exact: set[str], patterns: list[re.Pattern]) -> None:
    for option in data_options.values():
        raw = option.get("fields")
        if raw is not None:
            option["fields"] = filter_input_fields(list(raw), exact, patterns)


def write_catalog_input_field_policy(exact: set[str], patterns: list[re.Pattern]) -> None:
    exact_sorted = json.dumps(sorted(exact))
    pattern_sources = json.dumps([p.pattern for p in patterns])
    content = f"""/**
 * AUTO-GENERATED from catalog/core/shared/catalog_input_field_policy.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
const EXCLUDE_EXACT = new Set({exact_sorted});

const EXCLUDE_PATTERN_SOURCES = {pattern_sources};

const EXCLUDE_PATTERNS = EXCLUDE_PATTERN_SOURCES.map((src) => new RegExp(src, 'i'));

export function filterCatalogInputFields(fields) {{
  if (!fields || !fields.length) return [];
  return fields.filter((field) => {{
    const name = String(field || '').trim();
    if (!name) return false;
    const lower = name.toLowerCase();
    if (EXCLUDE_EXACT.has(lower)) return false;
    return !EXCLUDE_PATTERNS.some((p) => p.test(lower));
  }});
}}
"""
    (RUNTIME / "catalogInputFieldPolicy.js").write_text(content, encoding="utf-8", newline="\n")


def load_catalog() -> tuple[dict, dict, dict, list, dict]:
    """Return metrics, data_options, benchmarks, bridge_rules, crosswalk."""
    metrics: dict = {}
    data_options: dict = {}
    benchmarks = _load_yaml(CORE_DIR / "benchmarks.yaml").get("benchmarks", {})
    bridge_rules = _load_yaml(CORE_DIR / "bridge_rules.yaml").get("rules", [])
    crosswalk = _load_yaml(CATALOG / "crosswalk.yaml")

    for pack_path in _industry_pack_paths():
        pack = _load_yaml(pack_path)
        pack_industry = pack.get("industry")
        if not pack_industry:
            raise ValueError(f"Industry pack {pack_path.name} missing top-level industry:")
        pack_metrics = dict(pack.get("metrics") or {})
        pack_options = dict(pack.get("dataOptions") or {})

        fpa_metrics = _expand_fpa_metrics(pack_industry, pack_metrics)
        merged_metrics = _merge_pack(fpa_metrics, pack_metrics)

        common_options = _expand_common_data_options(
            pack_industry, merged_metrics, pack_options
        )
        merged_options = _merge_pack(common_options, pack_options)

        for key, metric in merged_metrics.items():
            if str(metric.get("industry", pack_industry)) != pack_industry:
                raise ValueError(
                    f"{pack_path.name} metric {key} industry "
                    f"{metric.get('industry')!r} != pack {pack_industry!r}"
                )
            metrics[key] = metric
        for key, option in merged_options.items():
            if str(option.get("industry", pack_industry)) != pack_industry:
                raise ValueError(
                    f"{pack_path.name} data option {key} industry "
                    f"{option.get('industry')!r} != pack {pack_industry!r}"
                )
            data_options[key] = option

    exact, patterns = load_input_field_policy()
    apply_input_field_policy(data_options, exact, patterns)

    return metrics, data_options, benchmarks, bridge_rules, crosswalk


def normalize_name(name: str) -> str:
    return re.sub(r"\s+", " ", str(name or "").strip().lower())


def validate(
    metrics: dict,
    data_options: dict,
    benchmarks: dict,
    industry_entries: list[dict],
    default_industry: str,
) -> list[str]:
    errors: list[str] = []

    registered_values = {e["value"] for e in industry_entries}
    if default_industry not in registered_values:
        errors.append(
            f"defaultIndustry {default_industry!r} is not among registered industries"
        )

    registry_files = {e["pack"] for e in industry_entries}
    for yaml_path in INDUSTRY_DIR.glob("*.yaml"):
        if yaml_path.name not in registry_files:
            errors.append(
                f"Industry file {yaml_path.name} not listed in catalog/core/industries.yaml"
            )

    errors.extend(validate_metrics_schema(metrics))

    metric_ids: dict[int, str] = {}
    for key, metric in metrics.items():
        mid = metric.get("id")
        if mid is None:
            errors.append(f"Metric {key} missing numeric id")
            continue
        if mid in metric_ids:
            errors.append(f"Duplicate metric id {mid}: {metric_ids[mid]} and {key}")
        else:
            metric_ids[mid] = key

    option_ids: dict[int, str] = {}
    for key, option in data_options.items():
        oid = option.get("id")
        if oid is None:
            errors.append(f"Data option {key} missing numeric id")
            continue
        if oid in option_ids:
            errors.append(f"Duplicate data option id {oid}: {option_ids[oid]} and {key}")
        else:
            option_ids[oid] = key

        for mid in option.get("metricIds") or []:
            if mid not in metric_ids:
                errors.append(f"Data option {key} references unknown metric id {mid}")
                continue
            metric = metrics[metric_ids[mid]]
            if str(metric.get("industry", "")) != str(option.get("industry", "")):
                errors.append(
                    f"Data option {key} metricId {mid} belongs to industry "
                    f"{metric.get('industry')!r}, not {option.get('industry')!r}"
                )

    errors.extend(validate_data_options_schema(data_options))

    names_by_industry: dict[str, dict[str, str]] = {}
    for key, metric in metrics.items():
        industry = str(metric.get("industry", ""))
        if not industry or industry == "All":
            errors.append(f"Metric {key} must have a specific industry (not All)")
            continue
        if industry not in registered_values:
            errors.append(
                f"Metric {key} industry {industry!r} is not in catalog/core/industries.yaml"
            )
        bucket = names_by_industry.setdefault(industry, {})
        norm = normalize_name(metric.get("name"))
        if norm in bucket:
            errors.append(f"Duplicate metric name '{metric.get('name')}' in industry {industry}")
        bucket[norm] = key
        bkey = metric.get("benchmarkKey")
        if bkey and bkey not in benchmarks:
            errors.append(f"Metric {key} references unknown benchmarkKey {bkey}")
        for tag in metric.get("industryTags") or []:
            tag_str = str(tag).strip()
            if tag_str in registered_values and tag_str != industry:
                errors.append(
                    f"Metric {key} industryTags contains vertical {tag_str!r} "
                    f"but metric industry is {industry!r}"
                )

    metrics_by_industry: dict[str, int] = {}
    options_by_industry: dict[str, int] = {}
    for metric in metrics.values():
        ind = str(metric.get("industry", ""))
        metrics_by_industry[ind] = metrics_by_industry.get(ind, 0) + 1
    for option in data_options.values():
        ind = str(option.get("industry", ""))
        options_by_industry[ind] = options_by_industry.get(ind, 0) + 1

    for entry in industry_entries:
        value = entry["value"]
        pack_label = entry["pack"]
        pm_count = metrics_by_industry.get(value, 0)
        po_count = options_by_industry.get(value, 0)
        if pm_count < INDUSTRY_PACK_MIN_METRICS:
            errors.append(
                f"Industry pack {pack_label} ({value}) has fewer than "
                f"{INDUSTRY_PACK_MIN_METRICS} metrics after expansion"
            )
        if po_count < INDUSTRY_PACK_MIN_DATA_OPTIONS:
            errors.append(
                f"Industry pack {pack_label} ({value}) has fewer than "
                f"{INDUSTRY_PACK_MIN_DATA_OPTIONS} data options after expansion"
            )

    for pack_path in _industry_pack_paths():
        pack = _load_yaml(pack_path)
        pack_label = pack_path.name
        po = pack.get("dataOptions", {})
        for _k, opt in po.items():
            if not opt.get("metricIds"):
                errors.append(
                    f"Industry pack {pack_label} data option {opt.get('name')} has no metricIds"
                )
        for _k, opt in po.items():
            if str(opt.get("industry", "")) == "All":
                errors.append(f"Industry pack {pack_label} data option {_k} still tagged All")

    return errors


def validate_data_options_schema(data_options: dict) -> list[str]:
    schema_path = CATALOG / "schema" / "data-option-v1.json"
    if not schema_path.is_file():
        return []
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    required = schema.get("required") or []
    errors: list[str] = []
    for key, option in data_options.items():
        for field in required:
            if option.get(field) is None and field not in option:
                errors.append(f"Data option {key} missing required field {field}")
        mids = option.get("metricIds")
        if mids is not None and not isinstance(mids, list):
            errors.append(f"Data option {key} metricIds must be an array")
    return errors


def validate_metrics_schema(metrics: dict) -> list[str]:
    schema_path = CATALOG / "schema" / "metric-v1.json"
    if not schema_path.is_file():
        return []
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    required = schema.get("required") or []
    type_enum = (schema.get("properties") or {}).get("type", {}).get("enum") or []
    errors: list[str] = []
    for key, metric in metrics.items():
        for field in required:
            if metric.get(field) is None and field not in metric:
                errors.append(f"Metric {key} missing required field {field}")
        mtype = metric.get("type")
        if mtype and type_enum and mtype not in type_enum:
            errors.append(f"Metric {key} type {mtype!r} not in schema enum")
    return errors


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def js_object(obj: object, indent: int = 0) -> str:
    """Pretty-print JSON as JS object literal (valid JSON subset)."""
    return json.dumps(obj, indent=2, ensure_ascii=False)


def write_reference_data(data_options: dict) -> None:
    body = js_object({"dataOptions": data_options})
    content = f"""/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import {{ enrichDataOptions, inferFieldRule }} from './catalogEnrichment.js';

export {{ inferFieldRule }};

export const REFERENCE_DATA = {body};

export const DATA_OPTIONS = enrichDataOptions(REFERENCE_DATA.dataOptions);
"""
    (RUNTIME / "referenceData.js").write_text(content, encoding="utf-8", newline="\n")


def write_reference_metrics(metrics: dict) -> None:
    body = js_object({"metrics": metrics})
    content = f"""/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import {{ enrichMetrics, deriveMetricValidation }} from './catalogEnrichment.js';

export {{ deriveMetricValidation }};

export const REFERENCE_DATA = {body};

export const METRICS = enrichMetrics(REFERENCE_DATA.metrics);
"""
    (RUNTIME / "referenceMetrics.js").write_text(content, encoding="utf-8", newline="\n")


def write_reference_benchmarks(benchmarks: dict) -> None:
    benchmarks_js = js_object(benchmarks)
    content = f"""/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
export const BENCHMARKS = {benchmarks_js};

export function classifyAgainstBenchmark(value, benchmark) {{
  if (value === undefined || value === null || Number.isNaN(Number(value)) || !benchmark) return 'unknown';
  const v = Number(value);
  const {{ healthyLow, healthyHigh, higherIsBetter }} = benchmark;
  if (v >= healthyLow && v <= healthyHigh) return 'healthy';
  if (higherIsBetter) return v > healthyHigh ? 'strong' : 'below';
  return v < healthyLow ? 'strong' : 'below';
}}

export default BENCHMARKS;
"""
    (RUNTIME / "referenceBenchmarks.js").write_text(content, encoding="utf-8", newline="\n")


def write_bridge_hints(rules: list) -> None:
    rules_js = js_object(rules)
    content = f"""/**
 * AUTO-GENERATED from catalog/core/bridge_rules.yaml — do not edit by hand.
 */
const BRIDGE_RULES = {rules_js}.map((rule) => ({{
  test: new RegExp(rule.pattern, rule.flags || 'i'),
  financial: rule.financial,
  operational: rule.operational,
}}));

export function getMetricBridgeHint(metricsName, metricType) {{
  const name = String(metricsName || '');
  const type = String(metricType || '').toLowerCase();
  const rule = BRIDGE_RULES.find((r) => r.test.test(name));
  if (!rule) {{
    return type === 'operational'
      ? 'Operational signal — maps to validated financial metrics'
      : 'Institutional metric — validated against operational reality';
  }}
  return type === 'operational' ? rule.operational : rule.financial;
}}
"""
    (RUNTIME / "metricBridgeHints.js").write_text(content, encoding="utf-8", newline="\n")


def write_catalog_industries(default_industry: str, industry_entries: list[dict]) -> None:
    options_js = js_object(
        [{"value": e["value"], "label": e["label"]} for e in industry_entries]
    )
    default_js = js_string(default_industry)
    content = f"""/**
 * AUTO-GENERATED from catalog/core/industries.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
export const CATALOG_INDUSTRY_OPTIONS = {options_js};

export const CATALOG_INDUSTRY_VALUES = CATALOG_INDUSTRY_OPTIONS.map((o) => o.value);

export const DEFAULT_CATALOG_INDUSTRY = {default_js};

export function isCatalogIndustry(industry) {{
  return CATALOG_INDUSTRY_VALUES.includes(String(industry || '').trim());
}}

/** Pick the catalog industry used to filter KPI templates (organization-level). */
export function resolveCatalogIndustry(orgIndustry) {{
  const value = String(orgIndustry || '').trim();
  if (isCatalogIndustry(value)) return value;
  return DEFAULT_CATALOG_INDUSTRY;
}}
"""
    (RUNTIME / "catalogIndustries.js").write_text(content, encoding="utf-8", newline="\n")


def write_manifest(
    metrics: dict,
    data_options: dict,
    industry_entries: list[dict],
) -> None:
    metric_by_id = {m.get("id"): {"key": k, **m} for k, m in metrics.items()}
    entries = []
    for key, metric in metrics.items():
        required_sources = []
        for mid in metric.get("requiredSourceMetricIds") or []:
            pass
        for opt_key, opt in data_options.items():
            mids = opt.get("metricIds") or []
            if metric.get("id") in mids:
                required_sources.append(
                    {
                        "catalogOptionKey": opt_key,
                        "name": opt.get("name"),
                        "fields": opt.get("fields") or [],
                    }
                )
        entries.append(
            {
                "catalogMetricKey": key,
                "id": metric.get("id"),
                "name": metric.get("name"),
                "industry": metric.get("industry"),
                "methodology": metric.get("methodology"),
                "type": metric.get("type"),
                "unit": metric.get("unit"),
                "requiredSources": required_sources,
            }
        )
    manifest = {
        "version": 1,
        "industries": [
            {
                "value": e["value"],
                "label": e["label"],
                "pack": e["pack"],
            }
            for e in industry_entries
        ],
        "metrics": entries,
        "dataOptions": [
            {
                "catalogOptionKey": k,
                "id": v.get("id"),
                "name": v.get("name"),
                "industry": v.get("industry"),
                "metricIds": v.get("metricIds") or [],
                "fields": v.get("fields") or [],
            }
            for k, v in data_options.items()
        ],
    }
    out = CATALOG / "manifest.json"
    out.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    manifest_js = f"""/**
 * AUTO-GENERATED from catalog YAML — do not edit by hand.
 * Run: npm run catalog:generate
 * Full manifest for OLAP/ML: catalog/manifest.json
 */
export const catalogManifest = {json.dumps({"version": manifest["version"]}, ensure_ascii=False)};
"""
    (RUNTIME / "catalogManifest.js").write_text(manifest_js, encoding="utf-8", newline="\n")


def extract_core_from_runtime() -> None:
    """One-time: dump catalog/runtime into catalog/core/*.yaml."""
    CORE_DIR.mkdir(parents=True, exist_ok=True)
    INDUSTRY_DIR.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        ["node", str(ROOT / "scripts" / "dump_catalog_runtime.mjs")],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    payload = json.loads(result.stdout)
    (CORE_DIR / "metrics.yaml").write_text(
        yaml.safe_dump({"metrics": payload["metrics"]}, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
    )
    (CORE_DIR / "data_options.yaml").write_text(
        yaml.safe_dump({"dataOptions": payload["dataOptions"]}, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
    )
    (CORE_DIR / "benchmarks.yaml").write_text(
        yaml.safe_dump({"benchmarks": payload["benchmarks"]}, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
    )
    if not (CORE_DIR / "bridge_rules.yaml").is_file():
        (CORE_DIR / "bridge_rules.yaml").write_text(
            yaml.safe_dump(
                {
                    "rules": [
                        {
                            "pattern": "dscr|debt service coverage",
                            "flags": "i",
                            "financial": "Covenant headroom — lender DSCR tests",
                            "operational": "NOI and debt service — feeds DSCR",
                        },
                        {
                            "pattern": "cap(italization)?\\s*rate",
                            "flags": "i",
                            "financial": "Yield and valuation — cap rate sensitivity",
                            "operational": "NOI vs. asset value — cap rate input",
                        },
                        {
                            "pattern": "energy|kwh|power",
                            "flags": "i",
                            "operational": "Energy spike / efficiency — variance before close",
                            "financial": "Opex and NOI impact — debt covenant pressure",
                        },
                        {
                            "pattern": "sensor|iot|telemetry|anomal",
                            "flags": "i",
                            "operational": "Field telemetry — explains P&L variance",
                            "financial": "Validated financial impact after attestation",
                        },
                        {
                            "pattern": "noi|net operating income",
                            "flags": "i",
                            "financial": "Core profitability — DSCR and cap rate driver",
                            "operational": "Ops efficiency flows to NOI",
                        },
                    ]
                },
                sort_keys=False,
            ),
            encoding="utf-8",
        )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--extract", action="store_true", help="Extract catalog/core from current JS (one-time)")
    parser.add_argument("--check", action="store_true", help="Validate only; fail if generated files differ")
    args = parser.parse_args()

    if args.extract:
        extract_core_from_runtime()
        print("Extracted catalog/core from catalog/runtime")
        return 0

    if not _industry_pack_paths():
        print("No catalog/industries/*.yaml packs found", file=sys.stderr)
        return 1

    default_industry, registry_packs = load_industry_registry()
    industry_entries = build_industry_entries(registry_packs)
    metrics, data_options, benchmarks, bridge_rules, _crosswalk = load_catalog()
    exact, patterns = load_input_field_policy()
    errors = validate(
        metrics,
        data_options,
        benchmarks,
        industry_entries,
        default_industry,
    )
    if errors:
        for err in errors:
            print(f"catalog validation error: {err}", file=sys.stderr)
        return 1

    RUNTIME.mkdir(parents=True, exist_ok=True)

    manifest_path = CATALOG / "manifest.json"
    if args.check:
        before: dict[str, str] = {}
        for name in GENERATED_RUNTIME_FILES:
            path = RUNTIME / name
            before[name] = path.read_text(encoding="utf-8") if path.is_file() else ""
        before["manifest.json"] = (
            manifest_path.read_text(encoding="utf-8") if manifest_path.is_file() else ""
        )

    write_reference_data(data_options)
    write_reference_metrics(metrics)
    write_reference_benchmarks(benchmarks)
    write_bridge_hints(bridge_rules)
    write_catalog_industries(default_industry, industry_entries)
    write_catalog_input_field_policy(exact, patterns)
    write_manifest(metrics, data_options, industry_entries)

    if args.check:
        stale: list[str] = []
        for name in GENERATED_RUNTIME_FILES:
            path = RUNTIME / name
            after = path.read_text(encoding="utf-8")
            if before.get(name) != after:
                stale.append(name)
        after_manifest = manifest_path.read_text(encoding="utf-8")
        if before.get("manifest.json") != after_manifest:
            stale.append("manifest.json")
        if stale:
            for name in stale:
                print(f"Generated {name} is stale — run npm run catalog:generate", file=sys.stderr)
            return 1
        print("catalog generated files are up to date")
        return 0

    print(f"Generated catalog runtime ({len(metrics)} metrics, {len(data_options)} data options)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
