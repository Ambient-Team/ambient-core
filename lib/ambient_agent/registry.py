"""Runtime registration of platform-specific agent tools."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from ambient_agent.boundaries import AgentRunContext

ToolHandler = Callable[[dict[str, Any], AgentRunContext, list[dict[str, Any]]], Any]

_REGISTRY: dict[str, ToolHandler] = {}


def register_tool(tool_id: str, handler: ToolHandler) -> None:
    if tool_id in _REGISTRY:
        raise ValueError(f"tool already registered: {tool_id}")
    _REGISTRY[tool_id] = handler


def get_extension(tool_id: str) -> ToolHandler | None:
    return _REGISTRY.get(tool_id)


def clear_extensions() -> None:
    _REGISTRY.clear()
