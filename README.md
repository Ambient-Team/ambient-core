# Ambient Core

[![CI](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)

**Governed data products — open-source foundation anyone can rebuild.**

Free open-source materials + a free Google account + free Google Colab. No paid Databricks, Unity Catalog, Firebase, or GCP hosting is required for the core demo.

## Product matrix (authoritative)

- **Contracts** — ambient-core: yes · commercial platform: yes
- **Notebooks** — ambient-core: yes · commercial platform: yes
- **Pipeline (`.py`)** — ambient-core: yes · commercial platform: yes
- **Hosting** — ambient-core: **you** · commercial platform: **us**
- **Storage** — ambient-core: **none** · commercial platform: **us**
- **CLI / local AI** — ambient-core: local · commercial platform: no CLI; try via members
- **Demo** — ambient-core: **free Google Colab** · commercial platform: members / hosted try

**Storage split (important):** ambient-core has no storage of its own. Demo sample CSVs are **not** checked into `Ambient-Team/ambient-core` or `Ambient-Team/ambient-systems-platform`. Download the shared free demo pack from the website (same pack the enterprise free demo uses): [ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip) (site path `/downloads/ambient-core-demo-samples-v1.zip`). The [Drive folder](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) remains a runnable SSOT for development.

<!-- ambient-acknowledgements:begin -->
## Third-party acknowledgements

Ambient Core is built on open-source libraries. Versions below are taken from this repository's `pyproject.toml` (and `requirements-colab.txt` when present) so public docs match what integrators install.

This section credits **libraries**, not human contributors. Contributor credits stay under Community / CONTRIBUTING and will grow as people join.

### Ambient Core itself

- **Release tag:** `v0.3.7`
- **Package metadata `__version__`:** `0.3.0`
- Note: git release tags may advance ahead of `__version__`; consumers should pin the **git tag** (see docs/INTEGRATING.md).
- **License:** MIT

### Dependencies

- **pyyaml** `>=6.0,<7` — MIT (runtime)
- **pyspark** `>=3.5.0,<3.6` — Apache-2.0 (optional-pipeline)
- **delta-spark** `>=3.0.0,<4` — Apache-2.0 (optional-pipeline)
- **pandas** `>=2.0,<3` — BSD-3-Clause (optional-colab)
- **pytest** `>=8.0,<10` — MIT (optional-dev)
- **pytest-asyncio** `>=0.24,<2` — Apache-2.0 (optional-dev)
- **pandas** `>=2.0` — BSD-3-Clause (colab-file)
- **PyYAML** `>=6.0` — MIT (colab-file)

Company-wide catalogue (Website + Platform + Ambient Core): https://www.ambientsystems.ai/legal/acknowledgements.pdf

Generated 2026-09-09 by EngineerID/ambient-systems Apply acknowledgements.
<!-- ambient-acknowledgements:end -->

## Free Colab happy path

1. Sign in with a free Google account.
2. Open the free Colab entry: https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2
3. Obtain samples (not in this repo): download [ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip) and unpack into `data/raw/`, **or** use the [Drive SSOT](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) for development.
4. Runtime → Run all (or clone this repo and run `notebooks/00_colab_run_me.ipynb` with `PLATFORM_ROOT` set).
5. Imports `ambient_pipeline`, reads `data/raw/` samples **you supply**, runs **Bronze → Silver → Gold** (pandas), writes under `data/processed/`.

Install Colab deps only: `pip install -r requirements-colab.txt` (`pandas`, `PyYAML`).

## What's in this repo (code only — no demo datasets)

- **`ambient_pipeline/`** — Colab/pandas Bronze→Silver→Gold (`colab_bootstrap`, `colab_smoke`, `pandas_provenance`).
- **`lib/ambient_pipeline/`** — optional Spark/Delta governance helpers (local lakehouse; not required for Colab).
- **`contracts/`** — data-product YAML including `manufacturing-demo-raw-v1.yaml` (no binary data).
- **`catalog/`** — industries, metrics, benchmarks; generator → `manifest.json` + `runtime/` JS.
- **`data/raw/.gitkeep`**, **`data/processed/.gitkeep`** — placeholders only. Download the website sample zip (or use Drive for development).
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
# download https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip
# unpack Allmanufacturingds-*.csv into data/raw/, then:
python -c "from pathlib import Path; from ambient_pipeline.colab_smoke import run_colab_smoke; print(run_colab_smoke(Path('.')).gold_kpis)"
```

Optional Spark path (needs `.[pipeline]` and the same external CSVs): `python scripts/run_oss_bronze_silver_smoke.py`.

## Run order

1. **Free Colab entry** — https://colab.research.google.com/drive/1RUficLuL14xLSozVPBjpSeBKT6_wGxG2 (or `00_colab_run_me.ipynb` in this repo).
2. Optional: inspect local Spark notebooks under `notebooks/` (need external data + Spark).
3. **Skip for core** (commercial / Databricks-only; see `notebooks/COMMERCIAL_ONLY.txt`):
   - `01b_bronze_streaming.ipynb`
   - `01d_bronze_autoloader_spike.ipynb`
   - `04_unity_catalog_governance.ipynb`

## Demo data honesty

- Demo samples come from the **website downloadable bucket** — same pack the enterprise free demo uses: [ambient-core-demo-samples-v1.zip](https://ambientsystems.ai/downloads/ambient-core-demo-samples-v1.zip). They are **not** vendored in this repo.
- This pack is shared free demo samples. You **cannot really test scale** with it; Ambient enterprise deployment runs scalable tests separately.
- [Drive](https://drive.google.com/drive/folders/1YTmpKrb5J2hqdiD3GJI2cGmFA2cRA1Ne) remains a runnable SSOT for development (Colab mount / local sync).
- Gold KPIs from the smoke run are derived only from those sample rows — not live tenants.
- Do **not** vendor these CSVs into GitHub ambient-core or the platform repo.

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

Ambient Core is open source under the MIT License. That license is how the software may be used: you may use, copy, modify, merge, publish, and distribute it, including commercially, provided you include the copyright notice and license text. See [LICENSE](LICENSE).
