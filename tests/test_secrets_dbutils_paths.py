"""Cover optional Databricks dbutils branches in secrets.py."""

from __future__ import annotations

import sys
import types
from unittest.mock import MagicMock

import pytest

from ambient_pipeline.secrets import _try_dbutils_secret, get_secret


def test_get_secret_uses_dbutils_when_env_empty(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("AMBIENT_API_TOKEN", raising=False)
    monkeypatch.delenv("AMBIENT_SCOPE_API_TOKEN", raising=False)

    class FakeSecrets:
        def get(self, scope: str, key: str) -> str:
            return "from-dbutils"

    class FakeDBUtils:
        def __init__(self, _spark: object) -> None:
            self.secrets = FakeSecrets()

    fake_module = types.ModuleType("pyspark.dbutils")
    setattr(fake_module, "DBUtils", FakeDBUtils)
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_module)
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: MagicMock())

    assert get_secret("scope", "api_token") == "from-dbutils"


def test_try_dbutils_returns_none_without_spark(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: None)
    monkeypatch.delitem(sys.modules, "pyspark.dbutils", raising=False)
    assert _try_dbutils_secret("scope", "key") is None


def test_try_dbutils_notebook_path_when_pyspark_import_ok_but_no_session(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Cover secrets.py 24->29: imports succeed, active session is None, notebook dbutils wins."""
    import ambient_pipeline.secrets as secrets_module

    class FakeSecrets:
        def get(self, scope: str, key: str) -> str:
            assert scope == "ambient-systems"
            assert key == "api_token"
            return "notebook-secret"

    mock_dbutils = types.SimpleNamespace(secrets=FakeSecrets())
    monkeypatch.setitem(secrets_module.__dict__, "dbutils", mock_dbutils)

    class FakeDBUtils:
        def __init__(self, _spark: object) -> None:
            raise AssertionError("should not construct DBUtils when session is None")

    fake_module = types.ModuleType("pyspark.dbutils")
    setattr(fake_module, "DBUtils", FakeDBUtils)
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_module)
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: None)

    assert _try_dbutils_secret("ambient-systems", "api_token") == "notebook-secret"


def test_get_secret_raises_when_dbutils_returns_empty_string(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("AMBIENT_API_TOKEN", raising=False)
    monkeypatch.delenv("AMBIENT_SCOPE_API_TOKEN", raising=False)

    class FakeSecrets:
        def get(self, scope: str, key: str) -> str:
            return ""

    class FakeDBUtils:
        def __init__(self, _spark: object) -> None:
            self.secrets = FakeSecrets()

    fake_module = types.ModuleType("pyspark.dbutils")
    setattr(fake_module, "DBUtils", FakeDBUtils)
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_module)
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: MagicMock())

    with pytest.raises(RuntimeError, match="Secret not found"):
        get_secret("scope", "api_token")
