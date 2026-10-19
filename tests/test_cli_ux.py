"""CLI UX: --help text and exit codes."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _run(argv: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, *argv],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )


def test_validate_contracts_help_exits_zero() -> None:
    result = _run(["-m", "ambient_contracts.validate", "--help"])
    assert result.returncode == 0
    assert "usage" in (result.stdout or "").lower()


def test_ambient_catalog_generate_help_exits_zero() -> None:
    script = ROOT / "scripts" / "generate_reference_catalog.py"
    result = _run([str(script), "--help"])
    assert result.returncode == 0
    assert "check" in (result.stdout or "").lower()


def test_pack_reference_docs_check_exits_zero() -> None:
    script = ROOT / "scripts" / "generate_pack_reference_docs.py"
    result = _run([str(script), "--check"])
    assert result.returncode == 0, result.stderr or result.stdout


def test_validate_contracts_module_entrypoint() -> None:
    result = _run(["-m", "ambient_contracts.validate"])
    assert result.returncode == 0
