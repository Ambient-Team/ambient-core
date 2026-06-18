from __future__ import annotations

import json
import time
from collections.abc import AsyncIterator, Callable
from dataclasses import dataclass
from typing import Any

import httpx

from ambient_inference.registry import ModelEntry, ModelRegistry
from ambient_inference.schemas import ChatMessage, ModelProvenance


class GatewayError(Exception):
    def __init__(self, message: str, *, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code


@dataclass
class CompletionResult:
    content: str
    provenance: ModelProvenance


class ModelGateway:
  def __init__(
      self,
      registry: ModelRegistry,
      *,
      timeout_s: float = 120.0,
      client: httpx.AsyncClient | None = None,
  ) -> None:
      self._registry = registry
      self._timeout = timeout_s
      self._client = client
      self._owns_client = client is None

  async def _get_client(self) -> httpx.AsyncClient:
      if self._client is None:
          self._client = httpx.AsyncClient(timeout=self._timeout)
      return self._client

  async def aclose(self) -> None:
      if self._owns_client and self._client is not None:
          await self._client.aclose()
          self._client = None

  def _messages_payload(self, messages: list[ChatMessage]) -> list[dict[str, str]]:
      return [{"role": m.role.value, "content": m.content} for m in messages]

  async def complete(
      self,
      model_id: str,
      messages: list[ChatMessage],
      *,
      step: str,
      draft_id: str | None = None,
      json_mode: bool = False,
      fallback_chain: list[str] | None = None,
  ) -> CompletionResult:
      chain = [model_id] + [m for m in (fallback_chain or []) if m != model_id]
      last_err: Exception | None = None
      for mid in chain:
          try:
              return await self._complete_one(mid, messages, step=step, draft_id=draft_id, json_mode=json_mode)
          except GatewayError as exc:
              last_err = exc
              if exc.status_code and exc.status_code < 500 and exc.status_code != 429:
                  raise
      if last_err:
          raise last_err
      raise GatewayError("No models in fallback chain")

  async def _complete_one(
      self,
      model_id: str,
      messages: list[ChatMessage],
      *,
      step: str,
      draft_id: str | None,
      json_mode: bool,
  ) -> CompletionResult:
      entry = self._registry.get(model_id)
      base = entry.resolve_base_url()
      if not base:
          raise GatewayError(
              f"Backend URL not configured (set {entry.backend_env})",
              status_code=None,
          )
      url = base.rstrip("/") + "/v1/chat/completions"
      headers: dict[str, str] = {"Content-Type": "application/json"}
      api_key = entry.resolve_api_key()
      if api_key:
          headers["Authorization"] = f"Bearer {api_key}"

      body: dict[str, Any] = {
          "model": entry.backend_model,
          "messages": self._messages_payload(messages),
          "stream": False,
      }
      if json_mode:
          body["response_format"] = {"type": "json_object"}

      client = await self._get_client()
      started = time.perf_counter()
      response = await client.post(url, headers=headers, json=body)
      latency_ms = (time.perf_counter() - started) * 1000

      if response.status_code >= 400:
          raise GatewayError(
              f"Backend {model_id} returned {response.status_code}",
              status_code=response.status_code,
          )

      data = response.json()
      choice = data["choices"][0]["message"]["content"]
      usage = data.get("usage") or {}
      prov = ModelProvenance(
          model_id=model_id,
          step=step,
          latency_ms=latency_ms,
          prompt_tokens=usage.get("prompt_tokens"),
          completion_tokens=usage.get("completion_tokens"),
          draft_id=draft_id,
      )
      return CompletionResult(content=choice or "", provenance=prov)

  async def stream(
      self,
      model_id: str,
      messages: list[ChatMessage],
      *,
      step: str,
      on_token: Callable[[str], None] | None = None,
  ) -> AsyncIterator[str]:
      entry = self._registry.get(model_id)
      base = entry.resolve_base_url()
      if not base:
          raise GatewayError(f"Backend URL not configured (set {entry.backend_env})")
      url = base.rstrip("/") + "/v1/chat/completions"
      headers: dict[str, str] = {"Content-Type": "application/json"}
      api_key = entry.resolve_api_key()
      if api_key:
          headers["Authorization"] = f"Bearer {api_key}"

      body = {
          "model": entry.backend_model,
          "messages": self._messages_payload(messages),
          "stream": True,
      }
      client = await self._get_client()
      async with client.stream("POST", url, headers=headers, json=body) as response:
          if response.status_code >= 400:
              raise GatewayError(
                  f"Backend {model_id} returned {response.status_code}",
                  status_code=response.status_code,
              )
          async for line in response.aiter_lines():
              if not line or not line.startswith("data: "):
                  continue
              chunk = line[6:].strip()
              if chunk == "[DONE]":
                  break
              try:
                  parsed = json.loads(chunk)
              except json.JSONDecodeError:
                  continue
              delta = parsed.get("choices", [{}])[0].get("delta", {}).get("content")
              if delta:
                  if on_token:
                      on_token(delta)
                  yield delta
