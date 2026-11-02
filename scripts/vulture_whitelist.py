"""Vulture whitelist: public APIs and lazy imports exercised outside lib/."""

# fmt: off
WHITELIST = [
    "assert_required_columns",  # contracts, notebooks, tests
    "stable_metric_id",
    "filter_raw_uploads",
    "append_firestore_lineage_event",
    "fetch_firestore_data_source",
    "validate_csv_headers_against_mapping",
    "parse_mapping_widget",
    "infer_field_coverage",
    "infer_grain_for_frequency",
    "strictest_linked_metric_frequency",
    "input_excluded_from_field_list",
    "is_value_field_for_unpivot_field",
    "parse_float_from_cell",
    "load_metric_by_numeric_id",
    "ensure_package_on_path",
    "run_colab_smoke",
    "pipeline_health_document_id",
    "audit_performance_document_id",
    "bronze_raw_metrics_org_view_sql",
    "silver_metrics_org_view_sql",
    "assert_unique_keys",
    "assert_left_join_preserves_row_count",
    "log_left_join_audit",
    "ensure_pipeline_on_path",
    "apply_spark_tuning",
    "required_columns",
    "metrics_for_industry",
    "resolve_metric",
    "__getattr__",
    "industry_codes",  # dataclass field on CatalogIndustryEntry
]
