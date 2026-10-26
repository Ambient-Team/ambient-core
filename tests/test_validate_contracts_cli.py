"""CLI smoke tests for validate-contracts entrypoint."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def test_validate_contracts_cli_exits_zero() -> None:
    root = Path(__file__).resolve().parents[1]
    result = subprocess.run(
        [sys.executable, "-m", "ambient_contracts.validate"],
        cwd=root,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
    assert "validated" in (result.stdout or "").lower()
