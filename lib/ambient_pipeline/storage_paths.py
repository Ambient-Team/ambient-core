"""Resolve medallion layer paths for local filesystem or optional cloud backends."""

from __future__ import annotations

VALID_BACKENDS = frozenset({"local", "uc_volume", "dbfs", "gcs"})
VALID_LAYERS = frozenset({"bronze", "silver", "gold", "landing"})

# Per-environment GCS bucket stem used only when backend=gcs (platform path).
GCS_BUCKET_STEM = "ambient-systems-storage"


def is_gcs_uri(path: str) -> bool:
    """Return True when *path* uses a Google Cloud Storage URI."""
    return path.strip().lower().startswith(("gs://", "gcs://"))


def default_base_path(backend: str, env: str) -> str:
    """Default root path per storage backend."""
    backend = backend.strip().lower()
    if backend == "local":
        return str((__import__("pathlib").Path.cwd() / ".lakehouse" / env).resolve())
    if backend == "gcs":
        return f"gs://{GCS_BUCKET_STEM}-{env}"
    if backend == "dbfs":
        return f"dbfs:/tmp/ambient_scale/{env}"
    if backend == "uc_volume":
        return "/Volumes/ambient_systems/scaletest"
    expected = sorted(VALID_BACKENDS)
    raise ValueError(f"Unknown storage_backend: {backend!r}. Expected one of {expected}")


def resolve_layer_base(
    backend: str,
    base_path: str | None,
    env: str,
    layer: str,
) -> str:
    """Return the base path for a medallion layer (bronze, silver, gold, landing)."""
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
    """Return a Delta table directory path under the given layer."""
    layer_base = resolve_layer_base(backend, base_path, env, layer)
    path = f"{layer_base}/{table}"
    if org_id:
        path = f"{path}/org_id={org_id}"
    return path


def resolve_source_path(
    gcs_path: str,
    source_path: str,
) -> str:
    """Prefer explicit source_path; fall back to deprecated gcs_path widget."""
    return (source_path or gcs_path).strip()


def catalog_for_backend(backend: str) -> tuple[str, str]:
    """Return (catalog, schema_prefix) for optional UC registration (platform)."""
    backend = backend.strip().lower()
    if backend == "local":
        return "spark_catalog", ""
    if backend == "gcs":
        return "ambient_systems", ""
    return "ambient_systems_scaletest", ""
