"""Execute agent tools (core builtins + registered extensions)."""

from __future__ import annotations

from typing import Any

from ambient_agent.boundaries import AgentRunContext
from ambient_agent.registry import get_extension
from ambient_agent.tools import BUILTIN_HANDLERS
from ambient_agent.arg_validate import validate_builtin_tool_args


def execute(
    tool_id: str,
    args: dict[str, Any],
    context: AgentRunContext,
    trace: list[dict[str, Any]],
) -> Any:
    if tool_id == "maestro_run":
        raise ValueError("maestro_run is handled by the agent loop, not execute()")
    handler = BUILTIN_HANDLERS.get(tool_id) or get_extension(tool_id)
    if handler is None:
        raise KeyError(f"unknown tool: {tool_id}")
    if tool_id in BUILTIN_HANDLERS:
        args = validate_builtin_tool_args(tool_id, args)
    return handler(args, context, trace)
