#!/usr/bin/env python3
"""Build the GitHub Pages preview tree and run the public-safe content scan."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist" / "pages-site-preview"


def main() -> int:
    build = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "build_pages_site.py"), "--out", str(OUT)],
        cwd=ROOT,
        check=False,
    )
    if build.returncode != 0:
        return build.returncode
    scan = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_pages_site_safe.py"), str(OUT)],
        cwd=ROOT,
        check=False,
    )
    return scan.returncode


if __name__ == "__main__":
    raise SystemExit(main())
