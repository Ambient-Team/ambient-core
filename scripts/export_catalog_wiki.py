#!/usr/bin/env python3
"""Export expanded catalog metrics (with calc) for ambientsystems.ai wiki generation."""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.generate_reference_catalog import (  # noqa: E402
    MANIFEST_VERSION,
    build_industry_entries,
    load_catalog,
    load_industry_registry,
)


def _metric_row(key: str, metric: dict) -> dict:
    calc = metric.get("calc")
    calc_out = None
    if isinstance(calc, dict):
        calc_out = {
            "expr": calc.get("expr"),
            "inputs": calc.get("inputs") or [],
        }
    return {
        "catalogMetricKey": key,
        "id": metric.get("id"),
        "name": metric.get("name"),
        "industry": metric.get("industry"),
        "segment": metric.get("segment"),
        "type": metric.get("type"),
        "unit": metric.get("unit"),
        "description": metric.get("description"),
        "methodology": metric.get("methodology"),
        "calc": calc_out,
        "fpaWorkflow": metric.get("fpaWorkflow"),
    }


def _data_option_row(key: str, option: dict) -> dict:
    return {
        "catalogOptionKey": key,
        "id": option.get("id"),
        "name": option.get("name"),
        "industry": option.get("industry"),
        "fields": option.get("fields") or [],
        "metricIds": option.get("metricIds") or [],
    }


def build_export() -> dict:
    default_industry, registry_packs = load_industry_registry()
    industry_entries = build_industry_entries(registry_packs)
    metrics, data_options, _benchmarks, _bridge, _crosswalk, _pack_bench = load_catalog()

    industries_out = []
    for entry in industry_entries:
        value = entry["value"]
        pack_metrics = [
            _metric_row(k, m)
            for k, m in sorted(metrics.items())
            if str(m.get("industry")) == value
        ]
        pack_options = [
            _data_option_row(k, o)
            for k, o in sorted(data_options.items())
            if str(o.get("industry")) == value
        ]
        industries_out.append(
            {
                "value": value,
                "label": entry["label"],
                "pack": entry["pack"],
                "industryCodes": entry.get("industryCodes") or {},
                "metrics": pack_metrics,
                "dataOptions": pack_options,
            }
        )

    core_metrics = [
        _metric_row(k, m) for k, m in sorted(metrics.items()) if ".core." in k
    ]

    return {
        "version": MANIFEST_VERSION,
        "defaultIndustry": default_industry,
        "industries": industries_out,
        "coreMetrics": core_metrics,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, required=True, help="Write JSON export to this path")
    parser.add_argument(
        "--check",
        type=Path,
        help="Compare SHA256 of export to committed snapshot at this path",
    )
    args = parser.parse_args()

    doc = build_export()
    payload = json.dumps(doc, indent=2, ensure_ascii=False) + "\n"
    digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()

    if args.check:
        if not args.check.is_file():
            print(f"Missing snapshot: {args.check}", file=sys.stderr)
            return 1
        snap = json.loads(args.check.read_text(encoding="utf-8"))
        snap_digest = snap.get("sha256")
        if snap_digest != digest:
            print(
                "catalog-wiki snapshot is stale — run export and sync-catalog-wiki",
                file=sys.stderr,
            )
            return 1
        print("catalog-wiki snapshot is up to date")
        return 0

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(payload, encoding="utf-8")
    print(f"Wrote {args.out} ({len(doc['industries'])} industries, digest {digest[:16]}…)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
