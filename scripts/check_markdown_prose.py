#!/usr/bin/env python3
"""Fail CI on markdown doc policy: no pipe tables; no public Google Drive/Docs links."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Table separator: | --- | or |:---:| etc.
TABLE_SEP = re.compile(r"^\s*\|(?:\s*:?-+:?\s*\|)+\s*$")

# Public Drive/Docs URLs must not appear in repo docs (use GitHub demos/ambient-core instead).
FORBIDDEN_DRIVE_LINK = re.compile(
    r"(?:https?://)?(?:[a-z0-9.-]+\.)?(?:drive|docs)\.google\.com",
    re.IGNORECASE,
)

SCAN_ROOTS = [
    ROOT / "docs",
    ROOT / "examples",
    ROOT / "contracts" / "README.md",
    ROOT / "catalog" / "README.md",
    ROOT / "data" / "README.md",
    ROOT / "notebooks" / "README.md",
    ROOT / "README.md",
]

NOTEBOOK_GLOB = ROOT / "notebooks"


def iter_doc_files() -> list[Path]:
    files: list[Path] = []
    for entry in SCAN_ROOTS:
        if entry.is_file():
            files.append(entry)
        elif entry.is_dir():
            files.extend(sorted(entry.rglob("*.md")))
    if NOTEBOOK_GLOB.is_dir():
        files.extend(sorted(NOTEBOOK_GLOB.glob("*.ipynb")))
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
    if path.suffix != ".md":
        return []
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


def find_forbidden_drive_links(path: Path) -> list[tuple[int, str]]:
    hits: list[tuple[int, str]] = []
    with path.open("r", encoding="utf-8") as handle:
        for lineno, line in enumerate(handle, start=1):
            if FORBIDDEN_DRIVE_LINK.search(line):
                hits.append((lineno, line.rstrip()[:120]))
    return hits


def main() -> int:
    table_violations: list[str] = []
    link_violations: list[str] = []
    doc_files = iter_doc_files()
    for path in doc_files:
        rel = path.relative_to(ROOT)
        for lineno, text in find_table_separators(path):
            table_violations.append(f"{rel}:{lineno}: {text}")
        for lineno, text in find_forbidden_drive_links(path):
            link_violations.append(f"{rel}:{lineno}: {text}")

    if table_violations:
        print("Markdown pipe tables are not allowed (use prose or bullet lists).", file=sys.stderr)
        print("See docs/CONTRIBUTING.md#documentation-style", file=sys.stderr)
        for item in table_violations:
            print(item, file=sys.stderr)
        return 1

    if link_violations:
        print(
            "Public Google Drive/Docs links are not allowed in repo docs.",
            file=sys.stderr,
        )
        print(
            "Use https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core",
            file=sys.stderr,
        )
        for item in link_violations:
            print(item, file=sys.stderr)
        return 1

    print(f"OK: no pipe tables in {len(doc_files)} doc file(s)")
    print("OK: no drive.google.com or docs.google.com links in docs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
