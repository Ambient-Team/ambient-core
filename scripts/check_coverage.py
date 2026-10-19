#!/usr/bin/env python3
"""Run pytest with coverage on lib/ and enforce fail_under (see pyproject.toml)."""

from __future__ import annotations

import os
import subprocess
import sys


def main() -> int:
    env = os.environ.copy()
    env.setdefault("AMBIENT_SPARK_TESTS", "1")
    cmd = [
        sys.executable,
        "-m",
        "pytest",
        "-q",
        "--cov=lib",
        "--cov-report=term-missing:skip-covered",
        "--cov-report=html:/opt/cursor/artifacts/coverage-html",
        "--cov-fail-under=85",
    ]
    result = subprocess.run(cmd, env=env, check=False)
    if result.returncode == 0:
        print("OK: coverage >= 85% on lib/")
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
