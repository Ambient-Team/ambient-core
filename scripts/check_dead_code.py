#!/usr/bin/env python3
"""Fail when ruff reports unused imports in lib/ (lightweight dead-code gate)."""

from __future__ import annotations

import subprocess
import sys


def main() -> int:
    failures = 0
    for target in ("lib", "scripts", "tests"):
        result = subprocess.run(
            [
                sys.executable,
                "-m",
                "ruff",
                "check",
                target,
                "--select",
                "F401,F841",
            ],
            check=False,
        )
        if result.returncode != 0:
            failures += 1
        else:
            print(f"OK: no unused imports or variables in {target}/")
    if failures:
        return failures
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
