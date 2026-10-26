"""Minimal JSON-Schema-style validation for integrator tool arguments."""

from __future__ import annotations

from typing import Any

_SIMPLE_TYPES: dict[str, Any] = {
    "string": str,
    "integer": int,
    "number": (int, float),
    "boolean": bool,
}


def validate_tool_args(
    properties: dict[str, dict[str, Any]],
    required: list[str] | None,
    args: dict[str, Any],
) -> list[str]:
    """Validate ``args`` against a small builtin schema (types + required keys only).

    Args:
        properties: Map of argument name to ``{"type": "string"|"integer"|...}``.
        required: Required argument names.
        args: Caller-supplied arguments.

    Returns:
        Human-readable error strings; empty when valid.

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_tool_args({"name": {"type": "string"}}, ["name"], {"name": "x"})
        []
    """
    errors: list[str] = []
    req = required or []
    for key in req:
        if key not in args:
            errors.append(f"missing required argument {key!r}")
    for key, value in args.items():
        spec = properties.get(key)
        if spec is None:
            errors.append(f"unknown argument {key!r}")
            continue
        type_name = str(spec.get("type") or "").strip()
        if not type_name:
            continue
        expected = _SIMPLE_TYPES.get(type_name)
        if expected is None:
            errors.append(f"unsupported schema type {type_name!r} for {key!r}")
            continue
        if not isinstance(value, expected):
            errors.append(
                f"argument {key!r} expected {type_name}, got {type(value).__name__}"
            )
    return errors
