# Canonical scope (this repository only)

This repository is the **single source of truth** for Ambient foundation assets. **Downstream application repositories must not** maintain a second copy of contract YAML, catalog YAML, generated catalog artifacts, Maestro source, or shared pipeline governance modules.

How to consume a release: [INTEGRATING.md](INTEGRATING.md).

## In scope (edit only here)

- **`contracts/`** — versioned data-product YAML (Gold-layer interfaces).
- **`catalog/`** — reference metrics, industries, benchmarks; `ambient-catalog-generate` output (`manifest.json`, `runtime/`).
- **`lib/ambient_contracts/`** — load and validate contracts (bundled YAML for wheels).
- **`lib/ambient_pipeline/`** — vendor-neutral governance (Silver validation, provenance, PII pseudonymization, catalog mapping, bronze helpers).
- **`lib/ambient_inference/`** + **`services/maestro/`** — model registry, router, council, OpenAI-compatible HTTP service, `maestro-run-v1` run contract.
- **`config/`** — Maestro model registry and routing defaults (overridable at deploy).
- **`lib/ambient_agent/`** — open agent extension point.
- **`lib/ambient_calc/`** — open-source reference calculator (safe evaluator + formula execution for catalogue metrics).
- **`lib/ambient_cli/`** — `validate-contracts`, `ambient-catalog-generate`, `validate-inference-registry`.
- **Scripts, tests, and CI** that validate and ship the above.

## Out of scope (belongs in a downstream product repo)

- Web or mobile **consumption apps**, vendor-specific OLTP rules and functions.
- **Lakehouse deploy** bindings (bundles, job definitions, environment-specific notebooks).
- Tenant **secrets**, production connection strings, commercial plan generators tied to one deployment.
- Vendor-specific **OLTP schema registries** (for example Firestore layout) that are not neutral data contracts.
- End-to-end tests against a full deployed multi-tenant SaaS stack.

A consumer **may** keep small **app-only** pipeline modules (for example Databricks workspace paths or a secrets helper) next to a pinned install of this package. Shared logic belongs here.

## Rules for maintainers

1. **One canonical version** — consumers pin a git tag `vX.Y.Z`; all contract/catalog/Maestro/pipeline changes merge here first, then tag, then bump consumers ([CONTRIBUTING.md](CONTRIBUTING.md#consumer-follow-up-after-a-release)).
2. **No mirrors** — do not copy `contracts/` or `catalog/` into another repo for editing; use submodule checkout or env paths (`AMBIENT_CORE_ROOT`, `AMBIENT_CATALOG_DIR`, `AMBIENT_CONTRACTS_DIR`).
3. **Bundled sync** — after editing `contracts/`, sync `lib/ambient_contracts/bundled/`; CI enforces parity.

## CI in this repo

- Contract YAML ↔ bundled package data sync.
- `validate-contracts`, `validate-inference-registry`, `ambient-catalog-generate --check`, `pytest`.

## Related

- [INTEGRATING.md](INTEGRATING.md) — import process for consumers
- [CONVENTIONS.md](CONVENTIONS.md) — catalogue keys, contract versions, formats and storage
- [ECOSYSTEM.md](ECOSYSTEM.md) — components and release flow
- [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md) — foundation vs full product
