#!/usr/bin/env python3
"""CI: ambient-core must not build or publish a GitHub Pages site."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FORBIDDEN_PUBLISH_PATHS: tuple[Path, ...] = (
    ROOT / ".github" / "workflows" / "pages.yml",
    ROOT / "scripts" / "build_pages_site.py",
    ROOT / "scripts" / "pages",
)


def publish_policy_errors() -> list[str]:
    errors: list[str] = []
    for path in FORBIDDEN_PUBLISH_PATHS:
        if path.exists():
            rel = path.relative_to(ROOT).as_posix()
            errors.append(f"Pages publish path must not exist: {rel}")
    return errors


def main() -> int:
    errors = publish_policy_errors()
    if errors:
        for err in errors:
            print(f"PAGES POLICY: {err}", file=sys.stderr)
        return 1

    with tempfile.TemporaryDirectory(prefix="pages-empty-") as tmp:
        site_dir = Path(tmp)
        scan = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "check_pages_site_safe.py"),
                str(site_dir),
            ],
            cwd=ROOT,
            check=False,
        )
        if scan.returncode != 0:
            return scan.returncode

    print("OK: ambient-core does not publish GitHub Pages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
