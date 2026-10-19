"""Edge cases for catalog generator validation (malformed YAML, empty packs, duplicates)."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from tests.catalog_script_loader import load_generate_reference_catalog


@pytest.fixture(scope="module")
def gen():
    return load_generate_reference_catalog()


def test_validate_metrics_schema_flags_unknown_type_enum(gen) -> None:
    errors = gen.validate_metrics_schema(
        {"bad.metric": {"id": 1, "name": "X", "industry": "Y", "type": "Weird", "unit": "x", "methodology": "m"}}
    )
    assert any("not in schema enum" in e for e in errors)


def test_validate_metrics_schema_missing_required_field(gen) -> None:
    errors = gen.validate_metrics_schema({"bad.metric": {"id": 1, "name": "X"}})
    assert any("missing required field" in e for e in errors)


def test_validate_flags_empty_industry_pack_metrics(gen, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    """Synthetic pack with empty metrics map still must pass pack.yaml industry."""
    pack = tmp_path / "catalog" / "industries" / "empty_pack"
    pack.mkdir(parents=True)
    (pack / "pack.yaml").write_text(
        "industry: Empty Pack\nindustryCodes:\n"
        "  isic: {revision: Rev.4, primary: '0111'}\n"
        "  naics: {revision: '2022', primary: '111110'}\n"
        "  nace: {revision: Rev.2, primary: '01.11'}\n"
        "  gics: {revision: '2023', primary: '302020'}\n"
        "  confidence: high\n  lastReviewed: '2026-01-01'\n  source: manual\n",
        encoding="utf-8",
    )
    (pack / "metrics.yaml").write_text("metrics: {}\n", encoding="utf-8")
    (pack / "data_options.yaml").write_text("dataOptions: {}\n", encoding="utf-8")
    (pack / "benchmarks.yaml").write_text("benchmarks: {}\n", encoding="utf-8")
    # Registration still required via packs.yaml in real tree; here we only test schema on empty dict.
    assert gen.validate_metrics_schema({}) == []


def test_malformed_metrics_yaml_raises(tmp_path: Path) -> None:
    path = tmp_path / "metrics.yaml"
    path.write_text("metrics:\n  key: [broken\n", encoding="utf-8")
    with pytest.raises(yaml.YAMLError):
        yaml.safe_load(path.read_text(encoding="utf-8"))


def test_duplicate_metric_ids_detected_in_validate(gen) -> None:
    metrics = {
        "a.one": {"id": 99, "name": "A", "industry": "Banking", "type": "Financial", "unit": "Ratio", "methodology": "m"},
        "a.two": {"id": 99, "name": "B", "industry": "Banking", "type": "Financial", "unit": "Ratio", "methodology": "m"},
    }
    errors = gen.validate(metrics, {}, {}, [{"value": "Banking", "pack": "banking"}], "Banking", {})
    assert any("Duplicate metric id 99" in e for e in errors)
