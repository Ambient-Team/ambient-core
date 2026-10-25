"""ambient_contracts.validate CLI entrypoint."""

from __future__ import annotations

import sys

import pytest

from ambient_contracts.validate import main


def test_validate_contract_main_success(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(sys, "argv", ["validate-contracts"])
    assert main() == 0
