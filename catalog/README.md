# Reference catalog (source tree)

Industry-neutral **reference data** for metrics, data-source templates, and benchmarks. YAML and schemas live here in **ambient-core**; this tree is **not** governed data-product contracts (`contracts/` at repo root).

## Layout

- **`core/`** — cross-industry YAML (benchmarks, bridge rules, [`industries.yaml`](core/industries.yaml) registry).
- **`core/shared/`** — templates expanded into every industry pack at generate time:
  - [`core_metrics.yaml`](core/shared/core_metrics.yaml) — the shared **core** metric layer (financial close metrics plus the universal operational input `headcount`) with machine-readable `calc` formulas; expanded into every industry as `<industry>.core.<slug>`.
  - [`core_ids.yaml`](core/shared/core_ids.yaml) — stable numeric ids per vertical for each core-metric slug.
  - [`common_data_options.yaml`](core/shared/common_data_options.yaml) — shared input data sources expanded into every pack.
  - [`catalog_input_field_policy.yaml`](core/shared/catalog_input_field_policy.yaml) — excluded/derived fields and the PHI denylist.
  - [`common_data_options.yaml`](core/shared/common_data_options.yaml) — Financial statements, HR, accounting, payroll templates with `metricRefs` by metric name.
- **`industries/`** — one YAML file per vertical (`real_estate.yaml`, …). Shape: `industry`, `metrics`, `dataOptions` for **sector-specific** entries only; shared close metrics and common options are not duplicated here.
- **`schema/`** — JSON Schema for metrics ([`metric-v1.json`](schema/metric-v1.json)) and data options ([`data-option-v1.json`](schema/data-option-v1.json)).
- **`crosswalk.yaml`** — optional links from catalog metrics to `contracts/` products.
- **`manifest.json`** — machine-readable export for OLAP/ML (regenerated).
- **`runtime/`** — generated JS modules (do not hand-edit except `catalogEnrichment.js`).

## Commands

From an ambient-core checkout with `pip install -e .`:

```bash
ambient-catalog-generate              # YAML → catalog/runtime/*.js + manifest.json
ambient-catalog-generate --check      # fail if generated output is stale (CI)
```

Equivalent: `python scripts/generate_reference_catalog.py` (and `--check`).

Edit YAML under `industries/` and `core/`; regenerate after changes.

## Consumers

- **Integrators** — use `manifest.json` and Python loaders (`ambient_pipeline.catalog_loader`, `AMBIENT_CATALOG_DIR`); or bundle `runtime/` into your own app.
- **Monorepo consumers** — import generated JS from a pinned `ambient-core/catalog/runtime/` checkout (single app bridge module is a common pattern).
- **Docs** — [docs/governed-data.md](../docs/governed-data.md), [docs/catalog-consumption.md](../docs/catalog-consumption.md), [docs/crosswalk.md](../docs/crosswalk.md).

## Terminology

**Industry (vertical pack)** — Asset or sector context (Real Estate, Manufacturing, Healthcare, …). One pack per row in [`core/industries.yaml`](core/industries.yaml). There is **no** catalog industry named FP&A.

**FP&A (product function)** — Financial planning and analysis **across** verticals: close packs, covenant liquidity, board reporting, and similar. Expressed in catalog metadata (`fpaWorkflow`, benchmarks). FP&A is not a second industry dimension on top of the org vertical.

**User role (department)** — Optional app-level dimension (Finance, Marketing, Operations, and so on). Not used to resolve the reference catalog in the generator; future role-based rules would be a separate layer in a consumer app.

**`core/shared/core_metrics.yaml`** — The shared **core** layer: the corporate-finance / close suite plus the universal operational input `headcount`, copied into every vertical with distinct numeric ids and keyed `<industry>.core.<slug>` (e.g. `manufacturing.core.current_ratio`). Each metric’s `industry` field is the vertical (e.g. Manufacturing); `core` is the shared layer every vertical extends, and FP&A is a consuming function, not an industry.

**`industryTags` on metrics** — Search and enrichment taxonomy (`Corporate Finance`, `SaaS`, `All`, …). These are not catalog industry values. Generator validation rejects tags that name a **different** registered vertical than `metric.industry`.

**`metricRefs` on common data options** — Metric names resolved to numeric ids **within the same vertical** after expansion (see [`common_data_options.yaml`](core/shared/common_data_options.yaml)).

## Expansion rules

At generate time, for each pack listed in `core/industries.yaml`:

1. **Cross-industry core metrics** — merge templates from `core/shared/core_metrics.yaml`, assign `id` from `core_ids.yaml`, set `industry` to the vertical pack, and use catalog keys `<industry>.core.<slug>` (e.g. `manufacturing.core.current_ratio`). Do not register FP&A in `industries.yaml` — `core` is a layer, not an industry.
2. **Common data options** — merge templates from `common_data_options.yaml`, resolve `metricRefs` to numeric ids in that vertical, assign option ids from `optionIds`.
3. **Pack YAML wins** — entries in `industries/*.yaml` override expanded keys on conflict.

Validation enforces globally unique ids, same-industry `metricIds` on data options, benchmark keys, and minimum metrics/options per industry **after** expansion.

## Add a new industry pack

1. Add a registry row in [`core/industries.yaml`](core/industries.yaml) (`file`, optional `displayLabel`).
2. Create [`industries/your_sector.yaml`](industries/) with vertical-specific `metrics` and `dataOptions` only.
3. Add core-metric id rows for the new vertical in [`core_ids.yaml`](core/shared/core_ids.yaml) (one id per slug in `core_metrics.yaml`; keep ids unique across the whole catalog).
4. Add common data-option ids in [`common_data_options.yaml`](core/shared/common_data_options.yaml) under `optionIds`, plus any `metricRefs` overrides under `metricRefs.{IndustryName}` when defaults do not apply.
5. Run `ambient-catalog-generate` and fix validation errors.

## Downstream consumption

In a typical application, organization **vertical** (industry profile) selects which expanded pack filters KPI templates (`resolveCatalogIndustry` in generated `catalogIndustries.js`). User **department** does not change catalog resolution unless the app adds that layer.

## Boundaries

- **Catalog** — intent (what KPIs exist, what sources they need, field hints).
- **Contracts** — physical Gold/data-product shapes and lineage (`../contracts/`).
- **Org operational store** — tenant state and verified values in a consumer app’s OLTP layer (not defined in this repo).

Hosted catalog API later replaces **transport** only; this folder remains the repo source of truth until then.
