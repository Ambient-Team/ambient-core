#!/usr/bin/env python3
"""Fail CI if markdown under docs/ and READMEs use pipe tables."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Table separator: | --- | or |:---:| etc.
TABLE_SEP = re.compile(r"^\s*\|(?:\s*:?-+:?\s*\|)+\s*$")

SCAN_ROOTS = [
    ROOT / "docs",
    ROOT / "examples",
    ROOT / "contracts" / "README.md",
    ROOT / "catalog" / "README.md",
    ROOT / "README.md",
]


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for entry in SCAN_ROOTS:
        if entry.is_file():
            files.append(entry)
        elif entry.is_dir():
            files.extend(sorted(entry.rglob("*.md")))
    seen: set[Path] = set()
    unique: list[Path] = []
    for path in files:
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        unique.append(path)
    return unique


def find_table_separators(path: Path) -> list[tuple[int, str]]:
    hits: list[tuple[int, str]] = []
    in_fence = False
    with path.open("r", encoding="utf-8") as handle:
        for lineno, line in enumerate(handle, start=1):
            stripped = line.strip()
            if stripped.startswith("```"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            if TABLE_SEP.match(line):
                hits.append((lineno, line.rstrip()))
    return hits


def main() -> int:
    violations: list[str] = []
    for path in iter_markdown_files():
        rel = path.relative_to(ROOT)
        for lineno, text in find_table_separators(path):
            violations.append(f"{rel}:{lineno}: {text}")

    if violations:
        print("Markdown pipe tables are not allowed (use prose or bullet lists).", file=sys.stderr)
        print("See docs/CONTRIBUTING.md#documentation-style", file=sys.stderr)
        for item in violations:
            print(item, file=sys.stderr)
        return 1

    print(f"OK: no pipe tables in {len(iter_markdown_files())} markdown file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
