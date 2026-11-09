"""GitHub Pages redirect stub build and safety scan."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import build_pages_site as pages_build  # noqa: E402


def test_build_site_emits_only_redirect_stubs(tmp_path: Path) -> None:
    out = tmp_path / "site"
    files = pages_build.build_site(out)
    assert len(files) == 2
    assert (out / "index.html").is_file()
    assert (out / "404.html").is_file()
    all_files = [p.relative_to(out).as_posix() for p in out.rglob("*") if p.is_file()]
    assert sorted(all_files) == ["404.html", "index.html"]


def test_redirect_stub_points_at_org_landing(tmp_path: Path) -> None:
    out = tmp_path / "site"
    pages_build.build_site(out)
    index = (out / "index.html").read_text(encoding="utf-8")
    target = pages_build.ORG_LANDING_URL
    assert f'<link rel="canonical" href="{target}">' in index
    assert 'http-equiv="refresh"' in index
    assert f'content="0;url={target}"' in index
    for rel in pages_build.REQUIRED_SITE_PAGES:
        assert (out / rel).read_text(encoding="utf-8") == index


def test_build_site_passes_safety_scan(tmp_path: Path) -> None:
    out = tmp_path / "site"
    pages_build.build_site(out)
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_pages_site_safe.py"), str(out)],
        cwd=ROOT,
        check=False,
    )
    assert proc.returncode == 0
