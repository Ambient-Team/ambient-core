# Reference catalog (source tree)

Industry-neutral **reference data** for metrics, data-source templates, and benchmarks. YAML and schemas live here in **ambient-core**; this tree is **not** governed data-product contracts (`contracts/` at repo root).

**Authoring rules** (metric keys `industry.segment.slug`, segment enum, integer id bands, aliases, `calc` blocks): [docs/CONVENTIONS.md](../docs/CONVENTIONS.md).

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
- **`crosswalk.yaml`** — optional links from catalog metrics to `contracts/` products (several catalog industries, e.g. Banking and Financial Services, may link to the same `finance-*` Gold contracts).
- **`core/financial_sector_profiles.yaml`** — machine-readable FS sector comparison (revenue drivers, risk, regulation, capital model) for agents and UI; exported to `manifest.json` and `catalog/runtime/catalogSectorProfiles.js`.
- **`core/transportation_sector_profiles.yaml`** — multimodal transport and aviation sector comparison; exported to `manifest.json` (`transportationSectorProfiles`) and `TRANSPORTATION_SECTOR_PROFILES` in `catalog/runtime/catalogSectorProfiles.js`.
- **`manifest.json`** — machine-readable export for OLAP/ML (regenerated JSON; do not hand-edit).
- **`runtime/`** — generated JavaScript modules (regenerated; do not hand-edit except `catalogEnrichment.js`). Format roles: [docs/CONVENTIONS.md](../docs/CONVENTIONS.md#choosing-a-format).

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
- **Docs** — [docs/CONVENTIONS.md](../docs/CONVENTIONS.md), [docs/governed-data.md](../docs/governed-data.md), [docs/catalog-consumption.md](../docs/catalog-consumption.md), [docs/crosswalk.md](../docs/crosswalk.md).

## Terminology

**Industry (vertical pack)** — Asset or sector context (Real Estate, Manufacturing, Healthcare, …). One pack per row in [`core/industries.yaml`](core/industries.yaml). There is **no** catalog industry named FP&A. In product terms this is an **analysis lens**: which KPI templates and methodologies apply, not a legal entity label.

**Analysis lens** — The combination of catalog **industry pack**, metric **segment**, and optional **sector profile** (`sectorProfileIds` on a pack in `industries.yaml`). The lens answers which economic engine you are measuring and which peer cohort makes sense. It is **not** NAICS, a 10-K reportable segment name, or “what the company calls itself.”

**Tenant organization (platform)** — In a multi-tenant product, the unit that selects one primary catalog industry (and optional sector-profile subset), binds contracts and uploads, and joins a **peer group**. One real-world institution may map to **several** tenant orgs (for example branch real estate, consumer banking, and fee businesses as separate orgs). That mapping is **not** defined in this repository; see [docs/governed-data.md](../docs/governed-data.md) and [docs/CORE_VS_PLATFORM.md](../docs/CORE_VS_PLATFORM.md).

**Reporting entity vs lens** — Consolidated filings and stock prices blend multiple engines. The platform should attribute uploads and verified metrics to the org whose lens matches the **data’s economic engine** (real estate revaluation on a banking group belongs on a Real Estate org, not interpreted through banking NIM alone).

**Peer comparison** — Use `sectorProfileIds` and segment cohorts so each org is valued against others in **that** lens (for example branch real estate vs commercial RE peers, C&I commercial loan books vs other commercial finance peers, open-end and alternatives fund complexes vs **Funds** peers, listed REIT vehicles vs **Trusts** peers—not vs universal bank consolidated NIM, and not vs network carriers). Sector profile YAML holds comparison metadata only; see `financial_sector_profiles.yaml` and `transportation_sector_profiles.yaml`.

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

In a typical application, each tenant organization’s **vertical** (analysis lens) selects which expanded pack filters KPI templates (`resolveCatalogIndustry` in generated `catalogIndustries.js`). One legal reporting group may own **multiple** orgs with different verticals; user **department** does not change catalog resolution unless the app adds that layer.

## Boundaries

- **Catalog** — intent (what KPIs exist, what sources they need, field hints). [`benchmarks.yaml`](core/benchmarks.yaml) and sector profiles support **definitional** benchmarking and comparison design; peer gaps, structural versus improvable decomposition, and improvement workflows are **platform** concerns ([benchmarking-lifecycle.md](../docs/benchmarking-lifecycle.md)). The same metric definitions also underpin **assurance** and **investor disclosure** cycles on the platform ([work-cycles.md](../docs/work-cycles.md)).
- **Contracts** — physical Gold/data-product shapes and lineage (`../contracts/`).
- **Org operational store** — tenant state and verified values in a consumer app’s OLTP layer (not defined in this repo).

Hosted catalog API later replaces **transport** only; this folder remains the repo source of truth until then.
