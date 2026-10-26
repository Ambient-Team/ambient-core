"""End-to-end catalog merge + validate() parity with the generator."""

from __future__ import annotations

import types

import pytest

from tests.catalog_script_loader import load_generate_reference_catalog


@pytest.fixture(scope="module")
def gen() -> types.ModuleType:
    return load_generate_reference_catalog()


def test_merged_catalog_validate_reports_no_errors(gen: types.ModuleType) -> None:
    default_industry, registry_packs = gen.load_industry_registry()
    industry_entries = gen.build_industry_entries(registry_packs)
    metrics, data_options, benchmarks, _bridge, _crosswalk, pack_benchmarks = gen.load_catalog()
    errors = gen.validate(
        metrics,
        data_options,
        benchmarks,
        industry_entries,
        default_industry,
        pack_benchmarks,
    )
    errors.extend(gen.validate_pack_industry_codes(industry_entries))
    assert not errors, errors[:10]


def test_merged_catalog_data_option_ids_globally_unique(gen: types.ModuleType) -> None:
    _metrics, data_options, *_ = gen.load_catalog()
    seen: dict[int, str] = {}
    for key, option in data_options.items():
        oid = option.get("id")
        if oid is None:
            continue
        oid_int = int(oid)
        if oid_int in seen:
            pytest.fail(f"duplicate data option id {oid_int}: {seen[oid_int]} and {key}")
        seen[oid_int] = key


def test_merged_catalog_metric_ids_globally_unique(gen: types.ModuleType) -> None:
    metrics, *_ = gen.load_catalog()
    seen: dict[int, str] = {}
    for key, metric in metrics.items():
        mid = metric.get("id")
        if mid is None:
            continue
        mid_int = int(mid)
        if mid_int in seen:
            pytest.fail(f"duplicate metric id {mid_int}: {seen[mid_int]} and {key}")
        seen[mid_int] = key
