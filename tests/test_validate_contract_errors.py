"""Error message quality for ambient_contracts.validate."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from ambient_contracts.validate import validate_all_contracts, validate_contract_doc, validate_contract_file


def test_validate_contract_doc_root_not_mapping() -> None:
    errors = validate_contract_doc([], "bad.yaml")
    assert errors == ["bad.yaml: root must be a mapping"]


def test_validate_contract_doc_missing_top_level_keys() -> None:
    errors = validate_contract_doc({"product": {}}, "x.yaml")
    assert any("missing top-level keys" in e for e in errors)
    assert any("schema" in e for e in errors)


def test_validate_contract_doc_product_not_mapping() -> None:
    errors = validate_contract_doc(
        {"product": "nope", "schema": {}, "lineage": {}, "governance": {}},
        "x.yaml",
    )
    assert any("product must be a mapping" in e for e in errors)


def test_validate_contract_doc_product_missing_keys() -> None:
    doc = {
        "product": {"name": "X"},
        "schema": {},
        "lineage": {},
        "governance": {},
    }
    errors = validate_contract_doc(doc, "x.yaml")
    assert any("product missing keys" in e for e in errors)


def test_validate_contract_doc_empty_provenance_columns() -> None:
    doc = {
        "product": {"name": "X", "version": "1", "owner": "o"},
        "schema": {},
        "lineage": {"provenance_columns": []},
        "governance": {},
    }
    errors = validate_contract_doc(doc, "x.yaml")
    assert any("provenance_columns must be non-empty" in e for e in errors)


def test_validate_contract_doc_firestore_paths_need_consumption() -> None:
    doc = {
        "product": {"name": "X", "version": "1", "owner": "o"},
        "schema": {},
        "lineage": {},
        "governance": {},
        "firestore": {"paths": [{"logical_key": "lk"}]},
    }
    errors = validate_contract_doc(doc, "x.yaml")
    assert any("allowed_paths" in e for e in errors)


def test_validate_contract_file_malformed_yaml(tmp_path: Path) -> None:
    path = tmp_path / "broken.yaml"
    path.write_text("product: [unclosed\n", encoding="utf-8")
    with pytest.raises(yaml.YAMLError):
        validate_contract_file(path)


def test_validate_all_contracts_missing_directory(tmp_path: Path) -> None:
    errors = validate_all_contracts(tmp_path / "nope")
    assert errors and "not found" in errors[0]


def test_validate_all_contracts_no_yaml_files(tmp_path: Path) -> None:
    empty = tmp_path / "contracts"
    empty.mkdir()
    errors = validate_all_contracts(empty)
    assert errors == ["no contract YAML files found"]


def test_validate_contracts_main_prints_errors(tmp_path: Path) -> None:
    import subprocess
    import sys

    bad = tmp_path / "contracts"
    bad.mkdir()
    (bad / "bad-v1.yaml").write_text("product: {}\n", encoding="utf-8")
    result = subprocess.run(
        [sys.executable, "-m", "ambient_contracts.validate"],
        cwd=Path(__file__).resolve().parents[1],
        capture_output=True,
        text=True,
        check=False,
        env={**dict(__import__("os").environ), "AMBIENT_CONTRACTS_DIR": str(bad)},
    )
    assert result.returncode == 1
    assert "ERROR:" in result.stderr
