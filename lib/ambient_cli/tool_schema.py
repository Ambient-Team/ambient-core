"""Minimal JSON-Schema-style validation for integrator tool arguments."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any
from urllib.parse import urlparse

_CONSTRAINT_KEYS = (
    "enum",
    "const",
    "minLength",
    "maxLength",
    "minimum",
    "maximum",
    "pattern",
)

_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
_DATETIME_RE = re.compile(
    r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$"
)
_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
_SUPPORTED_FORMATS = frozenset({"date", "date-time", "email", "uri"})


def _spec_has_constraints(spec: dict[str, Any]) -> bool:
    return any(key in spec for key in _CONSTRAINT_KEYS) or "format" in spec


_SIMPLE_TYPES: dict[str, Any] = {
    "string": str,
    "integer": int,
    "number": (int, float),
    "boolean": bool,
    "array": list,
    "object": dict,
}


@dataclass(frozen=True)
class _SchemaContext:
    root: dict[str, Any]
    ref_stack: frozenset[str]


def _decode_json_pointer_token(token: str) -> str:
    return token.replace("~1", "/").replace("~0", "~")


def _resolve_local_ref(root: dict[str, Any], ref: str) -> dict[str, Any] | None:
    """Resolve ``#/definitions/...`` or ``#/$defs/...`` within ``root``."""
    if not ref.startswith("#/"):
        return None
    parts = ref[2:].split("/")
    if not parts or parts[0] not in ("definitions", "$defs"):
        return None
    node: Any = root
    for part in parts:
        key = _decode_json_pointer_token(part)
        if not isinstance(node, dict):
            return None
        node = node.get(key)
    if isinstance(node, dict):
        return node
    return None


def _validate_format(fmt: str, value: str, path: str) -> list[str]:
    if fmt not in _SUPPORTED_FORMATS:
        return [f"{path} unsupported format {fmt!r}"]
    if fmt == "date":
        if _DATE_RE.fullmatch(value) is None:
            return [f"{path} must be format date (YYYY-MM-DD)"]
        return []
    if fmt == "date-time":
        if _DATETIME_RE.fullmatch(value) is None:
            return [f"{path} must be format date-time (ISO-8601 subset)"]
        return []
    if fmt == "email":
        if _EMAIL_RE.fullmatch(value) is None:
            return [f"{path} must be format email"]
        return []
    parsed = urlparse(value)
    if not parsed.scheme or not (parsed.netloc or parsed.path):
        return [f"{path} must be format uri"]
    return []


def _validate_value(
    spec: dict[str, Any],
    value: Any,
    path: str,
    ctx: _SchemaContext,
) -> list[str]:
    ref = spec.get("$ref")
    if isinstance(ref, str):
        if not ref.startswith("#/"):
            return [f"{path} external or unsupported $ref {ref!r} (local #/definitions or #/$defs only)"]
        if ref in ctx.ref_stack:
            return [f"{path} cyclic $ref {ref!r}"]
        target = _resolve_local_ref(ctx.root, ref)
        if target is None:
            return [f"{path} unresolved $ref {ref!r}"]
        nested_ctx = _SchemaContext(root=ctx.root, ref_stack=ctx.ref_stack | {ref})
        return _validate_value(target, value, path, nested_ctx)

    type_name = str(spec.get("type") or "").strip()
    not_spec = spec.get("not")
    if isinstance(not_spec, dict):
        if not _validate_value(not_spec, value, path, ctx):
            return [f"{path} must not satisfy not schema"]
    all_of = spec.get("allOf")
    if isinstance(all_of, list) and all_of:
        merged: list[str] = []
        for candidate in all_of:
            if isinstance(candidate, dict):
                merged.extend(_validate_value(candidate, value, path, ctx))
        if merged:
            return merged
    any_of = spec.get("anyOf")
    if isinstance(any_of, list) and any_of:
        matches = sum(
            1
            for candidate in any_of
            if isinstance(candidate, dict) and not _validate_value(candidate, value, path, ctx)
        )
        if matches < 1:
            return [f"{path} must match at least one anyOf schema (matched {matches})"]
        if not type_name:
            return _validate_constraints(spec, value, path)
    one_of = spec.get("oneOf")
    if isinstance(one_of, list) and one_of:
        matches = 0
        for candidate in one_of:
            if isinstance(candidate, dict) and not _validate_value(candidate, value, path, ctx):
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
            schema_root=ctx.root,
            ref_stack=ctx.ref_stack,
        )
    if type_name == "array":
        if not isinstance(value, list):
            return [f"{path} expected array, got {type(value).__name__}"]
        item_spec = spec.get("items")
        if not isinstance(item_spec, dict):
            return []
        errors: list[str] = []
        for index, item in enumerate(value):
            errors.extend(_validate_value(item_spec, item, f"{path}[{index}]", ctx))
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
    if isinstance(enum, list):
        if not enum:
            errors.append(f"{path} enum must be non-empty when present")
        elif value not in enum:
            errors.append(f"{path} must be one of {enum!r}")
    if isinstance(value, str):
        fmt = spec.get("format")
        if isinstance(fmt, str) and fmt:
            errors.extend(_validate_format(fmt, value, path))
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
    schema_root: dict[str, Any] | None = None,
    ref_stack: frozenset[str] | None = None,
) -> list[str]:
    """Validate ``args`` against a JSON-Schema-style subset (types, required, object, array).

    Args:
        properties: Map of argument name to property schema (``type``, nested ``properties``).
        required: Required argument names.
        args: Caller-supplied arguments.
        path_prefix: Prefix for nested error messages.
        schema_root: Document root for local ``#/definitions`` / ``#/$defs`` ``$ref`` (optional).
        ref_stack: Active ``$ref`` pointers for cycle detection (internal).

    Returns:
        Human-readable error strings; empty when valid.

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_tool_args({"name": {"type": "string"}}, ["name"], {"name": "x"})
        []
    """
    root = schema_root if schema_root is not None else {"properties": properties}
    ctx = _SchemaContext(root=root, ref_stack=ref_stack or frozenset())
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
        errors.extend(_validate_value(spec, value, path, ctx))
    return errors


def validate_tool_schema_document(schema: dict[str, Any], args: dict[str, Any]) -> list[str]:
    """Validate ``args`` against a top-level tool schema document.

    Local ``$ref`` targets must live under ``definitions`` or ``$defs`` in the same document.

    Args:
        schema: Object with optional ``properties``, ``required``, ``definitions``, ``$defs``.
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
    return validate_tool_args(
        props,
        [str(k) for k in required],
        args,
        schema_root=schema,
    )
