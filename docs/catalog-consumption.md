# Catalog consumption (integrators)

Authoring and generator commands live in [catalog/README.md](../catalog/README.md). This page explains **how to read** catalog output in apps, jobs, and agents. For contracts and shared env vars, see [governed-data.md](governed-data.md). When **authoring** YAML, use catalogue keys and ids per [CONVENTIONS.md](CONVENTIONS.md).

## When to use what

- **List or resolve KPI definitions** — generated **manifest** via `ambient_contracts.catalog_manifest.load_manifest()` → `catalog/manifest.json`. The loader parses JSON once and returns a typed **`CatalogManifest`** (`ambient_contracts.manifest_models`); use `manifest.metrics`, `manifest.resolve_metric(id)`, or `CatalogMetric.to_tool_dict()` when you need the same camelCase objects as the raw file.
- **Agent tools `catalog_list_metrics` / `catalog_resolve_metric`** — same manifest; see [lib/ambient_cli/tools.py](../lib/ambient_cli/tools.py)
- **Upload column mapping, data-option templates, bronze field rules** — industry YAML under `catalog/industries/<pack>/` via `ambient_pipeline.catalog_loader.load_data_option()` (falls back to `manifest.json` for expanded shared options)
- **Front-end industry picker, metric browser, enrichment** — generated JS in `catalog/runtime/*.js` (e.g. `catalogIndustries.js`)
- **Link a catalog metric to a governed Gold contract** — [catalog/crosswalk.yaml](../catalog/crosswalk.yaml); see [crosswalk.md](crosswalk.md)

The manifest is the **stable JSON export** for machines; industry YAML is the **editable source** for vertical-specific metrics and `dataOptions`. Generated **`catalog/runtime/*.js`** mirrors the same semantics for front-end bundlers — see [CONVENTIONS.md](CONVENTIONS.md#choosing-a-format). After YAML edits, run `ambient-catalog-generate` so `manifest.json` and `runtime/` stay in sync.

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
- **`catalogMetricKey`** — stable string key from the generator (legacy keys may appear until retired; new YAML uses `industry.segment.slug` per [CONVENTIONS.md](CONVENTIONS.md))
- **`name`** — display name
- **`industry`** — vertical label (e.g. `Real Estate`)
- **`methodology`** — human-readable definition
- **`type`** — e.g. `Financial`, `Operational`
- **`unit`** — display unit
- **`frequency`** — calculation / reporting cadence for the KPI (for example `monthly`, `quarterly`)
- **`requiredSources`** — list of data options with `catalogOptionKey`, `name`, `fields` (field names)
- **`calc`** — the machine-readable formula (`expr` + declared `inputs`), or `null` for directly-reported metrics
- **`directlyReported`** — `true` when the metric value is uploaded directly (`input: true`, no `calc`)
- **`inputs`** — the input-coverage recipe (see below)
- **`inputCoverage`** — one-word summary of how feedable the metric is (see below)

Use `id` for agent resolve and OLAP joins; use `catalogMetricKey` for crosswalk entries and stable keys across regenerations when ids are reassigned only through controlled generator changes.

## From data options to KPIs (input coverage)

Definitions tell you *what* a metric is; the **input-coverage recipe** tells you *what to upload so `calc` actually runs*. For every metric the generator resolves each required input to the data option(s) that supply it and records the result on the metric object.

Each entry in **`inputs`** has:

- **`name`** — the input variable used by `calc.expr` (or the metric's own slug for directly-reported metrics)
- **`kind`** — `measured` (a value you supply) or `derived` (computed from another catalog metric)
- **`covered`** — whether a linked data option can supply it
- **`satisfiedBy`** — the supplying data option(s), each with `catalogOptionKey`, `name`, and a `via`:
 - **`field`** — the input is an explicit, mappable column on that data option (map this column)
 - **`upload`** — the input comes from that option's document/template contents rather than an enumerated field (upload that document). Accounting aggregates and ratios are intentionally not enumerated as fields — see [catalog/input_field_policy.yaml](../catalog/input_field_policy.yaml).

The metric-level **`inputCoverage`** summarizes feedability:

- **`complete`** — every measured input is an explicit mappable field
- **`upload`** — feedable, but at least one input comes from a linked upload's document/template
- **`none`** — no data option references this metric; it cannot be fed as currently wired
- **`derived`** — computed only from other metrics (nothing to upload directly)
- **`unspecified`** — the metric declares neither `calc` nor `input`

Operator flow, then, is: pick the metric, read its `inputs`, upload each `satisfiedBy` data option (mapping `via: field` columns and attaching `via: upload` documents), run the pipeline, and the KPI computes. Run [scripts/check_metric_inputs.py](../scripts/check_metric_inputs.py) for a per-industry coverage report (which metrics are `complete` / `upload` / `none`); it is informational and does not block CI. The reverse direction (**which metrics a data option feeds**) is on each `dataOptions[].metricIds`.

## Data options: typed fields and two frequencies

Each **`dataOptions[]`** row in manifest version **3** includes:

- **`fields`** — objects `{ name, type, … }` where `type` is a catalog enum (`decimal`, `date`, `string`, …). Optional **`unit`** (for example `USD`, `seat-km`) and **`description`** (authoring hint for and integrators). YAML may still list legacy string field names; the generator normalizes them at export time. **`dummyFields` is retired** — typed `fields` is the only schema surface for uploads and Bronze mapping.
- **`fieldCoverage`** — `upload` (document/financial statement path; measured inputs via upload policy) or `enumerated` (column-mapped exports; strict validation applies). Inferred at generate time when omitted; persisted by [`scripts/harden_catalog_data_options.py`](../scripts/harden_catalog_data_options.py).
- **`collectionFrequency`** — how often the org should refresh or upload data for this template (for example `monthly`). Same concept as *source frequency* or *required upload cadence*; the YAML key is `collectionFrequency` for manifest stability.
- **`grain`** — row-level expectation for Bronze tables (`transaction`, `day`, `week`, `month`, `quarter`).

Metric **`frequency`** is the **calculation / reporting** cadence. Collection can be finer than calculation (daily feeds, monthly KPIs); the generator warns when `collectionFrequency` is coarser than the strictest linked metric `frequency`.

Generator **measured-input** checks default to **warnings** on legacy packs. **`fieldCoverage: enumerated`** options are validated strictly when you pass `--strict-data-option-inputs` (CI uses this after hardening). Run `python scripts/harden_catalog_data_options.py --write` across packs before enabling strict locally.

Bronze coercion reads manifest field types when mapping uploads — see [pipeline.md](pipeline.md). Refresh the gap report with [scripts/audit_data_option_fields.py](../scripts/audit_data_option_fields.py) (`--markdown --report docs/catalog-input-field-gaps.md`).

## JavaScript runtime vs JSON only

- **JSON / Python backends** — `manifest.json` or `load_manifest()` (typed `CatalogManifest`) is enough for list/resolve and server-side mapping.
- **Browser or Node UI** — import generated modules from `catalog/runtime/` so industry resolution and metric keys match the generator (single bridge module in your app re-exporting from the pinned core submodule is a common pattern). Prefer JSON manifest for APIs; prefer generated `.js` when the app already bundles ES modules from core.

Hand-edit only `catalog/runtime/catalogEnrichment.js` when documented in catalog README; other `runtime/` files are generator output.

## Analysis lens and metric filtering

The core agent tool **`catalog_list_metrics`** filters manifest rows by **`industry`** (the pack display label, for example `Banking`), not by metric `segment`. For a business-line tenant org, your platform should further filter the manifest (or industry YAML) by **segment** and by **`industryCodes`** from each pack’s `pack.yaml` / manifest industry row so users only see KPIs for that org’s lens. Peer comparison should use the same official code cohort, not the legal entity’s marketing name. See [catalog-industry-coverage.md](catalog-industry-coverage.md).

### Recommended `AgentRunContext.metadata` keys (platform convention)

Core does not validate these; document them in your worker so synthesis and logging stay consistent:

- **`org_id`** — tenant organization (required for production attribution).
- **`catalog_industry`** — resolved pack label for this org’s lens.
- **`industry_code_system`** — optional: `isic` | `naics` | `nace` | `gics` (which taxonomy the tenant treats as primary for cohorting).
- **`industry_code_primary`** — optional primary code from the pack’s manifest `industryCodes` block for that system.
- **`peer_group_id`** — platform-defined cohort for benchmarking.
- **`assurance_framework`** or **`control_pack_id`** — assurance scope.
- **`disclosure_mandate_id`** — investor or exchange mandate set.
- **`investor_audience`** — coarse audience (listed, LP, lender, internal).
- **`plan_version_id`** — budget or forecast version for variance.
- **`scenario_id`** — plan scenario label.
- **`reporting_group_id`** — optional link to a legal or group holding company for rollup UI only; does not change catalog resolution in core.

See [governed-data.md](governed-data.md#analysis-lens-and-multi-org-tenancy), [work-cycles.md](work-cycles.md), and [catalog/README.md](../catalog/README.md#terminology).

## Related

- [crosswalk.md](crosswalk.md) — metric → contract links
- [CONVENTIONS.md](CONVENTIONS.md) — catalogue keys and formats
- [pipeline.md](pipeline.md) — bronze mapping using catalog loaders
- [INTEGRATING.md](INTEGRATING.md) — pin and env vars in monorepos
