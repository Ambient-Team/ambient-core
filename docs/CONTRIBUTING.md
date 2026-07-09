# Contributing to Ambient Core

Thank you for improving governed analytics foundations. Read [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) before participating.

**New here?** Start with [USAGE.md](USAGE.md), then skim [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md). Open a [draft PR](https://github.com/Ambient-Team/ambient-core/compare) early for feedback on contracts or catalog shape.

All foundational work—contracts, catalog, shared pipeline governance, Maestro—belongs in **this** repository. Application UI, deploy bindings, and tenant-specific tooling belong in **separate repos** that pin a release here.

Start with [ECOSYSTEM.md](ECOSYSTEM.md) and [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md). Quick start: [USAGE.md](USAGE.md). Foundation vs full product: [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md).

Unsure whether a change belongs here? See [ECOSYSTEM.md — Where to make changes](ECOSYSTEM.md#where-to-make-changes).

## Documentation style

Do **not** use markdown pipe tables (`| col |` with `|---|` separators) in `docs/`, any `README.md`, or `examples/**/*.md`. Use short paragraphs and bullet lists instead (for example `- **term** — definition`). Mermaid diagrams and code fences are fine.

CI runs `python scripts/check_markdown_prose.py` on pull requests. When editing docs as an agent, follow the same rule in [AGENTS.md](AGENTS.md#documentation-conventions).

## Scope

Put in this repository:

- Data-product **contracts** (`contracts/`)
- **Catalog** YAML and generator output (`catalog/`)
- **Governance** helpers (`lib/ambient_pipeline/`)
- **Inference** (`lib/ambient_inference/`, `services/maestro/`)
- **Agent** extension point (`lib/ambient_agent/`)
- **CLI** entrypoints (`validate-contracts`, `ambient-catalog-generate`, etc.)

Do **not** add SaaS-only UI, vendor OLTP deploy, or operator secrets here.

## Development setup

```bash
git clone <repository-url>
cd ambient-core
py -3.12 -m venv .venv
pip install -e ".[all]"
validate-contracts
validate-agent-config
validate-inference-registry
pytest
```

## Contract changes

1. Edit YAML under `contracts/`.
2. Copy to bundled package data: `cp contracts/*.yaml lib/ambient_contracts/bundled/` (CI enforces sync).
3. Run `validate-contracts`.

Naming, filename major versions, and format rules: [CONVENTIONS.md](CONVENTIONS.md).

## Catalog changes

1. Edit YAML under `catalog/`.
2. Run `ambient-catalog-generate` (or `python scripts/generate_reference_catalog.py`).
3. Run `ambient-catalog-generate --check` before pushing (manifest JSON and `catalog/runtime/*.js` must match YAML).

Catalogue keys, segment enum, integer id bands, and aliases: [CONVENTIONS.md](CONVENTIONS.md).

Integrator-facing guides after catalog or contract changes: [governed-data.md](governed-data.md), [catalog-consumption.md](catalog-consumption.md), [crosswalk.md](crosswalk.md).

## Releases

Tag `vX.Y.Z` on `main`; then complete **Consumer follow-up** below for any repo that depends on this project.

## Consumer follow-up (after a release)

- Tag **`vX.Y.Z`** on `main` here.
- In each downstream repo: bump **`ambient-core @ git+…@vX.Y.Z`**, update the **`ambient-core/`** submodule to the same tag, and re-run **`ambient-catalog-generate --check`** with `AMBIENT_CORE_ROOT` when validating from a monorepo.
- Ensure consumers have **no mirror** of `contracts/` or `catalog/` outside the pinned checkout ([INTEGRATING.md](INTEGRATING.md)).
- Run consumer CI (contracts, catalog, tests).

## How packages fit (maintainers)

- **Pip / git tag** — `ambient_contracts`, `ambient_inference`, `ambient_cli`, `ambient_agent` (+ bundled YAML). Bump tag when APIs or contracts change.
- **Submodule / checkout** — `catalog/`, `lib/ambient_pipeline/` on disk for JS and Spark tests. Bump SHA when manifest, runtime JS, or pipeline code changes.
- **App-only pipeline glue** — stays in the consumer repository; shared modules stay here.

**Rule of thumb:** one tag `vX.Y.Z` → pip pin, submodule SHA, and container build args together; see [INTEGRATING.md](INTEGRATING.md).
