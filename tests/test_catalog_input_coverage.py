"""Tests for the catalog metric input-coverage recipe (data options -> KPIs)."""

from __future__ import annotations

import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))

import generate_reference_catalog as gen  # noqa: E402

from ambient_contracts.catalog_manifest import load_manifest  # noqa: E402
from ambient_contracts.manifest_models import parse_catalog_manifest  # noqa: E402

_COVERAGE_VALUES = {"complete", "upload", "none", "derived", "unspecified"}


def _option(key: str, oid: int, fields: list[str]) -> dict:
    return {"catalogOptionKey": key, "id": oid, "name": f"Option {oid}", "fields": fields}


def test_recipe_complete_when_all_inputs_are_fields():
    metric = {"calc": {"expr": "a / b", "inputs": ["a", "b"]}}
    linked = [_option("opt.one", 1, ["a", "b"])]
    inputs, coverage = gen.build_metric_input_recipe(metric, linked, set())
    assert coverage == "complete"
    assert {i["name"] for i in inputs} == {"a", "b"}
    assert all(s["via"] == "field" for i in inputs for s in i["satisfiedBy"])


def test_recipe_upload_when_inputs_not_enumerated_but_option_linked():
    metric = {"calc": {"expr": "current_assets / current_liabilities", "inputs": ["current_assets", "current_liabilities"]}}
    linked = [_option("opt.docs", 2, ["date", "statement_type"])]
    inputs, coverage = gen.build_metric_input_recipe(metric, linked, set())
    assert coverage == "upload"
    assert all(i["covered"] for i in inputs)
    assert all(s["via"] == "upload" for i in inputs for s in i["satisfiedBy"])


def test_recipe_none_when_no_linked_option():
    metric = {"calc": {"expr": "a / b", "inputs": ["a", "b"]}}
    inputs, coverage = gen.build_metric_input_recipe(metric, [], set())
    assert coverage == "none"
    assert all(not i["covered"] for i in inputs)
    assert all(i["satisfiedBy"] == [] for i in inputs)


def test_recipe_derived_when_only_other_metrics():
    metric = {"calc": {"expr": "gross_profit / revenue", "inputs": []}}
    inputs, coverage = gen.build_metric_input_recipe(metric, [], {"gross_profit", "revenue"})
    assert coverage == "derived"
    assert {i["name"] for i in inputs} == {"gross_profit", "revenue"}
    assert all(i["kind"] == "derived" for i in inputs)


def test_recipe_directly_reported_input_metric():
    metric = {"input": True, "slug": "tier1_capital_ratio"}
    covered = gen.build_metric_input_recipe(metric, [_option("opt.reg", 3, ["tier1_capital_ratio"])], set())
    assert covered[1] == "complete"
    uncovered = gen.build_metric_input_recipe(metric, [_option("opt.reg", 3, ["date"])], set())
    assert uncovered[1] == "upload"


def test_recipe_unspecified_without_calc_or_input():
    inputs, coverage = gen.build_metric_input_recipe({"name": "X"}, [], set())
    assert inputs == []
    assert coverage == "unspecified"


def test_manifest_parses_input_recipe_and_round_trips():
    doc = {
        "version": 1,
        "industries": [],
        "metrics": [
            {
                "catalogMetricKey": "banking.depository.nim",
                "id": 1530,
                "name": "Net Interest Margin",
                "industry": "Banking",
                "methodology": "NIM = ...",
                "type": "Financial",
                "unit": "%",
                "requiredSources": [],
                "calc": {"expr": "a / b", "inputs": ["a", "b"]},
                "directlyReported": False,
                "inputCoverage": "complete",
                "inputs": [
                    {
                        "name": "a",
                        "kind": "measured",
                        "covered": True,
                        "satisfiedBy": [
                            {"catalogOptionKey": "opt.one", "via": "field", "field": "a", "id": 1, "name": "Opt"}
                        ],
                    }
                ],
            },
            {
                "catalogMetricKey": "legacy.metric",
                "id": 2,
                "name": "Legacy",
                "industry": "Banking",
                "methodology": "m",
                "type": "Financial",
                "unit": "%",
                "requiredSources": [],
            },
        ],
        "dataOptions": [],
    }
    manifest = parse_catalog_manifest(doc)
    nim = manifest.metrics[0]
    assert nim.input_coverage == "complete"
    assert nim.calc is not None and nim.calc.expr == "a / b"
    assert nim.inputs[0].satisfied_by[0].via == "field"
    tool = nim.to_tool_dict()
    assert tool["inputCoverage"] == "complete"
    assert tool["inputs"][0]["satisfiedBy"][0]["via"] == "field"
    assert tool["calc"]["inputs"] == ["a", "b"]

    # Older manifests without the recipe still parse (backward compatible).
    legacy = manifest.metrics[1]
    assert legacy.calc is None
    assert legacy.inputs == ()
    assert legacy.directly_reported is False
    assert legacy.input_coverage is None
    assert legacy.to_tool_dict()["calc"] is None


def test_generated_manifest_has_coverage_recipe():
    manifest = load_manifest()
    assert all(m.input_coverage in _COVERAGE_VALUES for m in manifest.metrics)
    nim = manifest.resolve_metric("1530")
    assert nim is not None
    assert nim.input_coverage == "complete"
    assert nim.calc is not None
    assert any(
        s.via == "field" for i in nim.inputs for s in i.satisfied_by
    )
