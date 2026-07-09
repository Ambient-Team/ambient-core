#!/usr/bin/env python3
"""Report which metrics are fully feedable from their linked data options' fields.

For every calculated metric (``calc``) or directly-reported metric (``input: true``),
this resolves the metric's *measured* inputs to the data options that reference it (via
``metricIds``) and reports coverage:

- ``complete`` — every measured input is an explicit, mappable data-option field;
- ``upload`` — feedable, but at least one input comes from a linked upload's
  document/template rather than an enumerated field;
- ``none`` — no data option references this metric (the KPI cannot be fed as wired);
- ``derived`` — computed only from other metrics (nothing to upload directly);
- ``unspecified`` — the metric declares neither ``calc`` nor ``input``.

This mirrors the ``inputCoverage`` recipe written into ``catalog/manifest.json`` and is
the "how do I supply data so calc actually runs?" view. It is **informational** (always
exits 0) so genuine catalog data gaps are surfaced without blocking the build.

Run: python scripts/check_metric_inputs.py
"""

from __future__ import annotations

import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))

import generate_reference_catalog as gen  # noqa: E402

_ORDER = ["complete", "upload", "derived", "none", "unspecified"]


def compute_coverage() -> tuple[dict[str, dict[str, int]], list[tuple]]:
    metrics, data_options, *_ = gen.load_catalog()

    slugs_by_industry: dict[str, set[str]] = {}
    for key, metric in metrics.items():
        slugs_by_industry.setdefault(str(metric.get("industry", "")), set()).add(
            gen._metric_slug(key, metric)
        )

    counts: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    gaps: list[tuple] = []
    for key, metric in metrics.items():
        industry = str(metric.get("industry", ""))
        linked = [
            {
                "catalogOptionKey": ok,
                "id": opt.get("id"),
                "name": opt.get("name"),
                "fields": opt.get("fields") or [],
            }
            for ok, opt in data_options.items()
            if metric.get("id") in (opt.get("metricIds") or [])
        ]
        inputs, coverage = gen.build_metric_input_recipe(
            metric, linked, slugs_by_industry.get(industry, set())
        )
        counts[industry][coverage] += 1
        if coverage == "none":
            missing = [i["name"] for i in inputs if i["kind"] == "measured" and not i["covered"]]
            gaps.append((industry, metric.get("id"), metric.get("name"), coverage, missing))
    return counts, gaps


def main() -> int:
    counts, gaps = compute_coverage()

    print("Metric input coverage (measured inputs satisfied by linked data-option fields):")
    for industry in sorted(counts):
        bucket = counts[industry]
        summary = ", ".join(f"{k}={bucket[k]}" for k in _ORDER if bucket.get(k))
        print(f"  {industry}: {summary}")

    if gaps:
        print()
        print(f"{len(gaps)} metric(s) have no data option feeding them (coverage=none):")
        for industry, mid, name, _coverage, missing in sorted(gaps, key=lambda g: (g[0], g[1] or 0)):
            miss = ", ".join(missing) if missing else "(no measured inputs)"
            print(f"  {industry} #{mid} {name} — needs: {miss}")

    total = sum(sum(b.values()) for b in counts.values())
    feedable = total - len(gaps)
    print()
    print(
        f"OK: {feedable}/{total} metrics have a data option feeding them; "
        f"{len(gaps)} with no linked data option (informational)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
