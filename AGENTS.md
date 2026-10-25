# AGENTS

Repository-wide guidance for AI agents working on this codebase (operator tooling such as Cursor Agent / IDE Auto). This repository does not ship customer-facing AI, inference services, or model orchestration.

## Open source

This repository is **Ambient Core**, fully **open source** (not an open-core product).

- The **MIT License** is the usage license that governs how the software may be used: use, copy, modify, merge, publish, and distribute, including commercially, provided the copyright notice and license text are included. It is not a university or program brand.
- Prefer: "Ambient Core is open source under the MIT License." Never write "open core". Never write "Ambient Core (MIT)", "MIT Ambient Core", or "MIT open core".
- Commercial platform features live in a separate repository. That split does not make this repo open-core.

## Product AI boundary

- **Customer / product AI:** none in Ambient Core. No Maestro, no open-weight hosting, no agent runtime for end users, no re-sale of third-party models.
- **Internal AI only:** Cursor Agent / IDE for maintainers editing this repo.
- **Future proprietary AI/ML:** if revived, lives in the commercial platform application — never in this repository, and never as commodity model resale. Do not invent product AI features here.

## Cursor Cloud specific instructions

Ambient Core is a Python foundation library (contracts, catalog, pipeline governance). There is no GUI, no web frontend, and no long-running local service. Cloud agents do not set `start` in `.cursor/environment.json`. Validate with CLIs and `pytest`.

### Build tool and JDK

- No Maven project (`pom.xml`) and no Gradle project (`build.gradle`, `settings.gradle`, or `gradlew`).
- Build tool: setuptools via `pyproject.toml`. `pip install -e ".[all]"` fetches dependencies and installs the package. `.cursor/install.sh` then byte-compiles `lib/` and `ambient_pipeline/`.
- JDK declared by CI (`.github/workflows/ci.yml`, `java-version`): **17** (Temurin). Install pins Ubuntu OpenJDK 17 at `/usr/lib/jvm/java-17-openjdk-amd64` and sets `JAVA_HOME`. The base image may ship JDK 21; use 17 so local Spark matches CI.
- Python: `.python-version` is 3.12 (`requires-python` is `>=3.10,<3.13`). PR CI installs Python 3.11, which is inside that range.

### Setup

1. From the repo root, run `bash .cursor/install.sh`.
2. Activate the virtualenv: `source .venv/bin/activate`.
3. Confirm `java -version` reports 17 and `echo "$JAVA_HOME"` is the OpenJDK 17 home above.

### Verify

Run these from the repo root with `.venv` active. They match the heavy **`build-test`** job in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) when `run_heavy` is true. There is no separate formatter. CI policy (draft gate, path filters, Dependabot limits): [docs/ci.md](docs/ci.md). Human-oriented notes and faster subsets: [docs/running-ci-locally.md](docs/running-ci-locally.md).

Before pushing workflow or Dependabot edits:

```bash
node scripts/ci-policy.mjs
node --test scripts/ci-policy.test.mjs
```

```bash
cp contracts/*.yaml lib/ambient_contracts/bundled/
git diff --exit-code lib/ambient_contracts/bundled/
validate-contracts
python scripts/harden_catalog_data_options.py --check
python scripts/generate_reference_catalog.py --check --strict-data-option-inputs
python scripts/check_crosswalk.py
python scripts/check_catalog_hygiene.py
python scripts/check_naming.py
python scripts/check_contract_schema.py
python scripts/check_formulas.py
python scripts/check_metric_inputs.py
python scripts/check_phi.py
python scripts/check_markdown_prose.py
python scripts/check_quality_static.py
AMBIENT_SPARK_TESTS=1 python scripts/check_coverage.py
pip wheel . -w dist --no-deps
```

Markdown under `docs/`, `examples/`, and the README files must not use pipe tables (`scripts/check_markdown_prose.py`, `.cursor/rules/markdown-prose.mdc`).

### Tests that do not call external services

- Demo CSV tests skip when `data/raw/` has no external sample file (`external demo CSV not supplied`).
- Secret-store tests set env vars in-process. They do not call Databricks or any live secret backend.
- Spark tests use a local `local[1]` session. They skip if that session cannot start. They do not use a remote cluster.

### Environment variables and secrets

Required to install, verify, or run PR CI: none. Never commit secret values.

Names the code or workflows refer to:

- `AMBIENT_SPARK_TESTS` — set to `1` in CI so local Spark tests run
- `AMBIENT_CORE_ROOT`
- `AMBIENT_CONTRACTS_DIR`
- `AMBIENT_CATALOG_DIR`
- `AMBIENT_ALLOW_DEV_SECRETS`
- `AMBIENT_SMOKE_OUT`
- `PLATFORM_ROOT`
- `PYSPARK_PYTHON`
- `PYSPARK_DRIVER_PYTHON`
- `HADOOP_HOME`
- `JAVA_HOME` — set by `.cursor/install.sh` to JDK 17
- `FETCH_AMBIENT_SYSTEMS` — was used only by the removed hub receiver
- `HUB_DISPATCH_AMBIENT_TEAM` — was used only by the removed hub receiver
- `GITHUB_TOKEN` — Actions provides this to Release and Cut release; PR CI does not use it

### Repository layout

- `contracts/` — data-product YAML source of truth
- `lib/ambient_contracts/bundled/` — copies of those YAML files shipped in the wheel; CI checks they match
- `catalog/` — reference metrics, industry packs, benchmarks; generator CLI is `ambient-catalog-generate` (wraps `scripts/generate_reference_catalog.py`)
- `lib/` — installable packages `ambient_contracts`, `ambient_cli`, `ambient_calc`, `ambient_pipeline`
- `ambient_pipeline/` — Colab/pandas Bronze to Silver to Gold path used from a checkout
- `tests/` — pytest
- `scripts/` — contract, catalog, and markdown checks
- `docs/` — manuals, including historical hub mirrors under `docs/hub/`
- `notebooks/` — Colab entry and optional local Spark notebooks
- `examples/` — small pipeline examples
- `data/raw/`, `data/processed/` — empty placeholders; demo CSVs are not in git
- `.github/workflows/ci.yml` — `changes`, `ci-policy`, and `build-test` jobs (EngineerID CI-minutes policy; see [docs/ci.md](docs/ci.md))
- `.github/workflows/release.yml` and `cut-release.yml` — owner release publish; not part of PR CI
- `.cursor/environment.json` — Cloud Agent install; no `start` command

## Cloud Agent (One Foreman)

Implement only the spec. One branch, one PR. Never push main. Smallest diff. Run the repo checks before finishing. Stop at the time box and open a PR with whatever is green. Do not spawn sub-agents or switch models. CI never starts agents or merges; only the owner merges.
