"""Synonym resolution and uniqueness for catalog metrics."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import pytest

from ambient_contracts.manifest_models import parse_catalog_manifest
from ambient_contracts.metric_synonyms import (
    resolve_metric_by_name,
    validate_synonyms_globally,
)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "catalog" / "manifest.json"


@pytest.fixture(scope="module")
def metrics_index() -> dict:
    if not MANIFEST.is_file():
        pytest.skip("manifest.json missing; run ambient-catalog-generate")
    doc = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_key = {m["catalogMetricKey"]: m for m in doc.get("metrics") or []}
    return by_key


def test_synonym_index_unique(metrics_index: dict) -> None:
    validate_synonyms_globally(metrics_index)


def test_resolve_cfo_synonym(metrics_index: dict) -> None:
    key = resolve_metric_by_name(metrics_index, "CFO", industry="Healthcare")
    assert key
    assert key.endswith(".operating_cash_flow")


def test_manifest_resolve_by_label() -> None:
    if not MANIFEST.is_file():
        pytest.skip("manifest.json missing")
    manifest = parse_catalog_manifest(json.loads(MANIFEST.read_text(encoding="utf-8")))
    found = manifest.resolve_metric_by_label(
        "days sales outstanding", industry="Healthcare"
    )
    assert found is not None
    assert found.catalog_metric_key.endswith(".dso")


def test_check_metric_synonyms_script() -> None:
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "check_metric_synonyms.py")],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert proc.returncode == 0, proc.stderr or proc.stdout