"""Per-instance tool registry for integrator workers (not a global singleton)."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any


@dataclass
class IntegratorToolRegistry:
    """Namespaced tool handlers for one worker process or tenant context."""

    _handlers: dict[str, Callable[..., Any]] = field(default_factory=dict)

    def register(self, name: str, handler: Callable[..., Any]) -> None:
        """Register ``handler`` under ``name`` (overwrites on duplicate).

        Args:
            name: Tool identifier.
            handler: Callable invoked by :meth:`call`.

        Returns:
            None.

        Raises:
            ValueError: When ``name`` is empty.

        Example:
            >>> registry.register("ping", lambda: "pong")
        """
        key = name.strip()
        if not key:
            raise ValueError("tool name must be non-empty")
        self._handlers[key] = handler

    def call(self, name: str, /, **kwargs: Any) -> Any:
        """Invoke a registered tool.

        Args:
            name: Registered tool identifier.
            **kwargs: Forwarded to the handler.

        Returns:
            Any: Handler return value.

        Raises:
            KeyError: When ``name`` is not registered.

        Example:
            >>> registry.call("ping")
        """
        key = name.strip()
        try:
            handler = self._handlers[key]
        except KeyError as exc:
            raise KeyError(f"unknown tool {key!r}") from exc
        return handler(**kwargs)

    def tool_ids(self) -> list[str]:
        """Registered tool names in insertion order.

        Args:
            None.

        Returns:
            list[str].

        Raises:
            None: This callable does not raise.

        Example:
            >>> registry.tool_ids()
        """
        return list(self._handlers.keys())


@dataclass
class ToolPlanProfile:
    """Reserved ``max_tool_rounds`` for future ReAct loops; v1 runs each id once."""

    tool_ids: list[str]
    max_tool_rounds: int = 1


def execute_tool_plan(
    registry: IntegratorToolRegistry,
    profile: ToolPlanProfile,
    *,
    shared_kwargs: dict[str, Any] | None = None,
) -> list[Any]:
    """Run each ``tool_ids`` entry once (v1 ignores multi-round ReAct).

    Args:
        registry: Tool registry for this worker.
        profile: Ordered tool ids and reserved round limit.
        shared_kwargs: Optional kwargs passed to every tool call.

    Returns:
        list[Any]: Results in ``tool_ids`` order.

    Raises:
        KeyError: When a tool id is not registered.

    Example:
        >>> execute_tool_plan(registry, ToolPlanProfile(tool_ids=["ping"]))
    """
    kwargs = dict(shared_kwargs or {})
    rounds = max(1, profile.max_tool_rounds)
    if rounds > 1:
        # v1: single pass only; higher limits are reserved for platform ReAct.
        rounds = 1
    results: list[Any] = []
    for _round in range(rounds):
        for tool_id in profile.tool_ids:
            results.append(registry.call(tool_id, **kwargs))
    return results
