# Notebooks

## Core happy path (free Colab)

- **Free Colab entry:** [`00_colab_run_me.ipynb`](00_colab_run_me.ipynb) (open this file from GitHub in Colab)
- **`00_colab_run_me.ipynb`** — entry notebook. Sets `PLATFORM_ROOT` to a local clone (or Colab checkout) with **external** `data/raw/` samples from `demos/ambient-core/`. Pandas Bronze → Silver → Gold. No Databricks.

Install: `pip install -r requirements-colab.txt` (or `%pip install pandas PyYAML` in Colab).

Demo CSVs are **not** in this repo. Copy `Allmanufacturingds-*.csv` from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`. This pack is not for scale testing; enterprise deployments run scalable tests separately. Demo recordings, screenshots, and synthetic demo data live in the same tree (not in Ambient-Team repos).

## Optional local Spark / Delta

These need `pip install -e ".[pipeline]"` and external CSVs under `data/raw/`:

- **`Master-Orchestrator.ipynb`** — legacy Spark sketch; prefer the free Colab entry.
- **`01_bronze_ingestion.ipynb`**, **`02_silver_transformation.ipynb`**, **`03_gold_metrics.ipynb`**
- **`04_local_delta_governance.ipynb`** — OSS governance on local Delta (not Unity Catalog)

## Commercial / skip for core

See **`COMMERCIAL_ONLY.txt`** (Databricks, Autoloader, Unity Catalog notebooks).

## Headless smoke

Pandas (preferred core path), with external samples:

```bash
python -c "from pathlib import Path; from ambient_pipeline.colab_smoke import run_colab_smoke; run_colab_smoke(Path('.'))"
```

Optional Spark: `python scripts/run_oss_bronze_silver_smoke.py` (same external CSVs).

See [docs/pipeline.md](../docs/pipeline.md) and [docs/CORE_VS_PLATFORM.md](../docs/CORE_VS_PLATFORM.md).
