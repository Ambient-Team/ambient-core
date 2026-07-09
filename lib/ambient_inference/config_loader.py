from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml

_CONFIG_ROOT: Path | None = None


def config_root() -> Path:
    global _CONFIG_ROOT
    if _CONFIG_ROOT is not None:
        return _CONFIG_ROOT
    env = os.environ.get("MAESTRO_CONFIG_DIR")
    if env:
        _CONFIG_ROOT = Path(env)
        return _CONFIG_ROOT
    repo_config = Path(__file__).resolve().parents[2] / "config"
    if repo_config.is_dir():
        _CONFIG_ROOT = repo_config
        return _CONFIG_ROOT
    from importlib import resources

    bundled = resources.files("ambient_inference").joinpath("default_config")
    _CONFIG_ROOT = Path(str(bundled))
    return _CONFIG_ROOT


def _load_yaml(name: str) -> dict[str, Any]:
    root = config_root()
    path = root / name
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

