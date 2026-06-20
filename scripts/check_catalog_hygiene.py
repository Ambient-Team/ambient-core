#!/usr/bin/env python3
"""CI hygiene gate for catalogue and contract assets.

Enforces two standardization rules:

1. No duplicate / dead catalogue trees. ``catalog/core/`` (+ ``catalog/core/shared/``)
   and ``catalog/industries/`` are the single source of truth. The legacy top-level
   mirrors must not reappear.
2. No UTF-8 mojibake. Catalogue YAML, contract YAML, and docs must be clean UTF-8;
   double-encoded sequences (for example ``Ã—`` for ``×``) are rejected.

Run: ``python scripts/check_catalog_hygiene.py``
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"

# Paths that were dead duplicates of catalog/core/** and must stay deleted.
FORBIDDEN_PATHS = (
    CATALOG / "industries.yaml",
    CATALOG / "metrics.yaml",
    CATALOG / "benchmarks.yaml",
    CATALOG / "data_options.yaml",
    CATALOG / "bridge_rules.yaml",
    CATALOG / "shared",
)

# Known double-encoded (cp1252-via-utf8) sequences -> intended glyph.
MOJIBAKE = {
    "Ã—": "×",
    "â€”": "—",
    "â€“": "–",
    "â€™": "’",
    "âˆ’": "−",
    "Î£": "Σ",
    "â‰¥": "≥",
    "â‰¤": "≤",
    "â‰ˆ": "≈",
    "Â²": "²",
    "Ã·": "÷",
    "â†’": "→",
}

SCAN_DIRS = (
    CATALOG / "core",
    CATALOG / "industries",
    ROOT / "contracts",
    ROOT / "docs",
)
SCAN_GLOBS = ("*.yaml", "*.yml", "*.md")


def check_forbidden_paths() -> list[str]:
    errors: list[str] = []
    for path in FORBIDDEN_PATHS:
        if path.exists():
            rel = path.relative_to(ROOT)
            errors.append(
                f"dead catalogue duplicate present: {rel} — canonical source is catalog/core/"
            )
    return errors


def check_mojibake() -> list[str]:
    errors: list[str] = []
    seen: set[Path] = set()
    for base in SCAN_DIRS:
        if not base.is_dir():
            continue
        for pattern in SCAN_GLOBS:
            for path in base.rglob(pattern):
                if path in seen:
                    continue
                seen.add(path)
                text = path.read_text(encoding="utf-8")
                hits = [seq for seq in MOJIBAKE if seq in text]
                if hits:
                    rel = path.relative_to(ROOT)
                    errors.append(f"mojibake in {rel}: {sorted(hits)}")
    return errors


def main() -> int:
    errors = check_forbidden_paths() + check_mojibake()
    if errors:
        for err in errors:
            print(f"hygiene error: {err}", file=sys.stderr)
        return 1
    print("OK: catalogue hygiene (no dead trees, no mojibake)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
