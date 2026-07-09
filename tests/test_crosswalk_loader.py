"""Tests for catalog crosswalk loader."""

from __future__ import annotations

from ambient_contracts.crosswalk import load_crosswalk_links


def test_load_crosswalk_links_includes_dscr_sample():
    links = load_crosswalk_links()
    assert links
    dscr = next(
        (link for link in links if link.get("metricId") == 8),
        None,
    )
    assert dscr is not None
    assert dscr.get("contractFile") == "tenant-metrics-v1.yaml"
    assert dscr.get("catalogMetricKey") == "1cvcTcHNt1VYX867UUG7"
