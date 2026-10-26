"""Structured logging for pipeline entry points (no secrets in log payloads)."""

from __future__ import annotations

import json
import logging
from typing import Any

LOGGER = logging.getLogger("ambient.pipeline")

_REDACT_KEYS = frozenset(
    {
        "salt",
        "secret",
        "token",
        "password",
        "api_key",
        "pii_salt",
        "credential",
    }
)


def _scrub_fields(fields: dict[str, Any]) -> dict[str, Any]:
    clean: dict[str, Any] = {}
    for key, value in fields.items():
        lower = key.lower()
        if any(marker in lower for marker in _REDACT_KEYS):
            clean[key] = "<redacted>"
        else:
            clean[key] = value
    return clean


def log_pipeline_event(
    event: str,
    *,
    component: str,
    run_id: str,
    **fields: Any,
) -> None:
    """Emit one JSON structured log line for pipeline observability.

    Args:
        event: Short event name (for example ``pipeline_stage_complete``).
        component: Logical owner (``runner`` or ``colab_smoke``).
        run_id: Pipeline run identifier (never a secret).
        **fields: Additional scalar fields (secrets are redacted by key name).

    Returns:
        None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> log_pipeline_event("pipeline_start", component="runner", run_id="r1", stage="bronze")
    """
    payload: dict[str, Any] = {
        "event": event,
        "component": component,
        "run_id": run_id,
        **_scrub_fields(fields),
    }
    LOGGER.info(json.dumps(payload, sort_keys=True, default=str))
