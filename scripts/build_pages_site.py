#!/usr/bin/env python3
"""Build a public-safe static site for GitHub Pages (markdown sources only)."""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Internal / ops markdown — never publish (see docs/integrator-agent-tools public scope).
EXCLUDED_DOC_PREFIXES: tuple[str, ...] = (
    "docs/hub/",
    "docs/work-cycles.md",
    "docs/ci.md",
    "docs/ci-path-filters.md",
    "docs/investor-disclosure-lifecycle.md",
    "docs/assurance-lifecycle.md",
    "docs/benchmarking-lifecycle.md",
    "docs/planning-variance-lifecycle.md",
)

SITE_TITLE = "Ambient Core"


def _should_include_doc(rel_posix: str) -> bool:
    for prefix in EXCLUDED_DOC_PREFIXES:
        if rel_posix == prefix.rstrip("/") or rel_posix.startswith(prefix):
            return False
    return True


def collect_markdown_sources() -> list[tuple[Path, str]]:
    """Return (source_path, site_relative_stem) pairs."""
    out: list[tuple[Path, str]] = []
    readme = ROOT / "README.md"
    if readme.is_file():
        out.append((readme, "index"))
    docs_dir = ROOT / "docs"
    if docs_dir.is_dir():
        for path in sorted(docs_dir.rglob("*.md")):
            rel = path.relative_to(ROOT).as_posix()
            if not _should_include_doc(rel):
                continue
            stem = path.relative_to(docs_dir).with_suffix("").as_posix()
            site_stem = f"docs/{stem}" if stem else "docs/index"
            out.append((path, site_stem))
    catalog_readme = ROOT / "catalog" / "README.md"
    if catalog_readme.is_file():
        out.append((catalog_readme, "catalog/index"))
    return out


def _md_to_html(body: str) -> str:
    try:
        import markdown  # type: ignore[import-untyped]

        return str(markdown.markdown(body, extensions=["extra", "sane_lists"]))
    except ImportError:
        return f"<pre>{html.escape(body)}</pre>"


def _rewrite_md_links(fragment: str) -> str:
    """Point relative .md links at built .html paths."""
    return re.sub(
        r'href="([^":#]+)\.md(#[^"]*)?"',
        lambda m: f'href="{m.group(1)}.html{m.group(2) or ""}"',
        fragment,
    )


def _page_shell(title: str, body_html: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)} — {SITE_TITLE}</title>
  <style>
    body {{ font-family: system-ui, sans-serif; line-height: 1.5; max-width: 52rem; margin: 2rem auto; padding: 0 1rem; }}
    pre {{ overflow-x: auto; }}
    code {{ font-size: 0.9em; }}
  </style>
</head>
<body>
  <header><p><a href="index.html">{SITE_TITLE}</a></p></header>
  <main>
{body_html}
  </main>
</body>
</html>
"""


def build_site(out_dir: Path) -> list[Path]:
    """Write HTML site; return list of output file paths."""
    out_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for source, site_stem in collect_markdown_sources():
        text = source.read_text(encoding="utf-8")
        page_title = site_stem.split("/")[-1].replace("_", " ").title()
        body = _rewrite_md_links(_md_to_html(text))
        target = out_dir / f"{site_stem}.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(_page_shell(page_title, body), encoding="utf-8")
        written.append(target)
    return written


def main() -> int:
    parser = argparse.ArgumentParser(description="Build GitHub Pages static site")
    parser.add_argument(
        "--out",
        type=Path,
        default=ROOT / "dist" / "pages-site",
        help="Output directory (site root)",
    )
    args = parser.parse_args()
    files = build_site(args.out.resolve())
    print(f"OK: built {len(files)} page(s) under {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
