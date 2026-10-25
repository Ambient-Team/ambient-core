"""validate.main() failure path."""

from __future__ import annotations

import sys

import pytest

from ambient_contracts.validate import main


def test_validate_contract_main_prints_errors_and_exits_one(
    monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    monkeypatch.setattr(sys, "argv", ["validate-contracts"])
    monkeypatch.setattr(
        "ambient_contracts.validate.validate_all_contracts",
        lambda *_a, **_k: ["bad-v1.yaml: missing keys"],
    )
    assert main() == 1
    assert "ERROR:" in capsys.readouterr().err
