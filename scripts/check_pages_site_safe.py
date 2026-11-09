#!/usr/bin/env python3
"""Fail when a directory contains GitHub Pages output (ambient-core publishes nothing)."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def scan_site_dir(site_dir: Path) -> list[str]:
    if not site_dir.is_dir():
        return [f"site directory missing: {site_dir}"]
    errors: list[str] = []
    for path in sorted(site_dir.rglob("*")):
        if path.is_file():
            rel = path.relative_to(site_dir).as_posix()
            errors.append(f"unexpected published file {rel!r} (repo must not emit Pages HTML)")
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
    print("OK: pages site safety (no published files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
