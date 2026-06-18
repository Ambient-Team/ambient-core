# Ambient Core — Architecture

Vendor-neutral **open foundation** for contracts, catalog, governance, and inference. The SaaS platform adds OLTP consumption, Databricks bundle deploy, and commercial packaging.

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping
- **`ambient_inference`** — Maestro registry, router, council, run store
- **`ambient_agent`** — reserved for lightweight open agent runtime (extension point)
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated)
- **`catalog/`** — reference metrics, industry packs, benchmarks; `npm run catalog:generate` equivalent is `ambient-catalog-generate`
- **`config/`** — Maestro model registry and routing (inference)
- **`services/maestro/`** — headless HTTP API
- **`docs/`** — manuals (`inference-layer.md`, this file, `CONTRIBUTING.md`)

## Consumers

**ambient-systems-platform** installs `ambient-core` via pip (pinned git tag) or git submodule at `ambient-core/` for visible checkout + catalog JS imports.

## Layer boundary

- Core: contracts, catalog semantics, governance logic, Maestro API
- Platform: React app, Firestore mirror, Databricks jobs, secrets, external resource allowlist
