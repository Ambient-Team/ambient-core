# OSS medallion notebooks

Local Jupyter notebooks that drive Bronze → Silver → Gold using
`lib/ambient_pipeline/` and demo CSVs under `data/raw/`. No Databricks runtime,
Unity Catalog, Autoloader, or Firebase is required.

## Setup

```bash
pip install -e ".[pipeline,dev]"
# Jupyter optional
pip install jupyter
```

Open notebooks from the repository root (so bootstrap finds `lib/`).

## Notebooks

- **`Master-Orchestrator.ipynb`** — load all manufacturing demo CSVs and run stage notebooks in order.
- **`01_bronze_ingestion.ipynb`** — read `data/raw/*.csv`, stamp provenance, write local Delta Bronze.
- **`02_silver_transformation.ipynb`** — catalog-map one option → tenant-metrics Silver + contract assert.
- **`03_gold_metrics.ipynb`** — summarize Silver into a local Gold Delta table.
- **`04_local_delta_governance.ipynb`** — OSS governance checks on local Delta (not Unity Catalog).

## Headless smoke (no Jupyter)

```bash
python scripts/run_oss_bronze_silver_smoke.py
```

See also [docs/pipeline.md](../docs/pipeline.md) and [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md).
