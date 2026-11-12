"""Safe arithmetic evaluator and dependency-ordered metric computation."""

from __future__ import annotations

import ast
from typing import Any, Iterable, Mapping

from ambient_calc.results import MISSING_INPUT, ZERO_DENOMINATOR, EvalResult

_ALLOWED_FUNCS = {"min": min, "max": max, "abs": abs, "round": round}


class CalcError(Exception):
    """Raised on an invalid formula, unknown variable, or dependency cycle."""


def slug_of(metric: Mapping[str, Any], key: str | None = None) -> str:
    """Stable slug for a metric: last dotted segment of its key, else its slug/name.

    Args:
        metric: Mapping[str, Any].
        key: str | None.

    Returns:
        str.

    Raises:
        None: This callable does not raise.

    Example:
        >>> slug_of(...)
    """
    if key and "." in key:
        return key.rsplit(".", 1)[-1].replace("-", "_")
    if key:
        return key.replace("-", "_")
    for candidate in ("slug", "id", "name"):
        if metric.get(candidate) is not None:
            return str(metric[candidate]).replace("-", "_")
    raise CalcError("metric has no identifiable slug")


def formula_names(expr: str) -> set[str]:
    """Return the set of variable/identifier names referenced by an expression.

    Args:
        expr: str.

    Returns:
        set[str].

    Raises:
        None: This callable does not raise.

    Example:
        >>> formula_names(...)
    """
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
    """Evaluate an arithmetic expression over ``variables``. No attribute/loop/call except.

    Args:
        expr: str.
        variables: Mapping[str, Any].

    Returns:
        float | None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> safe_eval(...)
    """
    return safe_eval_result(expr, variables).value


def safe_eval_result(expr: str, variables: Mapping[str, Any]) -> EvalResult:
    """Evaluate an expression and return a value with an optional structured null reason.

    Args:
        expr: str.
        variables: Mapping[str, Any].

    Returns:
        EvalResult.

    Raises:
        None: This callable does not raise.

    Example:
        >>> safe_eval_result("a / b", {"a": 1.0, "b": 0.0}).null_reason
        'zero_denominator'
    """
    tree = _parse(expr)
    return _eval_result(tree.body, variables)


def compute_metric_result(
    metric: Mapping[str, Any],
    inputs: Mapping[str, Any],
    computed: Mapping[str, Any] | None = None,
) -> EvalResult:
    """Compute one metric and attach null reason codes when evaluation is undefined.

    Args:
        metric: Mapping[str, Any].
        inputs: Mapping[str, Any].
        computed: Mapping[str, Any] | None.

    Returns:
        EvalResult.

    Raises:
        CalcError: Invalid or cyclic metric definitions.

    Example:
        >>> compute_metric_result({"calc": {"expr": "1", "inputs": []}}, {})
    """
    calc = metric.get("calc")
    if not calc:
        raise CalcError("metric has no calc block (it is a measured input)")
    expr = calc.get("expr")
    if not expr:
        raise CalcError("calc block missing expr")
    context: dict[str, Any] = dict(computed or {})
    context.update({k: v for k, v in inputs.items()})
    declared = set(calc.get("inputs") or [])
    for name in declared:
        if name not in inputs:
            return EvalResult(None, MISSING_INPUT)
    return safe_eval_result(expr, context)


def compute_all_results(
    metrics: Iterable[Mapping[str, Any]],
    inputs: Mapping[str, Any],
) -> dict[str, EvalResult]:
    """Compute metrics in dependency order with structured null reasons.

    Args:
        metrics: Iterable[Mapping[str, Any]].
        inputs: Mapping[str, Any].

    Returns:
        dict[str, EvalResult].

    Raises:
        CalcError: Dependency cycle or invalid metric definition.

    Example:
        >>> compute_all_results([], {})
    """
    by_slug: dict[str, Mapping[str, Any]] = {}
    for m in metrics:
        slug = (m.get("slug") or slug_of(m)).replace("-", "_")
        by_slug[slug] = m
    slugs = set(by_slug)
    visited: dict[str, int] = {}
    order: list[str] = []

    def visit(slug: str) -> None:
        state = visited.get(slug)
        if state == 2:
            return
        if state == 1:
            raise CalcError(f"dependency cycle through {slug!r}")
        visited[slug] = 1
        for dep in _depends_on(by_slug[slug], slugs):
            visit(dep)
        visited[slug] = 2
        order.append(slug)

    for slug in by_slug:
        visit(slug)

    numeric_computed: dict[str, Any] = {}
    results: dict[str, EvalResult] = {}
    for slug in order:
        metric = by_slug[slug]
        if not metric.get("calc"):
            continue
        res = compute_metric_result(metric, inputs, numeric_computed)
        results[slug] = res
        numeric_computed[slug] = res.value
    return results


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
            # Bound exponentiation to avoid CPU/memory exhaustion (e.g. 9**9**9).
            if not isinstance(right, (int, float)) or abs(right) > 100:
                raise CalcError("exponent out of allowed range")
            if not isinstance(left, (int, float)) or abs(left) > 1e6:
                raise CalcError("base out of allowed range for exponentiation")
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


def _eval_result(node: ast.AST, variables: Mapping[str, Any]) -> EvalResult:
    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)) and not isinstance(node.value, bool):
            return EvalResult(float(node.value))
        raise CalcError(f"non-numeric constant {node.value!r}")
    if isinstance(node, ast.Name):
        if node.id not in variables:
            raise CalcError(f"unknown variable {node.id!r}")
        raw = variables[node.id]
        if raw is None:
            return EvalResult(None, MISSING_INPUT)
        return EvalResult(float(raw))
    if isinstance(node, ast.BinOp):
        left = _eval_result(node.left, variables)
        if left.null_reason:
            return left
        right = _eval_result(node.right, variables)
        if right.null_reason:
            return right
        lv, rv = left.value, right.value
        assert lv is not None and rv is not None
        if isinstance(node.op, ast.Add):
            return EvalResult(lv + rv)
        if isinstance(node.op, ast.Sub):
            return EvalResult(lv - rv)
        if isinstance(node.op, ast.Mult):
            return EvalResult(lv * rv)
        if isinstance(node.op, ast.Div):
            if rv == 0:
                return EvalResult(None, ZERO_DENOMINATOR)
            return EvalResult(lv / rv)
        if isinstance(node.op, ast.Pow):
            if not isinstance(rv, (int, float)) or abs(rv) > 100:
                raise CalcError("exponent out of allowed range")
            if not isinstance(lv, (int, float)) or abs(lv) > 1e6:
                raise CalcError("base out of allowed range for exponentiation")
            return EvalResult(lv**rv)
        raise CalcError(f"operator not allowed: {type(node.op).__name__}")
    if isinstance(node, ast.UnaryOp):
        operand = _eval_result(node.operand, variables)
        if operand.null_reason:
            return operand
        assert operand.value is not None
        if isinstance(node.op, ast.USub):
            return EvalResult(-operand.value)
        if isinstance(node.op, ast.UAdd):
            return EvalResult(operand.value)
        raise CalcError(f"unary operator not allowed: {type(node.op).__name__}")
    if isinstance(node, ast.Call):
        func = node.func
        if not isinstance(func, ast.Name) or func.id not in _ALLOWED_FUNCS:
            raise CalcError("only whitelisted numeric functions are allowed")
        arg_results = [_eval_result(a, variables) for a in node.args]
        for ar in arg_results:
            if ar.null_reason:
                return EvalResult(None, ar.null_reason)
        args = [ar.value for ar in arg_results]
        assert all(a is not None for a in args)
        return EvalResult(float(_ALLOWED_FUNCS[func.id](*args)))
    raise CalcError(f"expression element not allowed: {type(node).__name__}")


def compute_metric(
    metric: Mapping[str, Any],
    inputs: Mapping[str, Any],
    computed: Mapping[str, Any] | None = None,
) -> float | None:
    """Compute one metric value from raw ``inputs`` and already-``computed`` metric slugs.

    Args:
        metric: Mapping[str, Any].
        inputs: Mapping[str, Any].
        computed: Mapping[str, Any] | None.

    Returns:
        float | None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> compute_metric(...)
    """
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
    """Compute all calculated metrics in dependency order. ``metrics`` items may carry an.

    Args:
        metrics: Iterable[Mapping[str, Any]].
        inputs: Mapping[str, Any].
        keys: Mapping[int, str] | None.

    Returns:
        dict[str, float | None].

    Raises:
        None: This callable does not raise.

    Example:
        >>> compute_all(...)
    """
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
