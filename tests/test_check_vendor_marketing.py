"""Tests for scripts/check_vendor_marketing.py."""

from __future__ import annotations

from scripts.check_vendor_marketing import _scan_text


def test_detects_google_colab_copy() -> None:
    errors = _scan_text("README.md", "Try free Google Colab today.")
    assert any("Google Colab" in err for err in errors)


def test_allows_colab_module_identifiers() -> None:
    errors = _scan_text("docs/pipeline.md", "Use `ambient_pipeline.notebook_smoke`.")
    assert not errors


def test_detects_commercial_platform_copy() -> None:
    errors = _scan_text("README.md", "Try the commercial platform today.")
    assert any("commercial platform" in err for err in errors)


def test_detects_ambient_systems_platform_name() -> None:
    errors = _scan_text("docs/USAGE.md", "See ambient-systems-platform for deploy.")
    assert any("ambient-systems-platform" in err for err in errors)


def test_detects_product_site_cta() -> None:
    errors = _scan_text("README.md", "Pricing lives at https://www.ambientsystems.ai/.")
    assert any("product-site CTA" in err for err in errors)


def test_changelog_history_may_name_retired_integrator() -> None:
    text = (
        "## [0.3.0] - 2026-10-02\n\n"
        "Integrators such as ambient-systems-platform pin a git tag.\n"
    )
    assert _scan_text("CHANGELOG.md", text) == []


def test_current_changelog_cannot_reintroduce_product_site() -> None:
    text = "## [Unreleased]\n\nSee https://www.ambientsystems.ai/ for the product.\n"
    errors = _scan_text("CHANGELOG.md", text)
    assert any("product-site CTA" in err for err in errors)
