"""Tests for ambient_agent YAML validation and plan-execute loop."""

from __future__ import annotations

from ambient_agent.boundaries import AgentRunContext
from ambient_agent.loop import run_plan_execute
from ambient_agent.registry import clear_extensions, register_tool
from ambient_agent.validate import main as validate_agent_config
from ambient_agent.validate import run_validation


def test_validate_agent_config_ok():
    assert validate_agent_config() == 0
    assert run_validation() == []


def test_plan_execute_auditor_skip_maestro():
    ctx = AgentRunContext(run_id="test-run-1")
    result = run_plan_execute(
        "auditor",
        "List contract health",
        ctx,
        skip_maestro=True,
    )
    assert result.profile_id == "auditor"
    assert any(obs["tool"] == "contracts_list" for obs in result.observations)
    assert "User question" in result.content or "contract" in result.content.lower()


def test_register_extension_tool():
    clear_extensions()

    def echo_tool(args, _ctx, _trace):
        return {"echo": args.get("x")}

    register_tool("platform_echo", echo_tool)
    from ambient_agent.executor import execute

    out = execute("platform_echo", {"x": 1}, AgentRunContext(run_id="r"), [])
    assert out == {"echo": 1}
    clear_extensions()
