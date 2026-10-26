"""Integrator-facing catalog and crosswalk helpers (agent tool builtins).

These functions are stable, in-process APIs — not a hosted agent runtime.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, cast

from ambient_contracts.catalog_manifest import resolve_catalog_root_flexible
from ambient_contracts.crosswalk import load_crosswalk_links
from ambient_pipeline.catalog_loader import load_metric_by_numeric_id


def crosswalk_list_links(contract_file: str | None = None) -> list[dict[str, Any]]:
    """Return crosswalk link rows, optionally filtered by ``contractFile`` basename.

    Args:
        contract_file: When set, only links whose ``contractFile`` matches (basename).

    Returns:
        list[dict[str, Any]].

    Raises:
        None: This callable does not raise.

    Example:
        >>> crosswalk_list_links("tenant-metrics-v1.yaml")
    """
    links = cast(list[dict[str, Any]], load_crosswalk_links())
    if not contract_file:
        return links
    name = contract_file.strip()
    return [
        link
        for link in links
        if str(link.get("contractFile") or "").strip() == name
    ]


def _read_manifest_metrics(catalog_root: Path) -> list[dict[str, Any]]:
    path = catalog_root / "manifest.json"
    if not path.is_file():
        return []
    doc = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(doc, dict):
        return []
    metrics = doc.get("metrics")
    if not isinstance(metrics, list):
        return []
    return [row for row in metrics if isinstance(row, dict)]


def catalog_list_metrics(industry: str | None = None) -> list[dict[str, Any]]:
    """List manifest metric rows, optionally filtered by ``industry`` label.

    Args:
        industry: Pack display label (for example ``Real Estate``); case-sensitive match.

    Returns:
        list[dict[str, Any]].

    Raises:
        FileNotFoundError: When catalog root cannot be resolved.

    Example:
        >>> catalog_list_metrics("Real Estate")[:1]
    """
    root = resolve_catalog_root_flexible()
    rows = _read_manifest_metrics(root)
    if industry is None:
        return rows
    label = industry.strip()
    return [row for row in rows if str(row.get("industry") or "").strip() == label]


def catalog_resolve_metric(metric_id: str | int) -> dict[str, Any] | None:
    """Resolve one catalog metric by numeric ``id`` from manifest or pack YAML.

    Args:
        metric_id: Manifest metric id (string or int).

    Returns:
        dict[str, Any] | None.

    Raises:
        ValueError: When ``metric_id`` is not a positive integer.

    Example:
        >>> catalog_resolve_metric(926) is not None
    """
    try:
        numeric = int(metric_id)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"metric_id must be an integer, got {metric_id!r}") from exc
    if numeric <= 0:
        raise ValueError(f"metric_id must be positive, got {numeric}")
    root = resolve_catalog_root_flexible()
    return cast(dict[str, Any] | None, load_metric_by_numeric_id(numeric, root))
