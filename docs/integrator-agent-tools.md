# Integrator agent tools (in-process)

Ambient Core ships **file-backed** catalog and crosswalk helpers for platform workers that build their own agent loops. These are **not** a hosted HTTP API or product agent runtime — see [integrator-roadmap.md](integrator-roadmap.md) and [AGENTS.md](../AGENTS.md).

**Target release:** package **`v0.3.12`** on the **18 Dec 2026** monthly train ([MONTHLY-RELEASE.md](MONTHLY-RELEASE.md)). Work lands on branch `cursor/dec18-v0312-integrator-deferred-2b6a` until Nov **`v0.3.11`** PR **#130** merges.

## Modules

- **`ambient_cli.integrator_tools`** — builtins (`crosswalk_list_links`, `catalog_list_metrics`, `catalog_resolve_metric`, `catalog_manifest_summary`), `register_integrator_builtin_tools`, `call_integrator_tool`, and `BUILTIN_INTEGRATOR_TOOL_SCHEMAS`.
- **`ambient_cli.tool_schema`** — `validate_tool_args` and `validate_tool_schema_document` (required fields, simple types, nested **object** / **array**).
- **`ambient_cli.tool_registry`** — `IntegratorToolRegistry` (one registry per worker/tenant), `ToolPlanProfile`, `execute_tool_plan` (v1 runs each `tool_ids` entry once).

## Environment

- Resolve catalog paths with `AMBIENT_CATALOG_DIR` or a checkout (same as [catalog-consumption.md](catalog-consumption.md)).
- Install from git or wheel: `pip install -e ".[all]"` — `ambient_pipeline` governance modules ship in the wheel ([pipeline.md](pipeline.md)).

## Builtin tools

### `crosswalk_list_links(contract_file=None)`

Returns rows from `catalog/crosswalk.yaml`. Optional `contract_file` filters on the `contractFile` basename (for example `tenant-metrics-v1.yaml`).

### `catalog_list_metrics(industry=None)`

Lists rows from `catalog/manifest.json` → `metrics`. Optional `industry` filters on the manifest `industry` display label (case-sensitive).

### `catalog_resolve_metric(metric_id)`

Loads one metric by numeric manifest id (pack YAML fallback). Raises `ValueError` when `metric_id` is not a positive integer.

### `catalog_manifest_summary()`

Read-only headline: `version`, `industry_count`, `metric_count`. This is the on-disk SSOT, not a hosted catalog API.

## Registry and validated dispatch

```python
from ambient_cli.integrator_tools import (
    call_integrator_tool,
    register_integrator_builtin_tools,
)
from ambient_cli.tool_registry import IntegratorToolRegistry, ToolPlanProfile, execute_tool_plan

registry = IntegratorToolRegistry()
register_integrator_builtin_tools(registry)

summary = call_integrator_tool(registry, "catalog_manifest_summary", {})
metric = call_integrator_tool(registry, "catalog_resolve_metric", {"metric_id": 926})

plan = ToolPlanProfile(
    tool_ids=["catalog_manifest_summary", "crosswalk_list_links"],
    max_tool_rounds=1,
)
results = execute_tool_plan(registry, plan)
```

`call_integrator_tool` validates `args` against `BUILTIN_INTEGRATOR_TOOL_SCHEMAS` before calling the handler. Unknown tool ids raise `KeyError`; schema violations raise `ValueError` with joined messages.

## Custom tools and schemas

Register your own handlers on the same registry instance, then validate with `validate_tool_schema_document` before dispatch:

```python
from ambient_cli.tool_schema import validate_tool_schema_document

schema = {
    "properties": {"org_id": {"type": "string"}},
    "required": ["org_id"],
}
errors = validate_tool_schema_document(schema, {"org_id": "tenant-a"})
```

Nested objects and arrays are supported on property schemas (see tests in `tests/test_tool_schema_and_registry.py`).

## Example script

From a clone:

```bash
pip install -e .
python examples/integrators/builtin_tools_walkthrough.py
```

## Related

- [crosswalk.md](crosswalk.md) — crosswalk YAML SSOT.
- [catalog-consumption.md](catalog-consumption.md) — manifest fields and consumption patterns.
- [INTEGRATING.md](INTEGRATING.md) — pin a core tag in platform repos.
