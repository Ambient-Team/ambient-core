# Repository inventory (agent freshness)

Last reviewed: **2026-10-19** (batch 5 — coverage ≥85%, mypy, pathsFilterPin, validator/drift/golden tests, PR #130).

Use this page to see what changed recently and which verify commands apply. Update the **Last reviewed** line when you materially refresh docs or CI in the long-running quality PR.

## CI and policy

- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — `changes`, `ci-policy`, `build-test` (EngineerID CI-minutes policy).
- **`pathsFilterPin`** — `7b450fff21473bca461d4b92ce414b9d0420d706` (exported from [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs); tested in [`scripts/ci-policy.test.mjs`](../scripts/ci-policy.test.mjs)).
- [`docs/ci.md`](ci.md) — triggers, `run_heavy`, Dependabot limits, concurrency group rules.
- [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs) — structural workflow policy; no workflow-level `paths:` filters; push to `main` only.
- [`scripts/check_ruff.py`](../scripts/check_ruff.py), [`scripts/check_mypy.py`](../scripts/check_mypy.py), [`scripts/check_coverage.py`](../scripts/check_coverage.py) — lint, types, **lib ≥ 85%** (see `pyproject.toml` omit list for commercial-only modules).

## SSOT trees

- **`contracts/`** — 19 data-product YAML files; bundled under `lib/ambient_contracts/bundled/`.
- **`catalog/`** — 18 industry packs in [`packs.yaml`](../catalog/packs.yaml); shared templates in `catalog/shared/`.
- [`docs/metrics-catalog.md`](metrics-catalog.md) — Q-099 tier map (documentation only).

## Tests added (PR #130)

- Catalog: [`test_catalog_loader.py`](../tests/test_catalog_loader.py), [`test_catalog_yaml_schema.py`](../tests/test_catalog_yaml_schema.py), [`test_catalog_merged_validate.py`](../tests/test_catalog_merged_validate.py), [`test_catalog_validator_edge_cases.py`](../tests/test_catalog_validator_edge_cases.py), [`test_catalog_load_performance.py`](../tests/test_catalog_load_performance.py), [`test_catalog_pack_files.py`](../tests/test_catalog_pack_files.py)
- Contracts / drift: [`test_validate_contract_errors.py`](../tests/test_validate_contract_errors.py), [`test_catalog_contract_drift.py`](../tests/test_catalog_contract_drift.py), [`test_cli_golden.py`](../tests/test_cli_golden.py) + [`tests/fixtures/golden/`](../tests/fixtures/golden/)
- Pipeline / Spark: [`tests/pipeline/test_perf_recorder.py`](../tests/pipeline/test_perf_recorder.py), [`test_silver_gold_transforms.py`](../tests/pipeline/test_silver_gold_transforms.py), [`test_pii_and_secrets.py`](../tests/test_pii_and_secrets.py), [`test_storage_paths_and_firestore_ids.py`](../tests/test_storage_paths_and_firestore_ids.py)
- Policy: [`test_ci_policy.py`](../tests/test_ci_policy.py)

## Verify commands (quick)

```bash
node scripts/ci-policy.mjs && node --test scripts/ci-policy.test.mjs
python scripts/check_ruff.py
python scripts/check_mypy.py
# AGENTS.md block: contracts, catalog checks, markdown prose
AMBIENT_SPARK_TESTS=1 python scripts/check_coverage.py
pip wheel . -w dist --no-deps
```

## Out of scope for this repo

- Demo recordings and synthetic demo CSVs — [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/).
- GitHub Actions minutes (org quota) — run verify locally when Actions fails instantly.
