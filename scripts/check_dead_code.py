#!/usr/bin/env python3
"""Unused imports (ruff) and unreachable lib/ symbols (vulture) gate."""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

_VULTURE_LINE = re.compile(
    r"^lib/[^:]+:\d+:\s+unused\s+(?:function|method|variable|attribute)\s+'([^']+)'"
)


def _run_ruff() -> int:
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
    return failures


def _run_vulture() -> int:
    if not shutil.which("vulture"):
        print("SKIP: vulture not installed (pip install -e '.[dev]')")
        return 0
    from vulture_whitelist import WHITELIST  # noqa: PLC0415

    allowed = set(WHITELIST)
    result = subprocess.run(
        [sys.executable, "-m", "vulture", "lib", "--min-confidence", "80"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    unexpected: list[str] = []
    for line in result.stdout.splitlines():
        match = _VULTURE_LINE.match(line.strip())
        if not match:
            continue
        name = match.group(1)
        if name not in allowed:
            unexpected.append(line.strip())
    if unexpected:
        for line in unexpected:
            print(line, file=sys.stderr)
        print(
            f"ERROR: {len(unexpected)} vulture finding(s) not whitelisted "
            "(remove dead code or extend scripts/vulture_whitelist.py)",
            file=sys.stderr,
        )
        return 1
    print(f"OK: vulture lib/ ({len(allowed)} whitelisted public symbols)")
    return 0


def main() -> int:
    code = _run_ruff()
    if code:
        return code
    return _run_vulture()


if __name__ == "__main__":
    raise SystemExit(main())
