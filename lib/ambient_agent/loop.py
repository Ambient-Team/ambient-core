"""Plan-execute agent loop (v1)."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any

from ambient_agent.boundaries import AgentRunContext, InferenceClient
from ambient_agent.executor import execute
from ambient_agent.maestro_client import MaestroHttpClient
from ambient_agent.config import load_agent_profiles


@dataclass(frozen=True)
class AgentRunResult:
    profile_id: str
    run_id: str
    content: str
    observations: tuple[dict[str, Any], ...]
    maestro_record: dict[str, Any]


def _default_tool_args(tool_id: str, user_message: str) -> dict[str, Any]:
    if tool_id == "catalog_list_metrics":
        return {"limit": 25}
    if tool_id == "catalog_resolve_metric":
        return {"metric_id": user_message.strip()[:128]}
    if tool_id == "contracts_validate":
        return {}
    if tool_id == "structured_json":
        return {"text": "{}"}
    if tool_id == "run_context_append":
        return {"label": "user_question", "payload": {"text": user_message}}
    return {}


def run_plan_execute(
    profile_id: str,
    user_message: str,
    context: AgentRunContext,
    *,
    client: InferenceClient | None = None,
    skip_maestro: bool = False,
) -> AgentRunResult:
    profiles = load_agent_profiles()
    if profile_id not in profiles:
        raise KeyError(f"unknown profile: {profile_id}")
    profile = profiles[profile_id]
    trace: list[dict[str, Any]] = []
    observations: list[dict[str, Any]] = []

    for tool_id in profile.get("tool_ids") or []:
        if tool_id == "maestro_run":
            continue
        args = _default_tool_args(tool_id, user_message)
        result = execute(tool_id, args, context, trace)
        observations.append({"tool": tool_id, "result": result})

    obs_text = json.dumps(observations, indent=2, default=str)
    template = profile.get("synthesis_prompt_template", "")
    synthesis_user = template.format(observations=obs_text, user_message=user_message)

    maestro_record: dict[str, Any] = {}
    content = ""
    if skip_maestro:
        content = synthesis_user
        run_id = context.run_id
    else:
        inference = client or MaestroHttpClient()
        maestro_record = dict(
            inference.complete(
                {
                    "mode": profile.get("maestro_mode", "single_chat"),
                    "messages": [
                        {"role": "user", "content": synthesis_user},
                    ],
                    "org_id": context.metadata.get("org_id"),
                }
            )
        )
        run_id = str(maestro_record.get("run_id") or context.run_id)
        artifact = maestro_record.get("artifact") or {}
        content = str(artifact.get("content") or "")

    return AgentRunResult(
        profile_id=profile_id,
        run_id=run_id,
        content=content,
        observations=tuple(observations),
        maestro_record=maestro_record,
    )
