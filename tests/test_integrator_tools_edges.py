"""Edge cases for integrator builtins and validated dispatch."""

from __future__ import annotations

import pytest

from ambient_cli.integrator_tools import (
    call_integrator_tool,
    catalog_list_metrics,
    catalog_resolve_metric,
    crosswalk_list_links,
    register_integrator_builtin_tools,
)
from ambient_cli.tool_registry import IntegratorToolRegistry
from ambient_cli.tool_schema import validate_tool_args, validate_tool_schema_document


def test_crosswalk_filter_no_match_returns_empty() -> None:
    assert crosswalk_list_links("definitely-not-a-real-contract.yaml") == []


def test_crosswalk_filter_strips_whitespace() -> None:
    all_links = crosswalk_list_links()
    if not all_links:
        pytest.skip("no crosswalk links")
    sample = str(all_links[0].get("contractFile") or "").strip()
    if not sample:
        pytest.skip("missing contractFile")
    padded = f"  {sample}  "
    assert crosswalk_list_links(padded) == crosswalk_list_links(sample)


def test_catalog_list_metrics_unknown_industry_returns_empty() -> None:
    rows = catalog_list_metrics("___NoSuchIndustryLabel___")
    assert rows == []


def test_catalog_resolve_metric_accepts_numeric_string() -> None:
    metric = catalog_resolve_metric("926")
    assert metric is not None


def test_catalog_resolve_metric_rejects_non_numeric_string() -> None:
    with pytest.raises(ValueError, match="integer"):
        catalog_resolve_metric("not-an-id")


def test_call_integrator_tool_unknown_tool_raises() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    with pytest.raises(KeyError, match="unknown tool"):
        call_integrator_tool(registry, "not_registered", {})


def test_call_integrator_tool_rejects_wrong_type_for_metric_id() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    with pytest.raises(ValueError, match="metric_id"):
        call_integrator_tool(registry, "catalog_resolve_metric", {"metric_id": "926"})


def test_call_integrator_tool_strips_tool_id_whitespace() -> None:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    summary = call_integrator_tool(registry, "  catalog_manifest_summary  ", {})
    assert summary["metric_count"] > 0


def test_validate_tool_args_empty_properties_allows_empty_payload() -> None:
    assert validate_tool_args({}, [], {}) == []


def test_validate_tool_schema_document_ignores_non_dict_properties() -> None:
    errors = validate_tool_schema_document({"properties": "invalid", "required": []}, {})
    assert errors == []


def test_validate_tool_args_nested_path_prefix_on_missing_field() -> None:
    schema = {
        "outer": {
            "type": "object",
            "properties": {"inner": {"type": "string"}},
            "required": ["inner"],
        }
    }
    errors = validate_tool_args(schema, ["outer"], {"outer": {}})
    assert any("outer.inner" in err for err in errors)
