"""Tests for scripts/check_vendor_marketing.py."""

from __future__ import annotations

from scripts.check_vendor_marketing import _scan_text


def test_detects_google_colab_copy() -> None:
    errors = _scan_text("README.md", "Try free Google Colab today.")
    assert any("Google Colab" in err for err in errors)


def test_allows_colab_module_identifiers() -> None:
    errors = _scan_text("docs/pipeline.md", "Use `ambient_pipeline.colab_smoke`.")
    assert not errors
