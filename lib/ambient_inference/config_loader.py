from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml

_CONFIG_ROOT = Path(__file__).resolve().parents[2] / "config"


def _load_yaml(name: str) -> dict[str, Any]:
    path = _CONFIG_ROOT / name
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    if not isinstance(doc, dict):
        raise ValueError(f"{name}: root must be a mapping")
    return doc


def models_file_name() -> str:
    return os.environ.get("MAESTRO_MODELS_FILE", "models.yaml")


def load_models_config() -> dict[str, Any]:
    return _load_yaml(models_file_name())


def load_routing_policies() -> dict[str, Any]:
    return _load_yaml("routing_policies.yaml")


def load_council_profiles() -> dict[str, Any]:
    return _load_yaml("council_profiles.yaml")


def config_root() -> Path:
    return _CONFIG_ROOT
