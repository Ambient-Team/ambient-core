"""Validate builtin tool arguments against tool_definitions.yaml."""

from __future__ import annotations

from typing import Any

from ambient_agent.config import load_tool_definitions


def validate_builtin_tool_args(tool_id: str, args: dict[str, Any]) -> dict[str, Any]:
    """
    Check required parameters and types for core builtins.

    Returns a shallow copy of args (values unchanged). Extra keys are allowed.
    """
    if not isinstance(args, dict):
        raise ValueError("args must be a dict")

    specs = load_tool_definitions().get(tool_id)
    if specs is None:
        return dict(args)

    parameters = specs.get("parameters") or {}
    if not isinstance(parameters, dict):
        return dict(args)

    out = dict(args)
    for name, spec in parameters.items():
        if not isinstance(spec, dict):
            continue
        required = bool(spec.get("required"))
        if name not in out:
            if required:
                raise ValueError(f"{tool_id}: missing required argument {name!r}")
            continue
        value = out[name]
        if value is None and not required:
            continue
        param_type = spec.get("type")
        if param_type == "string" and not isinstance(value, str):
            raise ValueError(f"{tool_id}: {name!r} must be a string")
        if param_type == "integer":
            if isinstance(value, bool) or not isinstance(value, int):
                if isinstance(value, str) and value.isdigit():
                    out[name] = int(value)
                else:
                    try:
                        out[name] = int(value)
                    except (TypeError, ValueError) as exc:
                        raise ValueError(f"{tool_id}: {name!r} must be an integer") from exc
        if param_type == "object" and not isinstance(value, dict):
            raise ValueError(f"{tool_id}: {name!r} must be an object")
        if param_type == "array" and not isinstance(value, list):
            raise ValueError(f"{tool_id}: {name!r} must be an array")

    return out
