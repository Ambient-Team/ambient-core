"""Tests for ambient_cli.integrator_plan_runner."""

from __future__ import annotations

import pytest

from ambient_cli.integrator_plan_runner import IntegratorPlanStep, run_integrator_plan
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
    assert int(results[0]["metric_count"]) > 0
    assert "finance-banking-v1.yaml" in results[1]


def test_run_integrator_plan_validates_per_step_args() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    with pytest.raises(ValueError, match="metric_id"):
        run_integrator_plan(
            registry,
            [IntegratorPlanStep("catalog_resolve_metric", {})],
        )


def test_run_integrator_plan_rejects_empty_tool_id() -> None:
    registry = IntegratorToolRegistry()
    with pytest.raises(ValueError, match="tool_id"):
        run_integrator_plan(registry, [IntegratorPlanStep("  ")])
