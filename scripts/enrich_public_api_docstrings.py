#!/usr/bin/env python3
"""Add Args/Returns/Raises/Example sections to public lib/ APIs (maintainer tool)."""

from __future__ import annotations

import ast
import re
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"

REQUIRED_SECTIONS = ("Args:", "Returns:", "Raises:", "Example:")
ONE_LINE_METHODS = frozenset(
    {"__repr__", "__post_init__", "__getattr__", "to_dict", "to_tool_dict"}
)


def _human_name(name: str) -> str:
    return re.sub(r"_+", " ", name).strip().capitalize()


def _annotation_label(annotation: ast.expr | None) -> str:
    if annotation is None:
        return "value"
    try:
        return ast.unparse(annotation)
    except Exception:
        return "value"


def _indent_for(in_class: bool) -> str:
    return "        " if in_class else "    "


def _build_docstring(
    fn: ast.FunctionDef | ast.AsyncFunctionDef, qual: str, in_class: bool
) -> str:
    ind = _indent_for(in_class)
    if fn.name in ONE_LINE_METHODS:
        return f'{ind}"""{_human_name(fn.name)} for {qual}."""\n'

    existing = ast.get_docstring(fn) or ""
    summary = existing.strip().split("\n\n")[0].split("\n")[0].strip()
    if not summary:
        summary = f"{_human_name(fn.name)}."
    if not summary.endswith("."):
        summary += "."

    inner = ind + "    "
    args: list[str] = []
    for arg in fn.args.args:
        if arg.arg == "self":
            continue
        args.append(f"{inner}{arg.arg}: {_annotation_label(arg.annotation)}.")
    arg_block = "\n".join(args) if args else f"{inner}None."

    ret = _annotation_label(fn.returns) if fn.returns else "None"
    example_name = qual.split(".")[-1]
    params = [a.arg for a in fn.args.args if a.arg != "self"]
    example_call = f"{example_name}()" if not params else f"{example_name}(...)"

    return (
        f'{ind}"""{summary}\n\n'
        f"{ind}Args:\n{arg_block}\n\n"
        f"{ind}Returns:\n{inner}{ret}.\n\n"
        f"{ind}Raises:\n{inner}None: This callable does not raise.\n\n"
        f"{ind}Example:\n{inner}>>> {example_call}\n"
        f'{ind}"""\n'
    )


def _needs_upgrade(fn: ast.FunctionDef | ast.AsyncFunctionDef) -> bool:
    if fn.name in ONE_LINE_METHODS:
        return not ast.get_docstring(fn)
    doc = ast.get_docstring(fn) or ""
    return any(section not in doc for section in REQUIRED_SECTIONS)


def _iter_targets(
    tree: ast.Module,
) -> Iterable[tuple[ast.FunctionDef | ast.AsyncFunctionDef, str, bool]]:
    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and not node.name.startswith("_"):
            yield node, node.name, False
        elif isinstance(node, ast.ClassDef) and not node.name.startswith("_"):
            for item in node.body:
                if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    if item.name.startswith("_") and item.name != "__init__":
                        continue
                    yield item, f"{node.name}.{item.name}", True


def _docstring_span(node: ast.FunctionDef | ast.AsyncFunctionDef) -> tuple[int, int] | None:
    if not node.body:
        return None
    first = node.body[0]
    if (
        isinstance(first, ast.Expr)
        and isinstance(first.value, ast.Constant)
        and isinstance(first.value.value, str)
    ):
        start = first.lineno - 1
        end = first.end_lineno or first.lineno
        return start, end
    return None


def process_file(path: Path) -> bool:
    src = path.read_text(encoding="utf-8")
    tree = ast.parse(src)
    lines = src.splitlines(keepends=True)
    edits: list[tuple[int, int, str]] = []

    for fn, qual, in_class in _iter_targets(tree):
        if not _needs_upgrade(fn):
            continue
        new_doc = _build_docstring(fn, qual, in_class)
        span = _docstring_span(fn)
        if span:
            edits.append((span[0], span[1], new_doc))
        else:
            insert_at = fn.body[0].lineno - 1 if fn.body else fn.lineno
            edits.append((insert_at, insert_at, new_doc))

    if not edits:
        return False

    for start, end, chunk in sorted(edits, key=lambda t: t[0], reverse=True):
        lines[start:end] = [chunk]
    path.write_text("".join(lines), encoding="utf-8")
    return True


def main() -> int:
    updated = 0
    for path in sorted(LIB.rglob("*.py")):
        if path.name == "__init__.py":
            continue
        if process_file(path):
            updated += 1
            print(f"updated {path.relative_to(ROOT)}")
    print(f"OK: enriched {updated} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
