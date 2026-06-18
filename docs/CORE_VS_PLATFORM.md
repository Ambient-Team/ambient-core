# Core vs platform

When to use **ambient-core** alone versus **[ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)**. Ecosystem context: [ECOSYSTEM.md](ECOSYSTEM.md).

## With only ambient-core (MIT, this repo)

- Validate and load **data-product contracts** (`validate-contracts`, `ambient_contracts`).
- Author and generate the **reference catalog** (`ambient-catalog-generate`, `catalog/manifest.json`, optional `catalog/runtime/` JS).
- Run **governance pipeline** helpers under `lib/ambient_pipeline/` from a **git checkout** (pytest sets `pythonpath = lib`; see [USAGE.md](USAGE.md) for wheel vs checkout).
- Run **Maestro** locally (`lib/ambient_inference`, `services/maestro`).
- Fork or integrate contracts/catalog semantics without Firebase or Databricks.

## Requires ambient-systems-platform (private)

- **Consumption app** (React), Cloud Functions, Firestore rules and OLTP mirror.
- **Databricks** Asset Bundles, medallion notebooks, lakehouse deploy (`databricks.yml`, `olap/`).
- **Platform `ambient_pipeline`** in `olap/lib/` — Databricks/Firestore glue not in the open wheel (for example `secrets`, `firestore_sync_ids`, `medallion_bridge`, `storage_paths`).
- **Production-like inference stack** — optional Docker Compose with Postgres + Ollama (see [inference-layer.md](inference-layer.md)).
- Operator secrets, external resource allowlist, and SaaS deploy paths.

## Source of truth

- **Contract YAML** — `contracts/` in ambient-core; bundled under `lib/ambient_contracts/bundled/` for wheels.
- **Catalog YAML** — `catalog/` in ambient-core; generated artifacts via `ambient-catalog-generate`.
- Platform **consumes** core via **git-pinned pip** (`ambient-core @ git+…@vX.Y.Z`) and/or git submodule at `ambient-core/` at the **same tag**. Do not keep a second `contracts/` or `catalog/` tree in the platform repo ([INTEGRATING.md](INTEGRATING.md)).

## Commercial wording

- Ambient Systems **commercial activity is frozen**; the live stack is a technical moat, not an active OSS product SKU.
- **ambient-systems-platform** is where operators deploy the full SaaS and lakehouse.
- **`commercial-usage-v1.yaml`** in `contracts/` is a **data contract** (metering/usage shape), not a statement that ambient-core is the paid product.

## Read next

- [ECOSYSTEM.md — Purpose and platform connection](ECOSYSTEM.md#purpose-and-platform-connection) — component table and maintainer priorities
- [USAGE.md](USAGE.md) — integrator quick start without cloning the platform
- [CONTRIBUTING.md](CONTRIBUTING.md) — core changes and platform follow-up checklist
