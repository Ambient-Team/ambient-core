"""Governance PII/PHI flags on contracts and catalog field policy alignment."""

from __future__ import annotations

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTRACTS = ROOT / "contracts"


def test_healthcare_contracts_declare_pii_pseudonymized() -> None:
    for path in sorted(CONTRACTS.glob("healthcare*.yaml")):
        doc = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        gov = doc.get("governance") or {}
        assert gov.get("pii_pseudonymized") is True, path.name
        assert gov.get("phi_present") is False, path.name


def test_finance_contracts_declare_pii_pseudonymized() -> None:
    for path in sorted(CONTRACTS.glob("finance*.yaml")):
        doc = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        gov = doc.get("governance") or {}
        assert gov.get("pii_pseudonymized") is True, path.name
