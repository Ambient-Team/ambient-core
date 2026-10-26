"""PII pseudonymization and secret helper coverage."""

from __future__ import annotations

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.pii import PiiPseudonymizer, hmac_sha256_hex
from ambient_pipeline.secrets import get_secret, get_secret_or_warn


def test_hmac_sha256_hex_deterministic() -> None:
    a = hmac_sha256_hex("salt", "value")
    b = hmac_sha256_hex("salt", "value")
    assert a == b
    assert a != hmac_sha256_hex("salt", "other")


def test_pii_pseudonymizer_repr_redacts_salt() -> None:
    text = repr(PiiPseudonymizer(salt="secret", transform_ts="t"))
    assert "redacted" in text
    assert "secret" not in text


def test_pii_pseudonymizer_eq() -> None:
    a = PiiPseudonymizer(salt="s", transform_ts="t")
    b = PiiPseudonymizer(salt="s", transform_ts="t")
    assert a == b
    assert a != PiiPseudonymizer(salt="x", transform_ts="t")


def test_get_secret_from_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "from-env")
    assert get_secret("ambient-systems", "pii_salt") == "from-env"


def test_get_secret_simple_env_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("AMBIENT_TOKEN", "env-wins")
    assert get_secret("scope", "token") == "env-wins"


def test_get_secret_scoped_env_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_API_TOKEN", raising=False)
    monkeypatch.setenv("AMBIENT_AMBIENT_SYSTEMS_API_TOKEN", "scoped")
    assert get_secret("ambient-systems", "api_token") == "scoped"


def test_get_secret_missing_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_MISSING_KEY", raising=False)
    monkeypatch.delenv("AMBIENT_MISSING_SCOPE_MISSING_KEY", raising=False)
    with pytest.raises(RuntimeError, match="Secret not found"):
        get_secret("missing-scope", "missing-key", env_prefix="AMBIENT")


def test_get_secret_or_warn_dev_fallback(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("AMBIENT_ALLOW_DEV_SECRETS", "1")
    value = get_secret_or_warn("s", "k", env_prefix="AMBIENT_NOPE", dev_fallback="dev")
    assert value == "dev"


def test_pii_apply_on_spark(spark: SparkSession) -> None:
    df = spark.createDataFrame([("alice@example.com",)], ["user_email"])
    out = PiiPseudonymizer(salt="test-salt", transform_ts="2026-01-01T00:00:00Z").apply(df)
    assert "_gdpr_pii_scanned" in out.columns
    row = out.collect()[0]
    assert row["user_email"] != "alice@example.com"
