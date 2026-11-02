"""Smoke tests for ambient-catalog-generate CLI wrapper."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from ambient_cli.catalog import main


def test_catalog_cli_script_path_exists() -> None:
    script = Path(__file__).resolve().parents[1] / "scripts" / "generate_reference_catalog.py"
    assert script.is_file()


def test_ambient_catalog_generate_check_exits_zero() -> None:
    result_check = subprocess.run(
        [
            sys.executable,
            str(Path(__file__).resolve().parents[1] / "scripts" / "generate_reference_catalog.py"),
            "--check",
            "--strict-data-option-inputs",
        ],
        cwd=Path(__file__).resolve().parents[1],
        capture_output=True,
        text=True,
        check=False,
    )
    assert result_check.returncode == 0, result_check.stderr or result_check.stdout


def test_main_is_callable() -> None:
    assert callable(main)
