# Foundation vs full product

What you get from **this repository alone** versus what belongs in a **separate application repository** (UI, deploy, tenancy, operator secrets). Ecosystem context: [ECOSYSTEM.md](ECOSYSTEM.md).

## With only this repository

- Validate and load **data-product contracts** (`validate-contracts`, `ambient_contracts`).
- Author and generate the **reference catalog** (`ambient-catalog-generate`, `catalog/manifest.json`, `catalog/runtime/` JS).
- Run **governance pipeline** helpers under `lib/ambient_pipeline/` from a **git checkout** (pytest sets `pythonpath = lib`; see [USAGE.md](USAGE.md) for wheel vs checkout).
- Fork or integrate contracts and catalog semantics without shipping a full SaaS stack.

## Not in this repository (typical downstream app)

- **Consumption UI** (web or mobile clients), API gateways tied to a specific vendor OLTP.
- **Lakehouse or warehouse deploy** (bundle definitions, scheduled jobs, workspace-specific notebooks).
- **App-specific pipeline glue** (secrets resolution, Firestore or tenant sync IDs, storage path conventions)—may live beside imported `ambient_pipeline` in the consumer repo.
- **Customer-facing AI / inference / model hosting** — not shipped from this MIT core. Future proprietary AI/ML, if any, belongs only in the commercial platform application.
- **Business-line organizations** — splitting a conglomerate into multiple tenant orgs, each with its own catalog industry, contracts, uploads, and peer set; optional holding-company rollup is platform analytics, not a second catalog industry in core.
- **Benchmark gap decomposition and improvement workflows** — peer actuals storage, structural versus improvable waterfall/bridge UI, normalization policy, and post-benchmark action tracking on top of core metrics and contracts; see [benchmarking-lifecycle.md](benchmarking-lifecycle.md).
- **Assurance and attestation workflows** — control packs, evidence sign-off, DQ and bridge reconciliation UI, external reviewer exports; see [assurance-lifecycle.md](assurance-lifecycle.md).
- **Investor disclosure and fundraising workflows** — mandate mapping, gap-to-requirement, data-room and remediation narratives; see [investor-disclosure-lifecycle.md](investor-disclosure-lifecycle.md).
- **Planning and variance workflows** — plan versions, scenarios, and variance bridges vs actuals; see [planning-variance-lifecycle.md](planning-variance-lifecycle.md).
- Operator secrets, billing UI, and end-to-end tests against a live multi-tenant deployment.

## Source of truth

- **Contract YAML** — `contracts/` here; bundled under `lib/ambient_contracts/bundled/` for wheels.
- **Catalog YAML** — `catalog/` here; generated JSON manifest and JS via `ambient-catalog-generate`.
- **Plain text first** — definitions and semantics live in git as YAML (and generated JSON); binary uploads and live databases are precursors or forward stores, not a second SSOT ([CONVENTIONS.md](CONVENTIONS.md)).
- Consumers should **not** maintain a second editable copy of `contracts/` or `catalog/`; pin a tag and use submodule checkout or `AMBIENT_CORE_ROOT` ([INTEGRATING.md](INTEGRATING.md)).
- **Platform deployments** wire precursor OLTP/Bronze and forward lakehouse **instances**; core still owns the YAML definitions those stores implement.

## `commercial-usage-v1.yaml`

A **data contract** describing metering and usage shapes for BI or finance exports—not a statement that this OSS repo is a commercial product SKU.

## Read next

- [ECOSYSTEM.md](ECOSYSTEM.md) — components and priorities
- [USAGE.md](USAGE.md) — quick start
- [INTEGRATING.md](INTEGRATING.md) — pin a release in another repo
- [CONTRIBUTING.md](CONTRIBUTING.md) — releases and consumer follow-up
- [CONVENTIONS.md](CONVENTIONS.md) — naming, formats, and storage
