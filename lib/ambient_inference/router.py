from __future__ import annotations

import json
import re
from typing import Any

from ambient_inference.config_loader import load_council_profiles, load_routing_policies
from ambient_inference.gateway import ModelGateway
from ambient_inference.registry import ModelRegistry
from ambient_inference.schemas import (
    ChatMessage,
    ClassifierResult,
    CreateRunRequest,
    RoutingPlan,
)

_COST_ORDER = {"low": 0, "medium": 1, "high": 2}

_CLASSIFIER_PROMPT = """Classify the user request. Reply with JSON only:
{"task_type": "research_qa"|"general_chat", "complexity": "low"|"medium"|"high", "needs_reasoning": boolean, "needs_long_context": boolean}
Use research_qa for analytical, multi-source, or deep explanation questions."""


class Router:
    def __init__(
        self,
        registry: ModelRegistry,
        gateway: ModelGateway,
        *,
        policies: dict[str, Any] | None = None,
        profiles: dict[str, Any] | None = None,
        use_classifier: bool = True,
    ) -> None:
        self._registry = registry
        self._gateway = gateway
        self._policies = policies if policies is not None else load_routing_policies()
        self._profiles = profiles if profiles is not None else load_council_profiles()
        self._use_classifier = use_classifier

    async def plan(self, request: CreateRunRequest) -> RoutingPlan:
        profile = self._profiles.get("profiles", {}).get(request.mode)
        if not profile:
            raise ValueError(f"Unknown mode: {request.mode}")

        strategy = profile["strategy"]
        default_task = profile.get("task_type", self._policies.get("defaults", {}).get("task_type", "general_chat"))
        task_type = default_task
        classifier_used = False

        if self._use_classifier and request.messages:
            classified = await self._classify(request.messages)
            if classified:
                task_type = classified.task_type
                classifier_used = True

        policy = self._policies.get("policies", {}).get(task_type) or self._policies.get("policies", {}).get(
            "general_chat", {}
        )
        max_tier = None
        if request.constraints and request.constraints.max_cost_tier:
            max_tier = request.constraints.max_cost_tier

        draft_ids = list(policy.get("draft_model_ids", []))
        synthesizer_id = policy.get("synthesizer_model_id")
        primary_id = policy.get("primary_model_id")
        fallback = list(policy.get("fallback_chain", []))

        if max_tier:
            draft_ids = [m for m in draft_ids if self._within_tier(m, max_tier)]
            if synthesizer_id and not self._within_tier(synthesizer_id, max_tier):
                synthesizer_id = draft_ids[0] if draft_ids else primary_id
            if primary_id and not self._within_tier(primary_id, max_tier):
                primary_id = fallback[0] if fallback else None
            fallback = [m for m in fallback if self._within_tier(m, max_tier)]

        return RoutingPlan(
            mode=request.mode,
            task_type=task_type,
            strategy=strategy,
            draft_model_ids=draft_ids,
            synthesizer_model_id=synthesizer_id,
            primary_model_id=primary_id,
            fallback_chain=fallback,
            classifier_used=classifier_used,
        )

    def _within_tier(self, model_id: str, max_tier: str) -> bool:
        try:
            entry = self._registry.get(model_id)
        except KeyError:
            return False
        return _COST_ORDER.get(entry.cost_tier, 99) <= _COST_ORDER.get(max_tier, 99)

    async def _classify(self, messages: list[ChatMessage]) -> ClassifierResult | None:
        classifier_id = self._policies.get("classifier_model_id")
        if not classifier_id:
            return None
        user_text = "\n".join(m.content for m in messages if m.role.value == "user")
        if not user_text.strip():
            return None
        prompt = [
            ChatMessage(role="system", content=_CLASSIFIER_PROMPT),
            ChatMessage(role="user", content=user_text[:8000]),
        ]
        try:
            result = await self._gateway.complete(
                classifier_id,
                prompt,
                step="classifier",
                json_mode=True,
                fallback_chain=[],
            )
            return self._parse_classifier(result.content)
        except Exception:
            return None

    def _parse_classifier(self, raw: str) -> ClassifierResult | None:
        text = raw.strip()
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            text = match.group(0)
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            return None
        task_type = data.get("task_type", "general_chat")
        if task_type not in ("research_qa", "general_chat"):
            task_type = "general_chat"
        complexity = data.get("complexity", "medium")
        if complexity not in ("low", "medium", "high"):
            complexity = "medium"
        return ClassifierResult(
            task_type=task_type,
            complexity=complexity,
            needs_reasoning=bool(data.get("needs_reasoning")),
            needs_long_context=bool(data.get("needs_long_context")),
        )
