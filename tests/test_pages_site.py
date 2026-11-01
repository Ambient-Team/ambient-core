"""GitHub Pages static site build and safety scan."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import build_pages_site as pages_build  # noqa: E402


def test_collect_markdown_excludes_hub_mirror() -> None:
    sources = {stem for _, stem in pages_build.collect_markdown_sources()}
    assert not any(stem.startswith("docs/hub") for stem in sources)
    assert "index" in sources


def test_build_site_writes_index_and_passes_safety(tmp_path: Path) -> None:
    out = tmp_path / "site"
    files = pages_build.build_site(out)
    assert (out / "index.html").is_file()
    assert files
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_pages_site_safe.py"), str(out)],
        cwd=ROOT,
        check=False,
    )
    assert proc.returncode == 0


def test_excluded_ops_docs_documented() -> None:
    assert "docs/hub/" in pages_build.EXCLUDED_DOC_PREFIXES
    assert "docs/ci.md" in pages_build.EXCLUDED_DOC_PREFIXES
