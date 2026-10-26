# Changelog

All notable changes to **ambient-core** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Integrator agent builtins** — `ambient_cli.integrator_tools` (`crosswalk_list_links`, `catalog_list_metrics`, `catalog_resolve_metric`, `catalog_manifest_summary`) for in-process agent workers (**Dec 2026 / v0.3.12** train, **Fri 18 Dec 2026**).
- **Tool argument validation** — `ambient_cli.tool_schema` (`validate_tool_args`, `validate_tool_schema_document`) with nested **object** and **array** types; `call_integrator_tool` validates builtin schemas before dispatch.
- **Builtin tool registration** — `register_integrator_builtin_tools` wires catalog/crosswalk handlers onto `IntegratorToolRegistry`.
- **Per-instance tool registry** — `ambient_cli.tool_registry.IntegratorToolRegistry` and `execute_tool_plan` (v1 runs each `tool_ids` entry once; `max_tool_rounds` reserved).
- **Wheel import smoke** — `tests/test_wheel_ambient_pipeline_import.py` verifies `ambient_pipeline` Colab and governance modules import from an installed wheel without a git checkout on `PYTHONPATH`.
- **Integrator docs and example** — [docs/integrator-agent-tools.md](docs/integrator-agent-tools.md) and [examples/integrators/builtin_tools_walkthrough.py](examples/integrators/builtin_tools_walkthrough.py); edge tests in `tests/test_integrator_tools_edges.py`.
- **Catalog and Gold read builtins** — `catalog_list_industries`, `catalog_resolve_metric_by_key`, `gold_contract_column_map` on `IntegratorToolRegistry` (file/crosswalk SSOT; not hosted HTTP or OLAP).
- **Extended tool schema validation** — `enum`, `minLength`/`maxLength`, `minimum`/`maximum`, `pattern`, and `oneOf` in `ambient_cli.tool_schema`.
- **Contract and crosswalk builtins** — `contracts_list_files`, `contract_schema_summary`, and `crosswalk_links_for_metric_key` on `IntegratorToolRegistry`.
- **Integrator plan runner** — `ambient_cli.integrator_plan_runner` (`IntegratorPlanStep`, `run_integrator_plan`) for linear in-process tool plans with per-step arguments (not a hosted agent runtime).
- **Schema `allOf` and `const`** — additional JSON-Schema-style keywords in `ambient_cli.tool_schema`.

### Changed

- **Integrator roadmap** — top deferred items on the **v0.3.12 (18 Dec 2026)** train; `ambient_pipeline` wheel path documented as shipped from `lib/ambient_pipeline` (no checkout required for pip installs).

## [0.3.11] - 2026-11-27

### Added

- Spark pipeline **E2E golden** tests (stubbed and real-PII paths), `metric_id`-based Real Estate gold pivot, and Silver/Gold **PII output guards**.
- **`AMBIENT_PII_SALT` runtime policy** for `PiiPseudonymizer` (blocks missing, empty, or golden test salt outside pytest / `AMBIENT_SPARK_TESTS=1`); `.env.example` placeholder and pipeline docs.
- **Structured pipeline logging** (`log_pipeline_event`) and generated **`lib/README.md`** API index (`generate_lib_readme.py --check` in CI).
- **Quality-static gates:** public API docstring check, vulture dead-code pass, golden PII fixture reference scan, sensitive-literal scan (emails, phones, personal paths), doc link check, secret-shaped token scan for `lib/` and `scripts/`.
- **`lib/ambient_pipeline/` coverage floor** (95% lines / 95% branches) in `check_coverage.py`.
- PEP 561 **`py.typed`** markers; mypy strict on core and support paths; broad lib branch/edge test coverage.

### Changed

- Release version **0.3.11** (tag **`v0.3.11`**) because **`v0.3.10`** was already tagged on an earlier commit; Cut release cannot reuse that name. See [docs/MONTHLY-RELEASE.md](docs/MONTHLY-RELEASE.md).
- Local Spark runner gold pivot prefers stable **`metric_id`** when present so display `name` can be pseudonymized in Silver.
- README quickstart documents Java 17, contracts bundle sync, and PII salt requirements.

### Fixed

- Colab bootstrap / secrets branch coverage gaps; gold transform and runner edge cases covered by tests.

## [0.3.8] - 2026-10-02

### Added

- GitHub Actions **Release** workflow on tag `vX.Y.Z` that runs CI checks, verifies the tag matches package metadata, builds wheel and sdist artifacts, and attaches them to the GitHub Release.
- **Cut release** workflow (`workflow_dispatch`) for owners without local git: validates version and CHANGELOG on `main`, pushes the annotated tag, then invokes Release (GITHUB_TOKEN tag pushes do not trigger tag workflows).
- [docs/RELEASING.md](docs/RELEASING.md) for maintainers and downstream integrators.

## [0.3.0] - 2026-10-02

Baseline semver release for integrators (for example **ambient-systems-platform**) that pin a single git tag for contracts, catalog, and shared pipeline code.

### Added

- Governed data-product **contracts** (`contracts/`, bundled under `lib/ambient_contracts/bundled/`).
- Reference **catalog** with industry packs, manifest generation, and validation scripts.
- **ambient_pipeline**, **ambient_calc**, and **ambient_cli** packages installable from this tree.
- CI validation for contracts, catalog, naming, formulas, PHI policy, and PySpark pipeline tests.

[Unreleased]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.11...HEAD
[0.3.11]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.10...v0.3.11
[0.3.10]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.8...v0.3.10
[0.3.8]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.0...v0.3.8
[0.3.0]: https://github.com/Ambient-Team/ambient-core/releases/tag/v0.3.0
