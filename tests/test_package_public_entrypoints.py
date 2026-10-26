"""Behaviour tests for public package CLI entrypoints (__main__ blocks)."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_validate_contracts_module_main_exits_zero() -> None:
    result = subprocess.run(
        [sys.executable, "-m", "ambient_contracts.validate"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
    assert "validated" in (result.stdout or "").lower()


def test_ambient_cli_catalog_module_help_exits_zero() -> None:
    result = subprocess.run(
        [sys.executable, "-m", "ambient_cli.catalog", "--help"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
    assert "catalog" in (result.stdout or "").lower()
