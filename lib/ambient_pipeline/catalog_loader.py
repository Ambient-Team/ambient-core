"""Load catalog dataOptions and manifest from ambient-core catalog/ tree."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import yaml

from ambient_contracts.paths import resolve_catalog_root as _resolve_catalog_root


def resolve_catalog_root(start: Path | None = None) -> Path:
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
    return _resolve_catalog_root()


def load_manifest_version(catalog_root: Path | None = None) -> str:
    root = catalog_root or resolve_catalog_root()
    data = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
    version = data.get("version")
    return str(version) if version is not None else "unknown"


def load_data_option(
    catalog_option_key: str,
    catalog_root: Path | None = None,
) -> dict[str, Any] | None:
    """Return one dataOptions entry by catalog key (e.g. HcCensus911CatalogOptionKey01)."""
    if not catalog_option_key:
        return None
    root = catalog_root or resolve_catalog_root()
    industries_dir = root / "industries"
    for yaml_path in sorted(industries_dir.glob("*.yaml")):
        pack = yaml.safe_load(yaml_path.read_text(encoding="utf-8")) or {}
        options = pack.get("dataOptions") or {}
        if catalog_option_key in options:
            opt = dict(options[catalog_option_key])
            opt.setdefault("industry", pack.get("industry"))
            return opt
    return None


def load_metric_by_numeric_id(
    metric_id: int,
    catalog_root: Path | None = None,
) -> dict[str, Any] | None:
    root = catalog_root or resolve_catalog_root()
    for yaml_path in sorted((root / "industries").glob("*.yaml")):
        pack = yaml.safe_load(yaml_path.read_text(encoding="utf-8")) or {}
        metrics = pack.get("metrics") or {}
        for _key, metric in metrics.items():
            if metric.get("id") == metric_id:
                return dict(metric)
    return None
