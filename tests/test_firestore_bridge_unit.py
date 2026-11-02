"""firestore_bridge stays omitted from coverage gate; tests document platform surface."""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from ambient_pipeline.firestore_bridge import append_lineage_event, fetch_data_source


def test_append_lineage_event_swallows_client_errors(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        "ambient_pipeline.firestore_bridge._firestore_client",
        lambda: (_ for _ in ()).throw(RuntimeError("no firebase")),
    )
    append_lineage_event(
        "org",
        "src",
        run_id="r",
        status="ok",
        rows_written=1,
        gcs_path="gs://x",
    )


def test_fetch_data_source_returns_none_on_failure(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        "ambient_pipeline.firestore_bridge._firestore_client",
        lambda: (_ for _ in ()).throw(RuntimeError("no firebase")),
    )
    assert fetch_data_source("org", "src") is None


def test_fetch_data_source_returns_document(monkeypatch: pytest.MonkeyPatch) -> None:
    snap = MagicMock()
    snap.exists = True
    snap.to_dict.return_value = {"name": "source"}
    db = MagicMock()
    db.collection.return_value.document.return_value.collection.return_value.document.return_value.get.return_value = snap
    monkeypatch.setattr("ambient_pipeline.firestore_bridge._firestore_client", lambda: db)
    assert fetch_data_source("org", "src") == {"name": "source"}
