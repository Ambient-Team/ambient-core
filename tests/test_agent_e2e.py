from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any, Mapping

import pytest

from ambient_agent.boundaries import AgentRunContext
from ambient_agent.loop import run_plan_execute


@dataclass(frozen=True)
class _MaestroE2EClient:
    """Test-only Maestro client with configurable HTTP timeout."""

    base_url: str
    api_key: str
    timeout_seconds: float

    def complete(self, request: Mapping[str, Any]) -> Mapping[str, Any]:
        import httpx

        headers: dict[str, str] = {"Content-Type": "application/json"}
        if self.api_key:
            headers["X-Api-Key"] = self.api_key
            headers["Authorization"] = f"Bearer {self.api_key}"

        payload: dict[str, Any] = {
            "mode": request.get("mode", "single_chat"),
            "messages": request.get("messages", []),
            "stream": False,
        }
        org_id = request.get("org_id")
        if org_id:
            payload["org_id"] = org_id

        timeout = httpx.Timeout(self.timeout_seconds, connect=30.0)
        with httpx.Client(timeout=timeout) as client:
            resp = client.post(
                f"{self.base_url.rstrip('/')}/v1/runs",
                json=payload,
                headers=headers,
            )
            resp.raise_for_status()
            return resp.json()


def _maestro_e2e_config() -> tuple[str, str]:
    base = os.environ.get("MAESTRO_E2E_URL", "http://127.0.0.1:8088").rstrip("/")
    api_key = os.environ.get("AMBIENT_MAESTRO_API_KEY", "dev-local-key")
    return base, api_key


def _skip_unless_maestro_ready() -> tuple[str, str]:
    pytest.importorskip("httpx")
    import httpx

    base, api_key = _maestro_e2e_config()
    headers = {"X-Api-Key": api_key, "Content-Type": "application/json"}
    timeout = httpx.Timeout(30.0, connect=10.0)

    try:
        with httpx.Client(timeout=timeout) as client:
            health = client.get(f"{base}/health")
            if health.status_code != 200:
                pytest.skip(f"Maestro /health returned {health.status_code} at {base}")

            ready = client.get(f"{base}/ready", headers=headers)
            if ready.status_code != 200:
                pytest.skip(f"Maestro /ready returned {ready.status_code} at {base}")

            ready_body = ready.json()
            if ready_body.get("backends_configured", 0) < 1:
                pytest.skip("Maestro has no inference backends configured")
    except httpx.ConnectError:
        pytest.skip(f"Maestro not reachable at {base}")
    except httpx.TimeoutException:
        pytest.skip(f"Maestro timed out at {base}")

    return base, api_key


@pytest.mark.agent_e2e
def test_run_plan_execute_auditor_live_maestro():
    base, api_key = _skip_unless_maestro_ready()
    ctx = AgentRunContext(
        run_id="pytest-agent-e2e-auditor",
        metadata={"org_id": "pytest-agent-e2e-org"},
    )
    client = _MaestroE2EClient(base_url=base, api_key=api_key, timeout_seconds=120.0)
    result = run_plan_execute(
        "auditor",
        "List contract health",
        ctx,
        client=client,
    )

    assert result.profile_id == "auditor"
    tool_ids = {obs["tool"] for obs in result.observations}
    assert "contracts_list" in tool_ids
    assert "contracts_validate" in tool_ids
    assert result.maestro_record.get("status") == "completed"
    assert result.content.strip()


@pytest.mark.agent_e2e
def test_run_plan_execute_researcher_live_maestro():
    base, api_key = _skip_unless_maestro_ready()
    ctx = AgentRunContext(
        run_id="pytest-agent-e2e-researcher",
        metadata={"org_id": "pytest-agent-e2e-org"},
    )
    client = _MaestroE2EClient(base_url=base, api_key=api_key, timeout_seconds=600.0)
    result = run_plan_execute(
        "researcher",
        "What catalog metrics are available?",
        ctx,
        client=client,
    )

    assert result.profile_id == "researcher"
    tool_ids = {obs["tool"] for obs in result.observations}
    assert tool_ids & {"catalog_list_metrics", "contracts_list", "catalog_resolve_metric"}
    assert result.maestro_record.get("status") == "completed"
    assert result.content.strip()
