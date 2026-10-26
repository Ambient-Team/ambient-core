"""Tests for ambient_cli.integrator_tools (crosswalk + catalog agent builtins)."""

from __future__ import annotations

import pytest

from ambient_cli.integrator_tools import (
    BUILTIN_INTEGRATOR_TOOL_SCHEMAS,
    call_integrator_tool,
    catalog_list_metrics,
    catalog_manifest_summary,
    catalog_resolve_metric,
    crosswalk_list_links,
    register_integrator_builtin_tools,
)
from ambient_cli.tool_registry import IntegratorToolRegistry


def test_crosswalk_list_links_returns_rows() -> None:
    links = crosswalk_list_links()
    assert isinstance(links, list)
    if links:
        assert isinstance(links[0], dict)


def test_crosswalk_list_links_filters_contract_file() -> None:
    all_links = crosswalk_list_links()
    if not all_links:
        pytest.skip("no crosswalk links in catalog")
    sample = str(all_links[0].get("contractFile") or "").strip()
    if not sample:
        pytest.skip("crosswalk row missing contractFile")
    filtered = crosswalk_list_links(sample)
    assert filtered
    assert all(str(row.get("contractFile") or "").strip() == sample for row in filtered)


def test_catalog_list_metrics_includes_real_estate_sample() -> None:
    rows = catalog_list_metrics("Real Estate")
    assert rows
    assert all(row.get("industry") == "Real Estate" for row in rows)


def test_catalog_resolve_metric_known_id() -> None:
    metric = catalog_resolve_metric(926)
    assert metric is not None
    assert metric.get("name") == "Current Ratio"


def test_catalog_resolve_metric_rejects_invalid_id() -> None:
    with pytest.raises(ValueError, match="positive"):
        catalog_resolve_metric(0)


def test_catalog_manifest_summary_has_counts() -> None:
    summary = catalog_manifest_summary()
    assert int(summary["metric_count"]) > 0
    assert summary["version"] not in ("", None)


def test_register_and_call_builtin_tools() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    assert set(registry.tool_ids()) == set(BUILTIN_INTEGRATOR_TOOL_SCHEMAS)
    summary = call_integrator_tool(registry, "catalog_manifest_summary", {})
    assert summary["metric_count"] > 0


def test_call_integrator_tool_validates_schema() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    with pytest.raises(ValueError, match="metric_id"):
        call_integrator_tool(registry, "catalog_resolve_metric", {})
