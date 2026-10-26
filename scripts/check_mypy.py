#!/usr/bin/env python3
"""Run mypy on lib/ and scripts/ (optional if mypy not installed)."""

from __future__ import annotations

import shutil
import subprocess


def main() -> int:
    if not shutil.which("mypy"):
        print("SKIP: mypy not installed (pip install -e '.[dev]' or pip install mypy)")
        return 0
    lib = subprocess.run(
        ["mypy", "--config-file", "pyproject.toml", "lib"],
        check=False,
    )
    scripts = subprocess.run(
        [
            "mypy",
            "--explicit-package-bases",
            "--config-file",
            "pyproject.toml",
            "scripts",
            "--exclude",
            "scripts/migrate_catalog_layout_027.py",
        ],
        check=False,
    )
    if lib.returncode == 0 and scripts.returncode == 0:
        print("OK: mypy")
        return 0
    return lib.returncode or scripts.returncode


if __name__ == "__main__":
    raise SystemExit(main())
