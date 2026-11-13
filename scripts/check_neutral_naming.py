#!/usr/bin/env python3
"""Fail when vendor-specific tokens appear outside allowed deprecation shims."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ALLOWED_PREFIXES = (
    "CHANGELOG.md",
    "scripts/check_vendor_marketing.py",
    "scripts/check_neutral_naming.py",
    "scripts/check_markdown_prose.py",
    "tests/test_check_vendor_marketing.py",
    "tests/test_check_markdown_prose.py",
)

SKIP_DIRS = {
    ".git",
    ".venv",
    "dist",
    "node_modules",
    "__pycache__",
    ".mypy_cache",
    ".hypothesis",
    ".pytest_cache",
    ".ruff_cache",
}
SKIP_FILES = {".coverage"}

PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("colab", re.compile(r"(?i)(?<![\w./])colab(?![\w-])")),
    ("firestore", re.compile(r"(?i)firestore")),
    ("google", re.compile(r"(?i)\bgoogle\b")),
)


def _allowed(rel: str) -> bool:
    for prefix in ALLOWED_PREFIXES:
        if rel == prefix or rel.startswith(prefix):
            return True
    return False


def scan_repo() -> list[str]:
    errors: list[str] = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if any(part.endswith(".egg-info") for part in path.parts):
            continue
        rel = path.relative_to(ROOT).as_posix()
        if rel in SKIP_FILES or _allowed(rel):
            continue
        if path.suffix in {".pyc", ".png", ".jpg", ".webp", ".whl"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for lineno, line in enumerate(text.splitlines(), start=1):
            for label, pattern in PATTERNS:
                if pattern.search(line):
                    errors.append(f"{rel}:{lineno}: forbidden token {label!r}")
    return errors


def main() -> int:
    errors = scan_repo()
    if errors:
        print("Neutral naming violations:", file=sys.stderr)
        for item in errors:
            print(item, file=sys.stderr)
        return 1
    print("OK: neutral naming scan")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
