"""Validate agent tool_definitions.yaml and agent_profiles.yaml."""

from __future__ import annotations

import sys

from ambient_agent.config import load_agent_profiles, load_tool_definitions


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

    from ambient_inference.config_loader import load_council_profiles

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
