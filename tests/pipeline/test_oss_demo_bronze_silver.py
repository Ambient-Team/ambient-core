"""OSS path: manufacturing demo CSV maps to tenant-metrics without Databricks."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
DEMO_CSV = ROOT / "data" / "raw" / "Allmanufacturingds-inventory-records.csv"


@pytest.mark.skipif(not DEMO_CSV.is_file(), reason="demo CSV missing")
def test_demo_csv_headers_match_catalog_option() -> None:
    from ambient_pipeline.catalog_loader import load_data_option

    option = load_data_option("Allmanufacturingds-inventory-records")
    assert option is not None
    field_names = {
        f["name"] if isinstance(f, dict) else str(f) for f in (option.get("fields") or [])
    }
    header = DEMO_CSV.read_text(encoding="utf-8").splitlines()[0].split(",")
    assert field_names == set(header)


@pytest.mark.skipif(not DEMO_CSV.is_file(), reason="demo CSV missing")
def test_inventory_csv_bronze_to_silver_contract(spark) -> None:
    from ambient_pipeline.bronze_catalog_map import bronze_to_tenant_metrics
    from ambient_pipeline.catalog_loader import load_data_option
    from ambient_pipeline.contracts import ContractLoader

    option = load_data_option("Allmanufacturingds-inventory-records")
    assert option is not None
    fields = [f["name"] if isinstance(f, dict) else str(f) for f in (option.get("fields") or [])]
    mapping = {name: name for name in fields}

    df = spark.read.option("header", True).csv(str(DEMO_CSV))
    stamped = bronze_to_tenant_metrics(
        df,
        org_id="demo-org",
        mapping_json=mapping,
        catalog_option_key="Allmanufacturingds-inventory-records",
        run_id="test-oss-001",
        source_type="csv_upload",
        source_path=str(DEMO_CSV),
        ingestion_ts=datetime.now(timezone.utc).isoformat(),
    )
    loader = ContractLoader()
    contract = loader.load("tenant-metrics-v1.yaml")
    loader.enforce_bronze_lineage(contract)
    loader.assert_required_columns(set(stamped.columns), contract, "oss_demo")
    assert stamped.count() >= 1


def test_notebook_bootstrap_finds_lib() -> None:
    from ambient_pipeline.notebook_bootstrap import ensure_pipeline_on_path, find_repo_root

    root = find_repo_root(ROOT)
    assert root == ROOT
    assert ensure_pipeline_on_path(ROOT) == ROOT


def test_secrets_env_only_no_dbutils(monkeypatch: pytest.MonkeyPatch) -> None:
    from ambient_pipeline import secrets

    monkeypatch.setenv("AMBIENT_PII_SALT", "from-env")
    assert secrets.get_secret("ambient-systems", "pii_salt") == "from-env"


def test_firestore_helpers_noop_without_firebase() -> None:
    from ambient_pipeline.bronze_catalog_map import (
        append_firestore_lineage_event,
        fetch_firestore_data_source,
    )

    append_firestore_lineage_event(
        "org",
        "src",
        run_id="r",
        status="ok",
        rows_written=0,
        gcs_path="",
    )
    assert fetch_firestore_data_source("org", "src") is None


def test_all_demo_csv_files_present() -> None:
    expected = {
        "Allmanufacturingds-marketing-spend.csv",
        "Allmanufacturingds-general-ledger.csv",
        "Allmanufacturingds-crm-pipeline.csv",
        "Allmanufacturingds-bank-statements.csv",
        "Allmanufacturingds-balance-sheet.csv",
        "Allmanufacturingds-ar-aging.csv",
        "Allmanufacturingds-ap-aging.csv",
        "Allmanufacturingds-inventory-records.csv",
    }
    present = {p.name for p in (ROOT / "data" / "raw").glob("*.csv")}
    assert expected <= present
