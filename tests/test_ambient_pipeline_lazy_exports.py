"""Lazy exports on ambient_pipeline package root."""

from __future__ import annotations

import ambient_pipeline as ap


def test_lazy_export_silver_validator() -> None:
    cls = ap.SilverValidator
    assert cls.__name__ == "SilverValidator"


def test_lazy_export_mapping_spec() -> None:
    spec = ap.MappingSpec
    assert spec.__name__ == "MappingSpec"


def test_lazy_unknown_attribute_raises() -> None:
    try:
        _ = ap.NotARealExportName  # type: ignore[attr-defined]
    except AttributeError as exc:
        assert "NotARealExportName" in str(exc)
    else:
        raise AssertionError("expected AttributeError")
