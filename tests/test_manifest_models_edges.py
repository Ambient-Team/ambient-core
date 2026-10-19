"""Additional manifest_models parse and helper coverage."""

from __future__ import annotations

import pytest

from ambient_contracts.manifest_models import (
    CatalogField,
    CatalogManifest,
    CatalogMetric,
    MetricCalc,
    RequiredSource,
    parse_catalog_manifest,
)


def test_catalog_field_to_tool_dict_optional_fields() -> None:
    field = CatalogField(
        name="amount",
        type="decimal",
        nullable=True,
        format="currency",
        unit="USD",
        description="test",
    )
    out = field.to_tool_dict()
    assert out["nullable"] is True
    assert out["unit"] == "USD"


def test_required_source_to_tool_dict() -> None:
    src = RequiredSource(catalog_option_key="Key1", name="Opt", fields=("a", "b"))
    out = src.to_tool_dict()
    assert out["fields"] == ["a", "b"]


def test_metric_calc_to_tool_dict() -> None:
    calc = MetricCalc(expr="a / b", inputs=("a", "b"))
    assert calc.to_tool_dict()["expr"] == "a / b"


def test_catalog_manifest_resolve_metric() -> None:
    manifest = parse_catalog_manifest(
        {
            "version": 1,
            "industries": [],
            "metrics": [
                {
                    "catalogMetricKey": "k1",
                    "id": 42,
                    "name": "M",
                    "industry": "X",
                    "methodology": "m",
                    "type": "Financial",
                    "unit": "Ratio",
                    "requiredSources": [],
                }
            ],
            "dataOptions": [],
        }
    )
    assert isinstance(manifest, CatalogManifest)
    found = manifest.resolve_metric("42")
    assert found is not None
    assert isinstance(found, CatalogMetric)
    assert manifest.resolve_metric("999") is None


def test_parse_rejects_bad_required_source() -> None:
    with pytest.raises(ValueError, match="catalogOptionKey"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [
                    {
                        "catalogMetricKey": "k",
                        "id": 1,
                        "name": "M",
                        "industry": "X",
                        "methodology": "m",
                        "type": "Financial",
                        "unit": "u",
                        "requiredSources": [{}],
                    }
                ],
                "dataOptions": [],
            }
        )
