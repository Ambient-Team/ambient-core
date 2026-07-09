# Foundation vs full product

What you get from **this repository alone** versus what belongs in a **separate application repository** (UI, deploy, tenancy, operator secrets). Ecosystem context: [ECOSYSTEM.md](ECOSYSTEM.md).

## With only this repository

- Validate and load **data-product contracts** (`validate-contracts`, `ambient_contracts`).
- Author and generate the **reference catalog** (`ambient-catalog-generate`, `catalog/manifest.json`, `catalog/runtime/` JS).
- Run **governance pipeline** helpers under `lib/ambient_pipeline/` from a **git checkout** (pytest sets `pythonpath = lib`; see [USAGE.md](USAGE.md) for wheel vs checkout).
- Run **Maestro** locally (`lib/ambient_inference`, `services/maestro`).
- Fork or integrate contracts and catalog semantics without shipping a full SaaS stack.

## Not in this repository (typical downstream app)

- **Consumption UI** (web or mobile clients), API gateways tied to a specific vendor OLTP.
- **Lakehouse or warehouse deploy** (bundle definitions, scheduled jobs, workspace-specific notebooks).
- **App-specific pipeline glue** (secrets resolution, Firestore or tenant sync IDs, storage path conventions)—may live beside imported `ambient_pipeline` in the consumer repo.
- **Production inference deploy** — optional Compose, Postgres, and GPU backends wired in the consumer’s infra (see [inference-layer.md](inference-layer.md) for Maestro behavior defined here).
- Operator secrets, billing UI, and end-to-end tests against a live multi-tenant deployment.

## Source of truth

- **Contract YAML** — `contracts/` here; bundled under `lib/ambient_contracts/bundled/` for wheels.
- **Catalog YAML** — `catalog/` here; generated artifacts via `ambient-catalog-generate`.
- Consumers should **not** maintain a second editable copy of `contracts/` or `catalog/`; pin a tag and use submodule checkout or `AMBIENT_CORE_ROOT` ([INTEGRATING.md](INTEGRATING.md)).

## `commercial-usage-v1.yaml`

A **data contract** describing metering and usage shapes for BI or finance exports—not a statement that this OSS repo is a commercial product SKU.

## Read next

- [ECOSYSTEM.md](ECOSYSTEM.md) — components and priorities
- [USAGE.md](USAGE.md) — quick start
- [INTEGRATING.md](INTEGRATING.md) — pin a release in another repo
- [CONTRIBUTING.md](CONTRIBUTING.md) — releases and consumer follow-up
