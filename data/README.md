# Demo data (storage = none in this repo)

ambient-core does **not** ship demo sample CSVs. Download the shared free demo pack (same pack the enterprise free demo uses) from the website:

- **[ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip)** — site path `/downloads/ambient-core-demo-samples-v1.zip`

[Drive](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) remains a runnable SSOT for development. Samples are **not** in this GitHub repo and **not** in ambient-systems-platform.

This pack is for the free demo path only. You cannot really test scale with it; Ambient enterprise deployment runs scalable tests separately.

## Layout

- **`raw/.gitkeep`** — unpack `Allmanufacturingds-*.csv` from the website zip (or Drive) here yourself.
- **`processed/.gitkeep`** — Colab/pandas smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## How to obtain samples

1. Download [ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip) (or sync from the Drive SSOT for development).
2. Unpack / copy the `Allmanufacturingds-*.csv` files into `data/raw/`.
3. Run the free Colab entry https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2 or `notebooks/00_colab_run_me.ipynb` / `ambient_pipeline.colab_smoke.run_colab_smoke`.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.

## Synthetic content

Rows are small, fictional demo values. Do not treat them as production or customer data.
