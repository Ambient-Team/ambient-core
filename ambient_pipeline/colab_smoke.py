"""
Colab / local pandas smoke: Bronze → Silver → Gold against data/raw demo CSVs.

No Databricks. No Unity Catalog. Works with free Google Colab + Drive mount.
Demo CSVs under data/raw/ are academic samples (Allmanufacturingds-*), not live tenants.
Samples are supplied externally (Drive or download) — not shipped in this GitHub repo.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import pandas as pd
import yaml

from ambient_pipeline.pandas_provenance import PandasBronzeStamper

# Expected raw demo files (reuse Drive / Ambient Systems demo assets; do not invent live customers).
DEMO_TABLES = {
    "ar_aging": "Allmanufacturingds-ar-aging.csv",
    "ap_aging": "Allmanufacturingds-ap-aging.csv",
    "crm_pipeline": "Allmanufacturingds-crm-pipeline.csv",
    "bank_statements": "Allmanufacturingds-bank-statements.csv",
    "balance_sheet": "Allmanufacturingds-balance-sheet.csv",
    "general_ledger": "Allmanufacturingds-general-ledger.csv",
    "marketing_spend": "Allmanufacturingds-marketing-spend.csv",
    "inventory_records": "Allmanufacturingds-inventory-records.csv",
}

CONTRACT_FILE = "manufacturing-demo-raw-v1.yaml"


@dataclass
class SmokeResult:
    run_id: str
    org_id: str
    bronze_tables: dict[str, int] = field(default_factory=dict)
    silver_tables: dict[str, int] = field(default_factory=dict)
    gold_kpis: dict[str, Any] = field(default_factory=dict)
    output_dir: str = ""
    notes: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "run_id": self.run_id,
            "org_id": self.org_id,
            "bronze_tables": self.bronze_tables,
            "silver_tables": self.silver_tables,
            "gold_kpis": self.gold_kpis,
            "output_dir": self.output_dir,
            "notes": self.notes,
        }


def _load_contract(contracts_dir: Path) -> dict[str, Any]:
    path = contracts_dir / CONTRACT_FILE
    if not path.is_file():
        raise FileNotFoundError(f"Missing contract: {path}")
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def _assert_required_columns(
    df: pd.DataFrame, required: list[str], table: str
) -> None:
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise RuntimeError(f"{table}: missing required columns {missing}")


def _to_numeric(series: pd.Series) -> pd.Series:
    return pd.to_numeric(series, errors="coerce")


def run_colab_smoke(
    root: Path,
    *,
    org_id: str = "demo-org-allmanufacturingds",
    run_id: str | None = None,
) -> SmokeResult:
    """
    Execute Bronze → Silver → Gold against data/raw samples.

    Writes:
      data/processed/bronze/<table>.csv
      data/processed/silver/<table>.csv
      data/processed/gold/demo_kpis.csv
      data/processed/gold/run_summary.json
    """
    root = Path(root)
    run_id = run_id or f"colab-smoke-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}"
    raw_dir = root / "data" / "raw"
    contracts_dir = root / "contracts"
    out = root / "data" / "processed"
    bronze_dir = out / "bronze"
    silver_dir = out / "silver"
    gold_dir = out / "gold"
    for d in (bronze_dir, silver_dir, gold_dir):
        d.mkdir(parents=True, exist_ok=True)

    contract = _load_contract(contracts_dir)
    table_specs = {
        t["id"]: t for t in contract.get("schema", {}).get("tables", [])
    }

    result = SmokeResult(run_id=run_id, org_id=org_id, output_dir=str(out))
    result.notes.append(
        "Inputs are academic demo CSVs (Allmanufacturingds-*). "
        "KPI values are derived only from those rows — not live tenant metrics."
    )

    bronze_frames: dict[str, pd.DataFrame] = {}
    silver_frames: dict[str, pd.DataFrame] = {}

    # --- Bronze ---
    for table_id, filename in DEMO_TABLES.items():
        path = raw_dir / filename
        if not path.is_file():
            result.notes.append(f"SKIP missing raw file: {filename}")
            continue
        raw_df = pd.read_csv(path)
        specs = table_specs.get(table_id, {})
        required = [
            c["name"]
            for c in specs.get("columns", [])
            if c.get("required") and not str(c["name"]).startswith("#")
        ]
        if required:
            _assert_required_columns(raw_df, required, table_id)

        stamper = PandasBronzeStamper(
            run_id=run_id,
            org_id=org_id,
            source_type="csv",
            source_path=str(path.relative_to(root)),
        )
        stamped = stamper.stamp(raw_df)
        bronze_path = bronze_dir / f"{table_id}.csv"
        stamped.to_csv(bronze_path, index=False)
        bronze_frames[table_id] = stamped
        result.bronze_tables[table_id] = len(stamped)

    # --- Silver (type clean + provenance) ---
    transform_ts = datetime.now(timezone.utc).isoformat()
    for table_id, bdf in bronze_frames.items():
        sdf = bdf.copy()
        for col in sdf.columns:
            if col.startswith("_"):
                continue
            if any(
                token in col.lower()
                for token in (
                    "amount",
                    "balance",
                    "spend",
                    "cost",
                    "value",
                    "debit",
                    "credit",
                    "price",
                    "probability",
                    "quantity",
                    "leads",
                    "customers",
                    "subscriptions",
                    "days_outstanding",
                    "reorder",
                )
            ):
                sdf[col] = _to_numeric(sdf[col])
        sdf["_silver_run_id"] = run_id
        sdf["_silver_transform_ts"] = transform_ts
        sdf["_silver_schema_version"] = "1.0"
        sdf["_iso8000_quality_tier"] = "SILVER"
        # Mark non-numeric garbage in aging helper columns as cleaned sample
        for junk_col in ("days", "days_inventory_outstanding"):
            if junk_col in sdf.columns and sdf[junk_col].dtype == object:
                sdf[junk_col] = sdf[junk_col].where(
                    ~sdf[junk_col].astype(str).str.contains("day", case=False, na=False),
                    pd.NA,
                )
        silver_path = silver_dir / f"{table_id}.csv"
        sdf.to_csv(silver_path, index=False)
        silver_frames[table_id] = sdf
        result.silver_tables[table_id] = len(sdf)

    # --- Gold (simple KPIs from sample rows only) ---
    kpis: dict[str, Any] = {
        "label": "demo_sample_derived",
        "org_id": org_id,
        "run_id": run_id,
        "computed_at": transform_ts,
    }

    if "ar_aging" in silver_frames:
        ar = silver_frames["ar_aging"]
        kpis["ar_amount_due_sum"] = float(ar["amount_due"].sum()) if "amount_due" in ar else None
        kpis["ar_row_count"] = int(len(ar))

    if "ap_aging" in silver_frames:
        ap = silver_frames["ap_aging"]
        kpis["ap_amount_due_sum"] = float(ap["amount_due"].sum()) if "amount_due" in ap else None
        kpis["ap_row_count"] = int(len(ap))

    if "inventory_records" in silver_frames:
        inv = silver_frames["inventory_records"]
        if "inventory_value" in inv:
            kpis["inventory_value_sum"] = float(inv["inventory_value"].sum())
        kpis["inventory_row_count"] = int(len(inv))

    if "marketing_spend" in silver_frames:
        mkt = silver_frames["marketing_spend"]
        spend = float(mkt["spend"].sum()) if "spend" in mkt else None
        new_cust = float(mkt["new_customers"].sum()) if "new_customers" in mkt else None
        kpis["marketing_spend_sum"] = spend
        kpis["marketing_new_customers_sum"] = new_cust
        if spend is not None and new_cust and new_cust > 0:
            kpis["marketing_spend_per_new_customer"] = spend / new_cust

    if "crm_pipeline" in silver_frames:
        crm = silver_frames["crm_pipeline"]
        kpis["crm_pipeline_amount_sum"] = (
            float(crm["amount"].sum()) if "amount" in crm else None
        )
        kpis["crm_row_count"] = int(len(crm))

    if "bank_statements" in silver_frames:
        bank = silver_frames["bank_statements"]
        if "current_cash_balance" in bank:
            kpis["bank_current_cash_balance_last"] = float(
                bank["current_cash_balance"].iloc[-1]
            )

    if "general_ledger" in silver_frames:
        gl = silver_frames["general_ledger"]
        kpis["gl_debit_sum"] = float(gl["debit"].sum()) if "debit" in gl else None
        kpis["gl_credit_sum"] = float(gl["credit"].sum()) if "credit" in gl else None

    # Working-capital style snapshot from sample AR/AP/inventory only
    ar_sum = kpis.get("ar_amount_due_sum")
    ap_sum = kpis.get("ap_amount_due_sum")
    inv_sum = kpis.get("inventory_value_sum")
    if all(v is not None for v in (ar_sum, ap_sum, inv_sum)):
        kpis["sample_working_capital_proxy"] = float(ar_sum) + float(inv_sum) - float(ap_sum)

    result.gold_kpis = kpis

    kpi_rows = [
        {"kpi": k, "value": v, "org_id": org_id, "run_id": run_id}
        for k, v in kpis.items()
        if k not in ("label", "org_id", "run_id", "computed_at")
    ]
    pd.DataFrame(kpi_rows).to_csv(gold_dir / "demo_kpis.csv", index=False)
    (gold_dir / "run_summary.json").write_text(
        json.dumps(result.to_dict(), indent=2, default=str), encoding="utf-8"
    )
    return result
