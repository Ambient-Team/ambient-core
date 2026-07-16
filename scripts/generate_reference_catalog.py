#!/usr/bin/env python3
"""Validate catalog/ YAML and generate catalog/runtime/*.js + catalog/manifest.json.

Output formats (see docs/CONVENTIONS.md): YAML in, JSON manifest + generated JS out.
Run ``ambient-catalog-generate --check`` in CI to detect drift.

Industry packs are verticals (Real Estate, Manufacturing, …). catalog/shared/metrics.yaml
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
SHARED_DIR = CATALOG / "shared"

MANIFEST_VERSION = 3

if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))

from ambient_pipeline.catalog_field_rules import (  # noqa: E402
    FIELD_COVERAGE_ENUMERATED,
    FREQUENCY_ORDER,
    field_entry_name,
    infer_field_coverage,
    input_excluded_from_field_list,
    normalize_field_entries,
)

# Class-level minimum patterns (division-only allowed when confidence is provisional).
ISIC_CLASS = re.compile(r"^\d{4}$")
ISIC_DIVISION = re.compile(r"^\d{2}$")
NAICS_CLASS = re.compile(r"^\d{5,6}$")
NACE_CLASS = re.compile(r"^\d{2}\.\d{2}$")
NACE_DIVISION = re.compile(r"^\d{2}$")
GICS_INDUSTRY = re.compile(r"^\d{6,8}$")

if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))
from ambient_calc import CalcError, formula_names  # noqa: E402

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
    data = _load_yaml(CATALOG / "packs.yaml")
    default = str(data.get("defaultIndustry") or "").strip()
    packs = data.get("packs")
    if not default:
        raise ValueError("catalog/packs.yaml missing defaultIndustry")
    if not isinstance(packs, list) or not packs:
        raise ValueError("catalog/packs.yaml missing packs")
    return default, packs


def _pack_id_from_entry(pack_entry: dict) -> str:
    pack_id = pack_entry.get("pack")
    if not pack_id:
        file_name = pack_entry.get("file")
        if file_name:
            pack_id = Path(file_name).stem
    if not pack_id:
        raise ValueError("industry pack entry missing pack")
    return str(pack_id)


def build_industry_entries(packs: list[dict]) -> list[dict]:
    entries: list[dict] = []
    for pack_entry in packs:
        pack_id = _pack_id_from_entry(pack_entry)
        pack_dir = INDUSTRY_DIR / pack_id
        if not pack_dir.is_dir():
            raise FileNotFoundError(f"Missing industry pack directory: {pack_id}")
        pack_meta = _load_yaml(pack_dir / "pack.yaml")
        value = pack_meta.get("industry")
        if not value:
            raise ValueError(f"Industry pack {pack_id} missing industry in pack.yaml")
        label = pack_entry.get("displayLabel") or value
        codes = pack_meta.get("industryCodes")
        if not isinstance(codes, dict):
            raise ValueError(f"Industry pack {pack_id} missing industryCodes in pack.yaml")
        entry: dict = {
            "value": value,
            "label": label,
            "pack": pack_id,
            "industryCodes": codes,
        }
        entries.append(entry)
    return entries


# ISIC Rev.4 section letter from 2-digit division (UN ISIC Rev.4)
_ISIC_SECTION_BY_DIVISION: list[tuple[int, int, str]] = [
    (1, 3, "A"),
    (5, 9, "B"),
    (10, 33, "C"),
    (35, 35, "D"),
    (36, 39, "E"),
    (41, 43, "F"),
    (45, 47, "G"),
    (49, 53, "H"),
    (55, 56, "I"),
    (58, 63, "J"),
    (64, 66, "K"),
    (68, 68, "L"),
    (69, 75, "M"),
    (77, 82, "N"),
    (84, 84, "O"),
    (85, 85, "P"),
    (86, 88, "Q"),
    (90, 93, "R"),
    (94, 96, "S"),
    (97, 97, "T"),
    (99, 99, "U"),
]


def _isic_hierarchy(class_code: str) -> dict[str, str] | None:
    code = str(class_code or "").strip()
    if not ISIC_CLASS.match(code):
        return None
    division = int(code[:2])
    section = "U"
    for lo, hi, letter in _ISIC_SECTION_BY_DIVISION:
        if lo <= division <= hi:
            section = letter
            break
    return {
        "section": section,
        "division": code[:2],
        "group": code[:3],
    }


def _industry_codes_for_manifest(codes: dict) -> dict:
    """YAML industryCodes → manifest camelCase (taxonomy keys unchanged)."""
    out: dict = {}
    for key in ("isic", "naics", "nace", "gics"):
        block = codes.get(key)
        if not isinstance(block, dict):
            continue
        row: dict = {
            "revision": block.get("revision"),
            "primary": block.get("primary"),
        }
        sec = block.get("secondary")
        if sec:
            row["secondary"] = list(sec)
        if key == "isic":
            derived = _isic_hierarchy(str(block.get("primary") or ""))
            if derived:
                row.update(derived)
        out[key] = row
    for meta in ("confidence", "lastReviewed", "source"):
        if meta in codes:
            out[meta] = codes[meta]
    return out


def _validate_taxonomy_code(
    system: str,
    code: str,
    confidence: str,
    path: str,
) -> list[str]:
    errors: list[str] = []
    provisional = confidence == "provisional"
    if system == "isic":
        if ISIC_CLASS.match(code):
            return errors
        if provisional and ISIC_DIVISION.match(code):
            return errors
        errors.append(f"{path}: ISIC code {code!r} must be 4-digit class (or 2-digit division if provisional)")
    elif system == "naics":
        if NAICS_CLASS.match(code):
            return errors
        errors.append(f"{path}: NAICS code {code!r} must be 5–6 digits")
    elif system == "nace":
        if NACE_CLASS.match(code):
            return errors
        if provisional and NACE_DIVISION.match(code):
            return errors
        errors.append(
            f"{path}: NACE code {code!r} must be class NN.NN (or division NN if provisional)"
        )
    elif system == "gics":
        if GICS_INDUSTRY.match(code):
            return errors
        errors.append(f"{path}: GICS code {code!r} must be 6–8 digits (industry or sub-industry)")
    return errors


def validate_pack_industry_codes(industry_entries: list[dict]) -> list[str]:
    errors: list[str] = []
    for entry in industry_entries:
        pack_id = entry["pack"]
        codes = entry.get("industryCodes")
        if not isinstance(codes, dict):
            errors.append(f"Pack {pack_id}: industryCodes must be a mapping")
            continue
        confidence = str(codes.get("confidence") or "")
        if confidence not in ("high", "medium", "low", "provisional"):
            errors.append(f"Pack {pack_id}: invalid industryCodes.confidence {confidence!r}")
        for system in ("isic", "naics", "nace", "gics"):
            block = codes.get(system)
            if not isinstance(block, dict):
                errors.append(f"Pack {pack_id}: missing industryCodes.{system}")
                continue
            primary = str(block.get("primary") or "").strip()
            if not primary:
                errors.append(f"Pack {pack_id}: industryCodes.{system}.primary is required")
                continue
            errors.extend(
                _validate_taxonomy_code(
                    system,
                    primary,
                    confidence,
                    f"Pack {pack_id} industryCodes.{system}.primary",
                )
            )
            secondary = block.get("secondary") or []
            if not isinstance(secondary, list):
                errors.append(f"Pack {pack_id}: industryCodes.{system}.secondary must be a list")
            elif len(secondary) > 2:
                errors.append(f"Pack {pack_id}: industryCodes.{system}.secondary max 2 entries")
            else:
                for i, sec in enumerate(secondary):
                    errors.extend(
                        _validate_taxonomy_code(
                            system,
                            str(sec).strip(),
                            confidence,
                            f"Pack {pack_id} industryCodes.{system}.secondary[{i}]",
                        )
                    )
        if not codes.get("lastReviewed"):
            errors.append(f"Pack {pack_id}: industryCodes.lastReviewed is required")
        if codes.get("source") not in ("manual", "expert", "imported"):
            errors.append(f"Pack {pack_id}: industryCodes.source is required (manual|expert|imported)")
    return errors


def _registered_pack_ids() -> list[str]:
    _, packs = load_industry_registry()
    pack_ids: list[str] = []
    for pack_entry in packs:
        pack_id = _pack_id_from_entry(pack_entry)
        pack_dir = INDUSTRY_DIR / pack_id
        if not pack_dir.is_dir():
            raise FileNotFoundError(f"Missing industry pack directory: {pack_id}")
        pack_ids.append(pack_id)
    return pack_ids


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


def _industry_token(industry: str) -> str:
    """Normalized industry token for slug keys, e.g. 'Real Estate' -> 'real_estate'."""
    return re.sub(r"_+", "_", re.sub(r"[^a-z0-9]+", "_", industry.lower())).strip("_")


def _core_key(industry: str, slug: str) -> str:
    """Canonical key for a core-layer entry expanded into an industry pack."""
    return f"{_industry_token(industry)}.core.{slug.replace('-', '_')}"


def _load_shared_fpa() -> tuple[dict, dict]:
    path = SHARED_DIR / "metrics.yaml"
    if not path.is_file():
        return {}, {}
    data = _load_yaml(path)
    return data.get("templates") or {}, data.get("industryIds") or {}


def _load_shared_data_option_templates() -> tuple[dict, dict]:
    path = SHARED_DIR / "data_options.yaml"
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
    expanded: dict = {}
    for slug, template in templates.items():
        key = _core_key(pack_industry, slug)
        if key in pack_metrics:
            continue
        metric_id = id_map.get(slug)
        if metric_id is None:
            raise ValueError(
                f"Missing core id for {pack_industry!r} slug {slug!r} in core_ids.yaml"
            )
        metric = copy.deepcopy(template)
        metric["id"] = metric_id
        metric["industry"] = pack_industry
        metric["segment"] = "core"
        if not metric.get("slug"):
            metric["slug"] = slug.replace("-", "_")
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
    industry_option_ids = option_ids.get(pack_industry) or {}
    expanded: dict = {}
    for template_key, template in templates.items():
        catalog_key = _core_key(pack_industry, template_key)
        if catalog_key in pack_options:
            continue
        option_id = industry_option_ids.get(template_key)
        if option_id is None:
            raise ValueError(
                f"Missing option id for {pack_industry!r} template {template_key!r}"
            )
        refs_cfg = template.get("metricRefs") or {}
        ref_names = list(refs_cfg.get("default") or [])
        for name in refs_cfg.get(pack_industry) or []:
            if name not in ref_names:
                ref_names.append(name)
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
        option["segment"] = "core"
        option["metricIds"] = metric_ids
        expanded[catalog_key] = option
    return expanded


def load_input_field_policy() -> tuple[set[str], list[re.Pattern]]:
    path = CATALOG / "input_field_policy.yaml"
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
        name = field_entry_name(field)
        if not name:
            continue
        if input_excluded_from_field_list(name, exact, patterns):
            continue
        out.append(field)
    return out


def normalize_data_option_metadata(data_options: dict) -> None:
    for key, option in data_options.items():
        raw = option.get("fields")
        if raw is not None:
            option["fields"] = normalize_field_entries(list(raw))
        option.setdefault(
            "fieldCoverage",
            infer_field_coverage(option, catalog_option_key=key),
        )
        option.setdefault("collectionFrequency", "monthly")
        option.setdefault("grain", "month")


def _measured_input_names(metric_key: str, metric: dict) -> list[str]:
    calc = metric.get("calc") or {}
    if calc.get("expr"):
        return [str(n) for n in (calc.get("inputs") or [])]
    if metric.get("input"):
        slug = metric.get("slug") or _metric_slug(metric_key, metric)
        return [slug] if slug else []
    return []


def _input_satisfied_by_field_or_policy(
    input_name: str,
    option: dict,
    exact: set[str],
    patterns: list[re.Pattern],
) -> bool:
    """Strict check: explicit field or input_field_policy upload exclusion only."""
    for field in option.get("fields") or []:
        if _norm_field(field_entry_name(field)) == _norm_field(input_name):
            return True
    return input_excluded_from_field_list(input_name, exact, patterns)


def _input_satisfied_by_option(
    input_name: str,
    option: dict,
    exact: set[str],
    patterns: list[re.Pattern],
) -> bool:
    if _input_satisfied_by_field_or_policy(input_name, option, exact, patterns):
        return True
    if not (option.get("fields") or []):
        return True
    template = str(option.get("template") or "")
    fmt = str(option.get("format") or "")
    if template in ("Financial Statement Template", "Transactional Data Template", "Document"):
        return True
    if fmt in ("Document", "Software"):
        return True
    return False


def validate_data_option_measured_inputs(
    metrics: dict,
    metric_ids: dict[int, str],
    data_options: dict,
    exact: set[str],
    patterns: list[re.Pattern],
    *,
    strict: bool = False,
) -> list[str]:
    """Return human-readable gap messages. ``strict=True`` omits document upload bypass."""
    messages: list[str] = []
    for ok, option in data_options.items():
        coverage = str(
            option.get("fieldCoverage") or infer_field_coverage(option, catalog_option_key=ok)
        )
        if coverage != FIELD_COVERAGE_ENUMERATED:
            continue
        for mid in option.get("metricIds") or []:
            mkey = metric_ids.get(int(mid))
            if not mkey:
                continue
            metric = metrics[mkey]
            for name in _measured_input_names(mkey, metric):
                if not name:
                    continue
                satisfied = (
                    _input_satisfied_by_field_or_policy(name, option, exact, patterns)
                    if strict
                    else _input_satisfied_by_option(name, option, exact, patterns)
                )
                if not satisfied:
                    messages.append(
                        f"Data option {ok} metric {mid} ({metric.get('name')}) "
                        f"missing measured input {name!r}"
                    )
    return messages


def validate_collection_frequency_coherence(
    metrics: dict,
    metric_ids: dict[int, str],
    data_options: dict,
) -> list[str]:
    warnings: list[str] = []
    for ok, option in data_options.items():
        coll = str(option.get("collectionFrequency") or "monthly").strip().lower()
        coll_rank = FREQUENCY_ORDER.get(coll)
        if coll_rank is None:
            warnings.append(f"Data option {ok} has unknown collectionFrequency {coll!r}")
            continue
        strictest: int | None = None
        strictest_label = ""
        for mid in option.get("metricIds") or []:
            mkey = metric_ids.get(int(mid))
            if not mkey:
                continue
            freq = str(metrics[mkey].get("frequency") or "monthly").strip().lower()
            rank = FREQUENCY_ORDER.get(freq)
            if rank is None:
                continue
            if strictest is None or rank < strictest:
                strictest = rank
                strictest_label = freq
        if strictest is not None and coll_rank > strictest:
            warnings.append(
                f"Data option {ok} collectionFrequency {coll!r} is coarser than linked "
                f"metric cadence {strictest_label!r}"
            )
    return warnings


def apply_input_field_policy(data_options: dict, exact: set[str], patterns: list[re.Pattern]) -> None:
    for option in data_options.values():
        raw = option.get("fields")
        if raw is not None:
            option["fields"] = filter_input_fields(list(raw), exact, patterns)


def write_catalog_input_field_policy(exact: set[str], patterns: list[re.Pattern]) -> None:
    exact_sorted = json.dumps(sorted(exact))
    pattern_sources = json.dumps([p.pattern for p in patterns])
    content = f"""/**
 * AUTO-GENERATED from catalog/input_field_policy.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
const EXCLUDE_EXACT = new Set({exact_sorted});

const EXCLUDE_PATTERN_SOURCES = {pattern_sources};

const EXCLUDE_PATTERNS = EXCLUDE_PATTERN_SOURCES.map((src) => new RegExp(src, 'i'));

function fieldNameFromEntry(field) {{
  if (field == null) return '';
  if (typeof field === 'string') return field.trim();
  if (typeof field === 'object') {{
    return String(field.name ?? field.field ?? field.key ?? field.id ?? '').trim();
  }}
  return String(field).trim();
}}

export function filterCatalogInputFields(fields) {{
  if (!fields || !fields.length) return [];
  return fields.filter((field) => {{
    const name = fieldNameFromEntry(field);
    if (!name) return false;
    const lower = name.toLowerCase();
    if (EXCLUDE_EXACT.has(lower)) return false;
    return !EXCLUDE_PATTERNS.some((p) => p.test(lower));
  }});
}}
"""
    (RUNTIME / "catalogInputFieldPolicy.js").write_text(content, encoding="utf-8", newline="\n")


def load_catalog() -> tuple[dict, dict, dict, list, dict, dict[str, dict]]:
    """Return metrics, data_options, benchmarks, bridge_rules, crosswalk, pack_benchmarks."""
    metrics: dict = {}
    data_options: dict = {}
    merged_benchmarks: dict = {}
    pack_benchmarks: dict[str, dict] = {}
    bridge_rules = _load_yaml(CATALOG / "bridge_rules.yaml").get("rules", [])
    crosswalk = _load_yaml(CATALOG / "crosswalk.yaml")

    for pack_id in _registered_pack_ids():
        pack_dir = INDUSTRY_DIR / pack_id
        pack_industry = _load_yaml(pack_dir / "pack.yaml").get("industry")
        if not pack_industry:
            raise ValueError(f"Industry pack {pack_id} missing industry in pack.yaml")
        pack_metrics = dict(_load_yaml(pack_dir / "metrics.yaml").get("metrics") or {})
        pack_options = dict(_load_yaml(pack_dir / "data_options.yaml").get("dataOptions") or {})
        bench = _load_yaml(pack_dir / "benchmarks.yaml").get("benchmarks") or {}
        pack_benchmarks[pack_id] = bench
        for bkey, defn in bench.items():
            if bkey in merged_benchmarks:
                if json.dumps(merged_benchmarks[bkey], sort_keys=True) != json.dumps(
                    defn, sort_keys=True
                ):
                    raise ValueError(
                        f"benchmark {bkey!r} has conflicting definitions across industry packs"
                    )
            else:
                merged_benchmarks[bkey] = defn

        fpa_metrics = _expand_fpa_metrics(pack_industry, pack_metrics)
        merged_metrics = _merge_pack(fpa_metrics, pack_metrics)

        common_options = _expand_common_data_options(
            pack_industry, merged_metrics, pack_options
        )
        merged_options = _merge_pack(common_options, pack_options)

        for key, metric in merged_metrics.items():
            if str(metric.get("industry", pack_industry)) != pack_industry:
                raise ValueError(
                    f"{pack_id} metric {key} industry "
                    f"{metric.get('industry')!r} != pack {pack_industry!r}"
                )
            metrics[key] = metric
        for key, option in merged_options.items():
            if str(option.get("industry", pack_industry)) != pack_industry:
                raise ValueError(
                    f"{pack_id} data option {key} industry "
                    f"{option.get('industry')!r} != pack {pack_industry!r}"
                )
            data_options[key] = option

    exact, patterns = load_input_field_policy()
    normalize_data_option_metadata(data_options)
    apply_input_field_policy(data_options, exact, patterns)

    return metrics, data_options, merged_benchmarks, bridge_rules, crosswalk, pack_benchmarks


def normalize_name(name: str) -> str:
    return re.sub(r"\s+", " ", str(name or "").strip().lower())


def validate(
    metrics: dict,
    data_options: dict,
    benchmarks: dict,
    industry_entries: list[dict],
    default_industry: str,
    pack_benchmarks: dict[str, dict],
) -> list[str]:
    errors: list[str] = []

    registered_values = {e["value"] for e in industry_entries}
    if default_industry not in registered_values:
        errors.append(
            f"defaultIndustry {default_industry!r} is not among registered industries"
        )

    registry_packs = {e["pack"] for e in industry_entries}
    industry_to_pack = {e["value"]: e["pack"] for e in industry_entries}

    for yaml_path in INDUSTRY_DIR.glob("*.yaml"):
        errors.append(
            f"Legacy monolithic industry file {yaml_path.name} — use catalog/industries/<pack>/"
        )
    for path in INDUSTRY_DIR.iterdir():
        if path.is_dir() and path.name not in registry_packs:
            errors.append(f"Industry directory {path.name} not listed in catalog/packs.yaml")

    for pack_id in registry_packs:
        if not (INDUSTRY_DIR / pack_id / "pack.yaml").is_file():
            errors.append(f"Industry pack {pack_id} missing pack.yaml")

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
                f"Metric {key} industry {industry!r} is not in catalog/packs.yaml"
            )
        bucket = names_by_industry.setdefault(industry, {})
        norm = normalize_name(metric.get("name"))
        if norm in bucket:
            errors.append(f"Duplicate metric name '{metric.get('name')}' in industry {industry}")
        bucket[norm] = key
        bkey = metric.get("benchmarkKey")
        if bkey:
            pack_id = industry_to_pack.get(industry, "")
            local = pack_benchmarks.get(pack_id, {})
            if bkey not in local:
                errors.append(
                    f"Metric {key} benchmarkKey {bkey!r} missing from "
                    f"catalog/industries/{pack_id}/benchmarks.yaml"
                )
            elif bkey not in benchmarks:
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

    for pack_id in registry_packs:
        po = _load_yaml(INDUSTRY_DIR / pack_id / "data_options.yaml").get("dataOptions") or {}
        for _k, opt in po.items():
            if not opt.get("metricIds"):
                errors.append(
                    f"Industry pack {pack_id} data option {opt.get('name')} has no metricIds"
                )
        for _k, opt in po.items():
            if str(opt.get("industry", "")) == "All":
                errors.append(f"Industry pack {pack_id} data option {_k} still tagged All")

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
 * AUTO-GENERATED from catalog/bridge_rules.yaml — do not edit by hand.
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
 * AUTO-GENERATED from catalog/packs.yaml — do not edit by hand.
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


def _norm_field(value: object) -> str:
    return str(value or "").strip().lower()


def _metric_slug(key: str, metric: dict) -> str:
    slug = metric.get("slug")
    if slug:
        return _norm_field(slug)
    if "." in key:
        return _norm_field(key.rsplit(".", 1)[-1].replace("-", "_"))
    return _norm_field(key.replace("-", "_"))


def build_metric_input_recipe(
    metric: dict,
    linked_options: list[dict],
    known_slugs: set[str],
) -> tuple[list[dict], str]:
    """Resolve a metric's required inputs to the data options that supply them.

    ``linked_options`` are the data options whose ``metricIds`` reference this metric,
    each shaped ``{"catalogOptionKey", "id", "name", "fields"}``. Returns
    ``(inputs, inputCoverage)`` where each input is::

        {"name", "kind": "measured"|"derived", "covered": bool, "satisfiedBy": [...]}

    Each ``satisfiedBy`` source carries ``via``:

    - ``field`` — the input is an explicit, mappable column on a linked data option;
    - ``upload`` — the input is supplied by a linked upload's document/template rather
      than an enumerated field (accounting line items and aggregates are intentionally
      not enumerated as fields — see ``catalog_input_field_policy.yaml``).

    ``inputCoverage`` is one of:

    - ``complete`` — every measured input is an explicit mappable field;
    - ``upload`` — feedable, but at least one measured input comes from an upload;
    - ``none`` — no data option references this metric (it cannot be fed as wired);
    - ``derived`` — computed only from other metrics (nothing to upload directly);
    - ``unspecified`` — the metric declares neither ``calc`` nor ``input``.
    """
    field_index: dict[str, list[dict]] = {}
    for opt in linked_options:
        for field in opt.get("fields") or []:
            field_index.setdefault(_norm_field(field_entry_name(field)), []).append(opt)

    def field_sources(name: str) -> list[dict]:
        return [
            {
                "catalogOptionKey": opt["catalogOptionKey"],
                "id": opt.get("id"),
                "name": opt.get("name"),
                "field": name,
                "via": "field",
            }
            for opt in field_index.get(_norm_field(name), [])
        ]

    def upload_sources() -> list[dict]:
        return [
            {
                "catalogOptionKey": opt["catalogOptionKey"],
                "id": opt.get("id"),
                "name": opt.get("name"),
                "via": "upload",
            }
            for opt in linked_options
        ]

    calc = metric.get("calc") or {}
    expr = calc.get("expr")
    measured_names: list[str] = []
    derived_names: list[str] = []
    if expr:
        measured_names = [str(n) for n in (calc.get("inputs") or [])]
        measured_set = {_norm_field(n) for n in measured_names}
        try:
            names = formula_names(expr)
        except CalcError:
            names = set()
        derived_names = sorted(
            n
            for n in names
            if _norm_field(n) in known_slugs and _norm_field(n) not in measured_set
        )
    elif metric.get("input"):
        slug = str(metric.get("slug") or "").strip()
        measured_names = [slug] if slug else []

    inputs: list[dict] = []
    for name in measured_names:
        sources = field_sources(name)
        if sources:
            inputs.append(
                {"name": name, "kind": "measured", "covered": True, "satisfiedBy": sources}
            )
        elif linked_options:
            inputs.append(
                {"name": name, "kind": "measured", "covered": True, "satisfiedBy": upload_sources()}
            )
        else:
            inputs.append({"name": name, "kind": "measured", "covered": False, "satisfiedBy": []})
    for name in derived_names:
        inputs.append({"name": name, "kind": "derived", "covered": True, "satisfiedBy": []})

    measured_inputs = [i for i in inputs if i["kind"] == "measured"]
    if not inputs:
        coverage = "unspecified"
    elif not measured_inputs:
        coverage = "derived"
    elif any(not i["covered"] for i in measured_inputs):
        coverage = "none"
    elif all(
        all(s.get("via") == "field" for s in i["satisfiedBy"]) for i in measured_inputs
    ):
        coverage = "complete"
    else:
        coverage = "upload"
    return inputs, coverage


def write_manifest(
    metrics: dict,
    data_options: dict,
    industry_entries: list[dict],
) -> None:
    slugs_by_industry: dict[str, set[str]] = {}
    for key, metric in metrics.items():
        slugs_by_industry.setdefault(str(metric.get("industry", "")), set()).add(
            _metric_slug(key, metric)
        )

    entries = []
    for key, metric in metrics.items():
        linked_options = [
            {
                "catalogOptionKey": opt_key,
                "id": opt.get("id"),
                "name": opt.get("name"),
                "fields": opt.get("fields") or [],
            }
            for opt_key, opt in data_options.items()
            if metric.get("id") in (opt.get("metricIds") or [])
        ]
        required_sources = [
            {
                "catalogOptionKey": o["catalogOptionKey"],
                "name": o["name"],
                "fields": [field_entry_name(f) for f in (o.get("fields") or [])],
            }
            for o in linked_options
        ]
        recipe_inputs, coverage = build_metric_input_recipe(
            metric,
            linked_options,
            slugs_by_industry.get(str(metric.get("industry", "")), set()),
        )
        calc = metric.get("calc") or {}
        calc_out = None
        if calc.get("expr"):
            calc_out = {"expr": calc.get("expr"), "inputs": list(calc.get("inputs") or [])}
        entries.append(
            {
                "catalogMetricKey": key,
                "id": metric.get("id"),
                "name": metric.get("name"),
                "industry": metric.get("industry"),
                "methodology": metric.get("methodology"),
                "type": metric.get("type"),
                "unit": metric.get("unit"),
                "frequency": metric.get("frequency"),
                "requiredSources": required_sources,
                "calc": calc_out,
                "directlyReported": bool(metric.get("input")) and calc_out is None,
                "inputs": recipe_inputs,
                "inputCoverage": coverage,
            }
        )
    manifest = {
        "version": MANIFEST_VERSION,
        "industries": [
            {
                "value": e["value"],
                "label": e["label"],
                "pack": e["pack"],
                "industryCodes": _industry_codes_for_manifest(e["industryCodes"]),
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
                "fieldCoverage": v.get("fieldCoverage"),
                "collectionFrequency": v.get("collectionFrequency"),
                "grain": v.get("grain"),
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
    """Obsolete after 0.2.7 catalog layout."""
    raise SystemExit(
        "catalog --extract is removed; edit catalog/shared/ and catalog/industries/<pack>/ YAML"
    )


def validate_manifest_on_disk(path: Path) -> list[str]:
    """Parse manifest.json with the same loader consumers use (dogfood typed boundary)."""
    lib = ROOT / "lib"
    if str(lib) not in sys.path:
        sys.path.insert(0, str(lib))
    from ambient_contracts.manifest_models import parse_catalog_manifest

    try:
        doc = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return [f"manifest.json: invalid JSON: {exc}"]
    try:
        parse_catalog_manifest(doc)
    except ValueError as exc:
        return [f"manifest.json: {exc}"]
    return []


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--extract", action="store_true", help="Obsolete (removed in 0.2.7 layout)")
    parser.add_argument("--check", action="store_true", help="Validate only; fail if generated files differ")
    parser.add_argument(
        "--strict-data-option-inputs",
        action="store_true",
        help="Fail generate when structured data options omit measured fields (default: warn only)",
    )
    args = parser.parse_args()

    if args.extract:
        extract_core_from_runtime()
        print("Extracted catalog from catalog/runtime")
        return 0

    if not _registered_pack_ids():
        print("No catalog/industries/<pack>/ directories found", file=sys.stderr)
        return 1

    default_industry, registry_packs = load_industry_registry()
    industry_entries = build_industry_entries(registry_packs)
    metrics, data_options, benchmarks, bridge_rules, _crosswalk, pack_benchmarks = load_catalog()
    exact, patterns = load_input_field_policy()
    errors = validate(
        metrics,
        data_options,
        benchmarks,
        industry_entries,
        default_industry,
        pack_benchmarks,
    )
    errors.extend(validate_pack_industry_codes(industry_entries))
    metric_id_index: dict[int, str] = {}
    for key, metric in metrics.items():
        mid = metric.get("id")
        if mid is not None:
            metric_id_index[int(mid)] = key
    input_gaps = validate_data_option_measured_inputs(
        metrics,
        metric_id_index,
        data_options,
        exact,
        patterns,
        strict=args.strict_data_option_inputs,
    )
    if args.strict_data_option_inputs:
        errors.extend(input_gaps)
    else:
        for msg in input_gaps:
            print(f"catalog validation warning: {msg}", file=sys.stderr)
    for warn in validate_collection_frequency_coherence(
        metrics, metric_id_index, data_options
    ):
        print(f"catalog validation warning: {warn}", file=sys.stderr)
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
    write_manifest(
        metrics,
        data_options,
        industry_entries,
    )

    manifest_parse_errors = validate_manifest_on_disk(manifest_path)
    if manifest_parse_errors:
        for err in manifest_parse_errors:
            print(f"catalog validation error: {err}", file=sys.stderr)
        return 1

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
