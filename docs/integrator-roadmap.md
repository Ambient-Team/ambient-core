# Integrator roadmap

What Ambient Core provides today versus planned deferrals. For consumption guides, see [governed-data.md](governed-data.md), [pipeline.md](pipeline.md), [../AGENTS.md](../AGENTS.md), and [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## Shipped in v0.3.11 (Nov 2026)

Release **`v0.3.11`** / package **`0.3.11`** ([CHANGELOG.md](../CHANGELOG.md)). Traceability is enforced by `tests/test_v0311_release_traceability.py`.

- **`metric_id` Real Estate gold pivot** — `lib/ambient_pipeline/runner.py`; `tests/pipeline/test_gold_transform_edges.py`, `tests/test_runner_local_pipeline.py`
- **PII salt policy and Silver/Gold output guards** — `lib/ambient_pipeline/pii.py`, `.env.example`, [pipeline.md](pipeline.md#local-spark-pii-salt); `tests/test_pii_and_secrets.py`
- **Structured pipeline logging** — `ambient_pipeline.pipeline_logging`; `tests/test_pipeline_structured_logging.py`
- **Static quality gates** — `scripts/check_quality_static.py` (docstrings, vulture, sensitive literals, doc links, secrets scan, `lib/README.md` check); `tests/test_check_quality_static.py`, `tests/test_secrets_scan.py`, `tests/test_check_public_api_docstrings.py`, `tests/test_check_doc_links.py`
- **`ambient_pipeline` coverage floor (95%/95%)** — `scripts/check_coverage.py` (PR CI and `scripts/run_local_pr_ci.sh`)
- **PEP 561 `py.typed`** and mypy strict — `lib/*/py.typed`, `scripts/check_mypy_strict.py` via quality-static

## Shipped (documentation and runtime)

- **Governed data** — [CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md), [catalog-consumption.md](catalog-consumption.md), [crosswalk.md](crosswalk.md), [contracts/README.md](../contracts/README.md)
- **Pipeline helpers** — [pipeline.md](pipeline.md), `bronze_to_tenant_metrics`, `gold_contract_map`, `ambient_pipeline` (checkout), examples under [examples/pipeline/](../examples/pipeline/)
- **Crosswalk** — YAML SSOT + `load_crosswalk_links()`; CI `scripts/check_crosswalk.py`; `tests/test_crosswalk_loader.py`

## Deferred (not in this repository)

- **Customer agent runtime** — this repository does not ship plan-execute workers or a hosted agent API. Maintainer IDE notes stay in [AGENTS.md](../AGENTS.md).
- **Hosted catalog API** — the `catalog/` folder remains the source of truth.
- **Gold lakehouse writers** — Spark jobs that materialize `finance-*` or healthcare Gold tables live in the consuming application. This repository supplies `gold_contract_map` and the contracts.
- **Optional local scripts** — `scripts/export_catalog_wiki.py` is not part of CI.

## Suggested integrator order

1. [INTEGRATING.md](INTEGRATING.md) — pin tag, env vars, CI gates 
2. [CONVENTIONS.md](CONVENTIONS.md) — skim formats and catalogue naming before authoring YAML 
3. [governed-data.md](governed-data.md) — catalog + contracts consumption 
4. [pipeline.md](pipeline.md) or [../AGENTS.md](../AGENTS.md) depending on lakehouse vs worker focus 
5. [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md) before production agents 
