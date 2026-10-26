#!/usr/bin/env python3
"""Walkthrough: integrator builtin tools, schema validation, and tool plan (no Spark).

Run from an ambient-core clone:
  pip install -e .
  python examples/integrators/builtin_tools_walkthrough.py
"""

from __future__ import annotations

import sys

from ambient_cli.integrator_tools import (
    BUILTIN_INTEGRATOR_TOOL_SCHEMAS,
    call_integrator_tool,
    crosswalk_list_links,
    register_integrator_builtin_tools,
)
from ambient_cli.tool_registry import IntegratorToolRegistry, ToolPlanProfile, execute_tool_plan
from ambient_cli.tool_schema import validate_tool_schema_document


def main() -> int:
    registry = IntegratorToolRegistry()
    register_integrator_builtin_tools(registry)
    print(f"registered tools: {', '.join(registry.tool_ids())}")

    summary = call_integrator_tool(registry, "catalog_manifest_summary", {})
    print(
        "catalog manifest:",
        f"version={summary['version']}",
        f"industries={summary['industry_count']}",
        f"metrics={summary['metric_count']}",
    )

    sample_schema = BUILTIN_INTEGRATOR_TOOL_SCHEMAS["catalog_resolve_metric"]
    bad = validate_tool_schema_document(sample_schema, {})
    print(f"schema guard (empty metric_id): {bad[0] if bad else 'ok'}")

    try:
        call_integrator_tool(registry, "catalog_resolve_metric", {"metric_id": "926"})
    except ValueError as exc:
        print(f"call_integrator_tool rejects string metric_id: {exc}")

    metric = call_integrator_tool(registry, "catalog_resolve_metric", {"metric_id": 926})
    if metric:
        print(f"resolved metric 926: {metric.get('name')!r}")

    by_key = call_integrator_tool(
        registry,
        "catalog_resolve_metric_by_key",
        {"catalog_metric_key": "real_estate.core.current_ratio"},
    )
    if by_key:
        print(f"resolved by catalogMetricKey: {by_key.get('name')!r}")

    industries = call_integrator_tool(registry, "catalog_list_industries", {})
    print(f"catalog industries: {len(industries)}")

    col_map = call_integrator_tool(
        registry,
        "gold_contract_column_map",
        {"contract_file": "finance-banking-v1.yaml"},
    )
    print(f"finance-banking gold columns mapped: {len(col_map)}")

    contract_names = call_integrator_tool(registry, "contracts_list_files", {})
    print(f"contract yaml files: {len(contract_names)}")

    schema = call_integrator_tool(
        registry,
        "contract_schema_summary",
        {"contract_file": "finance-banking-v1.yaml"},
    )
    print(f"contract schema table: {schema.get('schema_table')!r}")

    nim_links = call_integrator_tool(
        registry,
        "crosswalk_links_for_metric_key",
        {"catalog_metric_key": "banking.depository.net_interest_margin"},
    )
    print(f"crosswalk rows for NIM key: {len(nim_links)}")

    links = crosswalk_list_links()
    print(f"crosswalk links (unfiltered): {len(links)}")

    plan = ToolPlanProfile(
        tool_ids=["catalog_manifest_summary", "catalog_list_metrics"],
        max_tool_rounds=2,
    )
    plan_results = execute_tool_plan(registry, plan, shared_kwargs={})
    print(f"tool plan returned {len(plan_results)} result(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
