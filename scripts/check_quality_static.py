#!/usr/bin/env python3
"""Run fast quality gates (no Spark): lint, types, dead code, secrets scan, pack docs."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STEPS: tuple[tuple[str, list[str]], ...] = (
    ("ruff", [sys.executable, str(ROOT / "scripts" / "check_ruff.py")]),
    ("mypy", [sys.executable, str(ROOT / "scripts" / "check_mypy.py")]),
    ("mypy-strict", [sys.executable, str(ROOT / "scripts" / "check_mypy_strict.py")]),
    (
        "mypy-strict-support",
        [sys.executable, str(ROOT / "scripts" / "check_mypy_strict_support.py")],
    ),
    ("dead-code", [sys.executable, str(ROOT / "scripts" / "check_dead_code.py")]),
    (
        "public-api-docstrings",
        [sys.executable, str(ROOT / "scripts" / "check_public_api_docstrings.py")],
    ),
    (
        "lib-readme",
        [sys.executable, str(ROOT / "scripts" / "generate_lib_readme.py"), "--check"],
    ),
    ("secrets-scan", [sys.executable, str(ROOT / "scripts" / "scan_secrets_patterns.py")]),
    (
        "golden-pii-fixture-refs",
        [sys.executable, str(ROOT / "scripts" / "check_golden_pii_fixture_refs.py")],
    ),
    (
        "sensitive-data-literals",
        [sys.executable, str(ROOT / "scripts" / "check_sensitive_data_literals.py")],
    ),
    ("doc-links", [sys.executable, str(ROOT / "scripts" / "check_doc_links.py")]),
    (
        "pack-reference-docs",
        [sys.executable, str(ROOT / "scripts" / "generate_pack_reference_docs.py"), "--check"],
    ),
)


def main() -> int:
    for label, cmd in STEPS:
        result = subprocess.run(cmd, cwd=ROOT, check=False)
        if result.returncode != 0:
            print(f"ERROR: {label} failed", file=sys.stderr)
            return result.returncode
        print(f"OK: {label}")
    print("OK: static quality gates")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
