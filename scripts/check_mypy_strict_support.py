#!/usr/bin/env python3
"""Run mypy --strict on quality-gate scripts and selected tests (incremental SSOT)."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

# CI / repo hygiene scripts that already pass mypy --strict (add more as they are fixed).
STRICT_SUPPORT_SCRIPTS: tuple[str, ...] = (
    "scripts/check_catalog_hygiene.py",
    "scripts/check_coverage.py",
    "scripts/check_dead_code.py",
    "scripts/check_markdown_prose.py",
    "scripts/check_mypy.py",
    "scripts/check_mypy_strict.py",
    "scripts/check_mypy_strict_support.py",
    "scripts/check_quality_static.py",
    "scripts/check_ruff.py",
    "scripts/scan_secrets_patterns.py",
    "scripts/check_golden_pii_fixture_refs.py",
    "scripts/check_sensitive_data_literals.py",
    "scripts/check_changelog_version.py",
    "scripts/check_pip_audit.py",
    "scripts/validate_contracts.py",
    # Batch 22 — catalog CI gates used in build-test
    "scripts/generate_pack_reference_docs.py",
    "scripts/check_naming.py",
    "scripts/check_formulas.py",
    # Batch 23 — crosswalk + PHI gates
    "scripts/check_crosswalk.py",
    "scripts/check_phi.py",
    "tests/test_check_crosswalk_unit.py",
    "tests/test_check_markdown_prose.py",
    "scripts/check_doc_links.py",
    "tests/test_check_doc_links.py",
    "scripts/check_public_api_docstrings.py",
    "scripts/generate_lib_readme.py",
    "scripts/pipeline_golden_util.py",
    "scripts/refresh_pipeline_golden.py",
    "scripts/vulture_whitelist.py",
    "tests/test_package_public_entrypoints.py",
    "tests/test_check_public_api_docstrings.py",
    "tests/pipeline/test_gold_transform_edges.py",
)

STRICT_SUPPORT_TESTS: tuple[str, ...] = (
    "tests/test_check_quality_static.py",
    "tests/test_secrets_scan_fixtures.py",
    # Group 1 — validate / CLI / policy smoke tests
    "tests/test_validate_contract_main.py",
    "tests/test_validate_contract_main_errors.py",
    "tests/test_validate_contract_errors.py",
    "tests/test_validate_contracts_cli.py",
    "tests/test_ci_policy.py",
    "tests/test_contract_validate_integration.py",
    "tests/test_appsec_remediations.py",
    "tests/test_cli_golden.py",
    "tests/test_cli_ux.py",
    # Group 2 — contracts, catalog, and governance unit tests
    "tests/test_ambient_contracts_paths.py",
    "tests/test_ambient_contracts_loader.py",
    "tests/test_ambient_contracts_catalog_manifest.py",
    "tests/test_catalog_field_rules.py",
    "tests/test_catalog_loader_pack_paths.py",
    "tests/test_catalog_loader_manifest_edges.py",
    "tests/test_catalog_manifest_resolve_branches.py",
    "tests/test_catalog_pack_files.py",
    "tests/test_catalog_contract_drift.py",
    "tests/test_bronze_upload_validation.py",
    "tests/test_governance_views.py",
    # Group 3 — CLI catalog, integrations, and package smoke tests
    "tests/test_ambient_cli_catalog.py",
    "tests/test_ambient_cli_catalog_main.py",
    "tests/test_ambient_cli_catalog_entry.py",
    "tests/test_ambient_pipeline_lazy_exports.py",
    "tests/test_firestore_bridge_unit.py",
    "tests/test_gold_contract_crosswalk_integration.py",
    "tests/test_hypothesis_catalog_contracts.py",
    "tests/test_manifest_models_edges.py",
    "tests/test_notebook_bootstrap_unit.py",
    "tests/test_pii_column_tagging.py",
    "tests/test_storage_paths_and_firestore_ids.py",
    # Pipeline / Spark support (batch 19 — group 1)
    "tests/dict_helpers.py",
    "tests/spark_fixtures.py",
    "tests/pipeline/test_catalog_manifest.py",
    "tests/pipeline/test_catalog_sample_csv_bronze.py",
    "tests/pipeline/test_contracts.py",
    "tests/pipeline/test_runner_config.py",
    "tests/pipeline/test_bronze_catalog_map.py",
    "tests/pipeline/test_bronze_to_tenant_metrics_contract.py",
    # Pipeline / Spark support (batch 19 — group 2)
    "tests/pipeline/test_join_guards.py",
    "tests/pipeline/test_validation.py",
    "tests/pipeline/test_validation_extended.py",
    "tests/pipeline/test_silver_gold_transforms.py",
    "tests/pipeline/test_perf_recorder.py",
    "tests/pipeline/test_perf_unit.py",
    "tests/pipeline/test_perf_create_local_spark.py",
    # Pipeline / Spark support (batch 19 — group 3)
    "tests/pipeline/test_gold_layer_spark.py",
    "tests/pipeline/test_perf_coverage_paths.py",
    "tests/pipeline/test_oss_demo_bronze_silver.py",
    "tests/test_runner_local_pipeline.py",
    # Batch 20 — group 1 (zero-touch or light annotation)
    "tests/test_lib_coverage_residual.py",
    "tests/test_colab_smoke_run_tmp.py",
    "tests/test_colab_smoke_unit.py",
    "tests/test_ambient_cli_main.py",
    "tests/test_catalog_loader.py",
    "tests/test_contract_loader_edges.py",
    "tests/test_crosswalk_catalog_root_errors.py",
    "tests/test_firestore_bridge_client.py",
    # Batch 20 — group 2
    "tests/test_join_guards_edges.py",
    "tests/test_gold_contract_map_edges.py",
    "tests/test_manifest_models_parse_branches.py",
    "tests/test_manifest_models_tool_dicts.py",
    "tests/test_secrets_dbutils_paths.py",
    "tests/test_pii_and_secrets.py",
    "tests/test_colab_bootstrap_unit.py",
    "tests/test_catalog_manifest_resolve.py",
    # Batch 20 — group 3
    "tests/catalog_script_loader.py",
    "tests/test_provenance_pii_edges.py",
    "tests/test_catalog_load_performance.py",
    "tests/test_manifest_models_validation_branches.py",
    "tests/test_version_coherence.py",
    "tests/test_catalog_yaml_schema.py",
    "tests/test_pack_data_quality_rules.py",
    "tests/test_catalog_merged_validate.py",
    # Batch 20 — group 4 (remaining test_*.py)
    "tests/test_crosswalk_loader.py",
    "tests/test_catalog_validator_edge_cases.py",
    "tests/test_gold_contract_map.py",
    "tests/test_catalog_input_coverage.py",
    "tests/test_bronze_catalog_map_branches.py",
    "tests/test_ambient_calc.py",
    # Batch 21 — lib branch coverage closure
    "tests/test_lib_branch_coverage.py",
    # Jan 2027 v0.3.12 train — integrator builtins
    "tests/test_integrator_tools.py",
    "tests/test_tool_schema_and_registry.py",
    "tests/test_wheel_ambient_pipeline_import.py",
    "lib/ambient_cli/integrator_tools.py",
    "lib/ambient_cli/tool_registry.py",
    "lib/ambient_cli/tool_schema.py",
)


def main() -> int:
    if not shutil.which("mypy"):
        print("SKIP: mypy not installed")
        return 0
    root = Path(__file__).resolve().parents[1]
    paths = [*STRICT_SUPPORT_SCRIPTS, *STRICT_SUPPORT_TESTS]
    failures = 0
    for rel in paths:
        path = root / rel
        if not path.is_file():
            print(f"MISSING: {rel}", file=sys.stderr)
            failures += 1
            continue
        result = subprocess.run(
            [
                "mypy",
                "--strict",
                "--explicit-package-bases",
                "--config-file",
                "pyproject.toml",
                str(path),
            ],
            cwd=root,
            check=False,
        )
        if result.returncode != 0:
            failures += 1
        else:
            print(f"OK: mypy --strict {rel}")
    if failures:
        print(f"ERROR: {failures} support path(s) failed mypy --strict", file=sys.stderr)
        return 1
    print(f"OK: mypy --strict on {len(paths)} support paths")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
