# Notebooks

## Core happy path (hosted notebook)

- **Entry notebook:** [`00_colab_run_me.ipynb`](00_colab_run_me.ipynb)
- **`00_colab_run_me.ipynb`** — entry notebook. Sets `PLATFORM_ROOT` to a local clone (or runtime checkout) with **external** `data/raw/` samples from `demos/ambient-core/`. Pandas Bronze → Silver → Gold. No Databricks.

Install: `pip install -r requirements-colab.txt` (or `%pip install pandas PyYAML` in a notebook kernel).

## Optional / legacy

- **`Master-Orchestrator.ipynb`** — legacy Spark sketch; prefer the hosted notebook entry.
- **`01b_bronze_streaming.ipynb`**, **`01d_bronze_autoloader_spike.ipynb`**, **`04_unity_catalog_governance.ipynb`** — commercial / Databricks-only (see `COMMERCIAL_ONLY.txt`).

## Local smoke (no notebook UI)

```bash
pip install -r requirements-colab.txt
# copy demo CSVs into data/raw/
python -c "from pathlib import Path; from ambient_pipeline.colab_smoke import run_colab_smoke; run_colab_smoke(Path('.'))"
```
