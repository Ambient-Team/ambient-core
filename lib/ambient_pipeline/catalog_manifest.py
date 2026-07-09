"""Load catalog/manifest.json for OLAP notebooks and future ML feature wiring."""

from __future__ import annotations

from ambient_contracts.catalog_manifest import load_manifest, resolve_manifest_path

__all__ = ["load_manifest", "resolve_manifest_path"]
