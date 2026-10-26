# Integrator roadmap

What Ambient Core provides today versus planned deferrals. For consumption guides, see [governed-data.md](governed-data.md), [pipeline.md](pipeline.md), [../AGENTS.md](../AGENTS.md), and [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## Shipped in v0.3.11 (Nov 2026)

Release **`v0.3.11`** / package **`0.3.11`** ([CHANGELOG.md](../CHANGELOG.md)). Traceability is enforced by `tests/test_v0311_release_traceability.py`.

- **Spark pipeline E2E goldens** (stubbed and real-PII paths) — `tests/pipeline/test_pipeline_e2e_golden.py`, `tests/fixtures/golden/`, `scripts/pipeline_golden_util.py`
- **`metric_id` Real Estate gold pivot** — `lib/ambient_pipeline/runner.py`; `tests/pipeline/test_gold_transform_edges.py`, `tests/test_runner_local_pipeline.py`
- **PII salt policy and Silver/Gold output guards** — `lib/ambient_pipeline/pii.py`, `.env.example`, [pipeline.md](pipeline.md#local-spark-pii-salt); `tests/test_pii_and_secrets.py`, PII path in E2E golden
- **Structured pipeline logging** — `ambient_pipeline.pipeline_logging`; `tests/test_pipeline_structured_logging.py`
- **Static quality gates** — `scripts/check_quality_static.py` (docstrings, vulture, golden PII ref scan, sensitive literals, doc links, secrets scan, `lib/README.md` check); `tests/test_check_quality_static.py`, `tests/test_secrets_scan_fixtures.py`, `tests/test_check_public_api_docstrings.py`, `tests/test_check_doc_links.py`
- **`ambient_pipeline` coverage floor (95%/95%)** — `scripts/check_coverage.py` (PR CI and `scripts/run_local_pr_ci.sh`)
- **PEP 561 `py.typed`** and mypy strict — `lib/*/py.typed`, `scripts/check_mypy_strict.py` via quality-static

## Shipped (documentation and runtime)

- **Governed data** — [CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md), [catalog-consumption.md](catalog-consumption.md), [crosswalk.md](crosswalk.md), [contracts/README.md](../contracts/README.md)
- **Pipeline helpers** — [pipeline.md](pipeline.md), `bronze_to_tenant_metrics`, `gold_contract_map`, `ambient_pipeline` (checkout), examples under [examples/pipeline/](../examples/pipeline/)
- **Crosswalk** — YAML SSOT + `load_crosswalk_links()`; CI `scripts/check_crosswalk.py`; `tests/test_crosswalk_loader.py`

## In progress — v0.3.12 (18 Dec 2026 train)

Branch `cursor/dec18-v0312-integrator-deferred-2b6a` (stacked on Nov **v0.3.11** PR **#130**; **no PR** until **#130** merges). Release day **Fri 18 Dec 2026** per [MONTHLY-RELEASE.md](MONTHLY-RELEASE.md). See [CHANGELOG.md](../CHANGELOG.md) `[Unreleased]`.

- **`ambient_pipeline` on the wheel** — `lib/ambient_pipeline` ships in the wheel; `tests/test_wheel_ambient_pipeline_import.py` asserts imports without checkout `PYTHONPATH`. The `pipeline` extra still adds PySpark only.
- **Crosswalk agent tool** — `ambient_cli.integrator_tools.crosswalk_list_links`; tests in `tests/test_integrator_tools.py`.
- **Catalog agent tools** — `catalog_list_metrics` / `catalog_resolve_metric` in `ambient_cli.integrator_tools`.
- **Per-instance tool registry** — `ambient_cli.tool_registry.IntegratorToolRegistry` (not a process-global singleton).
- **Tool args validation** — `ambient_cli.tool_schema.validate_tool_args` (required + simple types).
- **ReAct / `max_tool_rounds`** — `ToolPlanProfile.max_tool_rounds` reserved; `execute_tool_plan` runs each id once in v1.
- **Catalog manifest read helper** — `catalog_manifest_summary` (file SSOT; not HTTP); `register_integrator_builtin_tools` + `call_integrator_tool`.
- **Nested tool arg schemas** — object/array support in `validate_tool_args`; builtin schemas in `BUILTIN_INTEGRATOR_TOOL_SCHEMAS`.
- **Docs and example** — [integrator-agent-tools.md](integrator-agent-tools.md); runnable [examples/integrators/builtin_tools_walkthrough.py](../examples/integrators/builtin_tools_walkthrough.py).
- **Catalog file read surface** — `catalog_list_industries`, `catalog_resolve_metric_by_key` (manifest SSOT; not HTTP).
- **Gold column map tool** — `gold_contract_column_map` (crosswalk + contract schema; read-only, no OLAP).
- **Richer tool schemas** — `enum`, string length, integer min/max, `oneOf`, and `pattern` in `validate_tool_args`.
- **Contract inspection builtins** — `contracts_list_files`, `contract_schema_summary` (YAML SSOT; not lakehouse reads).
- **Crosswalk metric lookup** — `crosswalk_links_for_metric_key` for programmatic mapping checks.
- **Linear plan runner** — `ambient_cli.integrator_plan_runner` (`IntegratorPlanStep`, `run_integrator_plan`); per-step validated dispatch without HTTP.
- **Schema combinators** — `allOf`, `anyOf`, `oneOf`, `not`, and `const` in `validate_tool_args` (enum non-empty guard).
- **Plan runner ergonomics** — `IntegratorPlanStepResult`, `IntegratorPlanExecutionError`, `stop_on_error`, `merge_from_step`, `arg_from_prior`, `resolve_step_arguments`.

## Deferred (not in core yet)

- **Product agent runtime** — plan-execute workers and hosted agent HTTP APIs live in the commercial platform; Ambient Core documents maintainer-only IDE agents in [AGENTS.md](../AGENTS.md)
- **Full JSON Schema for tool args** — `$ref`, `format`, and combinators beyond the shipped set; v0.3.12 ships nested types plus enum/`const`/length/range/`pattern`/`allOf`/`anyOf`/`oneOf`/`not`
- **Live Gold / OLAP reads in core agents** — remote warehouse queries; core exposes `gold_contract_column_map` only
- **Hosted catalog API** — HTTP transport TBD; file-backed reads via integrator builtins
- **Gold lakehouse writers** — Spark jobs that materialize `finance-*` / healthcare Gold tables from Silver + `ambient_calc` (platform repo); core supplies `gold_contract_map` and contracts only
- **Optional local scripts** — for example `scripts/export_catalog_wiki.py` is not part of CI; keep untracked or maintain in your fork

## Suggested integrator order

1. [INTEGRATING.md](INTEGRATING.md) — pin tag, env vars, CI gates 
2. [CONVENTIONS.md](CONVENTIONS.md) — skim formats and catalogue naming before authoring YAML 
3. [governed-data.md](governed-data.md) — catalog + contracts consumption 
4. [pipeline.md](pipeline.md) or [../AGENTS.md](../AGENTS.md) depending on lakehouse vs worker focus 
5. [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md) before production agents 
