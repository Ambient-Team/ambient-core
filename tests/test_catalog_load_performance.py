"""Catalog load performance smoke (regression guard, not a benchmark suite)."""

from __future__ import annotations

import time
import types

import pytest

from tests.catalog_script_loader import load_generate_reference_catalog


@pytest.fixture(scope="module")
def gen() -> types.ModuleType:
    return load_generate_reference_catalog()


def test_load_catalog_completes_within_budget(gen: types.ModuleType) -> None:
    start = time.perf_counter()
    gen.load_catalog()
    elapsed = time.perf_counter() - start
    assert elapsed < 15.0, f"load_catalog() took {elapsed:.2f}s (budget 15s)"
