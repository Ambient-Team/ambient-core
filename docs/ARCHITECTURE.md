# Ambient Core — Architecture

Standalone library for contracts, catalog, calculations, and lakehouse governance. Consumers pin a release of this tree and keep application-specific code in their own repositories.

Overview: [ECOSYSTEM.md](ECOSYSTEM.md).

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping, local runner
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers (`ambient_cli.catalog` delegates to `scripts/generate_reference_catalog.py`)
- **`ambient_calc`** — safe formula evaluation for catalogue metrics

The installable wheel ships packages listed in `pyproject.toml`. **`ambient_pipeline`** is exercised from a git checkout in tests; consumers may add app-specific modules alongside a pinned install.

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated); YAML source of truth — [contracts/README.md](../contracts/README.md)
- **`catalog/`** — reference metrics, industry packs, benchmarks; `ambient-catalog-generate` → JSON `manifest.json` and generated `runtime/*.js`
- **`lib/ambient_pipeline/`** — pandas smoke and optional Spark/Delta helpers (package home is `lib/`)
- **`examples/sample/`** — fictional CSV rows for the pandas smoke
- **`notebooks/`** — entry `00_notebook_demo.ipynb` and optional local Spark notebooks `01`–`04`
- **`docs/`** — manuals (`USAGE.md`, `CONVENTIONS.md`, `CANONICAL_SCOPE.md`, `ECOSYSTEM.md`, this file, `CONTRIBUTING.md`, [ci.md](ci.md), [running-ci-locally.md](running-ci-locally.md), [metrics-catalog.md](metrics-catalog.md), [INVENTORY.md](INVENTORY.md))

Together, `contracts/` and `catalog/` are the **plain-text SSOT layer** in git; precursor OLTP/Bronze and forward Parquet/Delta live in deployment ([CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md)).

## Standalone OSS path

Clone this repository alone and run without Databricks or a managed document store:

1. `pip install -e ".[notebook]"` for pandas notebook deps from `pyproject.toml`
2. Run [`notebooks/00_notebook_demo.ipynb`](../notebooks/00_notebook_demo.ipynb) or `ambient_pipeline.notebook_smoke` against [`examples/sample/`](../examples/sample/)
3. Optional Spark: `pip install -e ".[pipeline,dev]"` (or `pip install -e ".[all]"` to match PR CI) and `python scripts/run_oss_bronze_silver_smoke.py`

This repository is contracts, catalog, calculations, the pandas pipeline, and notebooks. Application hosting stays in the consuming repository ([CANONICAL_SCOPE.md](CANONICAL_SCOPE.md)).

## Consumers

- **This clone** — develop contracts, catalog, and pipeline governance; run CI, tests, and the OSS notebook/smoke path.
- **Downstream integrators** — `pip install` or git submodule at a **tag**; see [INTEGRATING.md](INTEGRATING.md).
- **Authoritative edits** — always in `contracts/` and `catalog/` here; sync bundled copies per [CONTRIBUTING.md](CONTRIBUTING.md).

## Layer boundary (in this repo)

- **Here:** contract YAML, catalog semantics, shared governance logic, notebooks, and the fictional sample under `examples/sample/`.
- **Elsewhere:** web apps, operational stores, lakehouse deploy glue, secrets, multi-tenant runtime, optional document-store hosting.
- **Not here:** customer-facing AI, inference services, or third-party model resale. Internal operator AI (Cursor Agent / IDE) is not an Ambient Core deliverable.

Component priorities: [ECOSYSTEM.md](ECOSYSTEM.md).
