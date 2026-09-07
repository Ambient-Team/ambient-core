"""Secret retrieval — environment variables first; Databricks dbutils optional."""

from __future__ import annotations

import os
import warnings


def _env_key(scope: str, key: str, env_prefix: str) -> str:
    """Build env var name: AMBIENT_PII_SALT or AMBIENT_AMBIENT_SYSTEMS_PII_SALT."""
    simple = f"{env_prefix}_{key.upper().replace('-', '_')}"
    scoped = f"{env_prefix}_{scope.upper().replace('-', '_')}_{key.upper().replace('-', '_')}"
    return os.environ.get(simple) or os.environ.get(scoped) or ""


def _try_dbutils_secret(scope: str, key: str) -> str | None:
    """Best-effort Databricks secret lookup; never required for OSS installs."""
    try:
        from pyspark.dbutils import DBUtils  # type: ignore[import-untyped]
        from pyspark.sql import SparkSession

        spark = SparkSession.getActiveSession()
        if spark is not None:
            return DBUtils(spark).secrets.get(scope=scope, key=key)
    except Exception:
        pass

    try:
        dbutils  # type: ignore[name-defined]  # noqa: F821
        return dbutils.secrets.get(scope=scope, key=key)  # type: ignore[name-defined]  # noqa: F821
    except Exception:
        return None


def get_secret(scope: str, key: str, *, env_prefix: str = "AMBIENT") -> str:
    """Retrieve a secret from the environment, or optionally Databricks Secret Scope.

    Local / OSS: set ``AMBIENT_{KEY}`` or ``AMBIENT_{SCOPE}_{KEY}``.
    Databricks (optional): ``dbutils.secrets.get(scope, key)`` when available.
    """
    env_value = _env_key(scope, key, env_prefix)
    if env_value:
        return env_value

    db_value = _try_dbutils_secret(scope, key)
    if db_value:
        return db_value

    raise RuntimeError(
        f"Secret not found: scope={scope!r}, key={key!r}. "
        f"Set {env_prefix}_{key.upper().replace('-', '_')} for local OSS runs."
    )


def get_secret_or_warn(
    scope: str,
    key: str,
    *,
    env_prefix: str = "AMBIENT",
    dev_fallback: str | None = None,
) -> str:
    """Like get_secret but allows an explicit opt-in dev-only fallback with a warning.

    Fail-closed by default: a fixed fallback is only used when
    ``AMBIENT_ALLOW_DEV_SECRETS=1`` is set. Production must set real secrets.
    """
    try:
        return get_secret(scope, key, env_prefix=env_prefix)
    except RuntimeError:
        allow_dev = os.environ.get("AMBIENT_ALLOW_DEV_SECRETS", "").strip() == "1"
        if allow_dev and dev_fallback is not None:
            warnings.warn(
                f"Using dev-only fallback for secret {scope}/{key}. "
                f"Set {env_prefix}_{key.upper().replace('-', '_')} for production.",
                stacklevel=2,
            )
            return dev_fallback
        raise
