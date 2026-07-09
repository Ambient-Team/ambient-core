#!/usr/bin/env python3
"""Validate catalog/crosswalk.yaml links against manifest and contracts."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CROSSWALK = ROOT / "catalog" / "crosswalk.yaml"
MANIFEST = ROOT / "catalog" / "manifest.json"
CONTRACTS = ROOT / "contracts"


def _load_manifest() -> dict:
    with MANIFEST.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def _metric_index(manifest: dict) -> tuple[dict[int, dict], dict[str, dict]]:
    by_id: dict[int, dict] = {}
    by_key: dict[str, dict] = {}
    for metric in manifest.get("metrics") or []:
        if not isinstance(metric, dict):
            continue
        mid = metric.get("id")
        if isinstance(mid, int):
            by_id[mid] = metric
        key = metric.get("catalogMetricKey")
        if isinstance(key, str) and key.strip():
            by_key[key.strip()] = metric
    return by_id, by_key


def consumption_id_from_contract(doc: dict) -> str | None:
    product = doc.get("product")
    if isinstance(product, dict):
        raw = product.get("consumption_id")
        if isinstance(raw, str) and raw.strip():
            return raw.strip()
    firestore = doc.get("firestore")
    if isinstance(firestore, dict):
        paths = firestore.get("paths")
        if isinstance(paths, list):
            for entry in paths:
                if isinstance(entry, dict):
                    lk = entry.get("logical_key")
                    if isinstance(lk, str) and lk.strip():
                        return lk.strip()
    return None


def main() -> int:
    if not CROSSWALK.is_file():
        print("ERROR: missing catalog/crosswalk.yaml", file=sys.stderr)
        return 1
    if not MANIFEST.is_file():
        print("ERROR: missing catalog/manifest.json (run ambient-catalog-generate)", file=sys.stderr)
        return 1

    with CROSSWALK.open("r", encoding="utf-8") as handle:
        cross_doc = yaml.safe_load(handle) or {}
    links = cross_doc.get("links") if isinstance(cross_doc, dict) else None
    if not isinstance(links, list):
        print("ERROR: crosswalk.yaml must contain links: list", file=sys.stderr)
        return 1

    manifest = _load_manifest()
    by_id, by_key = _metric_index(manifest)
    errors: list[str] = []

    contract_cache: dict[str, dict] = {}
    for idx, link in enumerate(links):
        if not isinstance(link, dict):
            errors.append(f"links[{idx}]: must be a mapping")
            continue
        label = f"links[{idx}]"
        contract_file = str(link.get("contractFile") or "").strip()
        product_id = str(link.get("contractProductId") or "").strip()
        metric_id = link.get("metricId")
        catalog_key = str(link.get("catalogMetricKey") or "").strip()

        if not contract_file:
            errors.append(f"{label}: missing contractFile")
            continue
        contract_path = CONTRACTS / contract_file
        if not contract_path.is_file():
            errors.append(f"{label}: contractFile not found: {contract_file}")
            continue

        if contract_file not in contract_cache:
            with contract_path.open("r", encoding="utf-8") as handle:
                contract_cache[contract_file] = yaml.safe_load(handle) or {}

        expected_product = consumption_id_from_contract(contract_cache[contract_file])
        if expected_product and product_id and product_id != expected_product:
            errors.append(
                f"{label}: contractProductId {product_id!r} != "
                f"contract consumption id {expected_product!r} ({contract_file})"
            )

        if isinstance(metric_id, bool) or not isinstance(metric_id, int):
            errors.append(f"{label}: metricId must be integer")
        elif metric_id not in by_id:
            errors.append(f"{label}: metricId {metric_id} not in manifest.json")

        if catalog_key:
            metric = by_key.get(catalog_key)
            if metric is None:
                errors.append(f"{label}: catalogMetricKey {catalog_key!r} not in manifest.json")
            elif isinstance(metric_id, int) and metric.get("id") != metric_id:
                errors.append(
                    f"{label}: metricId {metric_id} != manifest id {metric.get('id')} "
                    f"for key {catalog_key!r}"
                )

    if errors:
        for err in errors:
            print(f"ERROR: {err}", file=sys.stderr)
        return 1

    print(f"OK: validated {len(links)} crosswalk link(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
