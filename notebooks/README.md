# Notebooks

## Pandas demo

- **`00_notebook_demo.ipynb`** — entry notebook. Resolves the checkout with `ensure_pipeline_on_path` and runs Bronze to Silver to Gold on `examples/sample/`.

Install from the repo root:

```bash
pip install -e ".[notebook]"
```

## Optional local Spark

- **`01_bronze_ingestion.ipynb`** — stamp the synthetic CSVs and write local Delta.
- **`02_silver_transformation.ipynb`** — map the inventory sample to tenant-metrics.
- **`03_gold_metrics.ipynb`** — compact Gold summary from the local Silver table.
- **`04_local_delta_governance.ipynb`** — contract columns and Bronze provenance on local Delta.

These need `pip install -e ".[pipeline]"` and Java 17. They read `examples/sample/` and write under `.lakehouse/demo/`.

## Local smoke without a notebook UI

```bash
pip install -e ".[notebook]"
python -c "from pathlib import Path; from ambient_pipeline.notebook_smoke import run_notebook_smoke; run_notebook_smoke(Path('.'))"
```
