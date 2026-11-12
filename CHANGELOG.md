# Changelog

All notable changes to **ambient-core** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.12] - 2026-11-12

### Added

- **Corporate financial ratio pack** — Shared catalog templates, `docs/ratios/corporate-ratios.md`, Gold contract `contracts/finance-corporate-ratios-v1.yaml`, and golden tests (`tests/test_corporate_ratios.py`, synthetic Harbor Ridge fixture). Existing `dso`, `dpo`, and industry `inventory_turnover` metrics stay primary; additional ratio ids sit alongside them.
- **Corporate three-statement essentials** — Gold contract `contracts/finance-corporate-statements-v1.yaml`, `lib/ambient_statements` integrity checks (30 identities), `docs/statements/corporate-three-statements.md`, and golden tests (`tests/test_accounting_essentials.py`, synthetic Harborfield fixture). Structured `null_reason` codes on `ambient_calc` via `safe_eval_result` and `compute_metric_result`.

## [0.3.11] - 2026-11-09

### Added

- **No GitHub Pages from this repo** — removed `.github/workflows/pages.yml` and site builders; `scripts/check_pages_site.py` fails CI if Pages publish paths reappear. Public site is the org root (`ambient-team.github.io`).
- **Vendor marketing scan** — `scripts/check_vendor_marketing.py` fails CI when user-visible docs promote blocked vendor brands or forge CTAs.
- Spark pipeline **E2E golden** tests (stubbed and real-PII paths), `metric_id`-based Real Estate gold pivot, and Silver/Gold **PII output guards**.
- **`AMBIENT_PII_SALT` runtime policy** for `PiiPseudonymizer` (blocks missing, empty, or golden test salt outside pytest / `AMBIENT_SPARK_TESTS=1`); `.env.example` placeholder and pipeline docs.
- **Structured pipeline logging** (`log_pipeline_event`) and generated **`lib/README.md`** API index (`generate_lib_readme.py --check` in CI).
- **Quality-static gates:** public API docstring check, vulture dead-code pass, golden PII fixture reference scan, sensitive-literal scan (emails, phones, personal paths), doc link check, secret-shaped token scan for `lib/` and `scripts/`.
- **`lib/ambient_pipeline/` coverage floor** (95% lines / 95% branches) in `check_coverage.py`.
- PEP 561 **`py.typed`** markers; mypy strict on core and support paths; broad lib branch/edge test coverage.

### Removed

- **`firebase_admin` Firestore bridge** — deleted `lib/ambient_pipeline/firestore_bridge.py` and `append_firestore_lineage_event` / `fetch_firestore_data_source` helpers (no in-repo replacement).
- **Colab pip extra and `requirements-colab.txt`** — pandas notebook deps live under the `notebook` optional extra in `pyproject.toml`.
- **`google.colab` notebook cells** — entry notebook is local/Jupyter only (`notebooks/00_notebook_demo.ipynb`).

### Deprecated (remove after ambient-systems-platform migrates)

- **`ambient_pipeline.colab_smoke`** / **`colab_bootstrap`** — thin re-exports of `notebook_smoke` / `notebook_bootstrap`.
- **`ambient_pipeline.firestore_sync_ids`** — re-exports `sync_ids`.
- **Contract YAML key `firestore`** — use `store`; validator still accepts the legacy key.
- **`firestore_fetcher`** kwarg on bronze mapping helpers — use `source_fetcher`.

### Changed

- Release version **0.3.11** (tag **`v0.3.11`**) because **`v0.3.10`** was already tagged on an earlier commit; Cut release cannot reuse that name. See [docs/MONTHLY-RELEASE.md](docs/MONTHLY-RELEASE.md).
- Local Spark runner gold pivot prefers stable **`metric_id`** when present so display `name` can be pseudonymized in Silver.
- README quickstart documents Java 17, contracts bundle sync, and PII salt requirements.

### Fixed

- Notebook bootstrap / secrets branch coverage gaps; gold transform and runner edge cases covered by tests.

## [0.3.8] - 2026-10-02

### Added

- **Release** workflow on tag `vX.Y.Z` that runs CI checks, verifies the tag matches package metadata, builds wheel and sdist artifacts, and attaches them to the release.
- **Cut release** workflow (`workflow_dispatch`) for owners without local git: validates version and CHANGELOG on `main`, pushes the annotated tag, then invokes Release (GITHUB_TOKEN tag pushes do not trigger tag workflows).
- [docs/RELEASING.md](docs/RELEASING.md) for maintainers and downstream integrators.

## [0.3.0] - 2026-10-02

Baseline semver release for integrators (for example **ambient-systems-platform**) that pin a single git tag for contracts, catalog, and shared pipeline code.

### Added

- Governed data-product **contracts** (`contracts/`, bundled under `lib/ambient_contracts/bundled/`).
- Reference **catalog** with industry packs, manifest generation, and validation scripts.
- **ambient_pipeline**, **ambient_calc**, and **ambient_cli** packages installable from this tree.
- CI validation for contracts, catalog, naming, formulas, PHI policy, and PySpark pipeline tests.
