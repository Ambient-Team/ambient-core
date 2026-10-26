"""CatalogManifest model helpers and parse edge paths."""

from __future__ import annotations

import pytest

from ambient_contracts.manifest_models import (
    CatalogDataOption,
    CatalogField,
    CatalogIndustryEntry,
    MetricCalc,
    MetricInputSource,
    RequiredSource,
    parse_catalog_manifest,
)


def _industry_codes() -> dict[str, object]:
    return {
        "isic": {"revision": "Rev.4", "primary": "0000"},
        "naics": {"revision": "2022", "primary": "000000"},
        "nace": {"revision": "Rev.2", "primary": "00.00"},
        "gics": {"revision": "2023", "primary": "000000"},
        "confidence": "high",
        "lastReviewed": "2026-01-01",
        "source": "manual",
    }


def test_catalog_metric_and_data_option_to_tool_dict() -> None:
    manifest = parse_catalog_manifest(
        {
            "version": 1,
            "industries": [
                {
                    "value": "Retail",
                    "label": "Retail",
                    "pack": "retail",
                    "industryCodes": _industry_codes(),
                }
            ],
            "metrics": [
                {
                    "catalogMetricKey": "retail.test",
                    "id": 7,
                    "name": "Test Metric",
                    "industry": "Retail",
                    "methodology": "m",
                    "type": "Financial",
                    "unit": "Ratio",
                    "requiredSources": [{"catalogOptionKey": "OptKey", "fields": ["a"]}],
                    "calc": {"expr": "a / b", "inputs": ["a", "b"]},
                    "inputs": [],
                    "frequency": "monthly",
                    "inputCoverage": "partial",
                }
            ],
            "dataOptions": [
                {
                    "catalogOptionKey": "OptKey",
                    "id": 1,
                    "name": "Opt",
                    "industry": "Retail",
                    "metricIds": [7],
                    "fields": [{"name": "revenue", "type": "decimal"}],
                    "collectionFrequency": "monthly",
                    "grain": "month",
                    "fieldCoverage": "enumerated",
                }
            ],
        }
    )
    metric = manifest.metrics[0]
    out = metric.to_tool_dict()
    assert out["frequency"] == "monthly"
    assert manifest.metrics_for_industry("Retail")
    assert manifest.metrics_for_industry("Other") == []

    option = manifest.data_options[0]
    assert isinstance(option, CatalogDataOption)
    opt_out = option.to_tool_dict()
    assert opt_out["grain"] == "month"


def test_parse_metric_input_source_validation_errors() -> None:
    with pytest.raises(ValueError, match="name"):
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
                        "unit": "Ratio",
                        "requiredSources": [],
                        "inputs": [
                            {
                                "catalogOptionKey": "OptKey",
                                "via": "field",
                                "field": "revenue",
                                "name": 99,
                            }
                        ],
                    }
                ],
                "dataOptions": [],
            }
        )


def test_catalog_field_and_industry_entry_helpers() -> None:
    field = CatalogField(name="x", type="string")
    assert field.to_tool_dict()["name"] == "x"
    industry = CatalogIndustryEntry(
        value="X",
        label="X",
        pack="x",
        industry_codes=_industry_codes(),
    )
    assert industry.pack == "x"
    src = MetricInputSource(catalog_option_key="k", via="field", field="f", id=1, name="N")
    payload = src.to_tool_dict()
    assert payload["via"] == "field"
    assert payload["field"] == "f"
    assert payload["id"] == 1
    assert payload["name"] == "N"
    assert MetricCalc(expr="1", inputs=("a",)).to_tool_dict()["expr"] == "1"
    assert "name" not in RequiredSource(catalog_option_key="k", name=None, fields=("a",)).to_tool_dict()
