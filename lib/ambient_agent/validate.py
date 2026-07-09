"""Validate agent tool_definitions.yaml and agent_profiles.yaml."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import yaml

from ambient_inference.config_loader import load_council_profiles

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


def run_validation() -> list[str]:
    errors: list[str] = []
    try:
        tools = load_tool_definitions()
    except (OSError, ValueError) as exc:
        return [str(exc)]
    if not tools:
        errors.append("tool_definitions.yaml: no tools defined")

    try:
        profiles = load_agent_profiles()
    except (OSError, ValueError) as exc:
        return errors + [str(exc)]
    if not profiles:
        errors.append("agent_profiles.yaml: no profiles defined")

    council = load_council_profiles().get("profiles", {})
    if not isinstance(council, dict):
        errors.append("council_profiles.yaml: profiles missing")

    for pid, profile in profiles.items():
        mode = profile.get("maestro_mode")
        if not mode:
            errors.append(f"profile {pid}: missing maestro_mode")
        elif isinstance(council, dict) and mode not in council:
            errors.append(f"profile {pid}: maestro_mode {mode!r} not in council_profiles")
        for tid in profile.get("tool_ids") or []:
            if tid not in tools:
                errors.append(f"profile {pid}: unknown tool_id {tid!r}")
        if not profile.get("synthesis_prompt_template"):
            errors.append(f"profile {pid}: missing synthesis_prompt_template")

    return errors


def main() -> int:
    errors = run_validation()
    if errors:
        for err in errors:
            print(f"ERROR: {err}", file=sys.stderr)
        return 1
    print("OK: agent tools and profiles validated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
