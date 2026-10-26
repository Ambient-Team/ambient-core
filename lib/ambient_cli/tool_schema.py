"""Minimal JSON-Schema-style validation for integrator tool arguments."""

from __future__ import annotations

import re
from typing import Any

_CONSTRAINT_KEYS = (
    "enum",
    "const",
    "minLength",
    "maxLength",
    "minimum",
    "maximum",
    "pattern",
)


def _spec_has_constraints(spec: dict[str, Any]) -> bool:
    return any(key in spec for key in _CONSTRAINT_KEYS)


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
    all_of = spec.get("allOf")
    if isinstance(all_of, list) and all_of:
        merged: list[str] = []
        for candidate in all_of:
            if isinstance(candidate, dict):
                merged.extend(_validate_value(candidate, value, path))
        if merged:
            return merged
    one_of = spec.get("oneOf")
    if isinstance(one_of, list) and one_of:
        matches = 0
        for candidate in one_of:
            if isinstance(candidate, dict) and not _validate_value(candidate, value, path):
                matches += 1
        if matches != 1:
            return [f"{path} must match exactly one oneOf schema (matched {matches})"]
        if not type_name:
            return _validate_constraints(spec, value, path)
    if not type_name:
        if "const" in spec and value != spec["const"]:
            return [f"{path} must equal const {spec['const']!r}"]
        if isinstance(all_of, list) and all_of or _spec_has_constraints(spec):
            return _validate_constraints(spec, value, path)
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
    return _validate_constraints(spec, value, path)


def _validate_constraints(spec: dict[str, Any], value: Any, path: str) -> list[str]:
    errors: list[str] = []
    if "const" in spec and value != spec["const"]:
        errors.append(f"{path} must equal const {spec['const']!r}")
    enum = spec.get("enum")
    if isinstance(enum, list) and value not in enum:
        errors.append(f"{path} must be one of {enum!r}")
    if isinstance(value, str):
        min_len = spec.get("minLength")
        max_len = spec.get("maxLength")
        if isinstance(min_len, int) and len(value) < min_len:
            errors.append(f"{path} shorter than minLength {min_len}")
        if isinstance(max_len, int) and len(value) > max_len:
            errors.append(f"{path} longer than maxLength {max_len}")
        pattern = spec.get("pattern")
        if isinstance(pattern, str) and pattern:
            if re.fullmatch(pattern, value) is None:
                errors.append(f"{path} does not match pattern {pattern!r}")
    if isinstance(value, int) and not isinstance(value, bool):
        minimum = spec.get("minimum")
        maximum = spec.get("maximum")
        if isinstance(minimum, int) and value < minimum:
            errors.append(f"{path} below minimum {minimum}")
        if isinstance(maximum, int) and value > maximum:
            errors.append(f"{path} above maximum {maximum}")
    return errors


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
