"""Integration tests for ambient_contracts.validate (checkout contracts gate)."""

from __future__ import annotations

from pathlib import Path

from ambient_contracts.validate import validate_all_contracts, validate_contract_doc


def test_checkout_contracts_directory_passes_validate_all() -> None:
    errors = validate_all_contracts(Path("contracts"))
    assert errors == []


def test_bundled_contracts_directory_passes_validate_all() -> None:
    bundled = Path(__file__).resolve().parents[1] / "lib" / "ambient_contracts" / "bundled"
    errors = validate_all_contracts(bundled)
    assert errors == []


def test_validate_contract_doc_reports_missing_product_keys() -> None:
    errors = validate_contract_doc(
        {"product": {"name": "Incomplete"}, "schema": {}, "lineage": {}, "governance": {}},
        "sample.yaml",
    )
    assert any("product missing keys" in err for err in errors)


def test_contract_loader_loads_every_validated_checkout_file() -> None:
    from ambient_contracts.loader import ContractLoader

    loader = ContractLoader(contracts_dir=Path("contracts"))
    for path in sorted(Path("contracts").glob("*.yaml")):
        doc = loader.load(path.name)
        assert isinstance(doc, dict)
        assert doc.get("product", {}).get("name")
