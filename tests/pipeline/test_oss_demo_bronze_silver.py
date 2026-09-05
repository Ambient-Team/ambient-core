"""OSS path: Colab/pandas smoke and optional Spark path without Databricks.

Demo CSVs are external (Drive / Ambient Systems assets). Tests that need samples
either use temp fixtures or skip when data/raw has no CSVs.
"""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
DEMO_CSV = ROOT / "data" / "raw" / "Allmanufacturingds-inventory-records.csv"
RAW_DIR = ROOT / "data" / "raw"


def test_no_demo_csvs_committed() -> None:
    """Storage = none: repo must not vendor Allmanufacturingds sample CSVs."""
    csvs = sorted(RAW_DIR.glob("*.csv"))
    assert csvs == [], f"demo CSVs must not be committed: {[p.name for p in csvs]}"
    assert (RAW_DIR / ".gitkeep").is_file()
    assert (ROOT / "data" / "processed" / ".gitkeep").is_file()


def test_colab_pandas_smoke_with_external_fixture(tmp_path: Path) -> None:
    """Pandas Bronze→Silver→Gold runs when samples are supplied externally."""
    import sys

    # Prefer top-level ambient_pipeline (Colab layout), then lib/
    for p in (ROOT, ROOT / "lib"):
        s = str(p)
        if s not in sys.path:
            sys.path.insert(0, s)

    from ambient_pipeline.colab_smoke import DEMO_TABLES, run_colab_smoke

    # Minimal fixture root mirroring repo layout
    raw = tmp_path / "data" / "raw"
    raw.mkdir(parents=True)
    (tmp_path / "data" / "processed").mkdir(parents=True)
    contracts_src = ROOT / "contracts" / "manufacturing-demo-raw-v1.yaml"
    contracts_dst = tmp_path / "contracts"
    contracts_dst.mkdir()
    contracts_dst.joinpath(contracts_src.name).write_text(
        contracts_src.read_text(encoding="utf-8"), encoding="utf-8"
    )
    (tmp_path / "ambient_pipeline").mkdir()

    # One-row academic samples matching required columns
    samples = {
        "Allmanufacturingds-ar-aging.csv": "date,customer_name,invoice_id,amount_due,days_outstanding,aging_bucket\n2024-01-01,Acme,INV-1,100.0,10,0-30\n",
        "Allmanufacturingds-ap-aging.csv": "date,supplier_name,bill_id,amount_due\n2024-01-01,SupplyCo,BILL-1,40.0\n",
        "Allmanufacturingds-crm-pipeline.csv": "date,opportunity_id,stage,amount\n2024-01-01,OPP-1,won,500.0\n",
        "Allmanufacturingds-bank-statements.csv": "date,amount,current_cash_balance\n2024-01-01,-10.0,1000.0\n",
        "Allmanufacturingds-balance-sheet.csv": "date,period_end_date,inventory\n2024-01-01,2024-01-31,200\n",
        "Allmanufacturingds-general-ledger.csv": "date,account_code,debit,credit\n2024-01-01,1000,50.0,0.0\n",
        "Allmanufacturingds-marketing-spend.csv": "date,channel,spend,new_customers\n2024-01-01,web,25.0,5\n",
        "Allmanufacturingds-inventory-records.csv": "date,sku,quantity_on_hand,inventory_value\n2024-01-01,SKU-1,3,75.0\n",
    }
    for name, body in samples.items():
        (raw / name).write_text(body, encoding="utf-8")

    assert set(DEMO_TABLES.values()) == set(samples)

    result = run_colab_smoke(tmp_path, org_id="test-org", run_id="test-colab-001")
    assert result.bronze_tables
    assert result.silver_tables
    assert result.gold_kpis.get("ar_amount_due_sum") == 100.0
    assert result.gold_kpis.get("inventory_value_sum") == 75.0
    assert (tmp_path / "data" / "processed" / "gold" / "demo_kpis.csv").is_file()
    assert "_bronze_run_id" in (tmp_path / "data" / "processed" / "bronze" / "ar_aging.csv").read_text(
        encoding="utf-8"
    )


def test_colab_bootstrap_finds_repo_root() -> None:
    import sys

    for p in (ROOT, ROOT / "lib"):
        s = str(p)
        if s not in sys.path:
            sys.path.insert(0, s)

    from ambient_pipeline.colab_bootstrap import ensure_package_on_path, find_platform_root

    found = find_platform_root(ROOT)
    assert found == ROOT.resolve()
    assert ensure_package_on_path(ROOT) == ROOT.resolve()


@pytest.mark.skipif(not DEMO_CSV.is_file(), reason="external demo CSV not supplied")
def test_demo_csv_headers_match_catalog_option() -> None:
    from ambient_pipeline.catalog_loader import load_data_option

    option = load_data_option("Allmanufacturingds-inventory-records")
    assert option is not None
    field_names = {
        f["name"] if isinstance(f, dict) else str(f) for f in (option.get("fields") or [])
    }
    header = DEMO_CSV.read_text(encoding="utf-8").splitlines()[0].split(",")
    assert field_names == set(header)


@pytest.mark.skipif(not DEMO_CSV.is_file(), reason="external demo CSV not supplied")
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
    pytest.importorskip("pyspark")
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
