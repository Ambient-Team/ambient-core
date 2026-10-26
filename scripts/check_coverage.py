#!/usr/bin/env python3
"""Run pytest with coverage on lib/ and enforce line + branch gates (pyproject.toml)."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path


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
        "--cov-fail-under=90",
    ]
    result = subprocess.run(cmd, env=env, check=False)
    if result.returncode != 0:
        print("ERROR: pytest failed", file=sys.stderr)
        return result.returncode

    with tempfile.TemporaryDirectory() as tmp:
        json_path = Path(tmp) / "coverage.json"
        report = subprocess.run(
            [sys.executable, "-m", "coverage", "json", "-o", str(json_path)],
            env=env,
            check=False,
        )
        if report.returncode != 0:
            return report.returncode
        data = json.loads(json_path.read_text(encoding="utf-8"))
        totals = data.get("totals") or {}
        branch_pct = float(totals.get("percent_branches_covered") or 0.0)
        if branch_pct < 95.0:
            print(
                f"ERROR: branch coverage {branch_pct:.2f}% below 95%",
                file=sys.stderr,
            )
            return 1

    print("OK: lib/ coverage >= 90% lines and >= 95% branches")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
