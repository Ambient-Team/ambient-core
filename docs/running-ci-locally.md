# Running CI locally

Pull request CI runs the same checks as the **`build-test`** job in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) when heavy CI is enabled. Draft PRs and docs-only changes skip heavy steps in GitHub Actions but still pass the required check; locally you can always run the full loop below. See [docs/ci.md](ci.md) for triggers and the `run_heavy` gate.

## Prerequisites

- Python 3.10–3.12 (CI uses 3.11; the repo pins 3.12 in `.python-version`).
- JDK **17** for Spark tests (`AMBIENT_SPARK_TESTS=1`). Cloud Agent installs pin OpenJDK 17 via `.cursor/install.sh`.
- Editable install: `pip install -e ".[all]"` from the repository root.

## Full verify loop

Run from the repository root with your virtualenv active. Order matches CI.

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
python scripts/check_doc_links.py

node scripts/ci-policy.mjs
node --test scripts/ci-policy.test.mjs

python scripts/check_quality_static.py
AMBIENT_SPARK_TESTS=1 python scripts/check_coverage.py

pip wheel . -w dist --no-deps
```

Bundled contract sync must show no diff after `cp`. If it fails, copy contracts again and commit the bundled tree.

## Static quality (draft PR parity)

Runs on every pull request in CI (`quality-static` job), including drafts:

```bash
pip install -e ".[dev]"
python scripts/check_quality_static.py
```

## Coverage gate (lib ≥ 90% lines, ≥ 95% branches)

```bash
AMBIENT_SPARK_TESTS=1 python scripts/check_coverage.py
```

Writes HTML to `/opt/cursor/artifacts/coverage-html` when that directory exists (Cloud Agent VMs).

## Faster subsets

- **Contracts only:** `validate-contracts` after syncing bundled YAML.
- **Catalog only:** hardening `--check`, generator `--check --strict-data-option-inputs`, and `check_crosswalk.py`.
- **Docs only:** `python scripts/check_markdown_prose.py` (no pipe tables under `docs/`, README files, or `examples/**/*.md`).
- **Pipeline / Spark:** set `AMBIENT_SPARK_TESTS=1` so local Spark tests run; they use `local[1]` and skip when the session cannot start.

## Environment variables

See [AGENTS.md](../AGENTS.md) for names the code and workflows reference (`AMBIENT_CORE_ROOT`, `AMBIENT_CATALOG_DIR`, `AMBIENT_CONTRACTS_DIR`, and others). None are required for the default checkout verify loop.

## Cloud Agent

Cursor Cloud agents use the same commands documented in [AGENTS.md](../AGENTS.md) under **Verify**. There is no web UI or long-running service in this repository.
