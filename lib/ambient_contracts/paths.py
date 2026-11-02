"""Resolve ambient-core repository root and standard paths."""

from __future__ import annotations

import os
from pathlib import Path


def resolve_repo_root() -> Path:
    """Return the ambient-core checkout root (``AMBIENT_CORE_ROOT`` or package layout).

    Args:
        None.

    Returns:
        Path.

    Raises:
        None: This callable does not raise.

    Example:
        >>> resolve_repo_root()
    """
    env = os.environ.get("AMBIENT_CORE_ROOT")
    if env:
        return Path(env)
    return Path(__file__).resolve().parents[2]


def resolve_contracts_dir() -> Path:
    """Return ``contracts/`` from the checkout or bundled wheel copies.

    Args:
        None.

    Returns:
        Path.

    Raises:
        None: This callable does not raise.

    Example:
        >>> resolve_contracts_dir()
    """
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
    """Return ``catalog/`` containing ``manifest.json`` (env override or checkout).

    Args:
        None.

    Returns:
        Path.

    Raises:
        None: This callable does not raise.

    Example:
        >>> resolve_catalog_root()
    """
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
