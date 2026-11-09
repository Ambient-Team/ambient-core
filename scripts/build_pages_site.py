#!/usr/bin/env python3
"""Build GitHub Pages stub for ambient-core (redirect to org landing only)."""

from __future__ import annotations

import argparse
import html
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Legacy project-site URL prefix (redirect stubs only; public site is org root).
PAGES_BASE_PATH = "/ambient-core/"

# Canonical public site (org root; content lives in Ambient-Team/ambient-team.github.io).
ORG_LANDING_URL = "https://ambient-team.github.io/"

REQUIRED_SITE_PAGES: tuple[str, ...] = (
    "index.html",
    "404.html",
)


def redirect_stub_html() -> str:
    """Minimal HTML: meta refresh + canonical link to the org landing URL."""
    target = html.escape(ORG_LANDING_URL, quote=True)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0;url={target}">
  <link rel="canonical" href="{target}">
  <title>Ambient Core</title>
</head>
<body>
  <p><a href="{target}">Continue to the Ambient Team site</a></p>
</body>
</html>
"""


def build_site(out_dir: Path) -> list[Path]:
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    stub = redirect_stub_html()
    written: list[Path] = []
    for name in REQUIRED_SITE_PAGES:
        path = out_dir / name
        path.write_text(stub, encoding="utf-8")
        written.append(path)
    return written


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Build ambient-core GitHub Pages redirect stubs (index + 404)"
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=ROOT / "dist" / "pages-site",
        help="Output directory (site root)",
    )
    args = parser.parse_args()
    files = build_site(args.out.resolve())
    print(f"OK: built {len(files)} file(s) under {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
