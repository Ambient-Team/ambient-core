# Notebooks

## Core happy path (free Colab)

- **Free Colab entry:** https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2
- **`00_colab_run_me.ipynb`** — repo copy of the entry notebook. Sets `PLATFORM_ROOT` to Drive or a local clone with **external** `data/raw/` samples. Pandas Bronze → Silver → Gold. No Databricks.

Install: `pip install -r requirements-colab.txt` (or `%pip install pandas PyYAML` in Colab).

Demo CSVs are **not** in this repo. Download [ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip) (same pack as the enterprise free demo) into `data/raw/`, or use the [Drive SSOT](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) for development. This pack is not for scale testing; enterprise deployments run scalable tests separately.

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
