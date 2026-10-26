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
    "scripts/validate_contracts.py",
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
