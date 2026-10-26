#!/usr/bin/env python3
"""Refresh golden JSON for Spark bronze→silver→gold integration tests."""

from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIXTURE_CSV = ROOT / "tests" / "fixtures" / "pipeline" / "bronze_real_estate_mini.csv"
GOLDEN_PATH = ROOT / "tests" / "fixtures" / "golden" / "pipeline_spark_e2e.json"

FIXED_RUN_ID = "golden-pipeline-run"
FIXED_ORG = "org-golden"
FIXED_TRANSFORM_TS = "2026-01-15T12:00:00+00:00"
FIXED_INGESTION_TS = "2026-01-15T11:00:00+00:00"


def main() -> int:
    if os.environ.get("AMBIENT_SPARK_TESTS", "1") != "1":
        print("Set AMBIENT_SPARK_TESTS=1 to refresh pipeline golden files", file=sys.stderr)
        return 1
    sys.path.insert(0, str(ROOT / "lib"))
    sys.path.insert(0, str(ROOT / "scripts"))
    import pipeline_golden_util as pg
    from ambient_pipeline.perf import create_local_spark
    from ambient_pipeline.pii import PiiPseudonymizer
    from ambient_pipeline.runner import PipelineRunConfig, run_local_pipeline
    from pyspark.sql import DataFrame

    def _skip_pii_apply(
        self: PiiPseudonymizer,
        df: DataFrame,
        sensitive_field_names: list[str] | None = None,
    ) -> DataFrame:
        return df

    PiiPseudonymizer.apply = _skip_pii_apply  # type: ignore[method-assign]

    os.environ["AMBIENT_PII_SALT"] = "golden-test-salt-not-for-production"

    spark = create_local_spark("refresh-pipeline-golden", shuffle_partitions=2)
    tmp = ROOT / "tests" / "fixtures" / "pipeline" / "_refresh_lake"
    try:
        if tmp.exists():
            import shutil

            shutil.rmtree(tmp)
        cfg = PipelineRunConfig(
            base_dir=tmp,
            org_id=FIXED_ORG,
            run_id=FIXED_RUN_ID,
            optimize=True,
            volume_gb=0.01,
            transform_ts=FIXED_TRANSFORM_TS,
            ingestion_ts=FIXED_INGESTION_TS,
        )
        result = run_local_pipeline(spark, str(FIXTURE_CSV), cfg)
        snapshot = pg.pipeline_snapshot(spark, result, cfg.base_dir / "gold" / "org_kpis")
        pg.write_golden(GOLDEN_PATH, snapshot)
        print(f"OK: wrote {GOLDEN_PATH.relative_to(ROOT)}")
        return 0
    finally:
        spark.stop()


if __name__ == "__main__":
    raise SystemExit(main())
