#!/usr/bin/env python3
"""Fail when public lib/ callables lack structured API docstrings."""

from __future__ import annotations

import ast
import sys
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"

REQUIRED_SECTIONS = ("Args:", "Returns:", "Raises:", "Example:")

ONE_LINE_METHODS = frozenset(
    {"__repr__", "__post_init__", "__getattr__", "to_dict", "to_tool_dict"}
)


def _iter_public_callables(tree: ast.Module) -> Iterable[tuple[str, ast.FunctionDef | ast.AsyncFunctionDef]]:
    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            if not node.name.startswith("_"):
                yield f"{node.name}", node
        elif isinstance(node, ast.ClassDef) and not node.name.startswith("_"):
            for item in node.body:
                if not isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    continue
                if item.name.startswith("_") and item.name != "__init__":
                    continue
                yield f"{node.name}.{item.name}", item


def _missing_sections(doc: str | None, one_line: bool) -> list[str]:
    if not doc or not doc.strip():
        return ["<missing docstring>"]
    if one_line:
        return []
    return [section for section in REQUIRED_SECTIONS if section not in doc]


def main() -> int:
    failures: list[str] = []
    for path in sorted(LIB.rglob("*.py")):
        if path.name == "__init__.py":
            continue
        rel = path.relative_to(ROOT).as_posix()
        tree = ast.parse(path.read_text(encoding="utf-8"), filename=rel)
        for qual, fn in _iter_public_callables(tree):
            one_line = fn.name in ONE_LINE_METHODS
            missing = _missing_sections(ast.get_docstring(fn), one_line)
            if missing:
                failures.append(f"{rel}:{qual} missing {', '.join(missing)}")
    if failures:
        for line in failures:
            print(line, file=sys.stderr)
        print(f"ERROR: {len(failures)} public API docstring gap(s)", file=sys.stderr)
        return 1
    print(f"OK: public API docstrings in {len(list(LIB.rglob('*.py')))} lib file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
