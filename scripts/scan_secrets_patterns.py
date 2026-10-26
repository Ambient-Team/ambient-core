#!/usr/bin/env python3
"""Lightweight secret-shaped token scan for CI and fixture tests."""

from __future__ import annotations

import re
from pathlib import Path

# Patterns must stay in sync with tests/fixtures/secrets_scan/README.md
PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"AKIA[0-9A-Z]{16}"),  # AWS key id shape
    re.compile(r"-----BEGIN (?:RSA |EC )?PRIVATE KEY-----"),
    re.compile(r"ghp_[A-Za-z0-9]{20,}"),
    re.compile(r"sk_live_[A-Za-z0-9]{20,}"),
)


def find_secret_hits(text: str) -> list[str]:
    hits: list[str] = []
    for pattern in PATTERNS:
        for match in pattern.finditer(text):
            hits.append(match.group(0)[:40])
    return hits


def scan_paths(paths: list[Path]) -> list[str]:
    errors: list[str] = []
    for path in paths:
        if not path.is_file():
            continue
        hits = find_secret_hits(path.read_text(encoding="utf-8", errors="replace"))
        if hits:
            errors.append(f"{path}: secret-shaped token(s): {hits[:3]}")
    return errors


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    targets: list[Path] = []
    for sub in ("lib", "scripts"):
        targets.extend(sorted((root / sub).rglob("*.py")))
    targets = [p for p in targets if "tests" not in p.parts]
    errors = scan_paths(targets)
    if errors:
        for err in errors:
            print(f"SECRET SCAN: {err}")
        return 1
    print(f"OK: scanned {len(targets)} lib/ and scripts/ file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
