# Demo data (storage = none in this repo)

ambient-core does **not** ship demo sample CSVs. Samples live on [Drive](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) for Colab, and with Ambient Systems demo/recording assets for platform subscription demos — **not** in this GitHub repo and **not** in ambient-systems-platform.

## Layout

- **`raw/.gitkeep`** — place `Allmanufacturingds-*.csv` here yourself (Drive download or local copy).
- **`processed/.gitkeep`** — Colab/pandas smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## How to obtain samples

1. Open the Drive demo folder linked above (or Ambient Systems demo assets for platform recordings).
2. Copy the `Allmanufacturingds-*.csv` files into `data/raw/`.
3. Run `notebooks/00_colab_run_me.ipynb` or `ambient_pipeline.colab_smoke.run_colab_smoke`.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.

## Synthetic content

Rows are small, fictional demo values. Do not treat them as production or customer data.
