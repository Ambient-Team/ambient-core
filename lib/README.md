# Ambient Core Python packages (`lib/`)

This file is **generated** from installed package docstrings and ``__all__`` exports.
Do not edit by hand — run ``python scripts/generate_lib_readme.py`` (or ``--check`` in CI).

## `ambient_contracts`
Data-product contract loaders and validation for Ambient Core.
### Public API
- `ContractLoader` — Load YAML data product contracts from contracts/ (checkout or bundled package data).
- `validate_all_contracts` — Validate every ``*.yaml`` contract in the resolved contracts directory.
- `__version__` — str(object='') -> str

## `ambient_calc`
Open-source reference calculator: turn declared formulas + inputs into metric values.
### Public API
- `CalcError` — Raised on an invalid formula, unknown variable, or dependency cycle.
- `compute_all` — Compute all calculated metrics in dependency order. ``metrics`` items may carry an.
- `compute_metric` — Compute one metric value from raw ``inputs`` and already-``computed`` metric slugs.
- `formula_names` — Return the set of variable/identifier names referenced by an expression.
- `safe_eval` — Evaluate an arithmetic expression over ``variables``. No attribute/loop/call except.
- `slug_of` — Stable slug for a metric: last dotted segment of its key, else its slug/name.

## `ambient_cli`
Command-line entrypoints for Ambient Core.
### Public API
- ambient_cli.catalog.main — Run the reference catalog generator script in-process (``ambient-catalog-generate``).

## `ambient_pipeline`
ISO 8000 / BCBS 239 governance helpers for lakehouse pipelines.
### Public API
- `PandasBronzeStamper` — Append BCBS 239-style Bronze lineage columns to a pandas DataFrame.
- `REQUIRED_BRONZE_COLS` — frozenset() -> empty frozenset object
- `BronzeProvenanceStamper` — Append mandatory Bronze lineage columns to every row.
- `ContractLoader` — Load YAML data product contracts from contracts/ (checkout or bundled package data).
- `MappingSpec` — MappingSpec(catalog_field_to_csv_header: 'dict[str, str]', catalog_option_key: 'str', source_id: 'str', source_name: 'str', industry: 'str', catalog_manifest_version: 'str', mapping_version: 'str' = '1.0')
- `PiiPseudonymizer` — One-way HMAC-SHA256 pseudonymization of PII columns.
- `SilverValidator` — Range validation and completeness checks for Silver metrics.
- `apply_column_mapping` — Rename CSV headers to catalog field names ({catalogField: csvHeader}).
- `bronze_to_tenant_metrics` — Map Bronze upload columns → catalog shape → unpivot → lineage stamp (Silver-ready).
- `catalog_types_for_option` — Catalog types for option.
- `coerce_mapped_columns` — Apply catalog field typing after rename (date / numeric / string).
- `contract_column_catalog_map` — Return ``{contract_column_name: catalogMetricKey}`` using crosswalk suffix match.
- `resolve_mapping_spec` — Resolve mapping spec.
- `links_for_contract_file` — Crosswalk rows whose ``contractFile`` matches the basename.
- `stamp_lineage_columns` — Stamp lineage columns.
- `unpivot_to_tenant_metrics` — Unpivot to tenant metrics.

### `runner` module
- `run_local_pipeline` — Execute simplified Bronze → Silver → Gold path for local OSS testing.
- `run_pipeline_from_config` — Entry point: create Spark if needed, validate contract, run pipeline.
- `PipelineRunConfig` — Configuration for a local Bronze → Silver → Gold run.

### `colab_smoke` module
- `run_colab_smoke` — Execute Bronze → Silver → Gold against data/raw samples.
- `SmokeResult` — SmokeResult(run_id: 'str', org_id: 'str', bronze_tables: 'dict[str, int]' = <factory>, silver_tables: 'dict[str, int]' = <factory>, gold_kpis: 'dict[str, Any]' = <factory>, output_dir: 'str' = '', notes: 'list[str]' = <factory>)

### `pipeline_logging` module
- `log_pipeline_event` — Emit one JSON structured log line for pipeline observability.

