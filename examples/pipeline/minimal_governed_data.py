#!/usr/bin/env python3
"""Minimal governed-data walkthrough (stdlib + ambient_contracts only).

Run from an ambient-core clone:
  pip install -e .
  set AMBIENT_CORE_ROOT=%CD%   # Windows
  python examples/pipeline/minimal_governed_data.py
"""

from __future__ import annotations

import os
import sys

from ambient_contracts.catalog_manifest import load_manifest
from ambient_contracts.crosswalk import load_crosswalk_links
from ambient_contracts.loader import ContractLoader
from ambient_contracts.validate import validate_all_contracts


def main() -> int:
    root = os.environ.get("AMBIENT_CORE_ROOT")
    if root:
        print(f"AMBIENT_CORE_ROOT={root}")
    else:
        print("AMBIENT_CORE_ROOT not set; using default path resolution")

    errors = validate_all_contracts()
    if errors:
        print("validate-contracts failed:", errors, file=sys.stderr)
        return 1
    print("validate-contracts: ok (all bundled/checkout contracts)")

    manifest = load_manifest()
    print(f"catalog metrics in manifest: {len(manifest.metrics)}")

    sample_id = "8"
    found = manifest.resolve_metric(sample_id)
    if found:
        print(f"sample metric id={sample_id}: {found.name!r}")
    else:
        print(f"sample metric id={sample_id}: not found")

    loader = ContractLoader()
    contract = loader.load("tenant-metrics-v1.yaml")
    product = contract.get("product", {})
    schema = contract.get("schema", {})
    print(
        f"contract tenant-metrics: product={product.get('name')!r} "
        f"table={schema.get('table')!r}"
    )

    links = load_crosswalk_links()
    dscr = next((link for link in links if link.get("metricId") == 8), None)
    if dscr:
        print(
            "crosswalk DSCR sample: "
            f"contractFile={dscr.get('contractFile')!r} "
            f"contractProductId={dscr.get('contractProductId')!r}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
