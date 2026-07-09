#!/usr/bin/env python3
"""One-time migration: catalog/core + monolithic industry YAML → 0.2.7 layout.

Run from repo root: python scripts/migrate_catalog_layout_027.py
"""

from __future__ import annotations

import copy
import re
import shutil
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog"
CORE = CATALOG / "core"
SHARED = CATALOG / "shared"
INDUSTRIES = CATALOG / "industries"
SHARED_OLD = CORE / "shared"


def _load(path: Path) -> dict:
    if not path.is_file():
        return {}
    with path.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return data if isinstance(data, dict) else {}


def _dump(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        yaml.safe_dump(data, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
        newline="\n",
    )


def _industry_token(industry: str) -> str:
    return re.sub(r"_+", "_", re.sub(r"[^a-z0-9]+", "_", industry.lower())).strip("_")


def _core_key(industry: str, slug: str) -> str:
    return f"{_industry_token(industry)}.core.{slug.replace('-', '_')}"


def _expand_fpa_metrics(pack_industry: str, pack_metrics: dict) -> dict:
    shared = _load(SHARED / "metrics.yaml") if (SHARED / "metrics.yaml").is_file() else {}
    if not shared:
        templates = _load(SHARED_OLD / "core_metrics.yaml").get("templates") or {}
        industry_ids = _load(SHARED_OLD / "core_ids.yaml").get("industryIds") or {}
    else:
        templates = shared.get("templates") or {}
        industry_ids = shared.get("industryIds") or {}
    id_map = industry_ids.get(pack_industry) or {}
    expanded: dict = {}
    for slug, template in templates.items():
        key = _core_key(pack_industry, slug)
        if key in pack_metrics:
            continue
        metric_id = id_map.get(slug)
        if metric_id is None:
            continue
        metric = copy.deepcopy(template)
        metric["id"] = metric_id
        metric["industry"] = pack_industry
        metric["segment"] = "core"
        expanded[key] = metric
    return expanded


def _strip_benchmark_entry(entry: dict) -> dict:
    out = {k: v for k, v in entry.items() if k != "industries"}
    return out


def _benchmarks_for_packs(
    global_benchmarks: dict,
    pack_industry_by_id: dict[str, str],
    metrics_by_pack: dict[str, dict],
) -> dict[str, dict]:
    """pack_id -> benchmarks dict keyed by benchmarkKey slug."""
    per_pack: dict[str, dict] = {pid: {} for pid in pack_industry_by_id}
    industry_to_packs: dict[str, list[str]] = {}
    for pid, ind in pack_industry_by_id.items():
        industry_to_packs.setdefault(ind, []).append(pid)

    for bkey, entry in global_benchmarks.items():
        if not isinstance(entry, dict):
            continue
        tags = list(entry.get("industries") or [])
        stripped = _strip_benchmark_entry(entry)
        if "All" in tags:
            for pid in per_pack:
                per_pack[pid][bkey] = copy.deepcopy(stripped)
            continue
        for tag in tags:
            if tag in ("SaaS", "Corporate Finance"):
                continue
            for pid in industry_to_packs.get(tag, []):
                per_pack[pid][bkey] = copy.deepcopy(stripped)

    for pid, metrics in metrics_by_pack.items():
        bench = per_pack[pid]
        for metric in metrics.values():
            bkey = metric.get("benchmarkKey")
            if not bkey or bkey in bench:
                continue
            src = global_benchmarks.get(bkey)
            if isinstance(src, dict):
                bench[bkey] = _strip_benchmark_entry(copy.deepcopy(src))
    return per_pack


def main() -> None:
    if not CORE.is_dir():
        print("catalog/core/ already removed — nothing to migrate")
        return

    # 1. shared/
    templates = _load(SHARED_OLD / "core_metrics.yaml").get("templates") or {}
    industry_ids = _load(SHARED_OLD / "core_ids.yaml").get("industryIds") or {}
    _dump(SHARED / "metrics.yaml", {"templates": templates, "industryIds": industry_ids})

    common = _load(SHARED_OLD / "common_data_options.yaml")
    _dump(
        SHARED / "data_options.yaml",
        {
            "dataOptionTemplates": common.get("dataOptionTemplates") or {},
            "optionIds": common.get("optionIds") or {},
        },
    )

    # 2. packs.yaml
    reg = _load(CORE / "industries.yaml")
    packs_out: list[dict] = []
    pack_meta: dict[str, dict] = {}
    for entry in reg.get("packs") or []:
        file_name = entry.get("file", "")
        pack_id = Path(file_name).stem
        row = {"pack": pack_id}
        if entry.get("displayLabel"):
            row["displayLabel"] = entry["displayLabel"]
        if entry.get("sectorProfileIds"):
            row["sectorProfileIds"] = list(entry["sectorProfileIds"])
        packs_out.append(row)
        pack_meta[pack_id] = {k: v for k, v in row.items() if k != "pack"}

    _dump(
        CATALOG / "packs.yaml",
        {"defaultIndustry": reg.get("defaultIndustry"), "packs": packs_out},
    )

    # 3. sector profiles, policy, bridge
    profiles_dir = CATALOG / "sector_profiles"
    profiles_dir.mkdir(parents=True, exist_ok=True)
    fin = _load(CORE / "financial_sector_profiles.yaml")
    if fin:
        _dump(profiles_dir / "financial.yaml", fin)
    trans = _load(CORE / "transportation_sector_profiles.yaml")
    if trans:
        _dump(profiles_dir / "transportation.yaml", trans)

    policy_src = SHARED_OLD / "catalog_input_field_policy.yaml"
    if policy_src.is_file():
        shutil.copy2(policy_src, CATALOG / "input_field_policy.yaml")

    bridge_src = CORE / "bridge_rules.yaml"
    if bridge_src.is_file():
        shutil.copy2(bridge_src, CATALOG / "bridge_rules.yaml")

    global_benchmarks = _load(CORE / "benchmarks.yaml").get("benchmarks") or {}

    pack_industry_by_id: dict[str, str] = {}
    metrics_by_pack: dict[str, dict] = {}

    # 4. split industry monoliths
    for entry in packs_out:
        pack_id = entry["pack"]
        mono = INDUSTRIES / f"{pack_id}.yaml"
        if not mono.is_file():
            raise FileNotFoundError(f"Missing {mono}")
        pack = _load(mono)
        industry = pack.get("industry")
        if not industry:
            raise ValueError(f"{mono} missing industry")
        pack_industry_by_id[pack_id] = str(industry)

        pack_dir = INDUSTRIES / pack_id
        pack_dir.mkdir(parents=True, exist_ok=True)
        _dump(pack_dir / "pack.yaml", {"industry": industry})
        _dump(pack_dir / "metrics.yaml", {"metrics": pack.get("metrics") or {}})
        _dump(pack_dir / "data_options.yaml", {"dataOptions": pack.get("dataOptions") or {}})

        native = dict(pack.get("metrics") or {})
        expanded = _expand_fpa_metrics(str(industry), native)
        merged = {**expanded, **native}
        metrics_by_pack[pack_id] = merged
        mono.unlink()

    per_pack_bench = _benchmarks_for_packs(global_benchmarks, pack_industry_by_id, metrics_by_pack)
    for pack_id, benches in per_pack_bench.items():
        _dump(INDUSTRIES / pack_id / "benchmarks.yaml", {"benchmarks": benches})

    # 5. remove core/
    shutil.rmtree(CORE)
    print("Migration complete: catalog/shared, catalog/packs.yaml, catalog/industries/<pack>/")


if __name__ == "__main__":
    main()
