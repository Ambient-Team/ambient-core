"""Per-file catalog YAML schema and consistency checks."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

import pytest
import yaml

from tests.catalog_script_loader import load_generate_reference_catalog

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
INDUSTRIES = CATALOG / "industries"
METRIC_TYPE_ENUM = frozenset({"Financial", "Operational"})


@pytest.fixture(scope="module")
def gen():
    return load_generate_reference_catalog()


def _pack_dirs() -> list[Path]:
    return sorted(p for p in INDUSTRIES.iterdir() if p.is_dir())


def test_every_pack_has_required_pack_yaml_fields() -> None:
    schema = json.loads((CATALOG / "schema" / "pack-v1.json").read_text(encoding="utf-8"))
    required = set(schema.get("required") or [])
    for pack_dir in _pack_dirs():
        data = yaml.safe_load((pack_dir / "pack.yaml").read_text(encoding="utf-8")) or {}
        for field in required:
            assert field in data, f"{pack_dir.name}/pack.yaml missing {field}"


def test_industry_metrics_yaml_pass_generator_schema(gen) -> None:
    for pack_dir in _pack_dirs():
        path = pack_dir / "metrics.yaml"
        if not path.is_file():
            continue
        metrics = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("metrics") or {}
        errors = gen.validate_metrics_schema(metrics)
        assert not errors, f"{path}: {errors}"


def test_industry_data_options_yaml_pass_generator_schema(gen) -> None:
    for pack_dir in _pack_dirs():
        path = pack_dir / "data_options.yaml"
        if not path.is_file():
            continue
        options = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("dataOptions") or {}
        errors = gen.validate_data_options_schema(options)
        assert not errors, f"{path}: {errors}"


def test_native_metric_ids_unique_within_each_pack() -> None:
    for pack_dir in _pack_dirs():
        path = pack_dir / "metrics.yaml"
        if not path.is_file():
            continue
        metrics = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("metrics") or {}
        ids = [m.get("id") for m in metrics.values() if m.get("id") is not None]
        dupes = [i for i, c in Counter(ids).items() if c > 1]
        assert not dupes, f"{path}: duplicate ids {dupes}"


def test_data_option_ids_unique_within_each_pack() -> None:
    for pack_dir in _pack_dirs():
        path = pack_dir / "data_options.yaml"
        if not path.is_file():
            continue
        options = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("dataOptions") or {}
        ids = [o.get("id") for o in options.values() if o.get("id") is not None]
        dupes = [i for i, c in Counter(ids).items() if c > 1]
        assert not dupes, f"{path}: duplicate ids {dupes}"


def test_metrics_have_unit_and_valid_type_category() -> None:
    for pack_dir in _pack_dirs():
        path = pack_dir / "metrics.yaml"
        if not path.is_file():
            continue
        metrics = (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("metrics") or {}
        for key, metric in metrics.items():
            unit = metric.get("unit")
            assert isinstance(unit, str) and unit.strip(), f"{path} {key}: missing unit"
            mtype = metric.get("type")
            assert mtype in METRIC_TYPE_ENUM, f"{path} {key}: type {mtype!r}"


def test_shared_data_option_templates_have_ids_and_metric_refs() -> None:
    shared = yaml.safe_load((CATALOG / "shared" / "data_options.yaml").read_text(encoding="utf-8")) or {}
    for slug, template in (shared.get("dataOptionTemplates") or {}).items():
        assert template.get("name"), slug
        assert template.get("metricRefs") is not None, slug


def test_shared_metric_templates_have_type_and_unit() -> None:
    shared = yaml.safe_load((CATALOG / "shared" / "metrics.yaml").read_text(encoding="utf-8")) or {}
    for slug, metric in (shared.get("templates") or {}).items():
        assert metric.get("type") in METRIC_TYPE_ENUM, slug
        unit = metric.get("unit")
        assert isinstance(unit, str) and unit.strip(), slug
