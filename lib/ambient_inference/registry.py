from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

from ambient_inference.config_loader import load_models_config
from ambient_inference.schemas import ModelPublicView


@dataclass(frozen=True)
class ModelEntry:
    id: str
    family: str
    license: str
    capabilities: list[str]
    context_tokens: int
    backend_env: str
    backend_model: str
    cost_tier: str

    def resolve_base_url(self) -> str | None:
        return os.environ.get(self.backend_env)

    def resolve_api_key(self) -> str | None:
        key_env = f"{self.backend_env}_API_KEY"
        return os.environ.get(key_env)

    def to_public(self) -> ModelPublicView:
        return ModelPublicView(
            id=self.id,
            family=self.family,
            license=self.license,
            capabilities=list(self.capabilities),
            context_tokens=self.context_tokens,
            cost_tier=self.cost_tier,
        )


class ModelRegistry:
    def __init__(self, raw: dict[str, Any] | None = None) -> None:
        doc = raw if raw is not None else load_models_config()
        models_raw = doc.get("models", [])
        self._by_id: dict[str, ModelEntry] = {}
        for item in models_raw:
            entry = ModelEntry(
                id=item["id"],
                family=item["family"],
                license=item["license"],
                capabilities=list(item.get("capabilities", [])),
                context_tokens=int(item.get("context_tokens", 8192)),
                backend_env=item["backend_env"],
                backend_model=item.get("backend_model", item["id"]),
                cost_tier=item.get("cost_tier", "medium"),
            )
            self._by_id[entry.id] = entry

    def get(self, model_id: str) -> ModelEntry:
        if model_id not in self._by_id:
            raise KeyError(f"Unknown model id: {model_id}")
        return self._by_id[model_id]

    def list_public(self) -> list[ModelPublicView]:
        return [m.to_public() for m in self._by_id.values()]

    def ids(self) -> list[str]:
        return list(self._by_id.keys())
