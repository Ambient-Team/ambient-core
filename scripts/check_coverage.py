#!/usr/bin/env python3
"""Run pytest with coverage on lib/ and enforce line + branch gates (pyproject.toml)."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Per-package floors (in addition to global lib/ gates).
PACKAGE_FLOORS: tuple[tuple[str, float, float], ...] = (
    ("lib/ambient_pipeline/", 95.0, 95.0),
)


def _aggregate_package(files: dict[str, object], prefix: str) -> tuple[float, float]:
    """Return (line_percent, branch_percent) for all files under *prefix*."""
    covered_lines = 0
    num_statements = 0
    covered_branches = 0
    num_branches = 0
    for path, entry in files.items():
        if not str(path).replace("\\", "/").startswith(prefix):
            continue
        summary = (entry or {}).get("summary") if isinstance(entry, dict) else None
        if not isinstance(summary, dict):
            continue
        num_statements += int(summary.get("num_statements") or 0)
        covered_lines += int(summary.get("covered_lines") or 0)
        num_branches += int(summary.get("num_branches") or 0)
        covered_branches += int(summary.get("covered_branches") or 0)
    line_pct = 100.0 if num_statements == 0 else 100.0 * covered_lines / num_statements
    branch_pct = 100.0 if num_branches == 0 else 100.0 * covered_branches / num_branches
    return line_pct, branch_pct


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

        files = data.get("files") or {}
        for prefix, line_floor, branch_floor in PACKAGE_FLOORS:
            line_pct, pkg_branch_pct = _aggregate_package(files, prefix)
            if line_pct < line_floor:
                print(
                    f"ERROR: {prefix} line coverage {line_pct:.2f}% below {line_floor}%",
                    file=sys.stderr,
                )
                return 1
            if pkg_branch_pct < branch_floor:
                print(
                    f"ERROR: {prefix} branch coverage {pkg_branch_pct:.2f}% "
                    f"below {branch_floor}%",
                    file=sys.stderr,
                )
                return 1
            print(
                f"OK: {prefix} coverage {line_pct:.2f}% lines, "
                f"{pkg_branch_pct:.2f}% branches (>= {line_floor}% / {branch_floor}%)"
            )

    print("OK: lib/ coverage >= 90% lines and >= 95% branches")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
