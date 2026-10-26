"""run_colab_smoke against tmp-path CSVs (no demo files committed to the repo)."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

import pandas as pd

from ambient_pipeline.colab_smoke import DEMO_TABLES, run_colab_smoke


def _seed_demo_tree(root: Path) -> None:
    contracts = root / "contracts"
    contracts.mkdir(parents=True)
    src_contract = Path(__file__).resolve().parents[1] / "contracts" / "manufacturing-demo-raw-v1.yaml"
    shutil.copy(src_contract, contracts / src_contract.name)

    raw = root / "data" / "raw"
    raw.mkdir(parents=True)

    frames: dict[str, pd.DataFrame] = {
        "ar_aging": pd.DataFrame(
            [
                {
                    "date": "2024-01-01",
                    "customer_name": "Acme",
                    "invoice_id": "inv-1",
                    "amount_due": 100.0,
                    "days_outstanding": 5,
                    "aging_bucket": "current",
                }
            ]
        ),
        "ap_aging": pd.DataFrame(
            [
                {
                    "date": "2024-01-01",
                    "supplier_name": "Vendor",
                    "bill_id": "b-1",
                    "amount_due": 40.0,
                }
            ]
        ),
        "crm_pipeline": pd.DataFrame(
            [{"date": "2024-01-01", "opportunity_id": "o-1", "stage": "open", "amount": 500.0}]
        ),
        "bank_statements": pd.DataFrame(
            [{"date": "2024-01-01", "amount": 10.0, "current_cash_balance": 1000.0}]
        ),
        "balance_sheet": pd.DataFrame(
            [
                {
                    "date": "2024-01-01",
                    "period_end_date": "2024-01-31",
                    "inventory": "50",
                    "days": "45 days",
                    "days_inventory_outstanding": "12 days",
                }
            ]
        ),
        "general_ledger": pd.DataFrame(
            [{"date": "2024-01-01", "account_code": "1000", "debit": 10.0, "credit": 5.0}]
        ),
        "marketing_spend": pd.DataFrame(
            [{"date": "2024-01-01", "channel": "web", "spend": 25.0, "new_customers": 5.0}]
        ),
        "inventory_records": pd.DataFrame(
            [
                {
                    "date": "2024-01-01",
                    "sku": "sku-1",
                    "quantity_on_hand": 3.0,
                    "inventory_value": 300.0,
                }
            ]
        ),
    }
    for table_id, filename in DEMO_TABLES.items():
        frames[table_id].to_csv(raw / filename, index=False)


def test_run_colab_smoke_processes_tmp_demo_csvs(tmp_path: Path) -> None:
    _seed_demo_tree(tmp_path)
    result = run_colab_smoke(tmp_path, org_id="org-test", run_id="run-test")
    assert result.bronze_tables
    assert result.silver_tables
    assert result.gold_kpis.get("ar_amount_due_sum") == 100.0
    assert result.gold_kpis.get("sample_working_capital_proxy") is not None
    summary = json.loads((tmp_path / "data" / "processed" / "gold" / "run_summary.json").read_text())
    assert summary["run_id"] == "run-test"


def test_run_colab_smoke_notes_missing_raw_files(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    shutil.copy(
        Path(__file__).resolve().parents[1] / "contracts" / "manufacturing-demo-raw-v1.yaml",
        contracts / "manufacturing-demo-raw-v1.yaml",
    )
    (tmp_path / "data" / "raw").mkdir(parents=True)
    result = run_colab_smoke(tmp_path, run_id="run-empty")
    assert any("SKIP missing raw file" in note for note in result.notes)
