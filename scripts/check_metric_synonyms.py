#!/usr/bin/env python3
"""Validate catalog metric alsoKnownAs uniqueness (see docs/CONVENTIONS.md)."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
if str(ROOT / "lib") not in sys.path:
    sys.path.insert(0, str(ROOT / "lib"))
if str(SCRIPTS) not in sys.path:
    sys.path.insert(0, str(SCRIPTS))

from ambient_contracts.metric_synonyms import (  # noqa: E402
    merge_also_known_as,
    validate_synonyms_globally,
)

CATALOG = ROOT / "catalog"
OVERLAY_PATH = CATALOG / "metric_also_known_as.yaml"


def _load_yaml(path: Path) -> dict:
    if not path.is_file():
        return {}
    with path.open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data if isinstance(data, dict) else {}


def main() -> int:
    # Reuse generator expansion so synonyms cover native + core metrics.
    from generate_reference_catalog import load_catalog  # noqa: E402

    overlay = _load_yaml(OVERLAY_PATH)
    metrics, *_ = load_catalog()
    for key, metric in metrics.items():
        metric["alsoKnownAs"] = merge_also_known_as(metric, key, overlay)
    try:
        validate_synonyms_globally(metrics)
    except ValueError as exc:
        print(f"synonym error: {exc}", file=sys.stderr)
        return 1
    with_synonyms = sum(1 for m in metrics.values() if m.get("alsoKnownAs"))
    print(f"OK: {with_synonyms} metrics carry alsoKnownAs; synonym index is unique")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())