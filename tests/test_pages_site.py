"""GitHub Pages static site build and safety scan."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import build_pages_site as pages_build  # noqa: E402


def test_collect_doc_markdown_excludes_hub_mirror() -> None:
    sources = {stem for _, stem in pages_build.collect_doc_markdown_sources()}
    assert not any(stem.startswith("docs/hub") for stem in sources)
    assert "docs/README" in sources or any(s.startswith("docs/") for s in sources)


def test_build_site_landing_and_required_pages(tmp_path: Path) -> None:
    out = tmp_path / "site"
    files = pages_build.build_site(out)
    assert (out / "index.html").is_file()
    assert (out / "changelog.html").is_file()
    assert (out / "assets/site.css").is_file()
    assert files
    index = (out / "index.html").read_text(encoding="utf-8")
    assert "Looking for the commercial version? Visit" in index
    assert pages_build.COMMERCIAL_BANNER_LINK_TEXT in index
    assert f'href="{pages_build.COMMERCIAL_BANNER_URL}"' in index
    assert f'<base href="{pages_build.PAGES_BASE_PATH}">' in index
    assert "Governed data products" in index
    for rel in pages_build.REQUIRED_SITE_PAGES:
        assert (out / rel).is_file(), rel


def test_build_site_passes_safety_scan(tmp_path: Path) -> None:
    out = tmp_path / "site"
    pages_build.build_site(out)
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_pages_site_safe.py"), str(out)],
        cwd=ROOT,
        check=False,
    )
    assert proc.returncode == 0


def test_every_html_page_has_banner(tmp_path: Path) -> None:
    out = tmp_path / "site"
    pages_build.build_site(out)
    for path in out.rglob("*.html"):
        text = path.read_text(encoding="utf-8")
        assert "Looking for the commercial version? Visit" in text
        assert f'href="{pages_build.COMMERCIAL_BANNER_URL}"' in text


def test_excluded_ops_docs_documented() -> None:
    assert "docs/hub/" in pages_build.EXCLUDED_DOC_PREFIXES
    assert "docs/ci.md" in pages_build.EXCLUDED_DOC_PREFIXES
