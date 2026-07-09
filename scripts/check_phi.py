#!/usr/bin/env python3
"""CI gate: no PHI-shaped field or column names in healthcare / life-sciences assets.

Scans data-option ``fields`` in the healthcare and life_sciences catalogue packs and the
columns of their Gold contracts against the PHI denylist in
catalog/input_field_policy.yaml. Open-source catalogue assets must be
de-identified and aggregated.

Run: python scripts/check_phi.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / "catalog" / "input_field_policy.yaml"
PACKS = [
    ROOT / "catalog" / "industries" / n for n in ("healthcare", "life_sciences")
]
CONTRACT_DOMAINS = {"Healthcare", "Life Sciences"}


def _load(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def _matchers():
    pol = _load(POLICY)
    exact = {str(x).strip().lower() for x in (pol.get("phiExact") or [])}
    patterns = [re.compile(str(p), re.IGNORECASE) for p in (pol.get("phiPatterns") or [])]
    return exact, patterns


def _hit(name: str, exact: set, patterns: list) -> bool:
    low = str(name).strip().lower()
    return low in exact or any(p.search(low) for p in patterns)


def main() -> int:
    exact, patterns = _matchers()
    errors: list[str] = []
    for pack in PACKS:
        opts_path = pack / "data_options.yaml"
        if not opts_path.is_file():
            continue
        d = _load(opts_path)
        for key, opt in (d.get("dataOptions") or {}).items():
            for field in opt.get("fields") or []:
                if _hit(field, exact, patterns):
                    errors.append(
                        f"{pack.name}: data option {key} has PHI-shaped field {field!r}"
                    )
    for cf in sorted((ROOT / "contracts").glob("*.yaml")):
        doc = _load(cf)
        if doc.get("product", {}).get("domain") not in CONTRACT_DOMAINS:
            continue
        for col in doc.get("schema", {}).get("columns") or []:
            name = col.get("name") if isinstance(col, dict) else None
            if name and _hit(name, exact, patterns):
                errors.append(f"{cf.name}: column {name!r} is PHI-shaped")
    if errors:
        for e in errors:
            print(f"PHI policy error: {e}", file=sys.stderr)
        return 1
    print("OK: no PHI-shaped fields in healthcare/life-sciences assets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
