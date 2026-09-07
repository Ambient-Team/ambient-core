"""ISO 8000 / BCBS 239 governance helpers for lakehouse pipelines.

Colab/pandas path (``pandas_provenance``, ``colab_smoke``) needs no Spark.
Spark/Delta helpers are optional for local lakehouse runs and load lazily.
Platform-only integrations (Firestore, Databricks dbutils secrets) live behind
optional imports and are never required for ``pip install`` or free Colab.
"""

from __future__ import annotations

from pkgutil import extend_path
from typing import Any

__path__ = extend_path(__path__, __name__)

__all__ = [
    "PandasBronzeStamper",
    "REQUIRED_BRONZE_COLS",
    "BronzeProvenanceStamper",
    "ContractLoader",
    "MappingSpec",
    "PiiPseudonymizer",
    "SilverValidator",
    "apply_column_mapping",
    "bronze_to_tenant_metrics",
    "catalog_types_for_option",
    "coerce_mapped_columns",
    "contract_column_catalog_map",
    "resolve_mapping_spec",
    "links_for_contract_file",
    "stamp_lineage_columns",
    "unpivot_to_tenant_metrics",
]

_LAZY_EXPORTS = {
    "PandasBronzeStamper": ("ambient_pipeline.pandas_provenance", "PandasBronzeStamper"),
    "REQUIRED_BRONZE_COLS": ("ambient_pipeline.pandas_provenance", "REQUIRED_BRONZE_COLS"),
    "BronzeProvenanceStamper": ("ambient_pipeline.provenance", "BronzeProvenanceStamper"),
    "ContractLoader": ("ambient_pipeline.contracts", "ContractLoader"),
    "MappingSpec": ("ambient_pipeline.bronze_catalog_map", "MappingSpec"),
    "PiiPseudonymizer": ("ambient_pipeline.pii", "PiiPseudonymizer"),
    "SilverValidator": ("ambient_pipeline.validation", "SilverValidator"),
    "apply_column_mapping": ("ambient_pipeline.bronze_catalog_map", "apply_column_mapping"),
    "bronze_to_tenant_metrics": ("ambient_pipeline.bronze_catalog_map", "bronze_to_tenant_metrics"),
    "catalog_types_for_option": ("ambient_pipeline.bronze_catalog_map", "catalog_types_for_option"),
    "coerce_mapped_columns": ("ambient_pipeline.bronze_catalog_map", "coerce_mapped_columns"),
    "contract_column_catalog_map": ("ambient_pipeline.gold_contract_map", "contract_column_catalog_map"),
    "resolve_mapping_spec": ("ambient_pipeline.bronze_catalog_map", "resolve_mapping_spec"),
    "links_for_contract_file": ("ambient_pipeline.gold_contract_map", "links_for_contract_file"),
    "stamp_lineage_columns": ("ambient_pipeline.bronze_catalog_map", "stamp_lineage_columns"),
    "unpivot_to_tenant_metrics": ("ambient_pipeline.bronze_catalog_map", "unpivot_to_tenant_metrics"),
}


def __getattr__(name: str) -> Any:
    """Lazy-load optional exports so catalog CLIs need neither Spark nor pandas."""
    target = _LAZY_EXPORTS.get(name)
    if target is None:
        raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
    module_name, attr = target
    from importlib import import_module

    value = getattr(import_module(module_name), attr)
    globals()[name] = value
    return value
