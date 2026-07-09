"""Load agent tool_definitions.yaml and agent_profiles.yaml."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

_PKG = Path(__file__).resolve().parent


def _load_agent_yaml(name: str) -> dict[str, Any]:
    path = _PKG / name
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    if not isinstance(doc, dict):
        raise ValueError(f"{name}: root must be a mapping")
    return doc


def load_tool_definitions() -> dict[str, dict[str, Any]]:
    doc = _load_agent_yaml("tool_definitions.yaml")
    tools = doc.get("tools", [])
    out: dict[str, dict[str, Any]] = {}
    for item in tools:
        if not isinstance(item, dict) or "id" not in item:
            continue
        tid = str(item["id"])
        if tid in out:
            raise ValueError(f"duplicate tool id: {tid}")
        out[tid] = item
    return out


def load_agent_profiles() -> dict[str, dict[str, Any]]:
    doc = _load_agent_yaml("agent_profiles.yaml")
    profiles = doc.get("profiles", {})
    if not isinstance(profiles, dict):
        raise ValueError("agent_profiles.yaml: profiles must be a mapping")
    return {str(k): v for k, v in profiles.items() if isinstance(v, dict)}
