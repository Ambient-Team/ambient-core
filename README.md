# Ambient Core

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)

**Governed data products — open-source foundation anyone can rebuild.**

Free open-source materials, local notebooks, and external demo CSVs. No paid Databricks, Unity Catalog, managed document store, or cloud hosting is required for the core demo.

## Product matrix (authoritative)

- **Contracts** — ambient-core: yes · commercial platform: yes
- **Notebooks** — ambient-core: yes · commercial platform: yes
- **Pipeline (`.py`)** — ambient-core: yes · commercial platform: yes
- **Hosting** — ambient-core: **you** · commercial platform: **us**
- **Storage** — ambient-core: **none** · commercial platform: **us**
- **CLI / local AI** — ambient-core: local · commercial platform: no CLI; try via members
- **Demo** — ambient-core: **pandas notebook / smoke CLI** · commercial platform: members / hosted try

**Storage split (important):** ambient-core has no storage of its own. Demo sample CSVs are **not** checked into this repository. Copy the shared free demo pack from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`. Demo recordings, screenshots, and synthetic demo data live in the same tree — never commit them to Ambient-Team repos.

<!-- ambient-acknowledgements:begin -->
## Third-party acknowledgements

Ambient Core is built on open-source libraries. Versions below are taken from this repository's `pyproject.toml` so public docs match what integrators install.

This section credits **libraries**, not human contributors. Contributor credits stay under Community / CONTRIBUTING and will grow as people join.

### Ambient Core itself

- **Package metadata `__version__`:** `0.3.12` (must match git tag `vX.Y.Z`; see [docs/RELEASING.md](docs/RELEASING.md)).
- Consumers should pin the **git tag** (see [docs/INTEGRATING.md](docs/INTEGRATING.md)).
- **License:** MIT

### Dependencies

- **pyyaml** `>=6.0,<7` — MIT (runtime)
- **pyspark** `>=3.5.8,<3.6` — Apache-2.0 (optional-pipeline)
- **delta-spark** `>=3.0.0,<4` — Apache-2.0 (optional-pipeline)
- **pandas** `>=2.0,<3` — BSD-3-Clause (optional-notebook)
- **pytest** `>=8.0,<10` — MIT (optional-dev)
- **pytest-asyncio** `>=0.24,<2` — Apache-2.0 (optional-dev)
Company-wide catalogue (Website + Platform + Ambient Core): https://www.ambientsystems.ai/legal/acknowledgements.pdf

Generated 2026-09-09 from dependency metadata in this repository.
<!-- ambient-acknowledgements:end -->

## Notebook happy path

1. Clone the repository and install `pip install -e ".[notebook]"` (pandas + PyYAML from `pyproject.toml`).
2. Copy `Allmanufacturingds-*.csv` from [`demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/) into `data/raw/`.
3. Open [`notebooks/00_notebook_demo.ipynb`](notebooks/00_notebook_demo.ipynb) in Jupyter or run all cells with `PLATFORM_ROOT` pointing at the repo root.
4. Imports `ambient_pipeline`, reads `data/raw/` samples **you supply**, runs **Bronze → Silver → Gold** (pandas), writes under `data/processed/`.

## What's in this repo (code only — no demo datasets)

- **`ambient_pipeline/`** — pandas Bronze→Silver→Gold (`notebook_bootstrap`, `notebook_smoke`, `pandas_provenance`).
- **`lib/ambient_pipeline/`** — optional Spark/Delta governance helpers (local lakehouse; not required for the notebook demo).
- **`contracts/`** — data-product YAML including `manufacturing-demo-raw-v1.yaml` (no binary data).
- **`catalog/`** — industries, metrics, benchmarks; generator → `manifest.json` + `runtime/` JS. Standard corporate ratio pack: [docs/ratios/corporate-ratios.md](docs/ratios/corporate-ratios.md).
- **`data/raw/.gitkeep`**, **`data/processed/.gitkeep`** — placeholders only. Copy demo CSVs from [`demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/).
- **`notebooks/00_notebook_demo.ipynb`** — entry notebook. See `notebooks/COMMERCIAL_ONLY.txt` for Databricks/UC skips.
- **`lib/ambient_contracts`**, **`ambient_cli`**, **`ambient_calc`** — load, validate, ship, and reference formulas.

## Quick start (library / CI)

Prerequisites: **Python 3.10–3.12** and **Java 17+** (`JAVA_HOME`) when running Spark tests (`AMBIENT_SPARK_TESTS=1`). See [running-ci-locally.md](docs/running-ci-locally.md).

```bash
git clone <repository-url>
cd ambient-core
# Windows: py -3.12 -m venv .venv
python3.12 -m venv .venv   # or: python3 -m venv .venv
source .venv/bin/activate
# Windows: .venv\Scripts\activate
pip install -e ".[all]"
cp .env.example .env.local   # optional: edit AMBIENT_PII_SALT for local Spark runs
validate-contracts
ambient-catalog-generate --check --strict-data-option-inputs
node scripts/ci-policy.mjs
AMBIENT_SPARK_TESTS=1 pytest
```

**Local Spark / Delta** (`lib/ambient_pipeline/runner.py`): set `AMBIENT_PII_SALT` to a unique non-empty value (see `.env.example` placeholder). Required outside pytest; see [docs/pipeline.md](docs/pipeline.md#local-spark-pii-salt).

**Contributors editing `contracts/`:** copy YAML into the wheel bundle before `validate-contracts` — `cp contracts/*.yaml lib/ambient_contracts/bundled/` (CI enforces a clean diff).

Pin a release from another project: [docs/INTEGRATING.md](docs/INTEGRATING.md). More recipes: [docs/USAGE.md](docs/USAGE.md).

Pandas smoke with **external** samples (not in git):

```bash
# copy Allmanufacturingds-*.csv from EngineerID/ambient-systems demos/ambient-core/
# unpack Allmanufacturingds-*.csv into data/raw/, then:
python -c "from pathlib import Path; from ambient_pipeline.notebook_smoke import run_notebook_smoke; print(run_notebook_smoke(Path('.')).gold_kpis)"
```

Optional Spark path (needs `.[pipeline]`, `AMBIENT_PII_SALT`, and the same external CSVs): `export AMBIENT_PII_SALT='your-unique-local-salt'` then `python scripts/run_oss_bronze_silver_smoke.py`.

## Run order

1. **Notebook entry** — [`notebooks/00_notebook_demo.ipynb`](notebooks/00_notebook_demo.ipynb).
2. Optional: inspect local Spark notebooks under `notebooks/` (need external data + Spark).
3. **Skip for core** (commercial / Databricks-only; see `notebooks/COMMERCIAL_ONLY.txt`):
   - `01b_bronze_streaming.ipynb`
   - `01d_bronze_autoloader_spike.ipynb`
   - `04_unity_catalog_governance.ipynb`

## Demo data honesty

- Demo recordings, screenshots, and synthetic data are distributed outside this repository (not in git).
- Demo samples come from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/). They are **not** vendored in this repo.
- This pack is shared free demo samples. You **cannot really test scale** with it; Ambient enterprise deployment runs scalable tests separately.
- Gold KPIs from the smoke run are derived only from those sample rows — not live tenants.
- Do **not** vendor these CSVs into public forge remotes for ambient-core or the platform repo.

This repository does **not** ship customer-facing AI, model hosting, or inference orchestration. Operator AI tooling (for example Cursor Agent in IDE sessions) is internal engineering practice, not an Ambient Core product.

## Documentation

Full map: **[docs/README.md](docs/README.md)**.

- **Start** — [USAGE.md](docs/USAGE.md)
- **Embed a release** — [INTEGRATING.md](docs/INTEGRATING.md)
- **Core vs platform** — [CORE_VS_PLATFORM.md](docs/CORE_VS_PLATFORM.md)
- **Governed data** — [governed-data.md](docs/governed-data.md)
- **Pipeline helpers** — [pipeline.md](docs/pipeline.md)
- **Conventions** — [CONVENTIONS.md](docs/CONVENTIONS.md)
- **CI policy** — [ci.md](docs/ci.md) (draft gate, path filters, required `build-test` check)
- **Run CI locally** — [running-ci-locally.md](docs/running-ci-locally.md)
- **Positioning** — [POSITIONING.md](docs/POSITIONING.md)

## Community

- **Questions and bugs** — open a draft change request in your forge (see [CONTRIBUTING.md](docs/CONTRIBUTING.md)).
- **Security** — [SECURITY.md](SECURITY.md)
- **Contributing** — [CONTRIBUTING.md](docs/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Releases** — tagged `vX.Y.Z` on `main` (see [RELEASING.md](docs/RELEASING.md))

## License

Ambient Core is open source under the MIT License. That license is how the software may be used: you may use, copy, modify, merge, publish, and distribute it, including commercially, provided you include the copyright notice and license text. See [LICENSE](LICENSE).
