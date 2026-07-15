# Pipeline governance helpers

Ambient Core does **not** ship a medallion job runner or Databricks bundle. It ships **contracts**, **catalog** semantics, and Python modules under `lib/ambient_pipeline/` that your lakehouse jobs import. Schedules, notebooks, and deploy glue belong in your application repository.

For catalog vs contracts and path env vars, see [governed-data.md](governed-data.md). Product inventory and catalog linkage: [contracts/README.md](../contracts/README.md). For pinning core in a monorepo, see [INTEGRATING.md](INTEGRATING.md). Bronze uploads use **CSV/TSV** at the ingestion boundary; governed Gold output is typically **Parquet/Delta** in your lakehouse — see [CONVENTIONS.md](CONVENTIONS.md#data-formats-and-storage).

**Boundary:** the **catalog** (manifest v3 and data options) defines upload field names, types, and mapping rules; **contracts** define the publishable Silver/Gold product shape that jobs must satisfy before write.

## What lives where

**In core:** `contracts/*.yaml`; `catalog/` + `manifest.json`; `ambient_pipeline` helpers; `validate-contracts` and the catalog generator CLIs.

**In your app repo:** job definitions, DABs, orchestration; tenant upload UX and entitlements; Firestore sync, OLAP queries, commercial APIs; CI that calls the same CLIs.

[observability-pipeline-v1.yaml](../contracts/observability-pipeline-v1.yaml) describes pipeline health products and may reference SQL, bundles, or notebooks that are maintained **downstream** — treat it as the interface contract, not as code in this repo.

## Install and test

```bash
git clone <repository-url>
cd ambient-core
pip install -e ".[pipeline,dev]"
set AMBIENT_SPARK_TESTS=1 # Windows; use export on Unix
pytest tests/pipeline/
```

Java 17+ is required for Spark tests.

**Packaging note:** The published wheel includes `ambient_contracts`, `ambient_cli`, and `ambient_calc`. **`ambient_pipeline` requires a git checkout** (tests use `pythonpath = lib` in `pyproject.toml`). Import it from `lib/ambient_pipeline` in notebooks and jobs pinned to the same core tag.

## Typical job flow (Bronze → Silver tenant-metrics)

The steps below implement precursor → plain-text extract → YAML-governed → forward store for **Silver** [`tenant-metrics-v1.yaml`](../contracts/tenant-metrics-v1.yaml). Gold vertical products are a separate step — see [Silver → Gold](#silver-gold-catalog-calc-and-vertical-contracts).

```mermaid
flowchart LR
 Upload[Bronze CSV upload]
 Map[map and coerce]
 Unpivot[unpivot long metrics]
 Stamp[lineage stamp]
 Validate[SilverValidator optional]
 Contract[ContractLoader assert]
 Gold[Gold vertical tables]
 Upload --> Map
 Map --> Unpivot
 Unpivot --> Stamp
 Stamp --> Validate
 Validate --> Contract
 Contract --> Gold
```

**Canonical order:** map → coerce → **unpivot** → stamp → (optional validate) → contract assert → write Silver.

**Anti-pattern:** stamping provenance on **wide** mapped rows **before** unpivot. `unpivot_to_tenant_metrics` uses `stack()` and does not carry `_bronze_*` columns from a wide frame — stamp **after** unpivot (or call [`bronze_to_tenant_metrics`](../lib/ambient_pipeline/bronze_catalog_map.py) which encodes this order).

1. **Resolve contract** — `ContractLoader.load("tenant-metrics-v1.yaml")`. Call `enforce_bronze_lineage()` before writes that depend on bronze provenance columns.
2. **Map uploads to catalog shape** — `apply_column_mapping`, then `coerce_mapped_columns` with manifest v3 types from `catalog_types_for_option()` ([catalog_field_rules.py](../lib/ambient_pipeline/catalog_field_rules.py)).
3. **Unpivot to long metrics** — `unpivot_to_tenant_metrics` turns numeric catalog fields into `name` / `value` rows with stable `metric_id`.
4. **Stamp lineage** — `stamp_lineage_columns` (or `BronzeProvenanceStamper` on the long DataFrame) sets `_bronze_org_id` from `org_id`, `_bronze_row_hash`, and mapping metadata ([provenance.py](../lib/ambient_pipeline/provenance.py)).
5. **Validate Silver quality (optional)** — `SilverValidator` applies ISO 8000–style checks ([validation.py](../lib/ambient_pipeline/validation.py)).
6. **Assert schema** — `ContractLoader.assert_required_columns()` on the column set before publish.

**Orchestration helper:** `bronze_to_tenant_metrics(...)` runs steps 2–4 in order. See [tests/pipeline/test_bronze_to_tenant_metrics_contract.py](../tests/pipeline/test_bronze_to_tenant_metrics_contract.py).

Platform-only (optional): `fetch_firestore_data_source` / `append_firestore_lineage_event` in `bronze_catalog_map.py` require Firebase secrets — not part of the OSS default path.

## Silver → Gold (catalog, calc, and vertical contracts)

Open core **does not** ship Spark jobs that write `finance-*-v1` or healthcare Gold tables. Recommended platform pattern:

1. Read Silver long metrics from `tenant-metrics-v1` shape (or query your lakehouse Silver table).
2. Evaluate catalog formulas with [`ambient_calc`](../lib/ambient_calc/__init__.py) (`compute_all` on manifest metrics + measured inputs).
3. Use [`catalog/crosswalk.yaml`](../catalog/crosswalk.yaml) and [`gold_contract_map`](../lib/ambient_pipeline/gold_contract_map.py) to relate manifest metric keys to Gold contract columns.
4. Pivot or join into the target product schema (for example [`finance-banking-v1.yaml`](../contracts/finance-banking-v1.yaml)), then `ContractLoader.assert_required_columns()` on that product before write.

Details: [contracts/README.md](../contracts/README.md), [crosswalk.md](crosswalk.md).

Public re-exports from `ambient_pipeline`: `ContractLoader`, `BronzeProvenanceStamper`, `PiiPseudonymizer`, `SilverValidator`, plus `bronze_to_tenant_metrics`, `MappingSpec`, and mapping helpers ([`__init__.py`](../lib/ambient_pipeline/__init__.py)).

## Walkthrough by test module

Use these as executable recipes (run with `AMBIENT_SPARK_TESTS=1` where Spark is involved):

- [test_contracts.py](../tests/pipeline/test_contracts.py) — load tenant-metrics contract; bronze lineage enforcement; required columns
- [test_bronze_catalog_map.py](../tests/pipeline/test_bronze_catalog_map.py) — mapping JSON, CSV header validation, stable metric ids, coercion
- [test_bronze_to_tenant_metrics_contract.py](../tests/pipeline/test_bronze_to_tenant_metrics_contract.py) — map → unpivot → stamp → tenant-metrics contract assert
- [test_catalog_sample_csv_bronze.py](../tests/pipeline/test_catalog_sample_csv_bronze.py) — end-to-end bronze CSV against catalog field rules
- [test_catalog_manifest.py](../tests/pipeline/test_catalog_manifest.py) — manifest loading in pipeline context
- [test_validation.py](../tests/pipeline/test_validation.py) — Silver validation rules

## Minimal example (no Spark)

From a core clone with `pip install -e .`:

```bash
set AMBIENT_CORE_ROOT=%CD%
python examples/pipeline/minimal_governed_data.py
```

See [examples/pipeline/README.md](../examples/pipeline/README.md).

## Related

- [USAGE.md](USAGE.md) — recipe 3 (pipeline pytest)
- [governed-data.md](governed-data.md) — catalog + contracts consumption
- [contracts/README.md](../contracts/README.md) — SSOT products and catalog → contract flow
- [catalog-consumption.md](catalog-consumption.md) — optional assist before Bronze (mapping, units)
- [CONVENTIONS.md](CONVENTIONS.md) — formats, bronze boundary, forward stores
- [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md) — scope split
