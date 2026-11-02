#!/usr/bin/env python3
"""Fail when CHANGELOG.md has no section for ambient_contracts.__version__."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    sys.path.insert(0, str(ROOT / "lib"))
    import ambient_contracts

    version = ambient_contracts.__version__
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
    heading = f"## [{version}]"
    if heading not in changelog:
        print(
            f"ERROR: CHANGELOG.md missing section {heading!r} "
            f"(ambient_contracts.__version__ is {version!r})",
            file=sys.stderr,
        )
        return 1
    print(f"OK: CHANGELOG.md documents release {version}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
