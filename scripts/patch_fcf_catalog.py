#!/usr/bin/env python3
"""One-off maintainer helper: add FCF core metrics, industry ids, and benchmark rows.

Run from repo root after editing templates in catalog/shared/metrics.yaml.
"""

from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
SHARED_METRICS = CATALOG / "shared" / "metrics.yaml"
INDUSTRY_DIR = CATALOG / "industries"

NEW_SLUGS = (
    "free-cash-flow",
    "fcff",
    "fcfe",
    "fcf-margin",
    "fcf-conversion",
)

BENCHMARK_DEFS = {
    "free_cash_flow": {
        "label": "Free Cash Flow",
        "unit": "Currency",
        "healthyLow": 100000,
        "healthyHigh": 800000,
        "higherIsBetter": True,
        "source": "Scale-dependent guidance",
    },
    "fcff": {
        "label": "Free Cash Flow to Firm (FCFF)",
        "unit": "Currency",
        "healthyLow": 100000,
        "healthyHigh": 800000,
        "higherIsBetter": True,
        "source": "Scale-dependent guidance",
    },
    "fcfe": {
        "label": "Free Cash Flow to Equity (FCFE)",
        "unit": "Currency",
        "healthyLow": 80000,
        "healthyHigh": 700000,
        "higherIsBetter": True,
        "source": "Scale-dependent guidance",
    },
    "fcf_margin": {
        "label": "FCF Margin",
        "unit": "%",
        "healthyLow": 5,
        "healthyHigh": 25,
        "higherIsBetter": True,
        "source": "Cross-industry median bands",
    },
    "fcf_conversion": {
        "label": "FCF Conversion",
        "unit": "Ratio",
        "healthyLow": 0.5,
        "healthyHigh": 1.2,
        "higherIsBetter": True,
        "source": "Cross-industry median bands",
    },
}

BANK_STATEMENT_FIELDS = (
    ("capital_expenditures", "decimal"),
    ("net_borrowing", "decimal"),
)


def _load_yaml(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data if isinstance(data, dict) else {}


def _save_yaml(path: Path, data: dict) -> None:
    path.write_text(
        yaml.dump(data, default_flow_style=False, allow_unicode=True, sort_keys=False),
        encoding="utf-8",
    )


def patch_industry_ids_inplace(path: Path) -> None:
    lines = path.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    slug_line = re.compile(r"^(\s+)fixed-charge-coverage:\s+(\d+)\s*$")
    for i, line in enumerate(lines):
        m = slug_line.match(line)
        if m:
            indent, last_id = m.group(1), int(m.group(2))
            out.append(line)
            lookahead = lines[i + 1 : i + 6]
            if any(re.match(rf"^{re.escape(indent)}free-cash-flow:", ls) for ls in lookahead):
                continue
            next_id = last_id + 1
            for slug in NEW_SLUGS:
                out.append(f"{indent}{slug}: {next_id}")
                next_id += 1
            continue
        out.append(line)
    path.write_text("\n".join(out) + "\n", encoding="utf-8")


def patch_benchmarks() -> None:
    for pack_dir in sorted(INDUSTRY_DIR.iterdir()):
        path = pack_dir / "benchmarks.yaml"
        if not path.is_file():
            continue
        doc = _load_yaml(path)
        bench = doc.get("benchmarks") or {}
        insert_after = "operating_cash_flow"
        if insert_after not in bench:
            print(f"skip benchmarks {pack_dir.name}: no operating_cash_flow")
            continue
        for bkey, defn in BENCHMARK_DEFS.items():
            if bkey not in bench:
                bench[bkey] = dict(defn)
        ordered: dict = {}
        for key, val in bench.items():
            ordered[key] = val
            if key == insert_after:
                for bkey in BENCHMARK_DEFS:
                    if bkey not in ordered:
                        ordered[bkey] = BENCHMARK_DEFS[bkey]
        doc["benchmarks"] = ordered
        _save_yaml(path, doc)


def patch_bank_statements() -> None:
    for pack_dir in INDUSTRY_DIR.iterdir():
        path = pack_dir / "data_options.yaml"
        if not path.is_file():
            continue
        doc = _load_yaml(path)
        options = doc.get("dataOptions") or {}
        for opt in options.values():
            if str(opt.get("name", "")).strip().lower() != "bank statements":
                continue
            fields = opt.get("fields") or []
            names = {str(f.get("name")) for f in fields if isinstance(f, dict)}
            for fname, ftype in BANK_STATEMENT_FIELDS:
                if fname not in names:
                    fields.append({"name": fname, "type": ftype})
            opt["fields"] = fields
        doc["dataOptions"] = options
        _save_yaml(path, doc)


def patch_financial_statements_refs(data_options_path: Path) -> None:
    doc = _load_yaml(data_options_path)
    templates = doc.get("dataOptionTemplates") or {}
    fin = templates.get("financial_statements") or {}
    refs = fin.get("metricRefs") or {}
    default_refs = list(refs.get("default") or [])
    additions = [
        "Free Cash Flow",
        "Free Cash Flow to Firm (FCFF)",
        "Free Cash Flow to Equity (FCFE)",
        "FCF Margin",
        "FCF Conversion",
    ]
    for label in additions:
        if label not in default_refs:
            default_refs.append(label)
    refs["default"] = default_refs
    fin["metricRefs"] = refs
    templates["financial_statements"] = fin
    doc["dataOptionTemplates"] = templates
    _save_yaml(data_options_path, doc)


def main() -> int:
    patch_industry_ids_inplace(SHARED_METRICS)
    patch_benchmarks()
    patch_bank_statements()
    patch_financial_statements_refs(CATALOG / "shared" / "data_options.yaml")
    print("OK: FCF industry ids, benchmarks, bank statement fields, financial_statements refs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())