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
import build_pages_site  # noqa: E402

FORBIDDEN_SUBSTRINGS = (
    "BEGIN PRIVATE KEY",
    "ghp_",
    "sk_live_",
)


def _banner_errors(rel: str, text: str) -> list[str]:
    if not rel.endswith(".html"):
        return []
    errors: list[str] = []
    if 'role="complementary"' not in text and "commercial-banner" not in text:
        errors.append(f"{rel}: missing commercial banner landmark")
    if "Looking for the commercial version? Visit" not in text:
        errors.append(f"{rel}: missing commercial banner copy")
    href = f'href="{build_pages_site.COMMERCIAL_BANNER_URL}"'
    if href not in text:
        errors.append(f"{rel}: missing commercial banner link {href}")
    if build_pages_site.COMMERCIAL_BANNER_LINK_TEXT not in text:
        errors.append(f"{rel}: missing link label {build_pages_site.COMMERCIAL_BANNER_LINK_TEXT!r}")
    return errors


def _email_ok(match: re.Match[str]) -> bool:
    domain = match.group(0).split("@")[-1].lower()
    return domain in ALLOWED_EMAIL_DOMAINS


_HREF_RE = re.compile(r'href="([^"]+)"')


def _resolve_site_path(site_dir: Path, target: str) -> Path | None:
    if not target or target.startswith("#"):
        return None
    if target.startswith(("http://", "https://", "mailto:", "javascript:")):
        return None
    path = target.split("#", 1)[0]
    if not path:
        return None
    if path.startswith(build_pages_site.PAGES_BASE_PATH):
        path = path[len(build_pages_site.PAGES_BASE_PATH) :]
    path = path.lstrip("/")
    if not path:
        return None
    return site_dir / path


def _required_page_errors(site_dir: Path) -> list[str]:
    errors: list[str] = []
    for rel in build_pages_site.REQUIRED_SITE_PAGES:
        if not (site_dir / rel).is_file():
            errors.append(f"missing required site page {rel!r}")
    return errors


def _navigation_link_errors(site_dir: Path) -> list[str]:
    errors: list[str] = []
    sources = build_pages_site.collect_doc_markdown_sources()
    for href, _label in build_pages_site.doc_page_hrefs(sources):
        if not (site_dir / href).is_file():
            errors.append(f"doc nav target missing: {href!r}")
    shell_hrefs = (
        "index.html",
        "docs/README.html",
        "changelog.html",
        "assets/site.css",
        "docs/INTEGRATING.html",
    )
    for href in shell_hrefs:
        if not (site_dir / href).is_file():
            errors.append(f"shell nav target missing: {href!r}")

    def check_hrefs(rel: str, hrefs: list[str]) -> None:
        for href in hrefs:
            resolved = _resolve_site_path(site_dir, href)
            if resolved is None:
                continue
            if not resolved.is_file():
                errors.append(f"{rel}: broken shell link {href!r}")

    for path in sorted(site_dir.rglob("*.html")):
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = path.relative_to(site_dir).as_posix()
        if f'<base href="{build_pages_site.PAGES_BASE_PATH}">' not in text:
            errors.append(f"{rel}: missing base href for GitHub Pages project site")
        nav = re.search(r'<ul class="site-nav">(.*?)</ul>', text, re.DOTALL)
        if nav:
            check_hrefs(rel, _HREF_RE.findall(nav.group(1)))
        sidebar = re.search(r'<nav class="doc-sidebar"[^>]*>(.*?)</nav>', text, re.DOTALL)
        if sidebar:
            check_hrefs(rel, _HREF_RE.findall(sidebar.group(1)))
        meta = re.search(r'<p class="meta-links">(.*?)</p>', text, re.DOTALL)
        if meta:
            check_hrefs(rel, _HREF_RE.findall(meta.group(1)))
        banner = re.search(
            r'<aside class="commercial-banner"[^>]*>(.*?)</aside>', text, re.DOTALL
        )
        if banner:
            check_hrefs(rel, _HREF_RE.findall(banner.group(1)))
        logo = re.search(r'<a class="site-logo" href="([^"]+)"', text)
        if logo:
            check_hrefs(rel, [logo.group(1)])
    return errors


def scan_site_dir(site_dir: Path) -> list[str]:
    errors: list[str] = []
    if not site_dir.is_dir():
        return [f"site directory missing: {site_dir}"]
    errors.extend(_required_page_errors(site_dir))
    errors.extend(_navigation_link_errors(site_dir))
    for path in sorted(site_dir.rglob("*")):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = path.relative_to(site_dir).as_posix()
        errors.extend(_banner_errors(rel, text))
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
