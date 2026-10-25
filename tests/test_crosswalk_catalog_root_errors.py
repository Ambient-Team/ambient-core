"""crosswalk loader when catalog root cannot be resolved."""

from __future__ import annotations

from pathlib import Path

from ambient_contracts import crosswalk
from ambient_contracts.crosswalk import load_crosswalk_links


def test_crosswalk_path_none_when_catalog_root_missing(monkeypatch) -> None:
    def _missing_catalog_root() -> Path:
        raise FileNotFoundError("no catalog")

    monkeypatch.setattr(
        crosswalk,
        "resolve_catalog_root_flexible",
        _missing_catalog_root,
    )
    assert crosswalk._crosswalk_path() is None
    assert load_crosswalk_links() == []
