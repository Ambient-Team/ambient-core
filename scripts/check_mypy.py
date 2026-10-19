#!/usr/bin/env python3
"""Run mypy on lib/ (optional if mypy not installed)."""

from __future__ import annotations

import shutil
import subprocess


def main() -> int:
    if not shutil.which("mypy"):
        print("SKIP: mypy not installed (pip install -e '.[dev]' or pip install mypy)")
        return 0
    result = subprocess.run(
        ["mypy", "--config-file", "pyproject.toml"],
        check=False,
    )
    if result.returncode == 0:
        print("OK: mypy")
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
