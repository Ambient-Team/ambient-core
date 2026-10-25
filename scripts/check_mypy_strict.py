#!/usr/bin/env python3
"""Run mypy --strict on core lib modules (incremental SSOT list)."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

# Spark-heavy modules stay on the default pyproject mypy profile until typed further.
STRICT_MODULES: tuple[str, ...] = (
    "lib/ambient_contracts/paths.py",
    "lib/ambient_contracts/crosswalk.py",
    "lib/ambient_contracts/catalog_manifest.py",
    "lib/ambient_contracts/validate.py",
    "lib/ambient_contracts/loader.py",
    "lib/ambient_cli/catalog.py",
    "lib/ambient_pipeline/storage_paths.py",
    "lib/ambient_pipeline/catalog_field_rules.py",
    "lib/ambient_pipeline/catalog_loader.py",
    "lib/ambient_pipeline/gold_contract_map.py",
    "lib/ambient_pipeline/secrets.py",
    "lib/ambient_pipeline/pii.py",
    "lib/ambient_pipeline/runner.py",
)


def main() -> int:
    if not shutil.which("mypy"):
        print("SKIP: mypy not installed")
        return 0
    root = Path(__file__).resolve().parents[1]
    failures = 0
    for rel in STRICT_MODULES:
        path = root / rel
        if not path.is_file():
            print(f"MISSING: {rel}", file=sys.stderr)
            failures += 1
            continue
        result = subprocess.run(
            ["mypy", "--strict", "--config-file", "pyproject.toml", str(path)],
            cwd=root,
            check=False,
        )
        if result.returncode != 0:
            failures += 1
        else:
            print(f"OK: mypy --strict {rel}")
    if failures:
        print(f"ERROR: {failures} module(s) failed mypy --strict", file=sys.stderr)
        return 1
    print(f"OK: mypy --strict on {len(STRICT_MODULES)} core modules")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
