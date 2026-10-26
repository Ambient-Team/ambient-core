"""Unit tests for firestore_bridge client bootstrap (no live Firebase)."""

from __future__ import annotations

import json
import sys
from unittest.mock import MagicMock

import pytest

from ambient_pipeline.firestore_bridge import _firestore_client, append_lineage_event


def _install_fake_firebase(
    monkeypatch: pytest.MonkeyPatch, *, apps: list[object]
) -> MagicMock:
    firebase_admin = MagicMock()
    firebase_admin._apps = apps
    credentials = MagicMock()
    credentials.Certificate.return_value = "cred"
    firestore = MagicMock()
    client = MagicMock()
    firestore.client.return_value = client
    firebase_admin.credentials = credentials
    firebase_admin.firestore = firestore
    monkeypatch.setitem(sys.modules, "firebase_admin", firebase_admin)
    monkeypatch.setitem(sys.modules, "firebase_admin.credentials", credentials)
    monkeypatch.setitem(sys.modules, "firebase_admin.firestore", firestore)
    return client


def test_firestore_client_initializes_from_json_secret(monkeypatch: pytest.MonkeyPatch) -> None:
    sa = {"type": "service_account", "project_id": "demo"}
    monkeypatch.setattr(
        "ambient_pipeline.secrets.get_secret",
        lambda *_a, **_k: json.dumps(sa),
    )
    client = _install_fake_firebase(monkeypatch, apps=[])
    assert _firestore_client() is client


def test_firestore_client_reuses_existing_app(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        "ambient_pipeline.secrets.get_secret",
        lambda *_a, **_k: json.dumps({"type": "service_account"}),
    )
    client = _install_fake_firebase(monkeypatch, apps=["existing"])
    assert _firestore_client() is client


def test_firestore_client_rejects_invalid_json(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("ambient_pipeline.secrets.get_secret", lambda *_a, **_k: "not-json")
    _install_fake_firebase(monkeypatch, apps=[])
    with pytest.raises(RuntimeError, match="valid JSON"):
        _firestore_client()


def test_firestore_client_rejects_non_object_json(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr("ambient_pipeline.secrets.get_secret", lambda *_a, **_k: json.dumps(["not", "a", "dict"]))
    _install_fake_firebase(monkeypatch, apps=[])
    with pytest.raises(RuntimeError, match="JSON object"):
        _firestore_client()


def test_append_lineage_event_writes_history(monkeypatch: pytest.MonkeyPatch) -> None:
    history = MagicMock()
    db = MagicMock()
    db.collection.return_value.document.return_value.collection.return_value.document.return_value.collection.return_value = history
    monkeypatch.setattr("ambient_pipeline.firestore_bridge._firestore_client", lambda: db)
    append_lineage_event(
        "org-1",
        "src-1",
        run_id="run-1",
        status="ok",
        rows_written=3,
        gcs_path="gs://bucket/path",
    )
    history.add.assert_called_once()
