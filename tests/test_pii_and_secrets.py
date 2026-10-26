"""PII pseudonymization and secret helper coverage."""

from __future__ import annotations

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.pii import (
    GOLDEN_TEST_PII_SALT,
    PII_SALT_SETUP_HINT,
    PiiPseudonymizer,
    assert_pii_columns_pseudonymized,
    columns_matching_pii_indicators,
    ensure_pii_salt_allowed_for_runtime,
    hmac_sha256_hex,
    value_looks_pseudonymized,
)
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


def test_columns_matching_pii_indicators() -> None:
    assert columns_matching_pii_indicators(["metric_id", "name", "value"]) == ["name"]
    assert columns_matching_pii_indicators(["org_id"], extra_sensitive=["org_id"]) == ["org_id"]


def test_value_looks_pseudonymized() -> None:
    digest = hmac_sha256_hex("salt", "x")
    assert value_looks_pseudonymized(digest)
    assert not value_looks_pseudonymized("Net Operating Income")
    assert value_looks_pseudonymized(None)


def _clear_pii_test_context(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("PYTEST_CURRENT_TEST", raising=False)
    monkeypatch.delenv("AMBIENT_SPARK_TESTS", raising=False)


def test_ensure_pii_salt_rejects_missing_env_outside_tests(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    _clear_pii_test_context(monkeypatch)
    monkeypatch.delenv("AMBIENT_PII_SALT", raising=False)
    with pytest.raises(RuntimeError, match="AMBIENT_PII_SALT") as exc:
        ensure_pii_salt_allowed_for_runtime("any-salt")
    assert PII_SALT_SETUP_HINT.split(".")[0] in str(exc.value)


def test_ensure_pii_salt_rejects_empty_salt_outside_tests(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    _clear_pii_test_context(monkeypatch)
    monkeypatch.setenv("AMBIENT_PII_SALT", "production-salt-value")
    with pytest.raises(RuntimeError, match="must not be empty"):
        ensure_pii_salt_allowed_for_runtime("   ")


def test_ensure_pii_salt_rejects_golden_salt_outside_tests(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    _clear_pii_test_context(monkeypatch)
    monkeypatch.setenv("AMBIENT_PII_SALT", GOLDEN_TEST_PII_SALT)
    with pytest.raises(RuntimeError, match="Golden test PII salt"):
        ensure_pii_salt_allowed_for_runtime(GOLDEN_TEST_PII_SALT)


def test_pii_apply_rejects_golden_salt_outside_tests(
    spark: SparkSession,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    _clear_pii_test_context(monkeypatch)
    monkeypatch.setenv("AMBIENT_PII_SALT", GOLDEN_TEST_PII_SALT)
    df = spark.createDataFrame([("raw-name",)], ["name"])
    pii = PiiPseudonymizer(salt=GOLDEN_TEST_PII_SALT, transform_ts="2026-01-01T00:00:00Z")
    with pytest.raises(RuntimeError, match="Golden test PII salt"):
        pii.apply(df)


def test_assert_pii_columns_pseudonymized_rejects_raw_values(spark: SparkSession) -> None:
    df = spark.createDataFrame([("Alice Example",)], ["customer_name"])
    with pytest.raises(AssertionError, match="non-pseudonymized"):
        assert_pii_columns_pseudonymized(df)


def test_assert_pii_columns_pseudonymized_accepts_digest(spark: SparkSession) -> None:
    digest = hmac_sha256_hex("salt", "Alice Example")
    df = spark.createDataFrame([(digest,)], ["customer_name"])
    assert_pii_columns_pseudonymized(df)


def test_golden_pii_fixture_matches_constant() -> None:
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    env_path = root / "tests" / "fixtures" / "pipeline" / "golden_pii_salt.env"
    for line in env_path.read_text(encoding="utf-8").splitlines():
        if line.strip().startswith("AMBIENT_PII_SALT="):
            assert line.split("=", 1)[1].strip() == GOLDEN_TEST_PII_SALT
            return
    raise AssertionError("AMBIENT_PII_SALT not found in golden PII fixture env file")
