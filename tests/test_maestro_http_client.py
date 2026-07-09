"""Unit tests for MaestroHttpClient (no live server)."""

from __future__ import annotations

import json

import httpx

from ambient_agent.maestro_client import MaestroHttpClient


def _patch_httpx_client(monkeypatch, transport: httpx.MockTransport) -> None:
    original = httpx.Client

    class PatchedClient(original):
        def __init__(self, *args, **kwargs):
            kwargs["transport"] = transport
            super().__init__(*args, **kwargs)

    monkeypatch.setattr(httpx, "Client", PatchedClient)


def test_maestro_http_client_posts_runs_with_org_id(monkeypatch):
    captured: dict = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["url"] = str(request.url)
        captured["headers"] = dict(request.headers)
        captured["body"] = json.loads(request.content.decode())
        return httpx.Response(
            200,
            json={
                "run_id": "run-abc",
                "artifact": {"content": "ok"},
            },
        )

    _patch_httpx_client(monkeypatch, httpx.MockTransport(handler))
    client = MaestroHttpClient(base_url="http://maestro.test", api_key="secret-key")

    out = client.complete(
        {
            "mode": "single_chat",
            "messages": [{"role": "user", "content": "hi"}],
            "org_id": "org-1",
        }
    )

    assert out["run_id"] == "run-abc"
    assert captured["url"] == "http://maestro.test/v1/runs"
    assert captured["body"]["mode"] == "single_chat"
    assert captured["body"]["messages"] == [{"role": "user", "content": "hi"}]
    assert captured["body"]["org_id"] == "org-1"
    assert captured["headers"].get("x-api-key") == "secret-key"
    auth = captured["headers"].get("authorization") or captured["headers"].get("Authorization")
    assert auth == "Bearer secret-key"


def test_maestro_http_client_without_api_key(monkeypatch):
    captured: dict = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["headers"] = {k.lower(): v for k, v in request.headers.items()}
        return httpx.Response(200, json={"run_id": "r1", "artifact": {}})

    _patch_httpx_client(monkeypatch, httpx.MockTransport(handler))
    client = MaestroHttpClient(base_url="http://127.0.0.1:9999", api_key=None)
    client.complete({"mode": "council_research", "messages": []})

    assert "x-api-key" not in captured["headers"]
    assert "authorization" not in captured["headers"]
