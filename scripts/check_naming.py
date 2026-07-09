#!/usr/bin/env python3
"""CI gate for catalogue naming conventions (see docs/CONVENTIONS.md).

Enforces, across all industry packs:

- Every metric and data option has an integer ``id``, unique across the catalogue.
- Slug-style keys (those containing a ``.``) match ``industry.segment.slug``.
- Any ``segment`` field uses an allowed value.
- ``catalog/aliases.yaml`` is well-formed with unique alias targets.

Legacy author-chosen keys (no ``.``) and machine-generated ``All<industry>...`` keys
are accepted so existing assets are not broken during the deprecation window.

Run: ``python scripts/check_naming.py``
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
INDUSTRY_DIR = CATALOG / "industries"
ALIASES = CATALOG / "aliases.yaml"

SLUG_KEY = re.compile(r"^[a-z][a-z0-9_]*\.[a-z0-9_]+\.[a-z0-9_]+$")
ALLOWED_SEGMENTS = {
    "core",
    "operations",
    "financial",
    "subscription",
    "provider",
    "revenue_cycle",
    "quality",
    "digital_health",
    "rnd",
    "supply_chain",
}


def _load_yaml(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data if isinstance(data, dict) else {}


def _check_entries(kind: str, entries: dict, pack: str, ids: dict, errors: list) -> None:
    for key, entry in (entries or {}).items():
        if not isinstance(entry, dict):
            errors.append(f"{pack}: {kind} {key} is not a mapping")
            continue
        if "." in key and not SLUG_KEY.match(key):
            errors.append(
                f"{pack}: {kind} key {key!r} does not match industry.segment.slug"
            )
        seg = entry.get("segment")
        if seg is not None and seg not in ALLOWED_SEGMENTS:
            errors.append(f"{pack}: {kind} {key} has invalid segment {seg!r}")
        mid = entry.get("id")
        if not isinstance(mid, int):
            errors.append(f"{pack}: {kind} {key} missing integer id")
            continue
        if mid in ids:
            errors.append(f"duplicate id {mid}: {ids[mid]} and {pack}:{key}")
        else:
            ids[mid] = f"{pack}:{key}"


def check_packs() -> list[str]:
    errors: list[str] = []
    metric_ids: dict[int, str] = {}
    option_ids: dict[int, str] = {}
    for path in sorted(INDUSTRY_DIR.glob("*.yaml")):
        pack = _load_yaml(path)
        _check_entries("metric", pack.get("metrics"), path.name, metric_ids, errors)
        _check_entries("dataOption", pack.get("dataOptions"), path.name, option_ids, errors)
    return errors


def check_aliases() -> list[str]:
    if not ALIASES.is_file():
        return []
    data = _load_yaml(ALIASES)
    aliases = data.get("aliases") or {}
    if not isinstance(aliases, dict):
        return ["aliases.yaml: aliases must be a mapping"]
    errors: list[str] = []
    seen: dict[str, str] = {}
    for legacy, canonical in aliases.items():
        if not isinstance(canonical, str) or not SLUG_KEY.match(canonical):
            errors.append(f"aliases.yaml: target {canonical!r} is not a valid slug key")
        if canonical in seen:
            errors.append(
                f"aliases.yaml: target {canonical!r} used by both {seen[canonical]} and {legacy}"
            )
        else:
            seen[str(canonical)] = str(legacy)
    return errors


def main() -> int:
    errors = check_packs() + check_aliases()
    if errors:
        for err in errors:
            print(f"naming error: {err}", file=sys.stderr)
        return 1
    print("OK: catalogue naming conventions")
    return 0

