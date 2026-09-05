# Ambient Core

[![CI](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)

**Governed data products — MIT foundation anyone can rebuild.**

Free open-source materials + a free Google account + free Google Colab. No paid Databricks, Unity Catalog, Firebase, or GCP hosting is required for the core demo.

## Product matrix (authoritative)

- **Contracts** — ambient-core: yes · commercial platform: yes
- **Notebooks** — ambient-core: yes · commercial platform: yes
- **Pipeline (`.py`)** — ambient-core: yes · commercial platform: yes
- **Hosting** — ambient-core: **you** · commercial platform: **us**
- **Storage** — ambient-core: **none** · commercial platform: **us**
- **CLI / local AI** — ambient-core: local · commercial platform: no CLI; try via members
- **Demo** — ambient-core: **free Google Colab** · commercial platform: members / hosted try

**Storage split (important):** ambient-core has no storage of its own. Demo sample datasets are organized on [Drive](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) so Colab can run the pipeline, but they are **not** checked into `Ambient-Team/ambient-core` or `Ambient-Team/ambient-systems-platform`. Fuller demo/recording samples live with **Ambient Systems** site/demo assets for the platform subscription story.

## Free Colab happy path

1. Sign in with a free Google account.
2. Open the Drive demo folder: [ambient-core Drive SSOT](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne).
3. Open `notebooks/00_colab_run_me.ipynb` → **Open with → Google Colaboratory** (or use the copy in this repo after cloning).
4. Runtime → Run all.
5. Colab mounts Drive (or you set `PLATFORM_ROOT` to a local clone), imports `ambient_pipeline`, reads `data/raw/` samples **you supply**, runs **Bronze → Silver → Gold** (pandas), writes under `data/processed/`.

Direct Colab link: https://colab.research.google.com/drive/16qDBKIBXtPi8Jwiha3Uf6o9eWCX-cZd6

Install Colab deps only: `pip install -r requirements-colab.txt` (`pandas`, `PyYAML`).

## What's in this repo (code only — no demo datasets)

- **`ambient_pipeline/`** — Colab/pandas Bronze→Silver→Gold (`colab_bootstrap`, `colab_smoke`, `pandas_provenance`).
- **`lib/ambient_pipeline/`** — optional Spark/Delta governance helpers (local lakehouse; not required for Colab).
- **`contracts/`** — data-product YAML including `manufacturing-demo-raw-v1.yaml` (no binary data).
- **`catalog/`** — industries, metrics, benchmarks; generator → `manifest.json` + `runtime/` JS.
- **`data/raw/.gitkeep`**, **`data/processed/.gitkeep`** — placeholders only. Point Colab at the Drive folder (or download samples separately).
- **`notebooks/00_colab_run_me.ipynb`** — entry notebook. See `notebooks/COMMERCIAL_ONLY.txt` for Databricks/UC skips.
- **`lib/ambient_contracts`**, **`ambient_cli`**, **`ambient_calc`** — load, validate, ship, and reference formulas.

## Quick start (library / CI)

```bash
git clone https://github.com/Ambient-Team/ambient-core.git
cd ambient-core
py -3.12 -m venv .venv
# Windows: .venv\Scripts\activate
pip install -e ".[all]"
validate-contracts
ambient-catalog-generate --check
pytest
```

Pin a release from another project: [docs/INTEGRATING.md](docs/INTEGRATING.md). More recipes: [docs/USAGE.md](docs/USAGE.md).

Pandas smoke with **external** samples (not in git):

```bash
# place Allmanufacturingds-*.csv into data/raw/ from Drive, then:
python -c "from pathlib import Path; from ambient_pipeline.colab_smoke import run_colab_smoke; print(run_colab_smoke(Path('.')).gold_kpis)"
```

Optional Spark path (needs `.[pipeline]` and the same external CSVs): `python scripts/run_oss_bronze_silver_smoke.py`.

## Run order

1. **`00_colab_run_me.ipynb`** — required core path (pandas, free Colab only).
2. Optional: inspect local Spark notebooks under `notebooks/` (need external data + Spark).
3. **Skip for core** (commercial / Databricks-only; see `notebooks/COMMERCIAL_ONLY.txt`):
   - `01b_bronze_streaming.ipynb`
   - `01d_bronze_autoloader_spike.ipynb`
   - `04_unity_catalog_governance.ipynb`

## Demo data honesty

- `Allmanufacturingds-*.csv` are thin academic samples kept on **Drive** for the Colab demo.
- Gold KPIs from the smoke run are derived only from those rows — not live tenants.
- Do **not** vendor these CSVs into GitHub ambient-core or the platform repo.
- Platform subscription demos/recordings use Ambient Systems demo assets (separate from core).

This repository does **not** ship customer-facing AI, model hosting, or inference orchestration. Operator AI tooling (for example Cursor Agent in IDE sessions) is internal engineering practice, not an Ambient Core product.

## Documentation

Full map: **[docs/README.md](docs/README.md)**.

- **Start** — [USAGE.md](docs/USAGE.md)
- **Embed a release** — [INTEGRATING.md](docs/INTEGRATING.md)
- **Core vs platform** — [CORE_VS_PLATFORM.md](docs/CORE_VS_PLATFORM.md)
- **Governed data** — [governed-data.md](docs/governed-data.md)
- **Pipeline helpers** — [pipeline.md](docs/pipeline.md)
- **Conventions** — [CONVENTIONS.md](docs/CONVENTIONS.md)
- **Positioning** — [POSITIONING.md](docs/POSITIONING.md)

## Community

- **Questions and bugs** — [GitHub Issues](https://github.com/Ambient-Team/ambient-core/issues)
- **Security** — [SECURITY.md](SECURITY.md)
- **Contributing** — [CONTRIBUTING.md](docs/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Releases** — [GitHub Releases](https://github.com/Ambient-Team/ambient-core/releases) / tags `vX.Y.Z`

## License

MIT — see [LICENSE](LICENSE).
