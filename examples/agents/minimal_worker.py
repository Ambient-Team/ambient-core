#!/usr/bin/env python3
"""Minimal agent worker pattern: register_tool + run_plan_execute (no live Maestro).

Run from an ambient-core clone:
  pip install -e .
  python examples/agents/minimal_worker.py

Do not run from a browser or expose Maestro keys to clients — see docs/agent-security.md.
"""

from __future__ import annotations

from typing import Any

from ambient_agent import AgentRunContext, register_tool, run_plan_execute
from ambient_agent.registry import clear_extensions


def _demo_echo(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    return {"echo": args.get("message", "")}


def main() -> int:
    # Production: register once at worker startup; use clear_extensions() only in tests.
    register_tool("demo_echo", _demo_echo)

    ctx = AgentRunContext(
        run_id="example-run-1",
        metadata={"org_id": "example-org"},
        catalog_refs=("8",),
    )
    result = run_plan_execute(
        "analyst",
        "8",
        ctx,
        skip_maestro=True,
    )
    print("profile:", result.profile_id)
    print("observation tools:", [o["tool"] for o in result.observations])
    print("synthesis preview (first 400 chars):")
    print(result.content[:400])

    clear_extensions()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
