"""CHANGELOG [0.3.11] and integrator-roadmap claims map to code and tests on this branch."""

from __future__ import annotations

from pathlib import Path

import ambient_contracts

ROOT = Path(__file__).resolve().parents[1]

V0311_IMPLEMENTATION_PATHS: tuple[str, ...] = (
    "lib/ambient_pipeline/runner.py",
    "lib/ambient_pipeline/pii.py",
    "lib/ambient_pipeline/pipeline_logging.py",
    "scripts/check_coverage.py",
    "scripts/check_quality_static.py",
    "scripts/check_golden_pii_fixture_refs.py",
    "scripts/check_sensitive_data_literals.py",
    "scripts/scan_secrets_patterns.py",
    "scripts/check_public_api_docstrings.py",
    "scripts/generate_lib_readme.py",
    "scripts/check_changelog_version.py",
    ".env.example",
    "lib/README.md",
    "tests/fixtures/golden/pipeline_spark_e2e.json",
    "tests/fixtures/golden/pipeline_spark_e2e_pii.json",
)

V0311_TEST_PATHS: tuple[str, ...] = (
    "tests/pipeline/test_pipeline_e2e_golden.py",
    "tests/pipeline/test_gold_transform_edges.py",
    "tests/test_runner_local_pipeline.py",
    "tests/test_pii_and_secrets.py",
    "tests/test_pipeline_structured_logging.py",
    "tests/test_check_quality_static.py",
    "tests/test_check_public_api_docstrings.py",
    "tests/test_secrets_scan_fixtures.py",
    "tests/test_check_doc_links.py",
    "tests/test_lib_branch_coverage.py",
)


def test_package_version_is_0311() -> None:
    assert ambient_contracts.__version__ == "0.3.11"


def test_changelog_documents_0311() -> None:
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
    assert "## [0.3.11]" in changelog
    assert "E2E golden" in changelog
    assert "AMBIENT_PII_SALT" in changelog


def test_integrator_roadmap_documents_0311_shipped() -> None:
    roadmap = (ROOT / "docs/integrator-roadmap.md").read_text(encoding="utf-8")
    assert "v0.3.11" in roadmap
    assert "test_pipeline_e2e_golden.py" in roadmap
    assert "test_v0311_release_traceability.py" in roadmap


def test_v0311_implementation_artifacts_exist() -> None:
    missing = [rel for rel in V0311_IMPLEMENTATION_PATHS if not (ROOT / rel).is_file()]
    assert not missing, f"missing implementation paths: {missing}"


def test_v0311_test_modules_exist() -> None:
    missing = [rel for rel in V0311_TEST_PATHS if not (ROOT / rel).is_file()]
    assert not missing, f"missing test paths: {missing}"


def test_pep561_py_typed_markers() -> None:
    for pkg in ("ambient_contracts", "ambient_pipeline", "ambient_calc", "ambient_cli"):
        marker = ROOT / "lib" / pkg / "py.typed"
        assert marker.is_file(), str(marker)


def test_runner_exports_metric_id_gold_pivot_constant() -> None:
    from ambient_pipeline.runner import REAL_ESTATE_GOLD_PIVOT_BY_METRIC_ID

    assert REAL_ESTATE_GOLD_PIVOT_BY_METRIC_ID


def test_check_coverage_defines_pipeline_floor() -> None:
    text = (ROOT / "scripts/check_coverage.py").read_text(encoding="utf-8")
    assert "lib/ambient_pipeline/" in text
    assert "95.0" in text


def test_readme_documents_java17_contracts_bundle_and_pii_salt() -> None:
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert "Java 17" in readme
    assert "AMBIENT_PII_SALT" in readme
    assert "lib/ambient_contracts/bundled/" in readme
