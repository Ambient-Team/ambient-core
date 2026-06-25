"""Load catalog/manifest.json (shipped with ambient_contracts consumers)."""

from __future__ import annotations

import json
from pathlib import Path

from ambient_contracts.manifest_models import CatalogManifest, parse_catalog_manifest
from ambient_contracts.paths import resolve_catalog_root


def resolve_catalog_root_flexible(start: Path | None = None) -> Path:
    """Find catalog/ directory (local checkout, submodule, or Databricks Repos)."""
    if start and (start / "manifest.json").is_file():
        return start
    candidates: list[Path] = [
        Path.cwd(),
        Path.cwd().parent,
        Path.cwd().parent.parent,
    ]
    for root in candidates:
        for rel in ("ambient-core/catalog", "catalog"):
            path = root / rel if "/" not in rel else root.joinpath(*rel.split("/"))
            if (path / "manifest.json").is_file():
                return path
    return resolve_catalog_root()


def _repo_roots() -> list[Path]:
    here = Path(__file__).resolve()
    candidates = [
        Path.cwd(),
        Path.cwd().parent,
        Path.cwd().parent.parent,
        here.parents[2],
    ]
    seen: set[Path] = set()
    unique: list[Path] = []
    for path in candidates:
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        unique.append(resolved)
    return unique


def resolve_manifest_path() -> Path:
    for root in _repo_roots():
        candidate = root / "ambient-core" / "catalog" / "manifest.json"
        if candidate.is_file():
            return candidate
        candidate = root / "catalog" / "manifest.json"
        if candidate.is_file():
            return candidate
    try:
        return resolve_catalog_root_flexible() / "manifest.json"
    except FileNotFoundError:
        return resolve_catalog_root() / "manifest.json"


def load_manifest() -> CatalogManifest:
    path = resolve_manifest_path()
    with path.open("r", encoding="utf-8") as handle:
        doc = json.load(handle)
    return parse_catalog_manifest(doc)
