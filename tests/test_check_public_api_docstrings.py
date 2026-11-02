"""Smoke test for public API docstring gate."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def test_check_public_api_docstrings_exits_zero() -> None:
    root = Path(__file__).resolve().parents[1]
    result = subprocess.run(
        [sys.executable, str(root / "scripts" / "check_public_api_docstrings.py")],
        cwd=root,
        check=False,
    )
    assert result.returncode == 0
