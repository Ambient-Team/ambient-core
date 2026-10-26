"""Tests for ambient_cli.integrator_plan_runner."""

from __future__ import annotations

import pytest

from ambient_cli.integrator_plan_runner import (
    IntegratorPlanExecutionError,
    IntegratorPlanStep,
    IntegratorPlanStepResult,
    resolve_step_arguments,
    run_integrator_plan,
)
from ambient_cli.integrator_tools import register_integrator_builtin_tools
from ambient_cli.tool_registry import IntegratorToolRegistry


def test_run_integrator_plan_builtin_sequence() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    results = run_integrator_plan(
        registry,
        [
            IntegratorPlanStep("catalog_manifest_summary"),
            IntegratorPlanStep("contracts_list_files"),
        ],
    )
    assert len(results) == 2
    assert results[0].ok
    assert int(results[0].result["metric_count"]) > 0
    assert results[1].ok
    assert "finance-banking-v1.yaml" in results[1].result


def test_run_integrator_plan_validates_per_step_args() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    with pytest.raises(IntegratorPlanExecutionError, match="metric_id"):
        run_integrator_plan(
            registry,
            [IntegratorPlanStep("catalog_resolve_metric", {})],
        )


def test_run_integrator_plan_rejects_empty_tool_id() -> None:
    registry = IntegratorToolRegistry()
    with pytest.raises(ValueError, match="tool_id"):
        run_integrator_plan(registry, [IntegratorPlanStep("  ")])


def test_run_integrator_plan_collect_errors_when_stop_on_error_false() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    results = run_integrator_plan(
        registry,
        [
            IntegratorPlanStep("catalog_manifest_summary"),
            IntegratorPlanStep("catalog_resolve_metric", {}),
            IntegratorPlanStep("contracts_list_files"),
        ],
        stop_on_error=False,
    )
    assert len(results) == 3
    assert results[0].ok
    assert not results[1].ok
    assert results[1].error
    assert results[2].ok


def test_resolve_step_arguments_arg_from_prior() -> None:
    prior = [
        IntegratorPlanStepResult(
            0,
            "catalog_resolve_metric",
            True,
            {"id": 926, "name": "Current Ratio"},
        )
    ]
    step = IntegratorPlanStep(
        "other",
        {},
        arg_from_prior={"metric_id": (0, "id")},
    )
    args = resolve_step_arguments(step, prior)
    assert args == {"metric_id": 926}


def test_run_integrator_plan_merge_from_step() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)

    def echo(**kwargs: object) -> dict[str, object]:
        return dict(kwargs)

    registry.register("echo", echo)
    results = run_integrator_plan(
        registry,
        [
            IntegratorPlanStep("catalog_manifest_summary"),
            IntegratorPlanStep("echo", {"extra": "tag"}, merge_from_step=0),
        ],
    )
    assert results[1].ok
    merged = results[1].result
    assert merged["extra"] == "tag"
    assert int(merged["metric_count"]) > 0
