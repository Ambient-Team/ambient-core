#!/usr/bin/env python3
"""Harden catalog data-option YAML across all industry packs and shared templates.

For each data option on disk:

- Strip forbidden ``dummyFields`` (typed ``fields`` only)
- Set ``fieldCoverage`` (upload vs enumerated) when absent
- Set ``collectionFrequency`` / ``grain`` from linked metric cadence
- Normalize ``fields`` to typed objects ``{ name, type, … }``
- For ``fieldCoverage: enumerated``, append missing measured field names

Run:

  python scripts/harden_catalog_data_options.py --check
  python scripts/harden_catalog_data_options.py --write
"""

from __future__ import annotations

import argparse
import copy
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
INDUSTRY_DIR = CATALOG / "industries"
SHARED_DATA = CATALOG / "shared" / "data_options.yaml"

if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))

import generate_reference_catalog as gen  # noqa: E402
from ambient_pipeline.catalog_field_rules import (  # noqa: E402
    FIELD_COVERAGE_ENUMERATED,
    field_entry_name,
    infer_field_coverage,
    infer_grain_for_frequency,
    normalize_field_entry,
    normalize_field_entries,
    strictest_linked_metric_frequency,
)


def _field_dicts_for_yaml(entries: list[dict]) -> list[dict]:
    out: list[dict] = []
    for row in entries:
        item: dict = {"name": row["name"], "type": row["type"]}
        if row.get("nullable") is False:
            item["nullable"] = False
        if row.get("unit"):
            item["unit"] = row["unit"]
        if row.get("description"):
            item["description"] = row["description"]
        if row.get("format"):
            item["format"] = row["format"]
        out.append(item)
    return out


def _missing_enumerated_fields(
    option_key: str,
    option: dict,
    metrics: dict,
    metric_ids: dict[int, str],
    exact: set[str],
    patterns,
) -> list[str]:
    missing: list[str] = []
    seen: set[str] = set()
    present = {gen._norm_field(field_entry_name(f)) for f in (option.get("fields") or [])}
    for mid in option.get("metricIds") or []:
        mkey = metric_ids.get(int(mid))
        if not mkey:
            continue
        for name in gen._measured_input_names(mkey, metrics[mkey]):
            norm = gen._norm_field(name)
            if not norm or norm in present:
                continue
            if gen._input_satisfied_by_field_or_policy(name, option, exact, patterns):
                continue
            if norm not in seen:
                seen.add(norm)
                missing.append(name)
    return missing


def harden_option(
    option_key: str,
    option: dict,
    metrics: dict,
    metric_id_to_metric: dict[int, dict],
    metric_ids: dict[int, str],
    exact: set[str],
    patterns,
) -> dict:
    out = copy.deepcopy(option)
    if "dummyFields" in out:
        del out["dummyFields"]
    coverage = infer_field_coverage(out, catalog_option_key=option_key)
    out["fieldCoverage"] = coverage
    freq = strictest_linked_metric_frequency(out, metric_id_to_metric)
    out["collectionFrequency"] = out.get("collectionFrequency") or freq
    out["grain"] = out.get("grain") or infer_grain_for_frequency(freq)

    typed = normalize_field_entries(list(out.get("fields") or []))
    if coverage == FIELD_COVERAGE_ENUMERATED:
        for name in _missing_enumerated_fields(
            option_key, out, metrics, metric_ids, exact, patterns
        ):
            typed.append(normalize_field_entry(name))
    out["fields"] = _field_dicts_for_yaml(typed)
    return out


def _process_options_map(
    options: dict,
    metrics: dict,
    metric_ids: dict[int, str],
    metric_id_to_metric: dict[int, dict],
    exact: set[str],
    patterns,
) -> tuple[dict, int]:
    changed = 0
    new_map: dict = {}
    for key, opt in options.items():
        hardened = harden_option(
            key, opt, metrics, metric_id_to_metric, metric_ids, exact, patterns
        )
        if hardened != opt:
            changed += 1
        new_map[key] = hardened
    return new_map, changed


def _yaml_dump(data: dict) -> str:
    return yaml.dump(
        data,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
        width=120,
    )


def _assert_no_dummy_fields(doc: dict, path: Path, errors: list[str]) -> None:
    for key in ("dataOptionTemplates", "dataOptions"):
        mapping = doc.get(key) or {}
        if not isinstance(mapping, dict):
            continue
        for opt_key, opt in mapping.items():
            if isinstance(opt, dict) and "dummyFields" in opt:
                errors.append(f"{path.relative_to(ROOT)}: {opt_key} still has dummyFields")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write hardened YAML to disk")
    parser.add_argument("--check", action="store_true", help="Exit 1 if any file would change")
    args = parser.parse_args()
    if not args.write and not args.check:
        args.check = True

    metrics, data_options, *_ = gen.load_catalog()
    exact, patterns = gen.load_input_field_policy()
    metric_ids: dict[int, str] = {}
    metric_id_to_metric: dict[int, dict] = {}
    for key, metric in metrics.items():
        mid = metric.get("id")
        if mid is not None:
            metric_ids[int(mid)] = key
            metric_id_to_metric[int(mid)] = metric

    total_changes = 0
    files_touched: list[Path] = []
    dummy_errors: list[str] = []

    # Shared templates (only dataOptionTemplates — not optionIds)
    shared_path = SHARED_DATA
    if shared_path.is_file():
        doc = yaml.safe_load(shared_path.read_text(encoding="utf-8")) or {}
        _assert_no_dummy_fields(doc, shared_path, dummy_errors)
        templates = doc.get("dataOptionTemplates") or {}
        new_templates, n = _process_options_map(
            templates, metrics, metric_ids, metric_id_to_metric, exact, patterns
        )
        if n:
            total_changes += n
            files_touched.append(shared_path)
            if args.write:
                doc["dataOptionTemplates"] = new_templates
                shared_path.write_text(_yaml_dump(doc), encoding="utf-8")

    for pack_dir in sorted(p for p in INDUSTRY_DIR.iterdir() if p.is_dir()):
        path = pack_dir / "data_options.yaml"
        if not path.is_file():
            continue
        doc = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        _assert_no_dummy_fields(doc, path, dummy_errors)
        options = doc.get("dataOptions") or {}
        new_options, n = _process_options_map(
            options, metrics, metric_ids, metric_id_to_metric, exact, patterns
        )
        if n:
            total_changes += n
            files_touched.append(path)
            if args.write:
                doc["dataOptions"] = new_options
                path.write_text(_yaml_dump(doc), encoding="utf-8")

    if dummy_errors and not args.write:
        print("dummyFields forbidden (typed fields only):")
        for err in dummy_errors:
            print(f"  {err}")
        return 1

    if args.write:
        print(f"Hardened {len(files_touched)} file(s), {total_changes} option(s) updated.")
        for p in files_touched:
            print(f"  {p.relative_to(ROOT)}")
    else:
        if total_changes:
            print(f"Catalog hardening drift: {total_changes} option(s) in {len(files_touched)} file(s)")
            for p in files_touched:
                print(f"  {p.relative_to(ROOT)}")
            return 1
        print("Catalog data options already hardened.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
