"""Safe arithmetic evaluator and dependency-ordered metric computation."""

from __future__ import annotations

import ast
import re
from typing import Any, Iterable, Mapping

_ALLOWED_FUNCS = {"min": min, "max": max, "abs": abs, "round": round}


class CalcError(Exception):
    """Raised on an invalid formula, unknown variable, or dependency cycle."""


def slug_of(metric: Mapping[str, Any], key: str | None = None) -> str:
    """Stable slug for a metric: last dotted segment of its key, else its slug/name."""
    if key and "." in key:
        return key.rsplit(".", 1)[-1].replace("-", "_")
    if key:
        return key.replace("-", "_")
    for candidate in ("slug", "id", "name"):
        if metric.get(candidate) is not None:
            return str(metric[candidate]).replace("-", "_")
    raise CalcError("metric has no identifiable slug")


def formula_names(expr: str) -> set[str]:
    """Return the set of variable/identifier names referenced by an expression."""
    tree = _parse(expr)
    names: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Name):
            if node.id not in _ALLOWED_FUNCS:
                names.add(node.id)
    return names


def _parse(expr: str) -> ast.AST:
    try:
        return ast.parse(expr, mode="eval")
    except SyntaxError as exc:  # noqa: PERF203
        raise CalcError(f"invalid expression {expr!r}: {exc}") from exc


def safe_eval(expr: str, variables: Mapping[str, Any]) -> float | None:
    """Evaluate an arithmetic expression over ``variables``. No attribute/loop/call except
    whitelisted numeric funcs. Returns None on division by zero or a None operand."""
    tree = _parse(expr)
    return _eval(tree.body, variables)


def _eval(node: ast.AST, variables: Mapping[str, Any]) -> Any:
    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)) and not isinstance(node.value, bool):
            return node.value
        raise CalcError(f"non-numeric constant {node.value!r}")
    if isinstance(node, ast.Name):
        if node.id not in variables:
            raise CalcError(f"unknown variable {node.id!r}")
        return variables[node.id]
    if isinstance(node, ast.BinOp):
        left = _eval(node.left, variables)
        right = _eval(node.right, variables)
        if left is None or right is None:
            return None
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            if right == 0:
                return None
            return left / right
        if isinstance(node.op, ast.Pow):
            return left ** right
        raise CalcError(f"operator not allowed: {type(node.op).__name__}")
    if isinstance(node, ast.UnaryOp):
        operand = _eval(node.operand, variables)
        if operand is None:
            return None
        if isinstance(node.op, ast.USub):
            return -operand
        if isinstance(node.op, ast.UAdd):
            return operand
        raise CalcError(f"unary operator not allowed: {type(node.op).__name__}")
    if isinstance(node, ast.Call):
        func = node.func
        if not isinstance(func, ast.Name) or func.id not in _ALLOWED_FUNCS:
            raise CalcError("only whitelisted numeric functions are allowed")
        args = [_eval(a, variables) for a in node.args]
        if any(a is None for a in args):
            return None
        return _ALLOWED_FUNCS[func.id](*args)
    raise CalcError(f"expression element not allowed: {type(node).__name__}")


def compute_metric(
    metric: Mapping[str, Any],
    inputs: Mapping[str, Any],
    computed: Mapping[str, Any] | None = None,
) -> float | None:
    """Compute one metric value from raw ``inputs`` and already-``computed`` metric slugs."""
    calc = metric.get("calc")
    if not calc:
        raise CalcError("metric has no calc block (it is a measured input)")
    expr = calc.get("expr")
    if not expr:
        raise CalcError("calc block missing expr")
    context: dict[str, Any] = dict(computed or {})
    context.update({k: v for k, v in inputs.items()})
    return safe_eval(expr, context)


def _depends_on(metric: Mapping[str, Any], slugs: set[str]) -> set[str]:
    calc = metric.get("calc") or {}
    expr = calc.get("expr")
    if not expr:
        return set()
    declared_inputs = set(calc.get("inputs") or [])
    return {n for n in formula_names(expr) if n in slugs and n not in declared_inputs}


def compute_all(
    metrics: Iterable[Mapping[str, Any]],
    inputs: Mapping[str, Any],
    keys: Mapping[int, str] | None = None,
) -> dict[str, float | None]:
    """Compute all calculated metrics in dependency order. ``metrics`` items may carry an
    explicit ``slug``; otherwise ``slug_of`` is used. Measured inputs (no calc) are skipped."""
    by_slug: dict[str, Mapping[str, Any]] = {}
    for m in metrics:
        slug = (m.get("slug") or slug_of(m)).replace("-", "_")
        by_slug[slug] = m
    slugs = set(by_slug)
    # topological sort over metric-to-metric dependencies
    visited: dict[str, int] = {}
    order: list[str] = []

    def visit(slug: str, stack: tuple[str, ...]) -> None:
        state = visited.get(slug)
        if state == 2:
            return
        if state == 1:
            raise CalcError(f"dependency cycle through {slug!r}")
        visited[slug] = 1
        for dep in _depends_on(by_slug[slug], slugs):
            visit(dep, stack + (slug,))
        visited[slug] = 2
        order.append(slug)

    for slug in by_slug:
        visit(slug, ())

    results: dict[str, float | None] = {}
    for slug in order:
        metric = by_slug[slug]
        if not metric.get("calc"):
            continue
        results[slug] = compute_metric(metric, inputs, results)
    return results
