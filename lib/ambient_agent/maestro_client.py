"""HTTP client for Maestro /v1/runs."""

from __future__ import annotations

import os
from typing import Any, Mapping

from ambient_agent.boundaries import InferenceClient


class MaestroHttpClient(InferenceClient):
    def __init__(
        self,
        base_url: str | None = None,
        api_key: str | None = None,
    ) -> None:
        self._base = (base_url or os.environ.get("MAESTRO_URL") or "http://127.0.0.1:8088").rstrip(
            "/"
        )
        self._api_key = api_key or os.environ.get("AMBIENT_MAESTRO_API_KEY")

    def complete(self, request: Mapping[str, Any]) -> Mapping[str, Any]:
        try:
            import httpx
        except ImportError as exc:
            raise RuntimeError("httpx required — pip install ambient-core[inference]") from exc

        headers: dict[str, str] = {}
        if self._api_key:
            headers["X-Api-Key"] = self._api_key
            headers["Authorization"] = f"Bearer {self._api_key}"

        payload = {
            "mode": request.get("mode", "single_chat"),
            "messages": request.get("messages", []),
            "stream": False,
        }
        org_id = request.get("org_id")
        if org_id:
            payload["org_id"] = org_id

        with httpx.Client(timeout=120.0) as client:
            resp = client.post(f"{self._base}/v1/runs", json=payload, headers=headers)
            resp.raise_for_status()
            return resp.json()
