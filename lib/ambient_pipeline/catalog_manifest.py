"""Load catalog/manifest.json for OLAP notebooks and future ML feature wiring."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ambient_contracts.paths import resolve_catalog_root
from ambient_pipeline.catalog_loader import resolve_catalog_root as resolve_catalog_root_flexible


def _repo_roots() -> list[Path]:
    here = Path(__file__).resolve()
    candidates = [
        Path.cwd(),
        Path.cwd().parent,
        Path.cwd().parent.parent,
        here.parents[2],
    ]
    for root in (
        Path("/Workspace/Users/ivan@ambientsystems.ai/ambient-systems-platform"),
        Path("/Workspace/Repos/ambient-systems-platform"),
    ):
        candidates.append(root)
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
        candidate = root / "catalog" / "manifest.json"
        if candidate.is_file():
            return candidate
        candidate = root / "ambient-core" / "catalog" / "manifest.json"
        if candidate.is_file():
            return candidate
    try:
        return resolve_catalog_root_flexible() / "manifest.json"
    except FileNotFoundError:
        return resolve_catalog_root() / "manifest.json"


def load_manifest() -> dict[str, Any]:
    path = resolve_manifest_path()
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)
