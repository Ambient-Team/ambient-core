# Integrator roadmap

What Ambient Core provides today versus planned deferrals. For consumption guides, see [governed-data.md](governed-data.md), [pipeline.md](pipeline.md), [../AGENTS.md](../AGENTS.md), and [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## Shipped (documentation and runtime)

- **Governed data** — [CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md), [catalog-consumption.md](catalog-consumption.md), [crosswalk.md](crosswalk.md), [contracts/README.md](../contracts/README.md)
- **Pipeline helpers** — [pipeline.md](pipeline.md), `bronze_to_tenant_metrics`, `gold_contract_map`, `ambient_pipeline` (checkout), examples under `examples/pipeline/`
- **Crosswalk** — YAML SSOT + `load_crosswalk_links()`; CI `scripts/check_crosswalk.py`
- **Agents** — plan-execute loop, core tools, policy hints (`contract_refs` / `catalog_refs`)
- **Examples** — `examples/agents/minimal_worker.py`, OpenClaw integration doc
- **Tests** — agent loop, HTTP client mocks, crosswalk loader

## Deferred (not in core yet)

- **`ambient_pipeline` on the wheel** — still requires git checkout / `pythonpath=lib`; `pipeline` extra installs PySpark only
- **Per-tenant `register_tool` registry** — process-global namespace; isolate in platform workers
- **ReAct / `max_tool_rounds`** — profile field reserved; v1 runs each `tool_ids` once
- **Full JSON Schema for tool args** — builtins: required + simple types only
- **Crosswalk agent tool** — load crosswalk in app code or future core tool
- **Live Gold / OLAP reads in core agents** — platform `register_tool()` handlers
- **Hosted catalog API** — catalog folder remains SSOT; transport TBD
- **Gold lakehouse writers** — Spark jobs that materialize `finance-*` / healthcare Gold tables from Silver + `ambient_calc` (platform repo); core supplies `gold_contract_map` and contracts only
- **Optional local scripts** — for example `scripts/export_catalog_wiki.py` is not part of CI; keep untracked or maintain in your fork

## Suggested integrator order

1. [INTEGRATING.md](INTEGRATING.md) — pin tag, env vars, CI gates 
2. [CONVENTIONS.md](CONVENTIONS.md) — skim formats and catalogue naming before authoring YAML 
3. [governed-data.md](governed-data.md) — catalog + contracts consumption 
4. [pipeline.md](pipeline.md) or [../AGENTS.md](../AGENTS.md) depending on lakehouse vs worker focus 
5. [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md) before production agents 
