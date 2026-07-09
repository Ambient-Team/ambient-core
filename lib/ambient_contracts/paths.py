"""Resolve ambient-core repository root and standard paths."""

from __future__ import annotations

import os
from pathlib import Path


def resolve_repo_root() -> Path:
    env = os.environ.get("AMBIENT_CORE_ROOT")
    if env:
        return Path(env)
    return Path(__file__).resolve().parents[2]


def resolve_contracts_dir() -> Path:
    env = os.environ.get("AMBIENT_CONTRACTS_DIR")
    if env:
        return Path(env)
    repo = resolve_repo_root()
    checkout = repo / "contracts"
    if checkout.is_dir():
        return checkout
    from importlib import resources

    return Path(str(resources.files("ambient_contracts").joinpath("bundled")))


def resolve_catalog_root() -> Path:
    env = os.environ.get("AMBIENT_CATALOG_DIR")
    if env:
        return Path(env)
    repo = resolve_repo_root()
    catalog = repo / "catalog"
    if (catalog / "manifest.json").is_file():
        return catalog
    raise FileNotFoundError(
        "catalog/manifest.json not found — set AMBIENT_CATALOG_DIR or run from ambient-core checkout"
    )
