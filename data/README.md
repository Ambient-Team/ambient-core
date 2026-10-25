# Demo data (storage = none in this repo)

ambient-core does **not** ship demo sample CSVs, recordings, screenshots, or other demo media in git.

**Demo assets** are not stored in git. Use the [website demo zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip) or your own samples under `data/raw/`. Recordings and synthetic bundles are distributed separately — never commit them here.

Ambient Core demo recordings are made the same way as Annotated's: Grok Bot screen-records its own desktop following a shot list, then cuts with an EDL and Ivan's voiceover.

Obtain the manufacturing demo CSV pack from that folder for local and Colab runs. This pack is for the free demo path only. You cannot really test scale with it; Ambient enterprise deployment runs scalable tests separately.

## Layout

- **`raw/.gitkeep`** — unpack `Allmanufacturingds-*.csv` from the hub demo pack here yourself.
- **`processed/.gitkeep`** — Colab/pandas smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## How to obtain samples

1. Download synthetic CSVs from the website zip or copy your own files into `data/raw/`.
2. Unpack / copy the `Allmanufacturingds-*.csv` files into `data/raw/`.
3. Run the free Colab entry https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2 or `notebooks/00_colab_run_me.ipynb` / `ambient_pipeline.colab_smoke.run_colab_smoke`.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.

## Synthetic content

Rows are small, fictional demo values. Do not treat them as production or customer data.
