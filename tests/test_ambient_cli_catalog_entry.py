"""ambient_cli.catalog entrypoint delegates to the reference catalog generator script."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_ambient_cli_catalog_module_help() -> None:
    result = subprocess.run(
        [sys.executable, "-m", "ambient_cli.catalog", "--help"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0
    assert "check" in (result.stdout or "").lower()
