"""Deprecated — use :mod:`ambient_pipeline.notebook_smoke`."""

from __future__ import annotations

from pathlib import Path

from ambient_pipeline.notebook_smoke import (  # noqa: F401
    CONTRACT_FILE,
    DEMO_TABLES,
    SmokeResult,
    run_notebook_smoke,
)

__all__ = [
    "CONTRACT_FILE",
    "DEMO_TABLES",
    "SmokeResult",
    "run_colab_smoke",
    "run_notebook_smoke",
]


def run_colab_smoke(
    root: Path,
    *,
    org_id: str = "demo-org-allmanufacturingds",
    run_id: str | None = None,
) -> SmokeResult:
    """Deprecated alias for :func:`ambient_pipeline.notebook_smoke.run_notebook_smoke`.

    Args:
        root: Checkout root with ``data/raw`` samples.

    Returns:
        SmokeResult from :func:`run_notebook_smoke`.

    Raises:
        None: Delegates to :func:`run_notebook_smoke`.

    Example:
        >>> run_colab_smoke(Path("."))
    """
    return run_notebook_smoke(root, org_id=org_id, run_id=run_id)
