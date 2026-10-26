"""catalog_loader pack.yaml industry and missing manifest paths."""

from __future__ import annotations

import json
from pathlib import Path

from ambient_pipeline.catalog_loader import load_data_option, load_metric_by_numeric_id


def test_load_data_option_from_pack_without_industry_key(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "custom"
    pack.mkdir(parents=True)
    (pack / "pack.yaml").write_text("other: value\n", encoding="utf-8")
    (pack / "data_options.yaml").write_text(
        "dataOptions:\n  CustomKey:\n    id: 1\n    name: Custom\n    metricIds: []\n    fields: []\n",
        encoding="utf-8",
    )
    opt = load_data_option("CustomKey", tmp_path)
    assert opt is not None
    assert opt.get("name") == "Custom"


def test_load_data_option_returns_none_without_manifest(tmp_path: Path) -> None:
    (tmp_path / "industries").mkdir()
    assert load_data_option("NoSuchKey", tmp_path) is None


def test_load_data_option_pack_yaml_without_industry_value(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "custom"
    pack.mkdir(parents=True)
    (pack / "pack.yaml").write_text("industry:\n", encoding="utf-8")
    (pack / "data_options.yaml").write_text(
        "dataOptions:\n  CustomKey:\n    id: 1\n    name: Custom\n    metricIds: []\n    fields: []\n",
        encoding="utf-8",
    )
    opt = load_data_option("CustomKey", tmp_path)
    assert opt is not None
    assert opt.get("industry") is None


def test_load_metric_from_manifest_when_pack_yaml_missing_metric(tmp_path: Path) -> None:
    (tmp_path / "industries").mkdir()
    manifest = {
        "version": 3,
        "metrics": [{"id": 555, "name": "From manifest", "industry": "Test"}],
    }
    (tmp_path / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    metric = load_metric_by_numeric_id(555, tmp_path)
    assert metric is not None
    assert metric.get("name") == "From manifest"


def test_load_metric_skips_pack_dir_without_metrics_yaml(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "no_metrics"
    pack.mkdir(parents=True)
    (pack / "pack.yaml").write_text("industry: Test\n", encoding="utf-8")
    manifest = {"version": 1, "metrics": [{"id": 777, "name": "Manifest metric"}]}
    (tmp_path / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    metric = load_metric_by_numeric_id(777, tmp_path)
    assert metric is not None
    assert metric.get("name") == "Manifest metric"
