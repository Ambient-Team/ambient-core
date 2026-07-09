# Catalog crosswalk

The crosswalk records **optional** links between reference catalog metrics and governed **data-product contracts**. It does not define new metrics or schemas.

Source file: [catalog/crosswalk.yaml](../catalog/crosswalk.yaml). Broader context: [governed-data.md](governed-data.md). End-to-end catalog → Silver → Gold flow: [contracts/README.md — How catalog and contracts connect](../contracts/README.md#how-catalog-and-contracts-connect). Prefer **canonical** catalogue keys (`industry.segment.slug`) in new links when the manifest exposes them; legacy `catalogMetricKey` values remain valid during the alias deprecation window ([CONVENTIONS.md](CONVENTIONS.md#alias-policy)).

## Why it exists

Many catalog metrics describe KPI **intent** before a Gold product exists. When a contract governs the physical shape (for example [tenant-metrics-v1.yaml](../contracts/tenant-metrics-v1.yaml)), the crosswalk documents which manifest metric maps to which contract file and product id for integrators, docs, and app logic.

## When to add a link

- **Upload-backed metrics** that land in Silver — usually [tenant-metrics-v1.yaml](../contracts/tenant-metrics-v1.yaml) with `contractProductId` such as `TENANT_METRICS`.
- **Gold rollups** with dedicated schema — point `contractFile` at the matching vertical product (for example `finance-commercial-finance-v1.yaml`, `healthcare-provider-ops-v1.yaml`). Several catalog industry packs can share one `finance-*` file; use the product id your platform binds to org entitlements.
- **Skip the crosswalk** when the metric is catalog-only (methodology, benchmarks) and no persisted contract column set exists yet.

After catalog metric or id changes, confirm `catalogMetricKey` and `metricId` still match a row in `manifest.json` before release.

## Entry fields

Each item under `links:`:

- **`catalogMetricKey`** — stable key from `manifest.json` (e.g. `1cvcTcHNt1VYX867UUG7`)
- **`metricId`** — numeric `id` from the same manifest row (sanity check for humans/tools)
- **`contractFile`** — basename under `contracts/` (e.g. `tenant-metrics-v1.yaml`)
- **`contractProductId`** — logical product id in your stack (e.g. Firestore `logical_key` / consumption id such as `TENANT_METRICS`)

## Example in this repo

Debt Service Coverage Ratio (DSCR) in the Real Estate pack:

- `catalogMetricKey`: `1cvcTcHNt1VYX867UUG7`
- `metricId`: `8`
- `contractFile`: `tenant-metrics-v1.yaml`
- `contractProductId`: `TENANT_METRICS`

## Maintainer workflow

1. Edit `catalog/crosswalk.yaml`.
2. Run `python scripts/check_crosswalk.py` (also enforced in CI).
3. Regenerate `catalog/manifest.json` only when linked **metrics** or catalog YAML changed — `ambient-catalog-generate --check`. Crosswalk is not embedded in the manifest.

## Who reads it today

- **Integrator apps and docs** — load links in Python with `ambient_contracts.crosswalk.load_crosswalk_links()` (reads `catalog/crosswalk.yaml` next to the manifest), or embed links in your own registry.
- **Core agent builtins** — do **not** read the crosswalk; agents use `catalog_*` and `contracts_*` tools against manifest and contract files directly.

## Related

- [catalog-consumption.md](catalog-consumption.md) — manifest vs industry YAML
- [contracts/README.md](../contracts/README.md) — data-product SSOT and product inventory
