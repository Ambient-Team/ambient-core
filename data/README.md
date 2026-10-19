# Demo data (storage = none in this repo)

ambient-core does **not** ship demo sample CSVs, recordings, screenshots, or other demo media in git.

**SSOT for demo assets:** [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/). All demo recordings, screenshots, and synthetic demo data live there — **never** in Ambient-Team repos (`ambient-core`, `ambient-systems-platform`, or other spokes).

Ambient Core demo recordings are made the same way as Annotated's: Grok Bot screen-records its own desktop following a shot list, then cuts with an EDL and Ivan's voiceover.

Obtain the manufacturing demo CSV pack from that folder for local and Colab runs. This pack is for the free demo path only. You cannot really test scale with it; Ambient enterprise deployment runs scalable tests separately.

## Layout

- **`raw/.gitkeep`** — unpack `Allmanufacturingds-*.csv` from the hub demo pack here yourself.
- **`processed/.gitkeep`** — Colab/pandas smoke writes Bronze / Silver / Gold here; gitignored outputs stay local.

## How to obtain samples

1. Sync synthetic CSVs from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) (see that README for downloads or paths).
2. Unpack / copy the `Allmanufacturingds-*.csv` files into `data/raw/`.
3. Run the free Colab entry https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2 or `notebooks/00_colab_run_me.ipynb` / `ambient_pipeline.colab_smoke.run_colab_smoke`.

Filenames expected by the smoke runner are listed in `ambient_pipeline/colab_smoke.py` (`DEMO_TABLES`) and `contracts/manufacturing-demo-raw-v1.yaml`.

## Synthetic content

Rows are small, fictional demo values. Do not treat them as production or customer data.
