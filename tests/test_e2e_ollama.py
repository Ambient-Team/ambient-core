from __future__ import annotations

import os

import pytest

pytestmark = pytest.mark.gpu


@pytest.mark.asyncio
async def test_council_research_live_maestro():
    base = os.environ.get("MAESTRO_E2E_URL") or os.environ.get("MAESTRO_SMOKE_URL")
    if not base:
        pytest.skip("Set MAESTRO_E2E_URL or MAESTRO_SMOKE_URL to run live Maestro E2E")

    import httpx

    api_key = os.environ.get("AMBIENT_MAESTRO_API_KEY", "dev-local-key")
    headers = {"X-Api-Key": api_key, "Content-Type": "application/json"}
    timeout = httpx.Timeout(600.0, connect=30.0)

    async with httpx.AsyncClient(base_url=base.rstrip("/"), timeout=timeout) as client:
        health = await client.get("/health")
        assert health.status_code == 200

        ready = await client.get("/ready", headers=headers)
        assert ready.status_code == 200
        ready_body = ready.json()
        assert ready_body.get("backends_configured", 0) >= 1

        response = await client.post(
            "/v1/runs",
            headers=headers,
            json={
                "mode": "council_research",
                "messages": [
                    {
                        "role": "user",
                        "content": "Briefly define NOI in commercial real estate.",
                    }
                ],
                "stream": False,
                "org_id": "pytest-e2e-org",
            },
        )
        assert response.status_code == 200, response.text
        run = response.json()
        assert run["status"] == "completed"
        assert run.get("artifact", {}).get("content")
        assert len(run.get("artifact", {}).get("provenance", [])) >= 3
