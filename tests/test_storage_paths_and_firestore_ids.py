"""Unit tests for storage path helpers and Firestore document id builders."""

from __future__ import annotations

import pytest

from ambient_pipeline.firestore_sync_ids import (
    audit_performance_document_id,
    pipeline_health_document_id,
)
from ambient_pipeline.storage_paths import (
    catalog_for_backend,
    default_base_path,
    is_gcs_uri,
    resolve_layer_base,
    resolve_source_path,
    resolve_table_path,
)


def test_is_gcs_uri() -> None:
    assert is_gcs_uri("gs://bucket/path")
    assert not is_gcs_uri("/local/path")


def test_default_base_path_local() -> None:
    path = default_base_path("local", "dev")
    assert "dev" in path


def test_default_base_path_unknown_backend() -> None:
    with pytest.raises(ValueError, match="Unknown storage_backend"):
        default_base_path("s3", "dev")


def test_resolve_layer_base_unknown_layer() -> None:
    with pytest.raises(ValueError, match="Unknown layer"):
        resolve_layer_base("local", None, "dev", "platinum")


def test_resolve_table_path_with_org() -> None:
    path = resolve_table_path("local", "/tmp/lake", "dev", "bronze", "events", org_id="org-1")
    assert "org_id=org-1" in path


def test_resolve_source_path_prefers_explicit() -> None:
    assert resolve_source_path("gs://old", "gs://new") == "gs://new"


def test_catalog_for_backend_local() -> None:
    assert catalog_for_backend("local") == ("spark_catalog", "")


def test_firestore_document_ids() -> None:
    assert pipeline_health_document_id("o1", "pipe", "bronze") == "o1|pipe|bronze"
    assert audit_performance_document_id("o1", "evt") == "o1|evt"
