"""Integrator-facing catalog and crosswalk helpers (agent tool builtins).

These functions are stable, in-process APIs — not a hosted agent runtime.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ambient_contracts.catalog_manifest import resolve_catalog_root_flexible
from ambient_contracts.crosswalk import load_crosswalk_links
from ambient_pipeline.catalog_loader import load_manifest_version, load_metric_by_numeric_id
from ambient_pipeline.gold_contract_map import contract_column_catalog_map

from ambient_cli.tool_registry import IntegratorToolRegistry
from ambient_cli.tool_schema import validate_tool_schema_document

BUILTIN_INTEGRATOR_TOOL_SCHEMAS: dict[str, dict[str, Any]] = {
    "crosswalk_list_links": {
        "properties": {"contract_file": {"type": "string"}},
        "required": [],
    },
    "catalog_list_metrics": {
        "properties": {"industry": {"type": "string"}},
        "required": [],
    },
    "catalog_resolve_metric": {
        "properties": {"metric_id": {"type": "integer"}},
        "required": ["metric_id"],
    },
    "catalog_manifest_summary": {
        "properties": {},
        "required": [],
    },
    "catalog_list_industries": {
        "properties": {},
        "required": [],
    },
    "catalog_resolve_metric_by_key": {
        "properties": {"catalog_metric_key": {"type": "string", "minLength": 1}},
        "required": ["catalog_metric_key"],
    },
    "gold_contract_column_map": {
        "properties": {
            "contract_file": {"type": "string", "minLength": 1},
        },
        "required": ["contract_file"],
    },
}


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
    links = load_crosswalk_links()
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
    return load_metric_by_numeric_id(numeric, root)


def catalog_manifest_summary() -> dict[str, Any]:
    """Read-only manifest headline from the on-disk catalog SSOT (not a hosted HTTP API).

    Args:
        None.

    Returns:
        dict[str, Any]: ``version``, ``industry_count``, and ``metric_count``.

    Raises:
        FileNotFoundError: When catalog root cannot be resolved.

    Example:
        >>> catalog_manifest_summary()["metric_count"] > 0
    """
    root = resolve_catalog_root_flexible()
    path = root / "manifest.json"
    if not path.is_file():
        return {"version": "unknown", "industry_count": 0, "metric_count": 0}
    doc = json.loads(path.read_text(encoding="utf-8"))
    industries = doc.get("industries") if isinstance(doc, dict) else None
    metrics = _read_manifest_metrics(root)
    version = load_manifest_version(root)
    industry_count = len(industries) if isinstance(industries, list) else 0
    return {
        "version": version,
        "industry_count": industry_count,
        "metric_count": len(metrics),
    }


def catalog_list_industries() -> list[dict[str, Any]]:
    """List industry rows from ``catalog/manifest.json`` (file SSOT; not HTTP).

    Args:
        None.

    Returns:
        list[dict[str, Any]]: Manifest ``industries`` entries.

    Raises:
        FileNotFoundError: When catalog root cannot be resolved.

    Example:
        >>> catalog_list_industries()[0]["value"]
    """
    root = resolve_catalog_root_flexible()
    path = root / "manifest.json"
    if not path.is_file():
        return []
    doc = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(doc, dict):
        return []
    industries = doc.get("industries")
    if not isinstance(industries, list):
        return []
    return [row for row in industries if isinstance(row, dict)]


def catalog_resolve_metric_by_key(catalog_metric_key: str) -> dict[str, Any] | None:
    """Resolve a manifest metric row by ``catalogMetricKey`` (dotted key).

    Args:
        catalog_metric_key: Stable catalog key (for example ``real_estate.core.noi``).

    Returns:
        dict[str, Any] | None.

    Raises:
        ValueError: When the key is empty.

    Example:
        >>> catalog_resolve_metric_by_key("real_estate.core.current_ratio") is not None
    """
    key = catalog_metric_key.strip()
    if not key:
        raise ValueError("catalog_metric_key must be non-empty")
    for row in _read_manifest_metrics(resolve_catalog_root_flexible()):
        if str(row.get("catalogMetricKey") or "").strip() == key:
            return row
    return None


def gold_contract_column_map(contract_file: str) -> dict[str, str]:
    """Map Gold contract column names to ``catalogMetricKey`` via crosswalk (read-only).

    Args:
        contract_file: Contract YAML basename (for example ``finance-banking-v1.yaml``).

    Returns:
        dict[str, str]: ``{column_name: catalogMetricKey}``.

    Raises:
        ValueError: When ``contract_file`` is empty.

    Example:
        >>> gold_contract_column_map("finance-banking-v1.yaml")
    """
    name = contract_file.strip()
    if not name:
        raise ValueError("contract_file must be non-empty")
    return contract_column_catalog_map(name)


def register_integrator_builtin_tools(registry: IntegratorToolRegistry) -> None:
    """Register crosswalk and catalog builtins on a per-worker registry.

    Args:
        registry: Target registry (one per tenant/worker).

    Returns:
        None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> reg = IntegratorToolRegistry()
        >>> register_integrator_builtin_tools(reg)
    """
    registry.register("crosswalk_list_links", crosswalk_list_links)
    registry.register("catalog_list_metrics", catalog_list_metrics)
    registry.register("catalog_resolve_metric", catalog_resolve_metric)
    registry.register("catalog_manifest_summary", catalog_manifest_summary)
    registry.register("catalog_list_industries", catalog_list_industries)
    registry.register("catalog_resolve_metric_by_key", catalog_resolve_metric_by_key)
    registry.register("gold_contract_column_map", gold_contract_column_map)


def call_integrator_tool(
    registry: IntegratorToolRegistry,
    tool_id: str,
    args: dict[str, Any] | None = None,
) -> Any:
    """Validate ``args`` against the builtin schema (when known) and invoke the tool.

    Args:
        registry: Registry that already holds the builtin handlers.
        tool_id: Registered tool name.
        args: Keyword arguments for the handler.

    Returns:
        Any: Tool return value.

    Raises:
        ValueError: When schema validation fails.
        KeyError: When ``tool_id`` is not registered.

    Example:
        >>> call_integrator_tool(reg, "catalog_manifest_summary", {})
    """
    payload = dict(args or {})
    schema = BUILTIN_INTEGRATOR_TOOL_SCHEMAS.get(tool_id.strip())
    if schema is not None:
        errors = validate_tool_schema_document(schema, payload)
        if errors:
            raise ValueError("; ".join(errors))
    return registry.call(tool_id, **payload)
