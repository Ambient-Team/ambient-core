# Contributing to ambient-core

Start with [ECOSYSTEM.md](ECOSYSTEM.md) for how this repo relates to the private **ambient-systems** vault and **ambient-systems-platform**. Strategy and commercial playbook stay in the vault; SaaS UI and lakehouse deploy stay in the platform.

Integrator quick start (no platform clone): [USAGE.md](USAGE.md). Core vs platform split: [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md).

## Scope

This repository is **open and reusable** without the Ambient SaaS platform. Put foundational, general-purpose assets here:

- Data-product **contracts** (`contracts/`)
- **Catalog** YAML and generator output (`catalog/`)
- **Governance** helpers (`lib/ambient_pipeline/` — validation, provenance, catalog rules)
- **Inference** (`lib/ambient_inference/`, `services/maestro/`)
- **Agent** extension point (`lib/ambient_agent/`)
- **CLI** entrypoints (`validate-contracts`, `ambient-catalog-generate`, etc.)

SaaS-only UI, Firebase, Databricks deploy bindings, and commercial plans stay in [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform).

## Development setup

```bash
git clone https://github.com/Ambient-Team/ambient-core.git
cd ambient-core
py -3.12 -m venv .venv
pip install -e ".[all]"
validate-contracts
pytest
```

## Contract changes

1. Edit YAML under `contracts/`.
2. Copy to bundled package data: `cp contracts/*.yaml lib/ambient_contracts/bundled/` (CI enforces sync).
3. Run `validate-contracts`.

## Catalog changes

1. Edit YAML under `catalog/`.
2. Run `ambient-catalog-generate` (or `python scripts/generate_reference_catalog.py`).
3. Run `ambient-catalog-generate --check` before pushing.

## Releases

Tag `vX.Y.Z` on `main`; then complete **Platform follow-up** below.

## Platform follow-up (after core merge)

- Tag **`vX.Y.Z`** on `main` in ambient-core.
- Platform PR: bump **`ambient-core @ git+…@vX.Y.Z`** in `pyproject.toml` (`core` / `inference`) and Maestro Docker pin if used.
- Update **`ambient-core/` submodule** (if used); run **`ambient-catalog-generate --check`** when the app imports `catalog/runtime/`.
- Drop or sync duplicate **`contracts/`** at platform root (SSOT is here).
- Run platform CI per `docs/testing.md` (`validate-contracts`, catalog validate, pytest).

## How packages fit (maintainers)

- **Pip / git tag** — `ambient_contracts`, `ambient_inference`, `ambient_cli`, `ambient_agent` (+ bundled YAML). Bump tag when APIs or contracts change.
- **Submodule / checkout** — `catalog/`, `lib/ambient_pipeline/` on disk. Bump SHA when manifest, runtime JS, or checkout-only pipeline code changes.
- **`ambient-pipeline` (platform `olap/lib/`)** — Databricks/Firestore-only glue; depends on pinned `ambient-core`. Merge shared changes from `lib/ambient_pipeline/` here when modules overlap.

**Rule of thumb:** tag → Python + bundled contracts; submodule → catalog artifacts; manual merge → overlapping pipeline files.
