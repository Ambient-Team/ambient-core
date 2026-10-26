"""Tests for catalog crosswalk loader."""

from __future__ import annotations

from pathlib import Path

import pytest

from ambient_contracts import crosswalk
from ambient_contracts.crosswalk import load_crosswalk_links


def test_load_crosswalk_links_includes_dscr_sample() -> None:
    links = load_crosswalk_links()
    assert links
    dscr = next(
        (link for link in links if link.get("metricId") == 8),
        None,
    )
    assert dscr is not None
    assert dscr.get("contractFile") == "tenant-metrics-v1.yaml"
    assert dscr.get("catalogMetricKey") == "1cvcTcHNt1VYX867UUG7"


def test_load_crosswalk_links_skips_non_dict_entries(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    path = tmp_path / "crosswalk.yaml"
    path.write_text(
        "links:\n"
        "  - oops\n"
        "  - metricId: 99\n"
        "    contractFile: sample.yaml\n",
        encoding="utf-8",
    )
    monkeypatch.setattr(crosswalk, "_crosswalk_path", lambda: path)
    links = load_crosswalk_links()
    assert links == [{"metricId": 99, "contractFile": "sample.yaml"}]


def test_load_crosswalk_links_empty_when_links_key_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    path = tmp_path / "crosswalk.yaml"
    path.write_text("version: 1\n", encoding="utf-8")
    monkeypatch.setattr(crosswalk, "_crosswalk_path", lambda: path)
    assert load_crosswalk_links() == []


def test_load_crosswalk_links_empty_when_yaml_not_mapping(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    path = tmp_path / "crosswalk.yaml"
    path.write_text("- just-a-list\n", encoding="utf-8")
    monkeypatch.setattr(crosswalk, "_crosswalk_path", lambda: path)
    assert load_crosswalk_links() == []


def test_load_crosswalk_links_empty_when_crosswalk_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(crosswalk, "_crosswalk_path", lambda: None)
    assert load_crosswalk_links() == []
