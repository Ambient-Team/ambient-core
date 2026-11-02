"""Every registered industry pack must ship the standard YAML set."""

from __future__ import annotations

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
PACKS = ROOT / "catalog" / "packs.yaml"
INDUSTRIES = ROOT / "catalog" / "industries"

REQUIRED_FILES = ("pack.yaml", "metrics.yaml", "data_options.yaml", "benchmarks.yaml")


def _pack_ids() -> list[str]:
    data = yaml.safe_load(PACKS.read_text(encoding="utf-8")) or {}
    return [row["pack"] for row in data.get("packs") or [] if row.get("pack")]


def test_every_registered_pack_has_standard_yaml_files() -> None:
    for pack_id in _pack_ids():
        pack_dir = INDUSTRIES / pack_id
        assert pack_dir.is_dir(), pack_id
        for name in REQUIRED_FILES:
            assert (pack_dir / name).is_file(), f"{pack_id} missing {name}"


def test_every_pack_benchmarks_file_is_mapping() -> None:
    for pack_id in _pack_ids():
        path = INDUSTRIES / pack_id / "benchmarks.yaml"
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        benchmarks = data.get("benchmarks")
        assert isinstance(benchmarks, dict), pack_id
