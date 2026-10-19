#!/usr/bin/env python3
"""Fail when ruff reports unused imports in lib/ (lightweight dead-code gate)."""

from __future__ import annotations

import subprocess
import sys


def main() -> int:
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "ruff",
            "check",
            "lib",
            "--select",
            "F401,F841",
        ],
        check=False,
    )
    if result.returncode == 0:
        print("OK: no unused imports or variables in lib/")
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
