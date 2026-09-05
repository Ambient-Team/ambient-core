# Ambient Core — Architecture

Vendor-neutral **open foundation** for contracts, catalog, and lakehouse governance — rebuildable with free OSS materials + free Google account + free Colab. Full products add hosting/storage/members in **other repositories** that pin a release of this tree.

Overview: [ECOSYSTEM.md](ECOSYSTEM.md).

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping, local runner
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers
- **`ambient_calc`** — safe formula evaluation for catalogue metrics

The installable wheel ships packages listed in `pyproject.toml`. **`ambient_pipeline`** is exercised from a git checkout in tests; consumers may add app-specific modules alongside a pinned install.

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated); YAML source of truth — [contracts/README.md](../contracts/README.md)
- **`catalog/`** — reference metrics, industry packs, benchmarks; `ambient-catalog-generate` → JSON `manifest.json` and generated `runtime/*.js`
- **`ambient_pipeline/`** — Colab/pandas Bronze→Silver→Gold happy path (no Databricks)
- **`lib/ambient_pipeline/`** — optional Spark/Delta governance helpers (package home is `lib/`)
- **`notebooks/`** — entry `00_colab_run_me.ipynb`; optional local Spark notebooks; commercial skips in `COMMERCIAL_ONLY.txt`
- **`data/raw/.gitkeep`**, **`data/processed/.gitkeep`** — storage = none; samples from Drive / Ambient Systems demo assets
- **`docs/`** — manuals (`USAGE.md`, `CONVENTIONS.md`, `CORE_VS_PLATFORM.md`, `ECOSYSTEM.md`, this file, `CONTRIBUTING.md`)

Together, `contracts/` and `catalog/` are the **plain-text SSOT layer** in git; precursor OLTP/Bronze and forward Parquet/Delta live in deployment ([CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md)).

## Standalone OSS path

Clone this repository alone and run without Databricks or Firebase:

1. `pip install -r requirements-colab.txt` (or `pip install -e ".[dev]"`)
2. Place Drive samples into `data/raw/` (or mount Drive in Colab) and open `notebooks/00_colab_run_me.ipynb`
3. Optional Spark: `pip install -e ".[pipeline,dev]"` and `python scripts/run_oss_bronze_silver_smoke.py` with the same external CSVs

**Core** = contracts + catalog + Colab/pandas pipeline + notebooks. The commercial platform pins a core release and adds hosting/storage/members — those stay downstream ([CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md)).

## Consumers

- **This clone** — develop contracts, catalog, and pipeline governance; run CI, tests, and the OSS notebook/smoke path.
- **Downstream integrators** — `pip install` or git submodule at a **tag**; see [INTEGRATING.md](INTEGRATING.md).
- **Authoritative edits** — always in `contracts/` and `catalog/` here; sync bundled copies per [CONTRIBUTING.md](CONTRIBUTING.md).

## Layer boundary (in this repo)

- **Here:** contract YAML SSOT, catalog semantics, shared governance logic, OSS Colab notebooks (no sample CSVs in git).
- **Elsewhere:** web apps, operational stores, lakehouse deploy glue, secrets, multi-tenant runtime, Databricks/Firebase hosting.
- **Not here:** customer-facing AI, inference services, or third-party model resale. Internal operator AI (Cursor Agent / IDE) is not an Ambient Core deliverable.

Component priorities: [ECOSYSTEM.md](ECOSYSTEM.md).
