"""Repo policy: ambient-core must not publish GitHub Pages output."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from check_pages_site import FORBIDDEN_PUBLISH_PATHS, publish_policy_errors  # noqa: E402
import check_pages_site_safe as pages_safe  # noqa: E402


def test_forbidden_publish_paths_absent() -> None:
    errors = publish_policy_errors()
    assert not errors, errors
    for path in FORBIDDEN_PUBLISH_PATHS:
        assert not path.exists(), path


def test_empty_site_dir_passes_safe_scan() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        assert not pages_safe.scan_site_dir(Path(tmp))


def test_nonempty_site_dir_fails_safe_scan() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        site = Path(tmp)
        (site / "index.html").write_text("<html></html>", encoding="utf-8")
        errors = pages_safe.scan_site_dir(site)
        assert errors


def test_check_pages_site_cli() -> None:
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_pages_site.py")],
        cwd=ROOT,
        check=False,
    )
    assert proc.returncode == 0
