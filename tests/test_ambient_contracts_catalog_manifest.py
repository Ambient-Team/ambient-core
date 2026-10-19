"""Tests for ambient_contracts catalog manifest loader."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from ambient_contracts.catalog_manifest import load_manifest, resolve_manifest_path
from ambient_contracts.manifest_models import parse_catalog_manifest


def _manifest_shell(**overrides: object) -> dict[str, object]:
    doc: dict[str, object] = {
        "version": 1,
        "industries": [],
        "metrics": [],
        "dataOptions": [],
    }
    doc.update(overrides)
    return doc


def _minimal_metric(**overrides: object) -> dict[str, object]:
    metric: dict[str, object] = {
        "catalogMetricKey": "test.metric.sample",
        "id": 1,
        "name": "Sample",
        "industry": "Test",
        "methodology": "test",
        "type": "measured",
        "unit": "count",
        "requiredSources": [],
    }
    metric.update(overrides)
    return metric


def test_manifest_loads_from_repo() -> None:
    path = resolve_manifest_path()
    assert path.is_file()
    manifest = load_manifest()
    assert manifest.version == 3
    assert len(manifest.metrics) >= 1
    assert manifest.industries[0].industry_codes.get("isic") is not None


def test_manifest_matches_catalog_file() -> None:
    root = Path(__file__).resolve().parents[1]
    on_disk = json.loads((root / "catalog" / "manifest.json").read_text(encoding="utf-8"))
    loaded = load_manifest()
    assert loaded.metrics[0].catalog_metric_key == on_disk["metrics"][0]["catalogMetricKey"]


def test_parse_catalog_manifest_rejects_invalid_root() -> None:
    with pytest.raises(ValueError, match="expected object"):
        parse_catalog_manifest([])


def test_parse_catalog_manifest_requires_metrics_array() -> None:
    with pytest.raises(ValueError, match="manifest.metrics"):
        parse_catalog_manifest({"version": 1, "industries": [], "dataOptions": []})


def test_parse_catalog_manifest_rejects_incomplete_metric() -> None:
    with pytest.raises(ValueError, match="catalogMetricKey"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [{"id": 1}],
                "dataOptions": [],
            }
        )


def test_resolve_metric_helper() -> None:
    manifest = load_manifest()
    first = manifest.metrics[0]
    assert manifest.resolve_metric(str(first.id)) == first
    assert manifest.resolve_metric("not-a-real-id") is None


def test_parse_catalog_manifest_requires_data_options_array() -> None:
    with pytest.raises(ValueError, match="manifest.dataOptions"):
        parse_catalog_manifest(_manifest_shell(dataOptions=None))


def test_parse_catalog_manifest_rejects_non_object_industry_codes() -> None:
    with pytest.raises(ValueError, match=r"industryCodes: expected object"):
        parse_catalog_manifest(
            _manifest_shell(
                industries=[
                    {
                        "value": "x",
                        "label": "X",
                        "pack": "p",
                        "industryCodes": "bad",
                    }
                ]
            )
        )


def test_parse_catalog_manifest_rejects_non_integer_metric_ids_on_data_option() -> None:
    with pytest.raises(ValueError, match=r"metricIds\[0\]: expected integer"):
        parse_catalog_manifest(
            _manifest_shell(
                dataOptions=[
                    {
                        "catalogOptionKey": "test.option",
                        "id": 1,
                        "name": "Option",
                        "industry": "Test",
                        "metricIds": [True],
                        "fields": [],
                    }
                ]
            )
        )


def test_parse_catalog_manifest_rejects_empty_catalog_field_name() -> None:
    with pytest.raises(ValueError, match=r"fields\[0\]: expected non-empty field name"):
        parse_catalog_manifest(
            _manifest_shell(
                dataOptions=[
                    {
                        "catalogOptionKey": "test.option",
                        "id": 1,
                        "name": "Option",
                        "industry": "Test",
                        "metricIds": [],
                        "fields": [""],
                    }
                ]
            )
        )


def test_parse_catalog_manifest_metric_calc_requires_inputs_array() -> None:
    with pytest.raises(ValueError, match=r"calc.inputs: expected array"):
        parse_catalog_manifest(
            _manifest_shell(
                metrics=[
                    _minimal_metric(
                        calc={"expr": "a + b", "inputs": "not-a-list"},
                    )
                ]
            )
        )
