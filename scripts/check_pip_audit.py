#!/usr/bin/env python3
"""Fail when installed packages have known vulnerabilities (pip-audit)."""

from __future__ import annotations

import subprocess
import sys


def main() -> int:
    cmd = [sys.executable, "-m", "pip_audit", "--progress-spinner", "off"]
    result = subprocess.run(cmd, check=False)
    if result.returncode != 0:
        print("ERROR: pip-audit reported vulnerabilities or failed", file=sys.stderr)
        return result.returncode if result.returncode != 0 else 1
    print("OK: pip-audit found no known vulnerabilities in installed packages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
