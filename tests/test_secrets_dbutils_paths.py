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
    fake_module.DBUtils = FakeDBUtils
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_module)
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: MagicMock())

    assert get_secret("scope", "api_token") == "from-dbutils"


def test_try_dbutils_returns_none_without_spark(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: None)
    monkeypatch.delitem(sys.modules, "pyspark.dbutils", raising=False)
    assert _try_dbutils_secret("scope", "key") is None
