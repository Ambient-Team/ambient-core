#!/usr/bin/env python3
"""Fail when non-test sources reference the golden PII salt env fixture by name."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKER = "golden_pii_salt.env"

# Maintenance script that loads the test fixture when refreshing goldens.
ALLOWED_FILES = {
    ROOT / "scripts" / "refresh_pipeline_golden.py",
    ROOT / "scripts" / "check_golden_pii_fixture_refs.py",
}

SCAN_SUFFIXES = (".py", ".md", ".yml", ".yaml", ".sh", ".toml", ".json", ".env", ".mdc")


def _is_under_tests(path: Path) -> bool:
    try:
        path.relative_to(ROOT / "tests")
        return True
    except ValueError:
        return False


def iter_scan_files() -> list[Path]:
    paths: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if _is_under_tests(path):
            continue
        if path in ALLOWED_FILES:
            continue
        if path.suffix.lower() not in SCAN_SUFFIXES and path.name not in SCAN_SUFFIXES:
            continue
        if ".git" in path.parts or "node_modules" in path.parts:
            continue
        if path.match("dist/*") or path.match(".venv/*"):
            continue
        paths.append(path)
    return sorted(paths)


def main() -> int:
    scanned = iter_scan_files()
    errors: list[str] = []
    for path in scanned:
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        if MARKER in text:
            errors.append(f"{path.relative_to(ROOT)}")
    if errors:
        print(
            f"ERROR: {MARKER!r} must only appear under tests/ "
            f"(or allowed refresh scripts); found in:",
            file=sys.stderr,
        )
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(f"OK: no {MARKER!r} references outside tests ({len(scanned)} file(s) scanned)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
