# Catalog crosswalk

The crosswalk records **optional** links between reference catalog metrics and governed **data-product contracts**. It does not define new metrics or schemas.

Source file: [catalog/crosswalk.yaml](../catalog/crosswalk.yaml). Broader context: [governed-data.md](governed-data.md). Prefer **canonical** catalogue keys (`industry.segment.slug`) in new links when the manifest exposes them; legacy `catalogMetricKey` values remain valid during the alias deprecation window ([CONVENTIONS.md](CONVENTIONS.md#alias-policy)).

## Why it exists

Many catalog metrics describe KPI **intent** before a Gold product exists. When a contract governs the physical shape (for example [tenant-metrics-v1.yaml](../contracts/tenant-metrics-v1.yaml)), the crosswalk documents which manifest metric maps to which contract file and product id for integrators, docs, and app logic.

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
2. Run `ambient-catalog-generate` (or `python scripts/generate_reference_catalog.py`) if your release process regenerates catalog artifacts after crosswalk changes.
3. Run `ambient-catalog-generate --check` in CI.

## Who reads it today

- **Integrator apps and docs** — load links in Python with `ambient_contracts.crosswalk.load_crosswalk_links()` (reads `catalog/crosswalk.yaml` next to the manifest), or embed links in your own registry.
- **Core agent builtins** — do **not** read the crosswalk; agents use `catalog_*` and `contracts_*` tools against manifest and contract files directly.

## Related

- [catalog-consumption.md](catalog-consumption.md) — manifest vs industry YAML
- [contracts/README.md](../contracts/README.md) — data-product SSOT
