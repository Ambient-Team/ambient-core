"""Built-in core tool handlers."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ambient_agent.boundaries import AgentRunContext
from ambient_agent.config import load_tool_definitions
from ambient_contracts.paths import resolve_contracts_dir
from ambient_contracts.validate import validate_all_contracts, validate_contract_file
from ambient_contracts.catalog_manifest import load_manifest


def _catalog_list_metrics(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    manifest = load_manifest()
    industry = args.get("industry")
    if industry:
        metrics = manifest.metrics_for_industry(str(industry))
    else:
        metrics = list(manifest.metrics)
    limit = int(args.get("limit") or 50)
    page = [m.to_tool_dict() for m in metrics[:limit]]
    return {"metrics": page, "total": len(metrics)}


def _catalog_resolve_metric(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    metric_id = args.get("metric_id")
    if not metric_id:
        raise ValueError("metric_id required")
    manifest = load_manifest()
    found = manifest.resolve_metric(str(metric_id))
    if found is not None:
        return {"metric": found.to_tool_dict()}
    return {"metric": None, "metric_id": metric_id}


def _contracts_list(_args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> list[str]:
    directory = resolve_contracts_dir()
    return sorted(p.name for p in directory.glob("*.yaml"))


def _safe_contract_basename(name: str) -> str | None:
    if not name or not isinstance(name, str):
        return None
    if ".." in name or "/" in name or "\\" in name:
        return None
    base = Path(name).name
    if base != name:
        return None
    return base


def _contracts_validate(args: dict[str, Any], _ctx: AgentRunContext, _trace: list) -> dict[str, Any]:
    name = args.get("contract_file")
    if name:
        safe = _safe_contract_basename(str(name))
        if not safe:
            return {"ok": False, "errors": ["invalid contract_file"]}
        path = resolve_contracts_dir() / safe
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
