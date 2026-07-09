# Ambient Core — Architecture

Vendor-neutral **open foundation** for contracts, catalog, governance, and inference. Full products add OLTP consumption, lakehouse deploy, and operator packaging in **other repositories** that pin a release of this tree.

Overview: [ECOSYSTEM.md](ECOSYSTEM.md).

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping (source in `lib/`; see [USAGE.md](USAGE.md) for wheel vs checkout)

The installable wheel ships **`ambient_contracts`**, **`ambient_inference`**, **`ambient_cli`**, and **`ambient_agent`** per `pyproject.toml`. **`ambient_pipeline`** is exercised from a git checkout in tests; consumers may add app-specific modules alongside a pinned install.

- **`ambient_inference`** — Maestro registry, router, council, run store (control plane; see [inference-layer.md](inference-layer.md) § control plane vs data plane)
- **`ambient_agent`** — reserved for lightweight open agent runtime (extension point)
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated); YAML source of truth — [contracts/README.md](../contracts/README.md)
- **`catalog/`** — reference metrics, industry packs, benchmarks; `ambient-catalog-generate` → JSON `manifest.json` and generated `runtime/*.js`
- **`config/`** — Maestro model registry and routing (inference)
- **`services/maestro/`** — headless HTTP API
- **`docs/`** — manuals (`USAGE.md`, `CONVENTIONS.md`, `CORE_VS_PLATFORM.md`, `ECOSYSTEM.md`, `inference-layer.md`, this file, `CONTRIBUTING.md`)

Together, `contracts/`, `catalog/`, and `config/` are the **plain-text SSOT layer** in git; precursor OLTP/Bronze and forward Parquet/Delta or Maestro SQL live in deployment ([CONVENTIONS.md](CONVENTIONS.md), [governed-data.md](governed-data.md)).

## Consumers

- **This clone** — develop contracts, catalog, pipeline, and Maestro; run CI and tests.
- **Downstream integrators** — `pip install` or git submodule at a **tag**; see [INTEGRATING.md](INTEGRATING.md).
- **Authoritative edits** — always in `contracts/` and `catalog/` here; sync bundled copies per [CONTRIBUTING.md](CONTRIBUTING.md).

## Layer boundary (in this repo)

- **Here:** contract YAML SSOT, catalog semantics, shared governance logic, Maestro API and run contract.
- **Elsewhere:** web apps, operational stores, lakehouse deploy, secrets, multi-tenant runtime.

Component priorities: [ECOSYSTEM.md](ECOSYSTEM.md).
