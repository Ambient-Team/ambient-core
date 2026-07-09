"""Built-in core tool handlers."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ambient_agent.boundaries import AgentRunContext
from ambient_agent.validate import load_tool_definitions
from ambient_contracts.paths import resolve_contracts_dir
from ambient_contracts.validate import validate_all_contracts, validate_contract_file
from ambient_pipeline.catalog_manifest import load_manifest


def _catalog_list_metrics(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    manifest = load_manifest()
    metrics = manifest.get("metrics", [])
    industry = args.get("industry")
    if industry:
        metrics = [m for m in metrics if m.get("industry") == industry]
    limit = int(args.get("limit") or 50)
    return {"metrics": metrics[:limit], "total": len(metrics)}


def _catalog_resolve_metric(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    metric_id = args.get("metric_id")
    if not metric_id:
        raise ValueError("metric_id required")
    manifest = load_manifest()
    for metric in manifest.get("metrics", []):
        if metric.get("id") == metric_id:
            return {"metric": metric}
    return {"metric": None, "metric_id": metric_id}


def _contracts_list(_args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> list[str]:
    directory = resolve_contracts_dir()
    return sorted(p.name for p in directory.glob("*.yaml"))


def _contracts_validate(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    name = args.get("contract_file")
    if name:
        path = resolve_contracts_dir() / name
        if not path.is_file():
            return {"ok": False, "errors": [f"not found: {name}"]}
        errors = validate_contract_file(path)
        return {"ok": not errors, "errors": errors}
    errors = validate_all_contracts()
    return {"ok": not errors, "errors": errors}


def _structured_json(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> Any:
    text = args.get("text")
    if not isinstance(text, str):
        raise ValueError("text must be a string")
    return json.loads(text)


def _run_context_append(args: dict[str, Any], _ctx: AgentRunContext, trace: list) -> dict[str, Any]:
    entry = {"label": args.get("label"), "payload": args.get("payload")}
    trace.append(entry)
    return {"appended": True, "trace_length": len(trace)}


BUILTIN_HANDLERS = {
    "catalog_list_metrics": _catalog_list_metrics,
    "catalog_resolve_metric": _catalog_resolve_metric,
    "contracts_list": _contracts_list,
    "contracts_validate": _contracts_validate,
    "structured_json": _structured_json,
    "run_context_append": _run_context_append,
}


def tool_ids() -> set[str]:
    return set(load_tool_definitions().keys())
