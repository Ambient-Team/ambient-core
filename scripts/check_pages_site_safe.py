#!/usr/bin/env python3
"""Fail CI when a built GitHub Pages tree is not the expected redirect stub."""

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
import build_pages_site  # noqa: E402
from check_vendor_marketing import scan_site_dir as scan_vendor_marketing  # noqa: E402

FORBIDDEN_SUBSTRINGS = (
    "BEGIN PRIVATE KEY",
    "ghp_",
    "sk_live_",
)

_ALLOWED_FILES = frozenset(build_pages_site.REQUIRED_SITE_PAGES)


def _email_ok(match: re.Match[str]) -> bool:
    domain = match.group(0).split("@")[-1].lower()
    return domain in ALLOWED_EMAIL_DOMAINS


def _redirect_stub_errors(rel: str, text: str) -> list[str]:
    errors: list[str] = []
    target = build_pages_site.ORG_LANDING_URL
    if target not in text:
        errors.append(f"{rel}: missing org landing URL")
    if 'rel="canonical"' not in text:
        errors.append(f"{rel}: missing canonical link")
    if 'http-equiv="refresh"' not in text:
        errors.append(f"{rel}: missing meta refresh redirect")
    refresh = re.search(r'content="0;url=([^"]+)"', text)
    if not refresh or refresh.group(1) != target:
        errors.append(f"{rel}: meta refresh must target org landing URL")
    expected = build_pages_site.redirect_stub_html()
    if text != expected:
        errors.append(f"{rel}: content must match the standard redirect stub")
    return errors


def _tree_shape_errors(site_dir: Path) -> list[str]:
    errors: list[str] = []
    found: list[str] = []
    for path in sorted(site_dir.rglob("*")):
        if not path.is_file():
            errors.append(f"unexpected non-file in site tree: {path.relative_to(site_dir).as_posix()}")
            continue
        rel = path.relative_to(site_dir).as_posix()
        found.append(rel)
        if rel not in _ALLOWED_FILES:
            errors.append(f"unexpected published file {rel!r} (only redirect stubs allowed)")
    for required in build_pages_site.REQUIRED_SITE_PAGES:
        if required not in found:
            errors.append(f"missing required site page {required!r}")
    return errors


def scan_site_dir(site_dir: Path) -> list[str]:
    errors: list[str] = []
    if not site_dir.is_dir():
        return [f"site directory missing: {site_dir}"]
    errors.extend(_tree_shape_errors(site_dir))
    for name in build_pages_site.REQUIRED_SITE_PAGES:
        path = site_dir / name
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        errors.extend(_redirect_stub_errors(name, text))
        for token in FORBIDDEN_SUBSTRINGS:
            if token in text:
                errors.append(f"{name}: forbidden substring {token!r}")
        for hit in find_secret_hits(text):
            errors.append(f"{name}: secret-shaped token {hit!r}")
        for match in EMAIL_RE.finditer(text):
            if not _email_ok(match):
                errors.append(f"{name}: email {match.group(0)!r}")
        for match in PHONE_RE.finditer(text):
            errors.append(f"{name}: phone {match.group(0)!r}")
        for match in SSN_RE.finditer(text):
            errors.append(f"{name}: SSN-shaped {match.group(0)!r}")
        for match in PERSONAL_PATH_RE.finditer(text):
            errors.append(f"{name}: personal path {match.group(0)!r}")
    errors.extend(scan_vendor_marketing(site_dir))
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
