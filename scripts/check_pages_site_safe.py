#!/usr/bin/env python3
"""Fail CI when a built GitHub Pages tree contains sensitive patterns."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(ROOT / "scripts"))
from check_sensitive_data_literals import (  # noqa: E402
    ALLOWED_EMAIL_DOMAINS,
    EMAIL_RE,
    PERSONAL_PATH_RE,
    PHONE_RE,
    SSN_RE,
)
from scan_secrets_patterns import find_secret_hits  # noqa: E402

FORBIDDEN_SUBSTRINGS = (
    "BEGIN PRIVATE KEY",
    "ghp_",
    "sk_live_",
)


def _email_ok(match: re.Match[str]) -> bool:
    domain = match.group(0).split("@")[-1].lower()
    return domain in ALLOWED_EMAIL_DOMAINS


def scan_site_dir(site_dir: Path) -> list[str]:
    errors: list[str] = []
    if not site_dir.is_dir():
        return [f"site directory missing: {site_dir}"]
    for path in sorted(site_dir.rglob("*")):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = path.relative_to(site_dir).as_posix()
        for token in FORBIDDEN_SUBSTRINGS:
            if token in text:
                errors.append(f"{rel}: forbidden substring {token!r}")
        for hit in find_secret_hits(text):
            errors.append(f"{rel}: secret-shaped token {hit!r}")
        for match in EMAIL_RE.finditer(text):
            if not _email_ok(match):
                errors.append(f"{rel}: email {match.group(0)!r}")
        for match in PHONE_RE.finditer(text):
            errors.append(f"{rel}: phone {match.group(0)!r}")
        for match in SSN_RE.finditer(text):
            errors.append(f"{rel}: SSN-shaped {match.group(0)!r}")
        for match in PERSONAL_PATH_RE.finditer(text):
            errors.append(f"{rel}: personal path {match.group(0)!r}")
    return errors


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: check_pages_site_safe.py <site-dir>", file=sys.stderr)
        return 2
    site_dir = Path(sys.argv[1]).resolve()
    errors = scan_site_dir(site_dir)
    if errors:
        for err in errors:
            print(f"PAGES SAFETY: {err}")
        return 1
    count = sum(1 for p in site_dir.rglob("*") if p.is_file())
    print(f"OK: pages site safety ({count} file(s) scanned)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
