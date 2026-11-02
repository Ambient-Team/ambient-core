# Demo data (storage = none in this repo)

ambient-core does **not** ship demo sample CSVs, recordings, screenshots, or other demo media in git.

**Demo assets** are not stored in git. Copy sample CSVs from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`, or use your own files. Recordings and synthetic bundles live in the same tree — never commit them here.

Ambient Core demo recordings are made the same way as Annotated's: Grok Bot screen-records its own desktop following a shot list, then cuts with an EDL and Ivan's voiceover.

Obtain the manufacturing demo CSV pack from that folder for local and Colab runs. This pack is for the free demo path only. You cannot really test scale with it; Ambient enterprise deployment runs scalable tests separately.

## Layout

- **`raw/.gitkeep`** — unpack `Allmanufacturingds-*.csv` from the hub demo pack here yourself.
- **`processed/.gitkeep`** — Colab/pandas smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## How to obtain samples

1. Copy `Allmanufacturingds-*.csv` from [`demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`, or use your own files with the same names.
2. Run `notebooks/00_colab_run_me.ipynb` (GitHub → Open in Colab) or `ambient_pipeline.colab_smoke.run_colab_smoke` locally.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.

## Synthetic content

Rows are small, fictional demo values. Do not treat them as production or customer data.
