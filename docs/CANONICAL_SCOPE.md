# Canonical scope (ambient-core only)

This repository is the **single source of truth** for open Ambient foundation assets. Downstream repos (for example [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)) must **not** maintain a second copy of contract YAML, catalog YAML, generated catalog artifacts, Maestro source, or shared pipeline governance modules.

How to consume a release: [INTEGRATING.md](INTEGRATING.md).

## In scope (edit only here)

- **`contracts/`** — versioned data-product YAML (Gold-layer interfaces).
- **`catalog/`** — reference metrics, industries, benchmarks; `ambient-catalog-generate` output (`manifest.json`, `runtime/`).
- **`lib/ambient_contracts/`** — load and validate contracts (bundled YAML for wheels).
- **`lib/ambient_pipeline/`** — vendor-neutral governance (Silver validation, provenance, PII pseudonymization, catalog mapping, bronze helpers).
- **`lib/ambient_inference/`** + **`services/maestro/`** — model registry, router, council, OpenAI-compatible HTTP service, `maestro-run-v1` run contract.
- **`config/`** — Maestro model registry and routing defaults (overridable at deploy).
- **`lib/ambient_agent/`** — open agent extension point (non-commercial).
- **`lib/ambient_cli/`** — `validate-contracts`, `ambient-catalog-generate`, `validate-inference-registry`.
- **Scripts, tests, and CI** that validate and ship the above.

## Out of scope (belongs in the platform or vault)

- React / consumption UI (`src/`), Firebase rules, Cloud Functions OLTP glue.
- Databricks Asset Bundles, medallion notebooks, lakehouse deploy (`databricks.yml`, `olap/` deploy bindings).
- Tenant secrets, production connection strings, commercial plan JSON generators.
- Firestore-specific schema registry (`schemas/firestore/` stays with the platform).
- End-to-end tests against a full deployed SaaS stack.

Platform **may** keep `olap/lib/ambient_pipeline/` modules that are **only** Databricks/Firestore/deploy glue. Shared logic must live in core and be imported via pinned `ambient-core` (see [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md)).

## Rules for maintainers

1. **One canonical version** — consumers pin a git tag `vX.Y.Z`; all contract/catalog/Maestro/pipeline changes merge here first, then tag, then bump consumers ([CONTRIBUTING.md](CONTRIBUTING.md#platform-follow-up-after-core-merge)).
2. **No mirrors** — do not copy `contracts/` or `catalog/` into another repo for editing; use submodule checkout or env paths (`AMBIENT_CORE_ROOT`, `AMBIENT_CATALOG_DIR`, `AMBIENT_CONTRACTS_DIR`).
3. **Bundled sync** — after editing `contracts/`, sync `lib/ambient_contracts/bundled/`; CI enforces parity.

## CI in this repo

- Contract YAML ↔ bundled package data sync.
- `validate-contracts`, `validate-inference-registry`, `ambient-catalog-generate --check`, `pytest`.

## Related

- [INTEGRATING.md](INTEGRATING.md) — import process for any consumer
- [ECOSYSTEM.md](ECOSYSTEM.md) — three-repo map and release flow
- [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md) — responsibility split
