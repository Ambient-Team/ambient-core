"""Validate open-weight model registry and council YAML (shared by CLI and console script)."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

from ambient_inference.config_loader import config_root

FORBIDDEN_PROVIDER_KEYS = frozenset({"openai", "anthropic", "google", "gemini"})
ALLOWED_FAMILIES = frozenset(
    {
        "qwen",
        "deepseek",
        "llama",
        "gemma",
        "mistral",
        "mixtral",
        "phi",
        "granite",
        "yi",
    }
)


def _load(name: str, config: Path) -> dict:
    path = config / name
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    if not isinstance(doc, dict):
        raise ValueError(f"{name}: root must be a mapping")
    return doc


def validate_models(config: Path) -> list[str]:
    errors: list[str] = []
    doc = _load("models.yaml", config)
    if "provider" in doc:
        for key in FORBIDDEN_PROVIDER_KEYS:
            if key in str(doc).lower():
                errors.append("models.yaml: proprietary provider reference detected")
    models = doc.get("models", [])
    if not models:
        errors.append("models.yaml: models list is empty")
    ids: set[str] = set()
    for item in models:
        if not isinstance(item, dict):
            errors.append("models.yaml: each model must be a mapping")
            continue
        mid = item.get("id")
        if not mid:
            errors.append("models.yaml: model missing id")
            continue
        if mid in ids:
            errors.append(f"models.yaml: duplicate id {mid}")
        ids.add(mid)
        family = item.get("family", "")
        if family not in ALLOWED_FAMILIES:
            errors.append(f"models.yaml: model {mid} has non-allowlisted family {family!r}")
        if "backend_env" not in item:
            errors.append(f"models.yaml: model {mid} missing backend_env")
        for forbidden in FORBIDDEN_PROVIDER_KEYS:
            if forbidden in str(item.get("backend_env", "")).lower():
                errors.append(f"models.yaml: model {mid} backend_env looks proprietary")
    return errors


def validate_policies(config: Path, registry_ids: set[str]) -> list[str]:
    errors: list[str] = []
    doc = _load("routing_policies.yaml", config)
    classifier = doc.get("classifier_model_id")
    if classifier and classifier not in registry_ids:
        errors.append(f"routing_policies.yaml: classifier_model_id {classifier!r} not in registry")
    policies = doc.get("policies", {})
    for name, policy in policies.items():
        if not isinstance(policy, dict):
            continue
        for key in ("draft_model_ids", "fallback_chain"):
            for mid in policy.get(key, []) or []:
                if mid not in registry_ids:
                    errors.append(f"routing_policies.yaml: policy {name} references unknown model {mid!r}")
        for key in ("primary_model_id", "synthesizer_model_id"):
            mid = policy.get(key)
            if mid and mid not in registry_ids:
                errors.append(f"routing_policies.yaml: policy {name} references unknown model {mid!r}")
    return errors


def validate_profiles(config: Path) -> list[str]:
    errors: list[str] = []
    doc = _load("council_profiles.yaml", config)
    profiles = doc.get("profiles", {})
    if not profiles:
        errors.append("council_profiles.yaml: profiles is empty")
    for name, profile in profiles.items():
        if not isinstance(profile, dict):
            errors.append(f"council_profiles.yaml: profile {name} must be a mapping")
            continue
        if "strategy" not in profile:
            errors.append(f"council_profiles.yaml: profile {name} missing strategy")
    return errors


def run_validation(config: Path | None = None) -> list[str]:
    config = config or config_root()
    if not config.is_dir():
        return [f"inference config not found at {config}"]
    errors = validate_models(config)
    doc = _load("models.yaml", config)
    registry_ids = {m["id"] for m in doc.get("models", []) if isinstance(m, dict) and "id" in m}
    errors.extend(validate_policies(config, registry_ids))
    errors.extend(validate_profiles(config))
    return errors


def main() -> int:
    errors = run_validation()
    if errors:
        for err in errors:
            print(f"ERROR: {err}", file=sys.stderr)
        return 1
    print("OK: inference registry and policies validated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
