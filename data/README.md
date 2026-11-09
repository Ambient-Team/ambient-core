# Demo data layout

**Demo assets** are not stored in git. Copy sample CSVs from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`, or use your own files. Recordings and synthetic bundles live in the same tree — never commit them here.

## Where samples live

Obtain the manufacturing demo CSV pack from that folder for local and hosted notebook runs. This pack is for the free demo path only. You cannot really test scale with it; Ambient enterprise deployment runs scalable tests separately.

## Directory layout

- **`raw/.gitkeep`** — place `Allmanufacturingds-*.csv` here for smoke and notebooks.
- **`processed/.gitkeep`** — pandas notebook smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## Quick start

1. Copy `Allmanufacturingds-*.csv` from [`demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`, or use your own files with the same names.
2. Run `notebooks/00_colab_run_me.ipynb` in a hosted notebook runtime or `ambient_pipeline.colab_smoke.run_colab_smoke` locally.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.
