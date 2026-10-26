"""ValueError branches in manifest_models parsers (behavior-focused)."""

from __future__ import annotations

import pytest

from ambient_contracts.manifest_models import MetricInput, MetricInputSource, parse_catalog_manifest


def _metric(**overrides: object) -> dict:
    base = {
        "catalogMetricKey": "k",
        "id": 1,
        "name": "M",
        "industry": "X",
        "methodology": "m",
        "type": "Financial",
        "unit": "Ratio",
        "requiredSources": [],
    }
    base.update(overrides)
    return base


def _industry_codes() -> dict:
    return {
        "isic": {"revision": "Rev.4", "primary": "0000"},
        "naics": {"revision": "2022", "primary": "000000"},
        "nace": {"revision": "Rev.2", "primary": "00.00"},
        "gics": {"revision": "2023", "primary": "000000"},
        "confidence": "high",
        "lastReviewed": "2026-01-01",
        "source": "manual",
    }


def test_metric_input_source_rejects_bad_field_id_name() -> None:
    base_input = {
        "name": "revenue",
        "kind": "field",
        "covered": True,
        "satisfiedBy": [
            {
                "catalogOptionKey": "OptKey",
                "via": "field",
            }
        ],
    }
    for key, bad in (("field", 1), ("id", "x"), ("name", 9)):
        payload = {**base_input["satisfiedBy"][0], key: bad}
        with pytest.raises(ValueError, match=key):
            parse_catalog_manifest(
                {
                    "version": 1,
                    "industries": [],
                    "metrics": [_metric(inputs=[{**base_input, "satisfiedBy": [payload]}])],
                    "dataOptions": [],
                }
            )


def test_metric_input_rejects_non_boolean_covered() -> None:
    with pytest.raises(ValueError, match="covered"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [
                    _metric(
                        inputs=[
                            {
                                "name": "revenue",
                                "kind": "field",
                                "covered": "yes",
                                "satisfiedBy": [],
                            }
                        ]
                    )
                ],
                "dataOptions": [],
            }
        )


def test_metric_rejects_bad_methodology_and_unit() -> None:
    with pytest.raises(ValueError, match="methodology"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [_metric(methodology=1)],
                "dataOptions": [],
            }
        )
    with pytest.raises(ValueError, match="unit"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [_metric(unit=None)],
                "dataOptions": [],
            }
        )


def test_metric_rejects_bad_input_coverage_and_frequency() -> None:
    with pytest.raises(ValueError, match="inputCoverage"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [_metric(inputCoverage=99)],
                "dataOptions": [],
            }
        )
    with pytest.raises(ValueError, match="frequency"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [_metric(frequency=False)],
                "dataOptions": [],
            }
        )


def test_catalog_field_rejects_empty_string_shorthand() -> None:
    with pytest.raises(ValueError, match="non-empty"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [],
                "dataOptions": [
                    {
                        "catalogOptionKey": "OptKey",
                        "id": 1,
                        "name": "Opt",
                        "industry": "X",
                        "metricIds": [],
                        "fields": ["  "],
                    }
                ],
            }
        )


def test_catalog_field_rejects_bad_optional_metadata() -> None:
    for key, bad in (
        ("nullable", "n"),
        ("format", 1),
        ("unit", []),
        ("description", False),
    ):
        with pytest.raises(ValueError, match=key):
            parse_catalog_manifest(
                {
                    "version": 1,
                    "industries": [],
                    "metrics": [],
                    "dataOptions": [
                        {
                            "catalogOptionKey": "OptKey",
                            "id": 1,
                            "name": "Opt",
                            "industry": "X",
                            "metricIds": [],
                            "fields": [
                                {
                                    "name": "revenue",
                                    "type": "decimal",
                                    key: bad,
                                }
                            ],
                        }
                    ],
                }
            )


def test_data_option_rejects_bad_optional_strings() -> None:
    for key, yaml_key, bad in (
        ("collectionFrequency", "collectionFrequency", 1),
        ("grain", "grain", False),
        ("fieldCoverage", "fieldCoverage", []),
    ):
        with pytest.raises(ValueError, match=key):
            parse_catalog_manifest(
                {
                    "version": 1,
                    "industries": [],
                    "metrics": [],
                    "dataOptions": [
                        {
                            "catalogOptionKey": "OptKey",
                            "id": 1,
                            "name": "Opt",
                            "industry": "X",
                            "metricIds": [],
                            "fields": ["revenue"],
                            yaml_key: bad,
                        }
                    ],
                }
            )


def test_industry_codes_missing_required_block() -> None:
    codes = _industry_codes()
    del codes["gics"]
    with pytest.raises(ValueError, match="missing gics"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [
                    {
                        "value": "X",
                        "label": "X",
                        "pack": "x",
                        "industryCodes": codes,
                    }
                ],
                "metrics": [],
                "dataOptions": [],
            }
        )


def test_metric_input_to_tool_dict_round_trip() -> None:
    source = MetricInputSource(
        catalog_option_key="OptKey",
        via="field",
        field="revenue",
        id=7,
        name="Revenue",
    )
    inp = MetricInput(name="revenue", kind="field", covered=True, satisfied_by=(source,))
    out = inp.to_tool_dict()
    assert out["covered"] is True
    assert out["satisfiedBy"][0]["field"] == "revenue"


def test_metric_input_source_to_tool_dict_omits_null_optionals() -> None:
    minimal = MetricInputSource(catalog_option_key="OptKey", via="upload")
    assert minimal.to_tool_dict() == {"catalogOptionKey": "OptKey", "via": "upload"}


def test_catalog_data_option_to_tool_dict_omits_null_optionals() -> None:
    manifest = parse_catalog_manifest(
        {
            "version": 1,
            "industries": [],
            "metrics": [],
            "dataOptions": [
                {
                    "catalogOptionKey": "OptKey",
                    "id": 1,
                    "name": "Opt",
                    "industry": "X",
                    "metricIds": [],
                    "fields": ["revenue"],
                }
            ],
        }
    )
    out = manifest.data_options[0].to_tool_dict()
    assert "collectionFrequency" not in out
    assert "grain" not in out
    assert "fieldCoverage" not in out
