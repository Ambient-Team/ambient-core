"""Resolve medallion layer paths on the local filesystem."""

from __future__ import annotations

from pathlib import Path

VALID_BACKENDS = frozenset({"local"})
VALID_LAYERS = frozenset({"bronze", "silver", "gold", "landing"})


def default_base_path(backend: str, env: str) -> str:
    """Default root path for the local storage backend.

    Args:
        backend: str.
        env: str.

    Returns:
        str.

    Raises:
        ValueError: When ``backend`` is not ``local``.

    Example:
        >>> default_base_path("local", "dev")
    """
    backend = backend.strip().lower()
    if backend == "local":
        return str((Path.cwd() / ".lakehouse" / env).resolve())
    expected = sorted(VALID_BACKENDS)
    raise ValueError(f"Unknown storage_backend: {backend!r}. Expected one of {expected}")


def resolve_layer_base(
    backend: str,
    base_path: str | None,
    env: str,
    layer: str,
) -> str:
    """Return the base path for a medallion layer (bronze, silver, gold, landing).

    Args:
        backend: str.
        base_path: str | None.
        env: str.
        layer: str.

    Returns:
        str.

    Raises:
        ValueError: When ``layer`` or ``backend`` is unknown.

    Example:
        >>> resolve_layer_base("local", "/tmp/lake", "dev", "bronze")
    """
    layer = layer.strip().lower()
    if layer not in VALID_LAYERS:
        raise ValueError(f"Unknown layer: {layer!r}. Expected one of {sorted(VALID_LAYERS)}")

    backend = backend.strip().lower()
    if backend not in VALID_BACKENDS:
        expected = sorted(VALID_BACKENDS)
        raise ValueError(f"Unknown storage_backend: {backend!r}. Expected one of {expected}")

    root = (base_path or default_base_path(backend, env)).rstrip("/")
    if layer == "landing":
        return f"{root}/landing"
    return f"{root}/{layer}"


def resolve_table_path(
    backend: str,
    base_path: str | None,
    env: str,
    layer: str,
    table: str,
    *,
    org_id: str | None = None,
) -> str:
    """Return a Delta table directory path under the given layer.

    Args:
        backend: str.
        base_path: str | None.
        env: str.
        layer: str.
        table: str.
        org_id: Optional partition value appended as ``org_id=``.

    Returns:
        str.

    Raises:
        ValueError: When ``layer`` or ``backend`` is unknown.

    Example:
        >>> resolve_table_path("local", "/tmp/lake", "dev", "bronze", "events")
    """
    layer_base = resolve_layer_base(backend, base_path, env, layer)
    path = f"{layer_base}/{table}"
    if org_id:
        path = f"{path}/org_id={org_id}"
    return path
