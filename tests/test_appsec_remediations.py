"""AppSec regression tests for medium+ remediations."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_calc import CalcError, safe_eval
from ambient_contracts.loader import ContractLoader
from ambient_pipeline.bronze_catalog_map import parse_mapping_json
from ambient_pipeline.governance_views import bronze_raw_metrics_org_view_sql
from ambient_pipeline.pii import hmac_sha256_hex
from ambient_pipeline.secrets import get_secret_or_warn


def test_parse_mapping_json_rejects_sql_injection_keys() -> None:
    with pytest.raises(ValueError, match="unsafe"):
        parse_mapping_json({"qty'; DROP TABLE t;--": "quantity_on_hand"})


def test_parse_mapping_json_rejects_oversized_payload() -> None:
    huge = '{"a":"' + ("b" * 40000) + '"}'
    with pytest.raises(ValueError, match="max length"):
        parse_mapping_json(huge)


def test_contract_loader_rejects_path_traversal(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    (contracts / "ok.yaml").write_text("product: {name: Ok, version: 1}\n", encoding="utf-8")
    loader = ContractLoader(contracts_dir=contracts)
    with pytest.raises(ValueError, match="path traversal|absolute"):
        loader.resolve_path("../ok.yaml")
    with pytest.raises(ValueError, match="path traversal|absolute"):
        loader.resolve_path("/etc/passwd")
    assert loader.resolve_path("ok.yaml").name == "ok.yaml"


def test_secret_fallback_fail_closed(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_PII_SALT", raising=False)
    monkeypatch.delenv("AMBIENT_AMBIENT_SYSTEMS_PII_SALT", raising=False)
    monkeypatch.delenv("AMBIENT_ALLOW_DEV_SECRETS", raising=False)
    with pytest.raises(RuntimeError, match="Secret not found"):
        get_secret_or_warn("ambient-systems", "pii_salt", dev_fallback="dev-only")


def test_secret_fallback_opt_in(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_PII_SALT", raising=False)
    monkeypatch.delenv("AMBIENT_AMBIENT_SYSTEMS_PII_SALT", raising=False)
    monkeypatch.setenv("AMBIENT_ALLOW_DEV_SECRETS", "1")
    with pytest.warns(UserWarning, match="dev-only"):
        assert (
            get_secret_or_warn("ambient-systems", "pii_salt", dev_fallback="dev-only")
            == "dev-only"
        )


def test_hmac_sha256_is_keyed() -> None:
    a = hmac_sha256_hex("salt-a", "user@example.com")
    b = hmac_sha256_hex("salt-b", "user@example.com")
    assert a != b
    assert len(a) == 64


def test_safe_eval_bounds_pow() -> None:
    assert safe_eval("2 ** 10", {}) == 1024
    with pytest.raises(CalcError, match="exponent"):
        safe_eval("9 ** 101", {})


def test_governance_view_rejects_unsafe_catalog() -> None:
    with pytest.raises(ValueError, match="unsafe"):
        bronze_raw_metrics_org_view_sql("main; DROP VIEW x;--")
