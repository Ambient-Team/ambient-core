"""Minimal JSON-Schema-style validation for integrator tool arguments."""

from __future__ import annotations

from typing import Any

_SIMPLE_TYPES: dict[str, Any] = {
    "string": str,
    "integer": int,
    "number": (int, float),
    "boolean": bool,
    "array": list,
    "object": dict,
}


def _validate_value(spec: dict[str, Any], value: Any, path: str) -> list[str]:
    type_name = str(spec.get("type") or "").strip()
    if not type_name:
        return []
    if type_name == "object":
        if not isinstance(value, dict):
            return [f"{path} expected object, got {type(value).__name__}"]
        nested_props = spec.get("properties")
        if not isinstance(nested_props, dict):
            nested_props = {}
        nested_required = spec.get("required")
        if not isinstance(nested_required, list):
            nested_required = []
        return validate_tool_args(
            nested_props,
            [str(k) for k in nested_required],
            value,
            path_prefix=path,
        )
    if type_name == "array":
        if not isinstance(value, list):
            return [f"{path} expected array, got {type(value).__name__}"]
        item_spec = spec.get("items")
        if not isinstance(item_spec, dict):
            return []
        errors: list[str] = []
        for index, item in enumerate(value):
            errors.extend(_validate_value(item_spec, item, f"{path}[{index}]"))
        return errors
    expected = _SIMPLE_TYPES.get(type_name)
    if expected is None:
        return [f"unsupported schema type {type_name!r} at {path}"]
    if not isinstance(value, expected):
        return [f"{path} expected {type_name}, got {type(value).__name__}"]
    return []


def validate_tool_args(
    properties: dict[str, dict[str, Any]],
    required: list[str] | None,
    args: dict[str, Any],
    *,
    path_prefix: str = "",
) -> list[str]:
    """Validate ``args`` against a JSON-Schema-style subset (types, required, object, array).

    Args:
        properties: Map of argument name to property schema (``type``, nested ``properties``).
        required: Required argument names.
        args: Caller-supplied arguments.
        path_prefix: Prefix for nested error messages.

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
            label = f"{path_prefix}.{key}" if path_prefix else key
            errors.append(f"missing required argument {label!r}")
    for key, value in args.items():
        spec = properties.get(key)
        if spec is None:
            label = f"{path_prefix}.{key}" if path_prefix else key
            errors.append(f"unknown argument {label!r}")
            continue
        if not isinstance(spec, dict):
            continue
        path = f"{path_prefix}.{key}" if path_prefix else key
        errors.extend(_validate_value(spec, value, path))
    return errors


def validate_tool_schema_document(schema: dict[str, Any], args: dict[str, Any]) -> list[str]:
    """Validate ``args`` against a top-level tool schema document.

    Args:
        schema: Object with optional ``properties`` and ``required`` keys.
        args: Caller arguments.

    Returns:
        list[str]: Validation errors (empty when valid).

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_tool_schema_document({"properties": {}}, {})
        []
    """
    props = schema.get("properties")
    if not isinstance(props, dict):
        props = {}
    required = schema.get("required")
    if not isinstance(required, list):
        required = []
    return validate_tool_args(props, [str(k) for k in required], args)
