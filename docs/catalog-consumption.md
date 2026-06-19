# Catalog consumption (integrators)

Authoring and generator commands live in [catalog/README.md](../catalog/README.md). This page explains **how to read** catalog output in apps, jobs, and agents. For contracts and shared env vars, see [governed-data.md](governed-data.md).

## When to use what

- **List or resolve KPI definitions** — generated **manifest** via `ambient_contracts.catalog_manifest.load_manifest()` → `catalog/manifest.json`
- **Agent tools `catalog_list_metrics` / `catalog_resolve_metric`** — same manifest; see [lib/ambient_agent/tools.py](../lib/ambient_agent/tools.py)
- **Upload column mapping, data-option templates, bronze field rules** — **industry YAML** via `ambient_pipeline.catalog_loader.load_data_option()` (packs under `catalog/industries/` and expanded shared templates)
- **Front-end industry picker, metric browser, enrichment** — generated JS in `catalog/runtime/*.js` (e.g. `catalogIndustries.js`)
- **Link a catalog metric to a governed Gold contract** — [catalog/crosswalk.yaml](../catalog/crosswalk.yaml); see [crosswalk.md](crosswalk.md)

The manifest is the **stable export** for machines; industry YAML is the **editable source** for vertical-specific metrics and `dataOptions`. After YAML edits, run `ambient-catalog-generate` so `manifest.json` and `runtime/` stay in sync.

## Path resolution

Set `AMBIENT_CATALOG_DIR` to a directory that contains `manifest.json`, or run from a full ambient-core checkout. `AMBIENT_CORE_ROOT` also enables discovery via [lib/ambient_contracts/paths.py](../lib/ambient_contracts/paths.py).

Wheel-only pip installs include bundled **contracts**, not the full catalog tree — submodule or `AMBIENT_CATALOG_DIR` is required for manifest-driven features.

## Manifest glossary

Top-level keys in [catalog/manifest.json](../catalog/manifest.json):

- **`version`** — manifest format version
- **`industries`** — registered verticals (`value`, `label`, `pack` filename)
- **`metrics`** — expanded metric records (one row per vertical metric)

Common fields on each **metric** object:

- **`id`** — numeric metric id (stringified when passed to `catalog_resolve_metric`)
- **`catalogMetricKey`** — stable string key (e.g. `Allrealestatefpa-current-ratio`)
- **`name`** — display name
- **`industry`** — vertical label (e.g. `Real Estate`)
- **`methodology`** — human-readable definition
- **`type`** — e.g. `Financial`, `Operational`
- **`unit`** — display unit
- **`requiredSources`** — list of data options with `catalogOptionKey`, `name`, `fields`

Use `id` for agent resolve and OLAP joins; use `catalogMetricKey` for crosswalk entries and stable keys across regenerations when ids are reassigned only through controlled generator changes.

## JavaScript runtime vs JSON only

- **JSON / Python backends** — `manifest.json` or `load_manifest()` is enough for list/resolve and server-side mapping.
- **Browser or Node UI** — import generated modules from `catalog/runtime/` so industry resolution and metric keys match the generator (single bridge module in your app re-exporting from the pinned core submodule is a common pattern).

Hand-edit only `catalog/runtime/catalogEnrichment.js` when documented in catalog README; other `runtime/` files are generator output.

## Related

- [crosswalk.md](crosswalk.md) — metric → contract links
- [pipeline.md](pipeline.md) — bronze mapping using catalog loaders
- [INTEGRATING.md](INTEGRATING.md) — pin and env vars in monorepos
