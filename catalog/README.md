# Reference catalog (source tree)

Industry-neutral **reference data** for metrics, data-source templates, and benchmarks. YAML and schemas live here in **ambient-core**; this tree is **not** governed data-product contracts (`contracts/` at repo root).

**Authoring rules** (metric keys `industry.segment.slug`, segment enum, integer id bands, aliases, `calc` blocks): [docs/CONVENTIONS.md](../docs/CONVENTIONS.md).

## Layout

- **`packs.yaml`** — registry of vertical packs (`defaultIndustry`, `packs[]` with `pack`, optional `displayLabel`).
- **`shared/`** — industry-agnostic templates expanded into every pack at generate time:
 - **`metrics.yaml`** — `templates` (close / corporate-finance metrics + `headcount`) and `industryIds` (numeric id per vertical per template slug).
 - **`data_options.yaml`** — `dataOptionTemplates` and per-vertical `optionIds`; `metricRefs` resolve within each pack after expansion.
- **`industries/<pack_id>/`** — one directory per vertical (see [packs.yaml](packs.yaml)):
 - **`pack.yaml`** — `industry:` display name and **`industryCodes`** (ISIC, NAICS, NACE, GICS); see [Industry classification](#industry-classification).
 - **`metrics.yaml`** — vertical-native KPI definitions (`metrics:` map).
 - **`data_options.yaml`** — upload / mapping templates (`dataOptions:` map); link to KPIs via `metricIds`.
 - **`benchmarks.yaml`** — healthy bands for this vertical (`benchmarks:` map); referenced by `benchmarkKey` on metrics in this pack (including expanded shared metrics).
- **`input_field_policy.yaml`** — excluded/derived fields and PHI denylist for catalogue fields.
- **`bridge_rules.yaml`** — cross-industry narrative hints (operational ↔ financial); exported to `metricBridgeHints.js`.
- **`schema/`** — JSON Schema for metrics, data options, packs ([`pack-v1.json`](schema/pack-v1.json)), and manifest.
- **`crosswalk.yaml`** — optional links from catalog metrics to `contracts/` products.
- **`manifest.json`** — machine-readable export (regenerated; do not hand-edit); manifest **`version` 3** exports `industryCodes` on each industry row, typed **`fields`** on data options, **`collectionFrequency`** / **`grain`**, and metric **`frequency`**.
- **`runtime/`** — generated JavaScript (regenerated; hand-edit only `catalogEnrichment.js` when documented below).

## Industry classification

Every pack must declare **`industryCodes`** in [`pack.yaml`](industries/banking/pack.yaml) (also exported on each industry in `manifest.json`):

- **ISIC** (UN, Rev.4) — primary at **class** (4-digit); optional up to two `secondary` classes.
- **NAICS** (U.S. Census, 2022) — primary at **5–6 digit** industry.
- **NACE** (Eurostat, Rev.2) — primary at **class** `NN.NN`; optional secondaries.
- **GICS** (MSCI, 2023) — primary at **industry or sub-industry** (6–8 digits).

Each block has `revision`, `primary`, and optional `secondary` (max 2). Pack-level metadata: `confidence` (`high` | `medium` | `low` | `provisional`), `lastReviewed` (ISO date), `source` (`manual` | `expert` | `imported`). Division-level codes are allowed only when `confidence: provisional` (queue for class-level review in [docs/catalog-industry-coverage.md](../docs/catalog-industry-coverage.md)).

Peer cohorts and “analysis lens” in product UIs should use these official codes—not ad hoc sector profile ids.

## Commands

From an ambient-core checkout with `pip install -e .`:

```bash
ambient-catalog-generate # YAML → catalog/runtime/*.js + manifest.json (v3)
ambient-catalog-generate --check # fail if generated output is stale (CI)
```

Equivalent: `python scripts/generate_reference_catalog.py` (and `--check`).

Edit YAML under `shared/` and `industries/<pack>/`; regenerate after changes.

**Hardening (all packs):** after bulk edits, run `python scripts/harden_catalog_data_options.py --write` to set `fieldCoverage`, typed `fields`, and `collectionFrequency` / `grain`, and to append missing columns on **enumerated** options. CI runs `--check` plus strict generate validation.

## Expansion rules

At generate time, for each pack listed in `packs.yaml`:

1. **Shared metrics** — merge `shared/metrics.yaml` templates, assign `id` from `industryIds`, set `industry` to the vertical, keys `<industry_token>.core.<slug>`.
2. **Shared data options** — merge `shared/data_options.yaml` templates, resolve `metricRefs` to numeric ids in that vertical, assign option ids from `optionIds`.
3. **Pack YAML wins** — native entries in `industries/<pack>/` override expanded keys on conflict.

Validation enforces globally unique ids, same-industry `metricIds` on data options, per-pack `benchmarkKey` → `benchmarks.yaml`, class-level `industryCodes`, and minimum metrics/options per industry **after** expansion. CI runs [`scripts/harden_catalog_data_options.py`](../scripts/harden_catalog_data_options.py) `--check` and generate with **`--strict-data-option-inputs`** (enumerated options must cover measured fields).

## Add a new industry pack

1. Add a row in [packs.yaml](packs.yaml) (`pack: your_pack`, optional `displayLabel`).
2. Create [industries/your_pack/](industries/) with `pack.yaml` (including `industryCodes`), `metrics.yaml`, `data_options.yaml`, and `benchmarks.yaml`.
3. Add `industryIds` rows for the new vertical in [shared/metrics.yaml](shared/metrics.yaml) (one id per template slug).
4. Add `optionIds` for the vertical in [shared/data_options.yaml](shared/data_options.yaml).
5. Run `ambient-catalog-generate` and fix validation errors; update [docs/catalog-industry-coverage.md](../docs/catalog-industry-coverage.md).

## Consumers

- **Integrators** — `manifest.json`, `load_manifest()`, `AMBIENT_CATALOG_DIR`; or bundle `runtime/` in your app.
- **Data → KPIs** — each metric in the manifest carries `requiredSources`, `inputs`, and `inputCoverage`; see [docs/catalog-consumption.md](../docs/catalog-consumption.md).
- **Optional ingest assist** — [docs/catalog-consumption.md](../docs/catalog-consumption.md) (mapping; pipeline remains authoritative for quality).
- **Benchmarks** — per-vertical source in `industries/<pack>/benchmarks.yaml`; merged at generate time into `referenceBenchmarks.js` (identical bands across packs for the same key).
- **Coverage roadmap** — [docs/catalog-industry-coverage.md](../docs/catalog-industry-coverage.md).

## Terminology

**Industry (vertical pack)** — Real Estate, Manufacturing, Funds, … One row in `packs.yaml`. **Analysis lens** = pack + metric `segment` + official `industryCodes` (and platform-chosen primary code system).

**Shared layer** — `segment: core` metrics and common data options expanded from `catalog/shared/`; not a separate catalog industry.

**FP&A** — product function across verticals (`fpaWorkflow` on metrics); not an industry dimension.

See [governed-data.md](../docs/governed-data.md) and [benchmarking-lifecycle.md](../docs/benchmarking-lifecycle.md).

## Boundaries

- **Catalog** — intent (KPIs, data sets, field hints, per-industry benchmark guardrails, taxonomy tags).
- **Contracts** — Gold and Silver product shapes (`../contracts/`). Manifest v3 typed fields govern uploads; [tenant-metrics-v1](../contracts/tenant-metrics-v1.yaml) and vertical Gold YAML define persisted columns — [contracts/README.md — How catalog and contracts connect](../contracts/README.md#how-catalog-and-contracts-connect).
- **Platform** — tenant uploads, entitlements, peer analytics, hierarchical code pickers (downstream repos).
