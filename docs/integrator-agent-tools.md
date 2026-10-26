# Integrator agent tools (in-process)

Ambient Core ships **file-backed** catalog and crosswalk helpers for platform workers that build their own agent loops. These are **not** a hosted HTTP API or product agent runtime — see [integrator-roadmap.md](integrator-roadmap.md) and [AGENTS.md](../AGENTS.md).

**Target release:** package **`v0.3.12`** on the **18 Dec 2026** monthly train ([MONTHLY-RELEASE.md](MONTHLY-RELEASE.md)). Work lands on branch `cursor/dec18-v0312-integrator-deferred-2b6a` until Nov **`v0.3.11`** PR **#130** merges.

## Modules

- **`ambient_cli.integrator_tools`** — catalog, crosswalk, contract, and Gold-map builtins; `register_integrator_builtin_tools`, `call_integrator_tool`, and `BUILTIN_INTEGRATOR_TOOL_SCHEMAS`.
- **`ambient_cli.tool_schema`** — `validate_tool_args` and `validate_tool_schema_document` (required fields, simple types, nested **object** / **array**).
- **`ambient_cli.tool_registry`** — `IntegratorToolRegistry` (one registry per worker/tenant), `ToolPlanProfile`, `execute_tool_plan` (v1 runs each `tool_ids` entry once).
- **`ambient_cli.integrator_plan_runner`** — `IntegratorPlanStep` and `run_integrator_plan` for linear plans with **per-step** `args` (in-process only; no HTTP agent runtime).

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

### `catalog_list_industries()`

Returns manifest `industries` rows (`value`, `label`, pack metadata). File-backed catalog read surface for integrators (not HTTP).

### `catalog_resolve_metric_by_key(catalog_metric_key)`

Looks up one manifest metric by dotted `catalogMetricKey` (for example `real_estate.core.current_ratio`).

### `gold_contract_column_map(contract_file)`

Read-only map from Gold contract column names to `catalogMetricKey` via crosswalk — no lakehouse/OLAP query. Use from platform workers before Spark Gold jobs.

### `contracts_list_files()`

Sorted list of contract YAML basenames under the resolved `contracts/` directory (checkout or bundled package data).

### `contract_schema_summary(contract_file)`

Product headline (`name`, `consumption_id`, `version`), Gold `schema.table`, and column rows (`name`, `type`, `required`) for one contract file.

### `crosswalk_links_for_metric_key(catalog_metric_key)`

All crosswalk rows whose `catalogMetricKey` equals the argument (exact match).

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

### Linear plans with per-step arguments

When each tool needs different kwargs, use `run_integrator_plan` instead of `execute_tool_plan` (which only supports shared kwargs):

```python
from ambient_cli.integrator_plan_runner import IntegratorPlanStep, run_integrator_plan

steps = [
    IntegratorPlanStep("catalog_manifest_summary"),
    IntegratorPlanStep(
        "contract_schema_summary",
        {"contract_file": "finance-banking-v1.yaml"},
    ),
]
results = run_integrator_plan(registry, steps)
```

Multi-round ReAct (`max_tool_rounds` > 1) and hosted HTTP workers remain **platform** concerns; core documents the reserved field on `ToolPlanProfile` only.

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

Nested objects and arrays are supported on property schemas. Additional draft-07-style keywords: **`enum`**, **`const`**, **`minLength`** / **`maxLength`**, **`minimum`** / **`maximum`**, **`pattern`** (full-string match via `re.fullmatch`), **`allOf`** (every sub-schema must match), and **`oneOf`** (exactly one branch must match). `$ref` and format validators remain deferred (see [integrator-roadmap.md](integrator-roadmap.md)).

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
