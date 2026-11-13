# What this project is

Ambient Core is a standalone open-source library: industry metric and benchmark catalog packs, data contracts, three-statement and ratio calculations, a pandas Bronze/Silver/Gold pipeline, and a CLI.

How to consume a release: [INTEGRATING.md](INTEGRATING.md).

## In this repository

- **`contracts/`** — versioned data-product YAML.
- **`catalog/`** — reference metrics, industries, benchmarks; `ambient-catalog-generate` output (`manifest.json`, `runtime/`).
- **`lib/ambient_contracts/`** — load and validate contracts (bundled YAML for wheels).
- **`lib/ambient_pipeline/`** — Silver validation, provenance, PII pseudonymization, catalog mapping, and bronze helpers.
- **`lib/ambient_calc/`** and **`lib/ambient_statements/`** — reference calculations and statement integrity checks.
- **`lib/ambient_cli/`** — `validate-contracts`, `ambient-catalog-generate`.
- **`examples/sample/`** — fictional rows for the pandas smoke.
- **Scripts, tests, and CI** that validate and ship the above.

## Not in this repository

- Web or mobile applications, and vendor-specific operational rules.
- Job definitions, environment-specific notebooks, and deploy bindings.
- Tenant secrets and production connection strings.
- End-to-end tests against a deployed multi-tenant service.
- Customer-facing AI, inference, model hosting, or an agent runtime for end users. Do not add those here.

A consumer may keep small application-only modules next to a pinned install of this package. Shared contract, catalog, and pipeline logic belongs here.

## Rules for maintainers

1. **One canonical version** — consumers pin a git tag `vX.Y.Z`. Contract, catalog, and pipeline changes land here first, then a tag, then a pin bump ([CONTRIBUTING.md](CONTRIBUTING.md#consumer-follow-up-after-a-release)).
2. **No mirrors** — do not copy `contracts/` or `catalog/` into another repo for editing. Use a checkout or env paths (`AMBIENT_CORE_ROOT`, `AMBIENT_CATALOG_DIR`, `AMBIENT_CONTRACTS_DIR`).
3. **Bundled sync** — after editing `contracts/`, sync `lib/ambient_contracts/bundled/`. CI enforces parity.

## CI in this repo

- Contract YAML matches bundled package data.
- `validate-contracts`, `ambient-catalog-generate --check`, and `pytest`.

## Related

- [INTEGRATING.md](INTEGRATING.md) — import process for consumers
- [CONVENTIONS.md](CONVENTIONS.md) — catalogue keys, contract versions, formats, and storage
- [ECOSYSTEM.md](ECOSYSTEM.md) — components and release flow
