"""Tests for scripts/check_markdown_prose.py."""

from __future__ import annotations

from pathlib import Path

from scripts.check_markdown_prose import find_forbidden_drive_links


def test_find_forbidden_drive_links_detects_hosts(tmp_path: Path) -> None:
    sample = tmp_path / "sample.md"
    sample.write_text(
        "See https://drive.google.com/drive/folders/abc and docs.google.com/foo\n",
        encoding="utf-8",
    )
    hits = find_forbidden_drive_links(sample)
    assert len(hits) == 1
    assert "drive.google.com" in hits[0][1]


def test_find_forbidden_drive_links_allows_github_demos(tmp_path: Path) -> None:
    sample = tmp_path / "ok.md"
    sample.write_text(
        "Demos: https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core\n",
        encoding="utf-8",
    )
    assert find_forbidden_drive_links(sample) == []
