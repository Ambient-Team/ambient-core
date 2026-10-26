"""Smoke test for examples/integrators/builtin_tools_walkthrough.py."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_builtin_tools_walkthrough_exits_zero() -> None:
    script = ROOT / "examples" / "integrators" / "builtin_tools_walkthrough.py"
    result = subprocess.run(
        [sys.executable, str(script)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
    assert "registered tools:" in (result.stdout or "")
