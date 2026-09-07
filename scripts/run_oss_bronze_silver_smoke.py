#!/usr/bin/env python3
"""Optional Spark smoke: map one manufacturing demo CSV Bronze → Silver.

Prefer the pandas Colab path (``ambient_pipeline.colab_smoke``) for the core happy
path. This script needs Spark + Delta and an **externally supplied** CSV under
``data/raw/`` (Drive / Ambient Systems demo assets — not shipped in git)::

    # place Allmanufacturingds-*.csv into data/raw/ first
    pip install -e ".[pipeline,dev]"
    python scripts/run_oss_bronze_silver_smoke.py

Optional env:

- ``AMBIENT_SMOKE_OUT`` — output lakehouse dir (default ``.lakehouse/smoke``)
- ``AMBIENT_SMOKE_CSV`` — CSV under ``data/raw/`` (default inventory-records)
- ``AMBIENT_SMOKE_OPTION`` — catalog option key (default Allmanufacturingds-inventory-records)
"""

from __future__ import annotations

import os
import sys
from datetime import datetime, timezone
from pathlib import Path


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def main() -> int:
    root = _repo_root()
    lib = root / "lib"
    if str(lib) not in sys.path:
        sys.path.insert(0, str(lib))

    from ambient_pipeline.bronze_catalog_map import bronze_to_tenant_metrics
    from ambient_pipeline.catalog_loader import load_data_option as _load_option
    from ambient_pipeline.contracts import ContractLoader
    from ambient_pipeline.perf import create_local_spark
    from ambient_pipeline.validation import SilverValidator

    csv_name = os.environ.get(
        "AMBIENT_SMOKE_CSV",
        "Allmanufacturingds-inventory-records.csv",
    )
    option_key = os.environ.get(
        "AMBIENT_SMOKE_OPTION",
        "Allmanufacturingds-inventory-records",
    )
    out_dir = Path(os.environ.get("AMBIENT_SMOKE_OUT", str(root / ".lakehouse" / "smoke")))
    raw_dir = (root / "data" / "raw").resolve()
    csv_path = (raw_dir / csv_name).resolve()
    try:
        csv_path.relative_to(raw_dir)
    except ValueError:
        print(f"AMBIENT_SMOKE_CSV escapes data/raw: {csv_name!r}", file=sys.stderr)
        return 1
    if not csv_path.is_file():
        print(f"missing demo CSV: {csv_path}", file=sys.stderr)
        return 1

    option = _load_option(option_key)
    if not option:
        print(f"catalog option not found: {option_key}", file=sys.stderr)
        return 1

    fields = [f["name"] if isinstance(f, dict) else str(f) for f in (option.get("fields") or [])]
    # Identity mapping: catalog field name == CSV header
    mapping = {name: name for name in fields}

    spark = create_local_spark(app_name="ambient-oss-smoke", shuffle_partitions=2)
    try:
        raw = spark.read.option("header", True).csv(str(csv_path))
        print(f"bronze raw rows={raw.count()} cols={raw.columns}")

        stamped = bronze_to_tenant_metrics(
            raw,
            org_id="demo-org",
            mapping_json=mapping,
            catalog_option_key=option_key,
            run_id="oss-smoke-001",
            source_type="csv_upload",
            source_path=str(csv_path),
            ingestion_ts=datetime.now(timezone.utc).isoformat(),
        )

        loader = ContractLoader()
        contract = loader.load("tenant-metrics-v1.yaml")
        loader.enforce_bronze_lineage(contract)
        loader.assert_required_columns(
            set(stamped.columns),
            contract,
            "oss_bronze_silver_smoke",
        )

        transform_ts = datetime.now(timezone.utc).isoformat()
        silver = SilverValidator(completeness_threshold=0.5).add_silver_provenance(
            stamped,
            "oss-smoke-001",
            transform_ts,
        )

        bronze_path = out_dir / "bronze" / "inventory"
        silver_path = out_dir / "silver" / "tenant_metrics"
        out_dir.mkdir(parents=True, exist_ok=True)
        (
            raw.write.format("delta")
            .mode("overwrite")
            .save(str(bronze_path))
        )
        (
            silver.write.format("delta")
            .mode("overwrite")
            .save(str(silver_path))
        )

        silver_rows = spark.read.format("delta").load(str(silver_path)).count()
        print(f"silver rows={silver_rows} written to {silver_path}")
        print("oss bronze→silver smoke: ok")
        return 0
    finally:
        spark.stop()


if __name__ == "__main__":
    raise SystemExit(main())
