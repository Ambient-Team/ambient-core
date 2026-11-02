"""Tests for scripts/check_doc_links.py."""

from __future__ import annotations

from pathlib import Path

from scripts.check_doc_links import find_broken_links


def test_find_broken_links_flags_missing_relative(tmp_path: Path) -> None:
    doc = tmp_path / "doc.md"
    doc.write_text("See [missing](../nope/missing.md).\n", encoding="utf-8")
    hits = find_broken_links(doc)
    assert hits
    assert "missing" in hits[0][2]


def test_find_broken_links_ignores_external_urls(tmp_path: Path) -> None:
    doc = tmp_path / "doc.md"
    doc.write_text(
        "See [hub](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/).\n",
        encoding="utf-8",
    )
    assert find_broken_links(doc) == []
