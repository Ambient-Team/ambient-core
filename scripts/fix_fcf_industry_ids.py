#!/usr/bin/env python3
"""Reassign FCF core metric ids in catalog/shared/metrics.yaml (globally unique)."""

from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
METRICS = ROOT / "catalog" / "shared" / "metrics.yaml"
NEW_SLUGS = (
    "free-cash-flow",
    "fcff",
    "fcfe",
    "fcf-margin",
    "fcf-conversion",
)
FCF_PATTERN = re.compile(r"^\s+(free-cash-flow|fcff|fcfe|fcf-margin|fcf-conversion):\s+\d+\s*$")
INDUSTRY_HEAD = re.compile(r"^  [A-Za-z][^:]+:$")


def main() -> int:
    data = yaml.safe_load(METRICS.read_text(encoding="utf-8"))
    industry_ids = data.get("industryIds") or {}
    for slug_map in industry_ids.values():
        for slug in list(slug_map):
            if slug in NEW_SLUGS:
                del slug_map[slug]
    all_ids = [int(v) for m in industry_ids.values() for v in m.values()]
    next_id = max(all_ids) + 1
    assignments: dict[str, dict[str, int]] = {}
    for industry in industry_ids:
        assignments[industry] = {}
        for slug in NEW_SLUGS:
            assignments[industry][slug] = next_id
            next_id += 1

    lines = METRICS.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    current_industry: str | None = None
    for line in lines:
        if line.strip() == "industryIds:":
            out.append(line)
            continue
        m_ind = INDUSTRY_HEAD.match(line)
        if m_ind and not line.strip().startswith("industryIds"):
            if current_industry and current_industry in assignments:
                indent = "    "
                for slug in NEW_SLUGS:
                    out.append(f"{indent}{slug}: {assignments[current_industry][slug]}")
            current_industry = line.strip().rstrip(":")
            out.append(line)
            continue
        if FCF_PATTERN.match(line):
            continue
        out.append(line)
    if current_industry and current_industry in assignments:
        indent = "    "
        for slug in NEW_SLUGS:
            if not any(
                ln.strip() == f"{slug}: {assignments[current_industry][slug]}"
                for ln in out[-10:]
            ):
                out.append(f"{indent}{slug}: {assignments[current_industry][slug]}")

    METRICS.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"OK: reassigned FCF ids up through {next_id - 1}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())