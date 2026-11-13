"""Unit tests for storage path helpers and document-store id builders."""

from __future__ import annotations

import pytest

from ambient_pipeline.sync_ids import (
    audit_performance_document_id,
    pipeline_health_document_id,
)
from ambient_pipeline.storage_paths import (
    default_base_path,
    resolve_layer_base,
    resolve_table_path,
)


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


def test_resolve_table_path_without_org() -> None:
    path = resolve_table_path("local", "/tmp/lake", "dev", "silver", "metrics")
    assert "org_id=" not in path


def test_resolve_layer_base_landing_and_bad_backend() -> None:
    landing = resolve_layer_base("local", "/tmp/root", "dev", "landing")
    assert landing.endswith("/landing")
    with pytest.raises(ValueError, match="Unknown storage_backend"):
        resolve_layer_base("invalid", None, "dev", "bronze")


def test_sync_document_ids() -> None:
    assert pipeline_health_document_id("o1", "pipe", "bronze") == "o1|pipe|bronze"
    assert audit_performance_document_id("o1", "evt") == "o1|evt"
