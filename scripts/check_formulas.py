#!/usr/bin/env python3
"""CI gate: validate machine-readable metric formulas (see docs/CONVENTIONS.md).

For every metric that declares a ``calc`` block (core templates + industry pack metrics):
- ``expr`` parses under the safe arithmetic grammar;
- every name in ``expr`` is either declared in ``calc.inputs`` or is the slug of another
  known metric (a dependency);
- metric-to-metric dependencies contain no cycles.

Metrics with neither ``calc`` nor ``input: true`` are reported as uncovered (informational,
non-fatal) so formula coverage can be tracked without blocking the build.

Run: python scripts/check_formulas.py
"""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "lib"))
from ambient_calc import CalcError, compute_all, formula_names  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
CORE = CATALOG / "shared" / "metrics.yaml"
INDUSTRY = CATALOG / "industries"


def _load(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def _slug(key: str) -> str:
    return key.rsplit(".", 1)[-1].replace("-", "_")


def gather() -> dict:
    metrics: dict[str, dict] = {}
    for key, m in (_load(CORE).get("templates") or {}).items():
        slug = m.get("slug") or _slug(key)
        m = {**m, "slug": slug}
        metrics[slug] = m
    for pack_dir in sorted(p for p in INDUSTRY.iterdir() if p.is_dir()):
        metrics_path = pack_dir / "metrics.yaml"
        if not metrics_path.is_file():
            continue
        for key, m in (_load(metrics_path).get("metrics") or {}).items():
            slug = m.get("slug") or _slug(key)
            m = {**m, "slug": slug}
            metrics[slug] = m
    return metrics


def main() -> int:
    metrics = gather()
    known = set(metrics)
    errors: list[str] = []
    uncovered: list[str] = []
    for slug, m in metrics.items():
        calc = m.get("calc")
        if not calc:
            if not m.get("input"):
                uncovered.append(slug)
            continue
        expr = calc.get("expr")
        if not expr:
            errors.append(f"{slug}: calc block missing expr")
            continue
        try:
            names = formula_names(expr)
        except CalcError as exc:
            errors.append(f"{slug}: {exc}")
            continue
        declared = set(calc.get("inputs") or [])
        for name in names:
            if name not in declared and name not in known:
                errors.append(f"{slug}: expr name {name!r} is neither a declared input nor a known metric")
    # cycle detection via a dry compute over zeros
    calc_metrics = [m for m in metrics.values() if m.get("calc")]
    all_inputs = set()
    for m in calc_metrics:
        all_inputs.update(m["calc"].get("inputs") or [])
    try:
        compute_all(calc_metrics, {k: 0 for k in all_inputs})
    except CalcError as exc:
        errors.append(f"compute graph error: {exc}")

    if errors:
        for e in errors:
            print(f"formula error: {e}", file=sys.stderr)
        return 1
    covered = len(calc_metrics)
    print(f"OK: {covered} metric formulas valid; {len(uncovered)} measured/uncovered metrics")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
