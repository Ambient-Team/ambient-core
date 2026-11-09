"""Secrets pattern scanner: lib/ and scripts/ must stay free of token-shaped literals."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path
from types import ModuleType

import importlib.util

ROOT = Path(__file__).resolve().parents[1]


def _scan_module() -> ModuleType:
    path = ROOT / "scripts" / "scan_secrets_patterns.py"
    spec = importlib.util.spec_from_file_location("scan_secrets_patterns", path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_scan = _scan_module()
scan_paths = _scan.scan_paths


def test_lib_tree_has_no_secret_shaped_tokens() -> None:
    errors = scan_paths(sorted((ROOT / "lib").rglob("*.py")))
    assert errors == []


def test_scripts_tree_has_no_secret_shaped_tokens() -> None:
    errors = scan_paths(sorted((ROOT / "scripts").rglob("*.py")))
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


def test_pip_audit_check_exits_zero() -> None:
    script = ROOT / "scripts" / "check_pip_audit.py"
    result = subprocess.run(
        [sys.executable, str(script)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout


def test_sensitive_data_literals_check_exits_zero() -> None:
    script = ROOT / "scripts" / "check_sensitive_data_literals.py"
    result = subprocess.run(
        [sys.executable, str(script)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
