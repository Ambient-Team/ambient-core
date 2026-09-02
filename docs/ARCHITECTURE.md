# Ambient Core — Architecture

Vendor-neutral **open foundation** for contracts, catalog, and lakehouse governance. Full products add OLTP consumption, lakehouse deploy, and operator packaging in **other repositories** that pin a release of this tree.

Overview: [ECOSYSTEM.md](ECOSYSTEM.md).

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers
- **`ambient_calc`** — safe formula evaluation for catalogue metrics

The installable wheel ships packages listed in `pyproject.toml`. **`ambient_pipeline`** is exercised from a git checkout in tests; consumers may add app-specific modules alongside a pinned install.

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated); YAML source of truth — [contracts/README.md](../contracts/README.md)
- **`catalog/`** — reference metrics, industry packs, benchmarks; `ambient-catalog-generate` → JSON `manifest.json` and generated `runtime/*.js`
- **`lib/ambient_pipeline/`** — governance helpers imported by lakehouse jobs and (future) demo notebooks
- **`docs/`** — manuals (`USAGE.md`, `CONVENTIONS.md`, `CORE_VS_PLATFORM.md`, `ECOSYSTEM.md`, this file, `CONTRIBUTING.md`)

Together, `contracts/` and `catalog/` are the **plain-text SSOT layer** in git; precursor OLTP/Bronze and forward Parquet/Delta live in deployment ([CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md)).

## Drive demo template (inventory note)

A personal Drive layout used for the commercial platform demo groups `notebooks/`, `ambient_pipeline/`, `data/`, and `contracts/` at one root so notebooks can run the medallion process locally. This GitHub tree already has **`contracts/`** at root and **`ambient_pipeline`** under **`lib/`**; it does **not** yet ship top-level **`notebooks/`** or **`data/`** demo CSVs. Target direction (no large move yet): core stays runnable with open-source Spark/Delta only — notebooks orchestrate; `ambient_pipeline` supports them; demo files match what the commercial platform shows. Details live in the inventory report for this alignment work, not as a refactor checklist here.

## Consumers

- **This clone** — develop contracts, catalog, and pipeline governance; run CI and tests.
- **Downstream integrators** — `pip install` or git submodule at a **tag**; see [INTEGRATING.md](INTEGRATING.md).
- **Authoritative edits** — always in `contracts/` and `catalog/` here; sync bundled copies per [CONTRIBUTING.md](CONTRIBUTING.md).

## Layer boundary (in this repo)

- **Here:** contract YAML SSOT, catalog semantics, shared governance logic.
- **Elsewhere:** web apps, operational stores, lakehouse deploy, secrets, multi-tenant runtime.
- **Not here:** customer-facing AI, inference services, or third-party model resale. Internal operator AI (Cursor Agent / IDE) is not an Ambient Core deliverable.

Component priorities: [ECOSYSTEM.md](ECOSYSTEM.md).
