"""Golden-style CLI output checks (stable success lines)."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GOLDEN = ROOT / "tests" / "fixtures" / "golden"


def test_validate_contracts_golden_ok_line() -> None:
    expected = (GOLDEN / "validate_contracts_ok.txt").read_text(encoding="utf-8").strip()
    result = subprocess.run(
        [sys.executable, "-m", "ambient_contracts.validate"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr
    line = result.stdout.strip().splitlines()[-1]
    assert re.fullmatch(r"OK: validated \d+ contract\(s\)", line)
    assert "OK: validated" in expected


def test_catalog_generate_check_golden_ok_fragment() -> None:
    expected = (GOLDEN / "catalog_generate_check_ok.txt").read_text(encoding="utf-8").strip()
    result = subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "generate_reference_catalog.py"),
            "--check",
            "--strict-data-option-inputs",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
    assert expected in result.stdout
