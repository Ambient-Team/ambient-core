"""Pandas smoke and optional Spark path against the in-repo synthetic sample."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

import pytest
from pyspark.sql import SparkSession

ROOT = Path(__file__).resolve().parents[2]
DEMO_CSV = ROOT / "examples" / "sample" / "inventory-records.csv"
SAMPLE_DIR = ROOT / "examples" / "sample"


def test_in_repo_sample_is_present() -> None:
    """Clone + notebook extra can smoke without an external download."""
    assert not (ROOT / "data").exists()
    csvs = sorted(SAMPLE_DIR.glob("*.csv"))
    assert csvs, "examples/sample must ship synthetic CSVs"
    assert DEMO_CSV.is_file()


def test_notebook_pandas_smoke_on_repo_sample() -> None:
    """Pandas Bronze→Silver→Gold runs on the committed synthetic sample."""
    from ambient_pipeline.notebook_smoke import DEMO_TABLES, run_notebook_smoke

    for filename in DEMO_TABLES.values():
        assert (SAMPLE_DIR / filename).is_file(), filename

    result = run_notebook_smoke(ROOT, org_id="test-org", run_id="test-notebook-001")
    assert set(result.bronze_tables) == set(DEMO_TABLES)
    assert result.silver_tables
    assert result.gold_kpis.get("ar_amount_due_sum") == pytest.approx(1725.75)
    assert result.gold_kpis.get("inventory_value_sum") == pytest.approx(860.0)
    gold = ROOT / ".lakehouse" / "notebook-smoke" / "gold" / "demo_kpis.csv"
    assert gold.is_file()
    bronze = ROOT / ".lakehouse" / "notebook-smoke" / "bronze" / "ar_aging.csv"
    assert "_bronze_run_id" in bronze.read_text(encoding="utf-8")


def test_notebook_bootstrap_finds_repo_root() -> None:
    from ambient_pipeline.notebook_bootstrap import ensure_checkout_on_path, find_checkout_root

    found = find_checkout_root(ROOT)
    assert found == ROOT.resolve()
    assert ensure_checkout_on_path(ROOT) == ROOT.resolve()


def test_demo_csv_headers_match_catalog_option() -> None:
    from ambient_pipeline.catalog_loader import load_data_option

    option = load_data_option("Allmanufacturingds-inventory-records")
    assert option is not None
    field_names = {
        f["name"] if isinstance(f, dict) else str(f) for f in (option.get("fields") or [])
    }
    header = DEMO_CSV.read_text(encoding="utf-8").splitlines()[0].split(",")
    assert field_names == set(header)


def test_inventory_csv_bronze_to_silver_contract(spark: SparkSession) -> None:
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
    assert secrets.get_secret("ambient-core", "pii_salt") == "from-env"


