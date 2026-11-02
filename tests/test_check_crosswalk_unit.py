"""Unit tests for scripts/check_crosswalk.py helpers."""

from __future__ import annotations

import importlib.util
import types
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _crosswalk_module() -> types.ModuleType:
    path = ROOT / "scripts" / "check_crosswalk.py"
    spec = importlib.util.spec_from_file_location("check_crosswalk_under_test", path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_consumption_id_from_product() -> None:
    mod = _crosswalk_module()
    doc = {"product": {"consumption_id": "prod-a"}}
    assert mod.consumption_id_from_contract(doc) == "prod-a"


def test_consumption_id_from_firestore_paths() -> None:
    mod = _crosswalk_module()
    doc = {
        "firestore": {
            "paths": [{"logical_key": "logical-b"}, {"logical_key": "  "}],
        }
    }
    assert mod.consumption_id_from_contract(doc) == "logical-b"


def test_consumption_id_missing_returns_none() -> None:
    mod = _crosswalk_module()
    assert mod.consumption_id_from_contract({}) is None
    assert mod.consumption_id_from_contract({"product": "not-a-dict"}) is None


def test_metric_index_skips_invalid_entries() -> None:
    mod = _crosswalk_module()
    manifest = {
        "metrics": [
            "bad",
            {"id": "not-int", "catalogMetricKey": "  "},
            {"id": 1, "catalogMetricKey": "  "},
            {"id": 2, "catalogMetricKey": "valid.key"},
        ]
    }
    by_id, by_key = mod._metric_index(manifest)
    assert by_id == {
        1: manifest["metrics"][2],
        2: manifest["metrics"][3],
    }
    assert by_key == {"valid.key": manifest["metrics"][3]}
