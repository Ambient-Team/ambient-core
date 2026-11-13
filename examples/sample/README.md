# Synthetic sample

Fictional manufacturing rows for the pandas Bronze, Silver, and Gold smoke. No external download is required.

`notebook_smoke.DEMO_TABLES` and `contracts/manufacturing-demo-raw-v1.yaml` use these filenames. Inventory headers also match the `Allmanufacturingds-inventory-records` catalog option so the optional Spark smoke can map columns by name.

```bash
pip install -e ".[notebook]"
python -c "from pathlib import Path; from ambient_pipeline.notebook_smoke import run_notebook_smoke; print(run_notebook_smoke(Path('.')).gold_kpis)"
```

Output is written under `.lakehouse/notebook-smoke/` and is not committed.
