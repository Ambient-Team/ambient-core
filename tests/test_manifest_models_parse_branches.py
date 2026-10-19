"""Hit validation branches in manifest_models parsers."""

from __future__ import annotations

import pytest

from ambient_contracts.manifest_models import parse_catalog_manifest


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


def test_metric_calc_and_inputs_optional() -> None:
    manifest = parse_catalog_manifest(
        {
            "version": 1,
            "industries": [],
            "metrics": [_metric(calc=None, inputs=[])],
            "dataOptions": [],
        }
    )
    assert manifest.metrics[0].calc is None


def test_required_source_rejects_bad_name_type() -> None:
    with pytest.raises(ValueError, match="name"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [
                    _metric(
                        requiredSources=[
                            {"catalogOptionKey": "k", "fields": ["a"], "name": 1}
                        ]
                    )
                ],
                "dataOptions": [],
            }
        )


def test_metric_input_rejects_bad_kind() -> None:
    with pytest.raises(ValueError, match="kind"):
        parse_catalog_manifest(
            {
                "version": 1,
                "industries": [],
                "metrics": [
                    _metric(
                        inputs=[
                            {
                                "name": "revenue",
                                "kind": "",
                                "covered": True,
                                "satisfiedBy": [],
                            }
                        ]
                    )
                ],
                "dataOptions": [],
            }
        )
