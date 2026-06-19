"""Load catalog crosswalk links (metric → contract)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from ambient_contracts.catalog_manifest import resolve_catalog_root_flexible


def _crosswalk_path() -> Path | None:
    try:
        root = resolve_catalog_root_flexible()
    except FileNotFoundError:
        return None
    path = root / "crosswalk.yaml"
    return path if path.is_file() else None


def load_crosswalk_links() -> list[dict[str, Any]]:
    """Return crosswalk link dicts; empty if file missing or has no links."""
    path = _crosswalk_path()
    if path is None:
        return []
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    if not isinstance(doc, dict):
        return []
    links = doc.get("links")
    if not isinstance(links, list):
        return []
    return [item for item in links if isinstance(item, dict)]
