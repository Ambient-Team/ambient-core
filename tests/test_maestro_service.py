from __future__ import annotations

import importlib
import sys
from pathlib import Path

import pytest

pytest.importorskip("fastapi")

_MAESTRO_DIR = Path(__file__).resolve().parents[1] / "services" / "maestro"


def _maestro_app(monkeypatch: pytest.MonkeyPatch, **env: str | None) -> object:
    for key in ("AMBIENT_MAESTRO_API_KEY", "MAESTRO_MAX_REQUEST_BODY_BYTES"):
        if key not in env:
            monkeypatch.delenv(key, raising=False)
    for key, value in env.items():
        if value is None:
            monkeypatch.delenv(key, raising=False)
        else:
            monkeypatch.setenv(key, value)

    path = str(_MAESTRO_DIR)
    if path not in sys.path:
        sys.path.insert(0, path)

    import deps
    import main

    importlib.reload(deps)
    importlib.reload(main)
    return main.app


@pytest.fixture
def open_client(monkeypatch: pytest.MonkeyPatch):
    from fastapi.testclient import TestClient

    app = _maestro_app(monkeypatch)
    with TestClient(app) as client:
        yield client


def test_health_and_ready_no_auth(open_client):
    assert open_client.get("/health").json() == {"status": "ok"}
    ready = open_client.get("/ready")
    assert ready.status_code == 200
    body = ready.json()
    assert body["status"] == "ready"
    assert "models" in body


def test_models_requires_api_key_when_configured(monkeypatch: pytest.MonkeyPatch):
    from fastapi.testclient import TestClient

    app = _maestro_app(monkeypatch, AMBIENT_MAESTRO_API_KEY="test-key")
    with TestClient(app) as client:
        assert client.get("/v1/models").status_code == 401
        assert client.get("/v1/models", headers={"X-Api-Key": "test-key"}).status_code == 200
        assert (
            client.get(
                "/v1/models",
                headers={"Authorization": "Bearer test-key"},
            ).status_code
            == 200
        )


def test_models_wrong_api_key_rejected(monkeypatch: pytest.MonkeyPatch):
    from fastapi.testclient import TestClient

    app = _maestro_app(monkeypatch, AMBIENT_MAESTRO_API_KEY="test-key")
    with TestClient(app) as client:
        assert client.get("/v1/models", headers={"X-Api-Key": "wrong"}).status_code == 401


def test_request_body_size_limit(monkeypatch: pytest.MonkeyPatch):
    from fastapi.testclient import TestClient

    app = _maestro_app(monkeypatch, MAESTRO_MAX_REQUEST_BODY_BYTES="256")
    payload = '{"mode":"single_chat","messages":[],"stream":false}'
    with TestClient(app) as client:
        ok = client.post(
            "/v1/runs",
            content=payload,
            headers={"Content-Type": "application/json"},
        )
        assert ok.status_code != 413

        blocked = client.post(
            "/v1/runs",
            content="x" * 512,
            headers={"Content-Type": "application/json"},
        )
        assert blocked.status_code == 413
