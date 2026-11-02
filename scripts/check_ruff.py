#!/usr/bin/env python3
"""Run ruff on library, tests, and scripts (optional in minimal venvs)."""

from __future__ import annotations

import shutil
import subprocess


def main() -> int:
    if not shutil.which("ruff"):
        print("SKIP: ruff not installed (pip install -e '.[dev]' or '.[all]')")
        return 0
    cmd = [
        "ruff",
        "check",
        "lib",
        "tests",
        "scripts",
        "--select",
        "F,E9,E7",
    ]
    result = subprocess.run(cmd, check=False)
    if result.returncode == 0:
        print("OK: ruff")
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
