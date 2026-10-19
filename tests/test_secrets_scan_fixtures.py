"""Secrets-scan fixtures must trip pattern scanner; lib/ must stay clean."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import importlib.util

ROOT = Path(__file__).resolve().parents[1]


def _scan_module():
    path = ROOT / "scripts" / "scan_secrets_patterns.py"
    spec = importlib.util.spec_from_file_location("scan_secrets_patterns", path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_scan = _scan_module()
find_secret_hits = _scan.find_secret_hits
scan_paths = _scan.scan_paths

FIXTURES = ROOT / "tests" / "fixtures" / "secrets_scan"


def test_fixture_files_trigger_scanner() -> None:
    sample = FIXTURES / "sample_tokens.txt"
    hits = find_secret_hits(sample.read_text(encoding="utf-8"))
    assert len(hits) >= 2


def test_lib_tree_has_no_secret_shaped_tokens() -> None:
    errors = scan_paths(sorted((ROOT / "lib").rglob("*.py")))
    assert errors == []


def test_scan_secrets_script_exits_zero() -> None:
    script = ROOT / "scripts" / "scan_secrets_patterns.py"
    result = subprocess.run(
        [sys.executable, str(script)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
