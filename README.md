# Ambient Core

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)
[![CI](https://img.shields.io/badge/CI-documented-blue.svg)](docs/ci.md)

Industry metric and benchmark catalog packs, data contracts, three-statement and ratio calculations, a pandas Bronze/Silver/Gold pipeline, and a CLI.

Ambient Core is open source under the MIT License.

## Install

Python 3.10–3.12. Pin a git tag:

```bash
pip install "ambient-core[notebook] @ git+https://github.com/Ambient-Team/ambient-core@vX.Y.Z"
```

Extras:

- `notebook` — pandas Bronze/Silver/Gold smoke and the entry notebook
- `pipeline` — local Spark and Delta helpers (Java 17)
- `dev` — pytest, type checks, and coverage
- `all` — notebook, pipeline, postgres, and dev

From a clone:

```bash
git clone https://github.com/Ambient-Team/ambient-core
cd ambient-core
python3.12 -m venv .venv
source .venv/bin/activate
pip install -e ".[notebook]"
```

## Quick start

The synthetic sample is in the repository. No external download is required.

```bash
pip install -e ".[notebook]"
validate-contracts
ambient-catalog-generate --check
python -c "from pathlib import Path; from ambient_pipeline.notebook_smoke import run_notebook_smoke; print(run_notebook_smoke(Path('.')).gold_kpis)"
```

Or open [`notebooks/00_notebook_demo.ipynb`](notebooks/00_notebook_demo.ipynb). Optional local Spark notebooks are `01`–`04` under [`notebooks/`](notebooks/README.md) (`pip install -e ".[pipeline]"`).

Contributors who edit `contracts/` copy YAML into the wheel bundle before `validate-contracts`:

```bash
cp contracts/*.yaml lib/ambient_contracts/bundled/
```

Java 17 is required for Spark tests (`JAVA_HOME`). Set `AMBIENT_PII_SALT` to a unique non-empty value for local Spark runs outside pytest. See [docs/pipeline.md](docs/pipeline.md#local-spark-pii-salt) and [docs/running-ci-locally.md](docs/running-ci-locally.md).

## Layout

- **`catalog/`** — reference metrics, industry packs, and benchmarks
- **`contracts/`** — data-product YAML
- **`lib/`** — installable packages `ambient_contracts`, `ambient_cli`, `ambient_calc`, `ambient_statements`, and `ambient_pipeline`
- **`examples/`** — small pipeline examples and the synthetic sample under `examples/sample/`
- **`notebooks/`** — pandas demo and optional local Spark notebooks
- **`docs/`** — manuals

## Documentation

- [Usage](docs/USAGE.md)
- [Integrating a release](docs/INTEGRATING.md)
- [Catalog](catalog/README.md)
- [Corporate ratios](docs/ratios/corporate-ratios.md)
- [Three-statement essentials](docs/statements/corporate-three-statements.md)
- [Pipeline](docs/pipeline.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Releasing](docs/RELEASING.md)
- [What this project is](docs/CANONICAL_SCOPE.md)

## Community

Questions and fixes go through a change request. See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Security reports: [SECURITY.md](SECURITY.md).

<!-- ambient-acknowledgements:begin -->
## Third-party acknowledgements

Ambient Core is built on open-source libraries. Versions below are taken from this repository's `pyproject.toml` so public docs match what integrators install.

This section credits **libraries**, not human contributors. Contributor credits stay under Community / CONTRIBUTING and will grow as people join.

### Ambient Core itself

- **Package metadata `__version__`:** `0.4.0` (must match git tag `vX.Y.Z`; see [docs/RELEASING.md](docs/RELEASING.md)).
- Consumers should pin the **git tag** (see [docs/INTEGRATING.md](docs/INTEGRATING.md)).
- **License:** MIT

### Dependencies

- **pyyaml** `>=6.0,<7` — MIT (runtime)
- **pyspark** `>=3.5.8,<4.3` — Apache-2.0 (optional-pipeline)
- **delta-spark** `>=3.0.0,<5` — Apache-2.0 (optional-pipeline)
- **pandas** `>=2.0,<3` — BSD-3-Clause (optional-notebook)
- **pytest** `>=8.0,<10` — MIT (optional-dev)
- **pytest-asyncio** `>=0.24,<2` — Apache-2.0 (optional-dev)

Generated from dependency metadata in this repository.
<!-- ambient-acknowledgements:end -->

## License

Ambient Core is open source under the MIT License. That license is how the software may be used: you may use, copy, modify, merge, publish, and distribute it, including commercially, provided you include the copyright notice and license text. See [LICENSE](LICENSE).
