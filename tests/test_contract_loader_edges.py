"""ContractLoader edge cases."""

from __future__ import annotations

import pytest

from ambient_contracts.loader import ContractLoader


def test_contract_loader_repr() -> None:
    loader = ContractLoader()
    assert "ContractLoader" in repr(loader)


def test_load_rejects_non_mapping(tmp_path, monkeypatch: pytest.MonkeyPatch) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    bad = contracts / "bad.yaml"
    bad.write_text("- not a mapping\n", encoding="utf-8")
    loader = ContractLoader(contracts_dir=contracts)
    with pytest.raises(ValueError, match="mapping"):
        loader.load("bad.yaml")
