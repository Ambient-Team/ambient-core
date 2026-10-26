"""Linear in-process integrator tool plans (not a hosted agent runtime).

Platform workers own HTTP, auth, and multi-round ReAct loops. This module only
sequences validated builtin (or custom) tool calls on an :class:`IntegratorToolRegistry`.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from ambient_cli.integrator_tools import call_integrator_tool
from ambient_cli.tool_registry import IntegratorToolRegistry


@dataclass
class IntegratorPlanStep:
    """One tool invocation in a linear plan."""

    tool_id: str
    args: dict[str, Any] = field(default_factory=dict)


def run_integrator_plan(
    registry: IntegratorToolRegistry,
    steps: list[IntegratorPlanStep],
) -> list[Any]:
    """Run ``steps`` in order, validating builtin schemas when registered.

    Args:
        registry: Per-worker tool registry (builtins via ``register_integrator_builtin_tools``).
        steps: Ordered tool ids and per-step argument dicts.

    Returns:
        list[Any]: Handler results in step order.

    Raises:
        ValueError: When builtin schema validation fails for a step.
        KeyError: When a tool id is not registered.

    Example:
        >>> from ambient_cli.integrator_tools import register_integrator_builtin_tools
        >>> reg = IntegratorToolRegistry()
        >>> register_integrator_builtin_tools(reg)
        >>> run_integrator_plan(
        ...     reg,
        ...     [IntegratorPlanStep("catalog_manifest_summary")],
        ... )[0]["metric_count"] > 0
    """
    results: list[Any] = []
    for step in steps:
        tool_id = step.tool_id.strip()
        if not tool_id:
            raise ValueError("IntegratorPlanStep.tool_id must be non-empty")
        results.append(call_integrator_tool(registry, tool_id, dict(step.args)))
    return results
