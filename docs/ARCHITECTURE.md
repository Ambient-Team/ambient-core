# Ambient Core — Architecture

Vendor-neutral **open foundation** for contracts, catalog, governance, and inference. The SaaS platform adds OLTP consumption, Databricks bundle deploy, and commercial packaging.

Ecosystem overview: [ECOSYSTEM.md](ECOSYSTEM.md).

## Packages (Python)

- **`ambient_contracts`** — load and validate `contracts/*.yaml`
- **`ambient_pipeline`** — ISO 8000 Silver validation, provenance stamping, catalog loaders, bronze mapping (source in `lib/`; see [USAGE.md](USAGE.md) for wheel vs checkout)

The installable wheel ships **`ambient_contracts`**, **`ambient_inference`**, **`ambient_cli`**, and **`ambient_agent`** per `pyproject.toml`. **`ambient_pipeline`** is exercised from a git checkout in tests; platform OLAP may use overlapping modules under `olap/lib/ambient_pipeline`.
- **`ambient_inference`** — Maestro registry, router, council, run store
- **`ambient_agent`** — reserved for lightweight open agent runtime (extension point)
- **`ambient_cli`** — `validate-contracts`, `ambient-catalog-generate` wrappers

## Repository trees

- **`contracts/`** — data-product interfaces (CI-validated); **YAML source of truth for open packages**
- **`catalog/`** — reference metrics, industry packs, benchmarks; `ambient-catalog-generate` replaces platform `catalog:generate`
- **`config/`** — Maestro model registry and routing (inference)
- **`services/maestro/`** — headless HTTP API
- **`docs/`** — manuals (`USAGE.md`, `CORE_VS_PLATFORM.md`, `ECOSYSTEM.md`, `inference-layer.md`, this file, `CONTRIBUTING.md`)

## Consumers

- **[ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)** — installs `ambient-core` via pip (pinned git tag) or git submodule at `ambient-core/` for checkout visibility and catalog JS imports. Platform OLAP/OLTP bind to contracts and catalog semantics defined here.
- **Downstream integrators** — `pip install` / editable install without the platform repo.
- **[ambient-systems](https://github.com/Ambient-Team/ambient-systems)** (private vault) — documents operator journey and roadmap; human contract catalog may lag YAML SSOT in this repo during transition.

The platform may still mirror `contracts/` at its repo root while migration completes; **authoritative contract edits belong in `contracts/` here**, then sync bundled copies and platform pins per [CONTRIBUTING.md](CONTRIBUTING.md).

## Layer boundary

- **Core (this repo):** contract YAML SSOT, catalog semantics, governance logic, Maestro API and run contract
- **Platform:** React app, Firestore mirror, Databricks jobs, secrets, external resource allowlist, deploy bundles
- **Vault:** doctrine, master strategy, confidential finance/legal—not runtime code

Component priorities and platform tie-in: [ECOSYSTEM.md — Purpose and platform connection](ECOSYSTEM.md#purpose-and-platform-connection).
