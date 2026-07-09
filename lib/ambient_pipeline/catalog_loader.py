"""Load catalog dataOptions and manifest from ambient-core catalog/ tree."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import yaml

from ambient_contracts.catalog_manifest import resolve_catalog_root_flexible


def resolve_catalog_root(start: Path | None = None) -> Path:
    """Find catalog/ directory (local checkout, submodule, or Databricks Repos)."""
    return resolve_catalog_root_flexible(start)


def load_manifest_version(catalog_root: Path | None = None) -> str:
    root = catalog_root or resolve_catalog_root()
    data = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
    version = data.get("version")
    return str(version) if version is not None else "unknown"


def _pack_industry(root: Path, pack_dir: Path) -> str | None:
    pack_yaml = pack_dir / "pack.yaml"
    if pack_yaml.is_file():
        data = yaml.safe_load(pack_yaml.read_text(encoding="utf-8")) or {}
        industry = data.get("industry")
        return str(industry) if industry else None
    return None


def _data_option_from_manifest(
    catalog_option_key: str,
    catalog_root: Path,
) -> dict[str, Any] | None:
    manifest_path = catalog_root / "manifest.json"
    if not manifest_path.is_file():
        return None
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    for row in data.get("dataOptions") or []:
        if row.get("catalogOptionKey") == catalog_option_key:
            return {
                "id": row.get("id"),
                "name": row.get("name"),
                "industry": row.get("industry"),
                "metricIds": list(row.get("metricIds") or []),
                "fields": list(row.get("fields") or []),
            }
    return None


def load_data_option(
    catalog_option_key: str,
    catalog_root: Path | None = None,
) -> dict[str, Any] | None:
    """Return one dataOptions entry by catalog key (e.g. HcCensus911CatalogOptionKey01)."""
    if not catalog_option_key:
        return None
    root = catalog_root or resolve_catalog_root()
    industries_dir = root / "industries"
    for pack_dir in sorted(p for p in industries_dir.iterdir() if p.is_dir()):
        opts_path = pack_dir / "data_options.yaml"
        if not opts_path.is_file():
            continue
        pack = yaml.safe_load(opts_path.read_text(encoding="utf-8")) or {}
        options = pack.get("dataOptions") or {}
        if catalog_option_key in options:
            opt = dict(options[catalog_option_key])
            industry = _pack_industry(root, pack_dir)
            if industry:
                opt.setdefault("industry", industry)
            return opt
    return _data_option_from_manifest(catalog_option_key, root)


def load_metric_by_numeric_id(
    metric_id: int,
    catalog_root: Path | None = None,
) -> dict[str, Any] | None:
    root = catalog_root or resolve_catalog_root()
    industries_dir = root / "industries"
    for pack_dir in sorted(p for p in industries_dir.iterdir() if p.is_dir()):
        metrics_path = pack_dir / "metrics.yaml"
        if not metrics_path.is_file():
            continue
        pack = yaml.safe_load(metrics_path.read_text(encoding="utf-8")) or {}
        metrics = pack.get("metrics") or {}
        for _key, metric in metrics.items():
            if metric.get("id") == metric_id:
                return dict(metric)
    manifest_path = root / "manifest.json"
    if manifest_path.is_file():
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        for row in data.get("metrics") or []:
            if row.get("id") == metric_id:
                return dict(row)
    return None
