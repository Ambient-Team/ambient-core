# Data-product contracts

YAML in this directory is the **single source of truth** for governed data-product interfaces in Ambient Core. Wheels bundle copies under `lib/ambient_contracts/bundled/`; CI fails if they drift from this tree.

## Integrators

Read [docs/governed-data.md](../docs/governed-data.md) for how contracts relate to the catalog, agents, and lakehouse jobs.

**Do not** maintain a parallel `contracts/` tree in your application repo. Pin a core release and set `AMBIENT_CONTRACTS_DIR` to the submodule or clone path — [docs/INTEGRATING.md](../docs/INTEGRATING.md).

## Products in this repo

- **`tenant-metrics-v1.yaml`** — Silver tenant metrics; bronze provenance; multi-tenant
- **`org-kpi-v1.yaml`** — Gold org KPIs
- **`quality-v1.yaml`** — Data quality and lineage
- **`opportunity-v1.yaml`** — Optimization opportunities
- **`operational-financial-bridge-v1.yaml`** — Operational–financial bridge
- **`commercial-usage-v1.yaml`** — Commercial usage snapshot
- **`observability-pipeline-v1.yaml`** — Pipeline/medallion observability (may reference platform assets)
- **`maestro-run-v1.yaml`** — Maestro inference run artifact
- **`healthcare-provider-ops-v1.yaml`** — De-identified provider operations (volume, throughput, occupancy, staffing, unit cost)
- **`healthcare-revenue-cycle-v1.yaml`** — De-identified revenue cycle (denial/clean-claim rates, AR days) by payer category
- **`healthcare-quality-outcomes-v1.yaml`** — Cohort-level quality outcomes (readmission, mortality, infection)
- **`life-sciences-rnd-v1.yaml`** — Aggregated R&D (pipeline, trial cost per patient, phase success)

## Authoring and validation

New or changed contracts must include top-level sections **`product`**, **`schema`**, **`lineage`**, and **`governance`** (validated by `validate-contracts`). `product` needs `name`, `version`, and `owner`; optional sections include `quality`, `freshness`, `firestore`, and `consumption_contract` with additional rules in the validator. Filenames follow `product-slug-vMAJOR.yaml` and are additionally checked against the meta-schema `schema/contract-v1.json` by `scripts/check_contract_schema.py`. Filename major version must match `product.version` — see [docs/CONVENTIONS.md](../docs/CONVENTIONS.md#contract-files-and-versions).

- Edit files here, then sync bundled copies before release — [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md).
- Run `validate-contracts` locally and in CI. Rules are implemented in [lib/ambient_contracts/validate.py](../lib/ambient_contracts/validate.py).
- Runtime loading: `ContractLoader` in [lib/ambient_contracts/loader.py](../lib/ambient_contracts/loader.py) — bronze lineage and required-column checks for Spark DataFrames.

For full column and governance semantics, read each product YAML; there is no separate generated reference beyond validation rules.
