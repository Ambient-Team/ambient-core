#!/usr/bin/env python3
"""Scan non-test sources for emails, phones, and personal machine paths."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
PHONE_RE = re.compile(
    r"\b(?:\(\d{3}\)\s*\d{3}[-.\s]\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})\b"
)
PERSONAL_PATH_RE = re.compile(
    r"(?:/Users/[A-Za-z0-9._-]+|C:\\Users\\[A-Za-z0-9._-]+|/home/[A-Za-z0-9._-]+/Desktop)"
)
SSN_RE = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")

ALLOWED_EMAIL_DOMAINS = frozenset(
    {
        "example.com",
        "example.org",
        "users.noreply.github.com",
    }
)

SCAN_SUFFIXES = frozenset(
    {
        ".py",
        ".md",
        ".mdc",
        ".yml",
        ".yaml",
        ".json",
        ".sh",
        ".mjs",
        ".toml",
        ".env",
        ".txt",
        ".ipynb",
    }
)

SKIP_DIR_NAMES = frozenset(
    {
        ".git",
        ".venv",
        "node_modules",
        "dist",
        "__pycache__",
        "coverage-html",
        "_refresh_lake",
    }
)

ALLOWED_FILES = frozenset(
    {
        ROOT / "scripts" / "check_sensitive_data_literals.py",
        ROOT / "scripts" / "scan_secrets_patterns.py",
        ROOT / "tests" / "fixtures" / "secrets_scan" / "sample_tokens.txt",
        ROOT / "tests" / "fixtures" / "secrets_scan" / "README.md",
    }
)


def _under_tests(path: Path) -> bool:
    try:
        path.relative_to(ROOT / "tests")
        return True
    except ValueError:
        return False


def _under_catalog(path: Path) -> bool:
    try:
        path.relative_to(ROOT / "catalog")
        return True
    except ValueError:
        return False


def iter_scan_files() -> list[Path]:
    paths: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIR_NAMES for part in path.parts):
            continue
        if _under_tests(path) or _under_catalog(path):
            continue
        if path in ALLOWED_FILES:
            continue
        if path.suffix.lower() not in SCAN_SUFFIXES:
            continue
        paths.append(path)
    return sorted(paths)


def _email_allowed(email: str) -> bool:
    domain = email.rsplit("@", 1)[-1].lower()
    return domain in ALLOWED_EMAIL_DOMAINS


def find_hits(text: str) -> list[str]:
    hits: list[str] = []
    for match in EMAIL_RE.finditer(text):
        email = match.group(0)
        if not _email_allowed(email):
            hits.append(f"email:{email}")
    for match in PHONE_RE.finditer(text):
        hits.append(f"phone:{match.group(0)}")
    for match in PERSONAL_PATH_RE.finditer(text):
        hits.append(f"path:{match.group(0)}")
    for match in SSN_RE.finditer(text):
        hits.append(f"ssn:{match.group(0)}")
    return hits


def main() -> int:
    errors: list[str] = []
    scanned = iter_scan_files()
    for path in scanned:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        hits = find_hits(text)
        if hits:
            rel = path.relative_to(ROOT)
            errors.append(f"{rel}: {hits[:5]}")
    if errors:
        print("Sensitive literal scan failed:", file=sys.stderr)
        for err in errors:
            print(f"  {err}", file=sys.stderr)
        return 1
    print(f"OK: no sensitive literals outside tests/catalog ({len(scanned)} file(s) scanned)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
