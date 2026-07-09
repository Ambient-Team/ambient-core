#!/usr/bin/env python3
"""Audit data-option fields against linked metrics' measured calc inputs.

For each data option, unions ``calc.inputs`` (and the metric slug when ``input: true``)
from all ``metricIds``. Reports ``missingFields`` (required but not on the option) and
``orphanFields`` (listed fields not required by any linked metric).

By default uses **strict** field coverage (explicit columns or input_field_policy exclusions
only). Pass ``--lenient`` to apply the same document/upload bypass as catalog generate.

Run:

  python scripts/audit_data_option_fields.py
  python scripts/audit_data_option_fields.py --markdown --report docs/catalog-input-field-gaps.md
  python scripts/audit_data_option_fields.py --json
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
INDUSTRY_DIR = CATALOG / "industries"
SHARED_DATA_OPTIONS = CATALOG / "shared" / "data_options.yaml"

if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))

import generate_reference_catalog as gen  # noqa: E402
from ambient_pipeline.catalog_field_rules import (  # noqa: E402
    FIELD_COVERAGE_ENUMERATED,
    field_entry_name,
    infer_field_coverage,
    normalize_field_entry,
)


def _measured_inputs(metric_key: str, metric: dict) -> set[str]:
    calc = metric.get("calc") or {}
    if calc.get("expr"):
        return {gen._norm_field(n) for n in (calc.get("inputs") or []) if str(n).strip()}
    if metric.get("input"):
        slug = metric.get("slug") or gen._metric_slug(metric_key, metric)
        return {gen._norm_field(slug)} if slug else set()
    return set()


def _required_field_names(fields: list) -> set[str]:
    return {gen._norm_field(field_entry_name(f)) for f in fields if field_entry_name(f)}


def _missing_for_option(
    option_key: str,
    option: dict,
    metrics: dict,
    metric_ids: dict[int, str],
    exact: set[str],
    patterns,
    *,
    lenient: bool,
) -> tuple[list[str], list[str], list[tuple[int, str, str]]]:
    """Return (missing_names, orphan_names, metric_context for missing)."""
    required: set[str] = set()
    required_by_metric: list[tuple[int, str, str]] = []
    coverage = infer_field_coverage(option, catalog_option_key=option_key)
    if coverage != FIELD_COVERAGE_ENUMERATED and not lenient:
        return [], sorted(_required_field_names(list(option.get("fields") or []))), []
    for mid in option.get("metricIds") or []:
        mkey = metric_ids.get(int(mid))
        if not mkey:
            continue
        metric = metrics[mkey]
        for raw in _measured_inputs(mkey, metric):
            required.add(raw)
            required_by_metric.append((int(mid), str(metric.get("name") or ""), raw))

    field_names = _required_field_names(list(option.get("fields") or []))
    missing: list[str] = []
    missing_context: list[tuple[int, str, str]] = []
    seen_missing: set[str] = set()
    for mid, mname, raw in required_by_metric:
        if not raw or raw in field_names:
            continue
        satisfied = (
            gen._input_satisfied_by_option(raw, option, exact, patterns)
            if lenient
            else gen._input_satisfied_by_field_or_policy(raw, option, exact, patterns)
        )
        if satisfied:
            continue
        if raw not in seen_missing:
            seen_missing.add(raw)
            missing.append(raw)
        missing_context.append((mid, mname, raw))

    orphan = sorted(n for n in field_names if n and n not in required)
    return sorted(missing), orphan, missing_context


def audit_option(
    option_key: str,
    option: dict,
    metrics: dict,
    metric_ids: dict[int, str],
    exact: set[str],
    patterns,
    *,
    lenient: bool,
) -> dict:
    missing, orphan, ctx = _missing_for_option(
        option_key, option, metrics, metric_ids, exact, patterns, lenient=lenient
    )
    return {
        "catalogOptionKey": option_key,
        "name": option.get("name"),
        "industry": option.get("industry"),
        "missingFields": missing,
        "orphanFields": orphan,
        "missingContext": [
            {"metricId": mid, "metricName": mn, "input": inp} for mid, mn, inp in ctx
        ],
    }


def locate_yaml_hint(option_key: str) -> str:
    if ".core." in option_key:
        slug = option_key.split(".core.", 1)[-1]
        return f"`catalog/shared/data_options.yaml` → `dataOptionTemplates.{slug}` (expanded per pack)"
    for pack_dir in sorted(p for p in INDUSTRY_DIR.iterdir() if p.is_dir()):
        opts_path = pack_dir / "data_options.yaml"
        if not opts_path.is_file():
            continue
        text = opts_path.read_text(encoding="utf-8")
        if f"{option_key}:" in text or f"\n  {option_key}:\n" in text:
            return f"`{opts_path.relative_to(ROOT).as_posix()}` → `dataOptions.{option_key}`"
    return f"(no on-disk YAML key; expanded at generate time — key `{option_key}`)"


def suggested_field_yaml(field_names: list[str]) -> str:
    lines: list[str] = []
    for name in field_names:
        row = normalize_field_entry(name)
        lines.append(f"    - name: {row['name']}")
        lines.append(f"      type: {row['type']}")
    return "\n".join(lines)


def render_markdown(rows: list[dict], *, lenient: bool) -> str:
    today = date.today().isoformat()
    bad = [r for r in rows if r["missingFields"]]
    mode = "lenient (generate upload bypass)" if lenient else "strict (enumerated fieldCoverage only)"
    parts = [
        "# Catalog data-option field gaps",
        "",
        f"Generated by `scripts/audit_data_option_fields.py` on {today}. Mode: **{mode}**.",
        "",
        "Strict gaps are the best candidates for YAML edits. Document/financial templates",
        "may still show gaps here while correctly using **`inputCoverage: upload`** in the manifest.",
        "",
        f"- Data options audited: **{len(rows)}**",
        f"- Options with missing measured fields: **{len(bad)}**",
        "",
    ]
    if not bad:
        parts.append("No missing measured fields in this mode.")
        return "\n".join(parts) + "\n"

    parts.append("## Summary by industry")
    parts.append("")
    by_ind: dict[str, int] = {}
    for row in bad:
        ind = str(row.get("industry") or "Unknown")
        by_ind[ind] = by_ind.get(ind, 0) + 1
    for ind in sorted(by_ind):
        parts.append(f"- **{ind}**: {by_ind[ind]} option(s)")
    parts.append("")
    parts.append("## Suggested YAML (review before merge)")
    parts.append("")

    for row in bad:
        ok = row["catalogOptionKey"]
        parts.append(f"### {row.get('industry')} — `{ok}`")
        parts.append("")
        parts.append(f"- **Name:** {row.get('name')}")
        parts.append(f"- **Edit:** {locate_yaml_hint(ok)}")
        parts.append(f"- **Missing fields:** {', '.join(row['missingFields'])}")
        if row.get("orphanFields"):
            parts.append(f"- **Orphan fields (informational):** {', '.join(row['orphanFields'])}")
        parts.append("")
        parts.append("```yaml")
        parts.append("# Append under fields: (or merge into existing typed entries)")
        parts.append(suggested_field_yaml(row["missingFields"]))
        parts.append("```")
        parts.append("")

    parts.append("## Regenerate")
    parts.append("")
    parts.append("After edits: `ambient-catalog-generate` then `python scripts/check_metric_inputs.py`.")
    parts.append(
        "Optional hard gate: `python scripts/generate_reference_catalog.py --strict-data-option-inputs`."
    )
    parts.append("")
    return "\n".join(parts)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--lenient",
        action="store_true",
        help="Use same upload/document bypass as catalog generate (fewer gaps)",
    )
    parser.add_argument("--json", action="store_true", help="Emit JSON report to stdout")
    parser.add_argument("--markdown", action="store_true", help="Emit markdown report to stdout")
    parser.add_argument(
        "--report",
        type=Path,
        help="Write markdown report to this path (implies --markdown)",
    )
    args = parser.parse_args()

    metrics, data_options, *_ = gen.load_catalog()
    exact, patterns = gen.load_input_field_policy()

    metric_ids: dict[int, str] = {}
    for key, metric in metrics.items():
        mid = metric.get("id")
        if mid is not None:
            metric_ids[int(mid)] = key

    lenient = args.lenient
    rows = [
        audit_option(ok, opt, metrics, metric_ids, exact, patterns, lenient=lenient)
        for ok, opt in sorted(data_options.items())
    ]
    bad = [r for r in rows if r["missingFields"]]

    if args.json:
        print(json.dumps({"lenient": lenient, "options": rows, "withMissing": len(bad)}, indent=2))
    elif args.markdown or args.report:
        md = render_markdown(rows, lenient=lenient)
        if args.report:
            args.report.parent.mkdir(parents=True, exist_ok=True)
            args.report.write_text(md, encoding="utf-8", newline="\n")
            print(f"Wrote {args.report}", file=sys.stderr)
        else:
            print(md)
    else:
        mode = "lenient" if lenient else "strict"
        print(f"Data options with missing measured fields ({mode}): {len(bad)} / {len(rows)}")
        for row in bad:
            print(
                f"  {row['industry']} {row['catalogOptionKey']} ({row['name']}): "
                f"missing {', '.join(row['missingFields'])}"
            )
        print("Tip: --markdown --report docs/catalog-input-field-gaps.md for suggested YAML.", file=sys.stderr)

    return 0 if not bad else 1


if __name__ == "__main__":
    raise SystemExit(main())
