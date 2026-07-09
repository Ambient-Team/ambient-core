# Maestro and catalog ingestion (optional assist)

**Maestro helps you conform to the catalog; it does not define the catalog.** Definitions, typed fields, frequencies, and metric formulas remain in `catalog/` YAML and **`catalog/manifest.json`**. Maestro runs are assistive only—you choose models, backends, and risk.

Maestro is Ambient Core’s **inference control plane** ([inference-layer.md](inference-layer.md)). It is **not** the system of record for catalog definitions, typed field schemas, or committed data quality after ingest.

Manifest version 3 exports typed `fields` (including optional `unit` and `description`), `collectionFrequency`, `grain`, and metric `frequency`. **Authoring-time** checks run at `ambient-catalog-generate` (warnings by default; `--strict-data-option-inputs` for a hard gate).

## Recommended use (platform or power-user flows)

At your own risk—with your own model backends and policies—Maestro can assist **before** Bronze:

- **Column mapping** — Propose `{ catalogField: csvHeader }` JSON for [`resolve_mapping_spec`](../lib/ambient_pipeline/bronze_catalog_map.py) together with a `catalogOptionKey`, using manifest field names and types as the target schema.
- **Unit and currency hints** — Use field `type` / `unit` (for example `seat-km`, `USD`) to suggest normalizations. Core stores hints; transforms run in your platform or pipeline extensions.
- **Bronze-ready artifacts** — Emit mapped CSV plus mapping metadata for the governed pipeline (`raw_file_uploads` → catalog-mapped tenant metrics).

No new Maestro HTTP mode is required in open core. See `examples/integrations/` for patterns that call `POST /v1/runs` with prompts referencing manifest field objects.

## Out of scope for open core

- Automatic writes to tenant OLTP without platform authentication and authorization.
- Treating model output as authoritative catalog or contract changes.
- Replacing [`SilverValidator`](../lib/ambient_pipeline/validation.py) or contract completeness rules on [`tenant-metrics-v1`](../contracts/tenant-metrics-v1.yaml).

## Quality boundary

- **Authoritative (post-ingest):** Pipeline Silver validation and contracts after Bronze mapping and Silver transforms ([pipeline.md](pipeline.md)).
- **Advisory (future):** Maestro or other AI may pre-flag missing periods or outliers before Bronze commit; interface only—no auto-fix in ambient-core today.

Catalog typing and required measured inputs are enforced at **`ambient-catalog-generate`** time (warnings first; opt into strict mode when packs are ready). Runtime quality control split between AI preflight and pipeline remains a platform decision.

## Related

- [contracts/README.md](../contracts/README.md) — data-product SSOT and catalog → contract flow
- [catalog-consumption.md](catalog-consumption.md) — `inputCoverage`, field match, upload paths, frequencies
- [catalog/README.md](../catalog/README.md) — authoring layout
- [inference-layer.md](inference-layer.md) — Maestro operations
