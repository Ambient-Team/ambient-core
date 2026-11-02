#!/usr/bin/env python3
"""Build the Ambient Core GitHub Pages site (landing + public docs)."""

from __future__ import annotations

import argparse
import html
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES_BASE_PATH = "/ambient-core/"
SITE_CSS_SRC = ROOT / "scripts" / "pages" / "site.css"
GITHUB_REPO = "https://github.com/Ambient-Team/ambient-core"
LICENSE_URL = f"{GITHUB_REPO}/blob/main/LICENSE"

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
COMMERCIAL_BANNER_URL = "https://www.ambientsystems.ai"
COMMERCIAL_BANNER_LINK_TEXT = "www.ambientsystems.ai"
COMMERCIAL_BANNER_VISIBLE = (
    f"Looking for the commercial version? Visit {COMMERCIAL_BANNER_LINK_TEXT}"
)

REQUIRED_SITE_PAGES: tuple[str, ...] = (
    "index.html",
    "changelog.html",
    "assets/site.css",
    "docs/README.html",
    "docs/INTEGRATING.html",
    "catalog/index.html",
)

NavKey = str  # home | docs | changelog


def commercial_banner_html() -> str:
    link = (
        f'<a href="{html.escape(COMMERCIAL_BANNER_URL, quote=True)}">'
        f"{html.escape(COMMERCIAL_BANNER_LINK_TEXT)}</a>"
    )
    return f"""  <aside class="commercial-banner" role="complementary" aria-label="Commercial product">
    <p>Looking for the commercial version? Visit {link}</p>
  </aside>"""


def _package_version() -> str:
    init = ROOT / "lib" / "ambient_contracts" / "__init__.py"
    text = init.read_text(encoding="utf-8")
    match = re.search(r'__version__\s*=\s*"([^"]+)"', text)
    return match.group(1) if match else "unknown"


def _should_include_doc(rel_posix: str) -> bool:
    for prefix in EXCLUDED_DOC_PREFIXES:
        if rel_posix == prefix.rstrip("/") or rel_posix.startswith(prefix):
            return False
    return True


def collect_doc_markdown_sources() -> list[tuple[Path, str]]:
    """Return (source_path, site_relative_stem) for documentation pages."""
    out: list[tuple[Path, str]] = []
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
    changelog = ROOT / "CHANGELOG.md"
    if changelog.is_file():
        out.append((changelog, "changelog"))
    return out


def doc_page_hrefs(sources: list[tuple[Path, str]]) -> list[tuple[str, str]]:
    """Sorted (href, label) for sidebar navigation."""
    items: list[tuple[str, str]] = []
    for _path, stem in sources:
        if stem == "changelog":
            continue
        href = f"{stem}.html"
        label = stem.split("/")[-1].replace("_", " ").replace("-", " ")
        if stem == "docs/README" or stem == "docs/index":
            label = "Documentation index"
        items.append((href, label.title()))
    return sorted(items, key=lambda pair: pair[0].lower())


def _md_to_html(body: str) -> str:
    try:
        import markdown  # type: ignore[import-untyped]

        return str(markdown.markdown(body, extensions=["extra", "sane_lists"]))
    except ImportError:
        return f"<pre>{html.escape(body)}</pre>"


def _rewrite_md_links(fragment: str) -> str:
    fragment = re.sub(
        r'href="([^":#]+)\.md(#[^"]*)?"',
        lambda m: f'href="{m.group(1)}.html{m.group(2) or ""}"',
        fragment,
    )
    fragment = re.sub(
        r'href="\.\./docs/([^"]+?)\.md(#[^"]*)?"',
        lambda m: f'href="docs/{m.group(1)}.html{m.group(2) or ""}"',
        fragment,
    )
    return fragment


def _site_header(nav_current: NavKey) -> str:
    def item(key: NavKey, href: str, label: str) -> str:
        current = ' aria-current="page"' if key == nav_current else ""
        return f'<li><a href="{href}"{current}>{html.escape(label)}</a></li>'

    return f"""  <header class="site-header">
    <div class="site-header__inner">
      <a class="site-logo" href="index.html">{SITE_TITLE}</a>
      <nav aria-label="Site">
        <ul class="site-nav">
          {item("home", "index.html", "Home")}
          {item("docs", "docs/README.html", "Documentation")}
          {item("changelog", "changelog.html", "Changelog")}
          <li><a href="{html.escape(GITHUB_REPO, quote=True)}">GitHub</a></li>
          <li><a href="{html.escape(LICENSE_URL, quote=True)}">MIT License</a></li>
        </ul>
      </nav>
    </div>
  </header>"""


def _page_shell(
    title: str,
    body_html: str,
    *,
    nav_current: NavKey,
) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="{PAGES_BASE_PATH}">
  <title>{html.escape(title)} — {SITE_TITLE}</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
{commercial_banner_html()}
{_site_header(nav_current)}
  <div class="page-wrap">
    <main id="main-content">
{body_html}
    </main>
  </div>
</body>
</html>
"""


def _landing_body(version: str) -> str:
    return f"""
      <section class="hero">
        <h1>{html.escape(SITE_TITLE)}</h1>
        <p class="lead">Governed data products — open-source foundation anyone can rebuild.</p>
        <p>Ambient Core is fully open source under the MIT License. It ships governed
        YAML contracts, a reference metrics catalog, Colab/pandas and optional Spark
        pipeline helpers, and maintainer CLIs — with no hosted storage in this repository.</p>
        <p class="meta-links">
          <a href="docs/README.html">Read the documentation</a>
          <a href="{html.escape(GITHUB_REPO, quote=True)}">View on GitHub</a>
          <a href="changelog.html">Changelog</a>
          <a href="{html.escape(LICENSE_URL, quote=True)}">MIT License</a>
        </p>
      </section>
      <section class="card-grid" aria-labelledby="caps-heading">
        <div class="card">
          <h2 id="caps-heading">What you get</h2>
          <ul>
            <li><strong>Contracts</strong> — data-product YAML in <code>contracts/</code></li>
            <li><strong>Catalog</strong> — industries, metrics, benchmarks under <code>catalog/</code></li>
            <li><strong>Pipeline</strong> — Colab/pandas Bronze→Silver→Gold and optional Spark helpers</li>
            <li><strong>Libraries</strong> — <code>ambient_contracts</code>, <code>ambient_cli</code>, <code>ambient_calc</code></li>
            <li><strong>Notebooks</strong> — Colab entry notebook (samples supplied separately)</li>
          </ul>
        </div>
        <div class="card">
          <h2>Hosting model</h2>
          <ul>
            <li><strong>ambient-core</strong> — you host runs and storage</li>
            <li><strong>Commercial platform</strong> — hosted by Ambient (see banner link)</li>
            <li>Demo CSVs are not in git; copy from EngineerID/ambient-systems demos pack</li>
          </ul>
        </div>
      </section>
      <section class="card">
        <h2>Quick start (library / CI)</h2>
        <p>Package version <strong>{html.escape(version)}</strong> (pin git tag <code>v{html.escape(version)}</code>).
        Requires Python 3.10–3.12; Java 17+ for local Spark tests.</p>
        <pre><code>git clone {GITHUB_REPO}.git
cd ambient-core
python3.12 -m venv .venv
source .venv/bin/activate
pip install -e ".[all]"
cp contracts/*.yaml lib/ambient_contracts/bundled/
validate-contracts
AMBIENT_SPARK_TESTS=1 pytest</code></pre>
        <p>Integrators: <a href="docs/INTEGRATING.html">Integrating a tagged release</a>.
        More recipes: <a href="docs/USAGE.html">Usage</a>.</p>
      </section>
"""


def _docs_layout(current_href: str, doc_nav: list[tuple[str, str]], content_html: str) -> str:
    sidebar_items: list[str] = []
    for href, label in doc_nav:
        current = ' aria-current="page"' if href == current_href else ""
        sidebar_items.append(
            f'<li><a href="{html.escape(href, quote=True)}"{current}>{html.escape(label)}</a></li>'
        )
    sidebar = "\n          ".join(sidebar_items)
    return f"""
      <div class="layout-docs">
        <nav class="doc-sidebar" aria-label="Documentation pages">
          <p><strong>Docs</strong></p>
          <ul>
          {sidebar}
          </ul>
        </nav>
        <article class="doc-content">
{content_html}
        </article>
      </div>
"""


def build_site(out_dir: Path) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    assets_dir = out_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SITE_CSS_SRC, assets_dir / "site.css")
    written: list[Path] = [assets_dir / "site.css"]

    version = _package_version()
    landing = _landing_body(version)
    index_path = out_dir / "index.html"
    index_path.write_text(_page_shell("Home", landing, nav_current="home"), encoding="utf-8")
    written.append(index_path)

    sources = collect_doc_markdown_sources()
    doc_nav = doc_page_hrefs(sources)

    for source, site_stem in sources:
        text = source.read_text(encoding="utf-8")
        page_title = site_stem.split("/")[-1].replace("_", " ").replace("-", " ").title()
        if site_stem == "changelog":
            page_title = "Changelog"
        content = _rewrite_md_links(_md_to_html(text))
        current_href = f"{site_stem}.html"
        if site_stem == "changelog":
            body = f'<div class="doc-content">{content}</div>'
            nav_key: NavKey = "changelog"
        else:
            body = _docs_layout(current_href, doc_nav, content)
            nav_key = "docs"
        target = out_dir / f"{site_stem}.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(
            _page_shell(page_title, body, nav_current=nav_key),
            encoding="utf-8",
        )
        written.append(target)
    return written


def main() -> int:
    parser = argparse.ArgumentParser(description="Build Ambient Core GitHub Pages site")
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
