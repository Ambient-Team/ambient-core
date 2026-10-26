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
    merge_from_step: int | None = None
    arg_from_prior: dict[str, tuple[int, str]] = field(default_factory=dict)


@dataclass
class IntegratorPlanStepResult:
    """Outcome of one plan step (success or collected failure)."""

    index: int
    tool_id: str
    ok: bool
    result: Any = None
    error: str | None = None


class IntegratorPlanExecutionError(Exception):
    """Raised when ``stop_on_error`` is true and a step fails."""

    def __init__(self, step_index: int, tool_id: str, message: str) -> None:
        """Attach failing step metadata to the exception message.

        Args:
            step_index: Zero-based index in the plan.
            tool_id: Tool name that failed.
            message: Underlying error text.

        Returns:
            None.

        Raises:
            None: This callable does not raise.

        Example:
            >>> IntegratorPlanExecutionError(0, "ping", "boom")
        """
        self.step_index = step_index
        self.tool_id = tool_id
        super().__init__(f"step {step_index} ({tool_id}): {message}")


def resolve_step_arguments(
    step: IntegratorPlanStep,
    prior: list[IntegratorPlanStepResult],
) -> dict[str, Any]:
    """Build kwargs for a step, optionally pulling fields from earlier results.

    Args:
        step: Plan step definition.
        prior: Results from earlier steps in the same plan run.

    Returns:
        dict[str, Any]: Merged arguments for :func:`call_integrator_tool`.

    Raises:
        ValueError: When merge indices are invalid or prior steps failed.

    Example:
        >>> resolve_step_arguments(IntegratorPlanStep("t", {"x": 1}), [])
        {'x': 1}
    """
    args = dict(step.args)
    if step.merge_from_step is not None:
        idx = step.merge_from_step
        if idx < 0 or idx >= len(prior):
            raise ValueError(f"merge_from_step {idx} out of range (have {len(prior)} prior step(s))")
        prev = prior[idx]
        if not prev.ok:
            raise ValueError(f"cannot merge from failed step {idx} ({prev.tool_id!r})")
        if not isinstance(prev.result, dict):
            raise ValueError(f"step {idx} result must be a dict to merge, got {type(prev.result).__name__}")
        merged = dict(prev.result)
        merged.update(args)
        args = merged
    for arg_name, (src_index, result_key) in step.arg_from_prior.items():
        if src_index < 0 or src_index >= len(prior):
            raise ValueError(
                f"arg_from_prior {arg_name!r} references step {src_index} "
                f"out of range (have {len(prior)} prior step(s))"
            )
        src = prior[src_index]
        if not src.ok:
            raise ValueError(f"cannot read {arg_name!r} from failed step {src_index}")
        if not isinstance(src.result, dict):
            raise ValueError(f"step {src_index} result must be a dict for arg_from_prior")
        if result_key not in src.result:
            raise ValueError(f"step {src_index} result has no key {result_key!r}")
        args[arg_name] = src.result[result_key]
    return args


def run_integrator_plan(
    registry: IntegratorToolRegistry,
    steps: list[IntegratorPlanStep],
    *,
    stop_on_error: bool = True,
) -> list[IntegratorPlanStepResult]:
    """Run ``steps`` in order with optional prior-step argument wiring.

    Args:
        registry: Per-worker tool registry (builtins via ``register_integrator_builtin_tools``).
        steps: Ordered tool ids and per-step argument dicts.
        stop_on_error: When true, raise :class:`IntegratorPlanExecutionError` on the first failure.

    Returns:
        list[IntegratorPlanStepResult]: Per-step outcomes (full list when ``stop_on_error`` is false).

    Raises:
        IntegratorPlanExecutionError: When ``stop_on_error`` and a step fails.
        ValueError: When a step has an empty tool id or argument resolution fails.
        KeyError: When a tool id is not registered (only when ``stop_on_error`` is true).

    Example:
        >>> from ambient_cli.integrator_tools import register_integrator_builtin_tools
        >>> reg = IntegratorToolRegistry()
        >>> register_integrator_builtin_tools(reg)
        >>> out = run_integrator_plan(
        ...     reg,
        ...     [IntegratorPlanStep("catalog_manifest_summary")],
        ... )
        >>> out[0].ok and int(out[0].result["metric_count"]) > 0
    """
    results: list[IntegratorPlanStepResult] = []
    for index, step in enumerate(steps):
        tool_id = step.tool_id.strip()
        if not tool_id:
            raise ValueError("IntegratorPlanStep.tool_id must be non-empty")
        try:
            payload = resolve_step_arguments(step, results)
            value = call_integrator_tool(registry, tool_id, payload)
            results.append(
                IntegratorPlanStepResult(index=index, tool_id=tool_id, ok=True, result=value)
            )
        except (ValueError, KeyError) as exc:
            message = str(exc)
            results.append(
                IntegratorPlanStepResult(
                    index=index,
                    tool_id=tool_id,
                    ok=False,
                    error=message,
                )
            )
            if stop_on_error:
                raise IntegratorPlanExecutionError(index, tool_id, message) from exc
    return results
