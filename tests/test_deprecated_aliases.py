"""Deprecated module aliases keep platform imports working."""

from __future__ import annotations

from pathlib import Path

from ambient_pipeline import colab_smoke, firestore_sync_ids, notebook_smoke, sync_ids
from ambient_pipeline.colab_bootstrap import ensure_package_on_path, find_platform_root
from ambient_pipeline.notebook_bootstrap import ensure_checkout_on_path, find_checkout_root


def test_colab_smoke_reexports_notebook_smoke() -> None:
    assert colab_smoke.run_colab_smoke.__module__ == "ambient_pipeline.colab_smoke"
    assert colab_smoke.DEMO_TABLES is notebook_smoke.DEMO_TABLES


def test_firestore_sync_ids_reexports_sync_ids() -> None:
    assert (
        firestore_sync_ids.pipeline_health_document_id
        is sync_ids.pipeline_health_document_id
    )


def test_colab_bootstrap_aliases(tmp_path: Path) -> None:
    repo = tmp_path / "ambient-core"
    (repo / "ambient_pipeline").mkdir(parents=True)
    (repo / "data").mkdir()
    (repo / "ambient_pipeline" / "pandas_provenance.py").write_text("", encoding="utf-8")
    root = find_platform_root(repo)
    assert root == repo.resolve()
    assert ensure_package_on_path(repo) == repo.resolve()
    assert ensure_checkout_on_path(repo) == repo.resolve()
    assert find_checkout_root(repo) == repo.resolve()
