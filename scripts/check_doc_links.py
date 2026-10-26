#!/usr/bin/env python3
"""Fail CI on broken relative links in repo docs and notebooks."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(ROOT / "scripts"))
from check_markdown_prose import iter_doc_files  # noqa: E402

LINK_RE = re.compile(
    r"!?\[[^\]]*\]\(([^)]+)\)|<(https?://[^>]+)>",
)
SKIP_PREFIXES = ("mailto:", "javascript:", "#", "http://", "https://")


def _split_link(target: str) -> str:
    target = target.strip()
    if " " in target and not target.startswith("<"):
        target = target.split()[0]
    path_part, _, _fragment = target.partition("#")
    return path_part.strip()


def _check_relative(source: Path, path_part: str) -> str | None:
    if not path_part or path_part.startswith(SKIP_PREFIXES):
        return None
    dest = (source.parent / path_part).resolve()
    try:
        dest.relative_to(ROOT.resolve())
    except ValueError:
        return f"link escapes repo: {path_part}"
    if dest.is_file() or dest.is_dir():
        return None
    return f"missing target: {path_part}"


def find_broken_links(path: Path) -> list[tuple[int, str, str]]:
    broken: list[tuple[int, str, str]] = []
    text = path.read_text(encoding="utf-8")
    for lineno, line in enumerate(text.splitlines(), start=1):
        for match in LINK_RE.finditer(line):
            raw = match.group(1)
            if not raw:
                continue
            path_part = _split_link(raw)
            if path_part.startswith(SKIP_PREFIXES) or not path_part:
                continue
            err = _check_relative(path, path_part)
            if err:
                broken.append((lineno, raw, err))
    return broken


def main() -> int:
    doc_files = iter_doc_files()
    failures: list[str] = []
    for path in doc_files:
        rel = path.relative_to(ROOT)
        for lineno, target, err in find_broken_links(path):
            failures.append(f"{rel}:{lineno}: ({err}) {target}")

    if failures:
        print("Broken relative doc links:", file=sys.stderr)
        for item in failures:
            print(item, file=sys.stderr)
        return 1

    print(f"OK: relative doc links in {len(doc_files)} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
