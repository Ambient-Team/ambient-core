# Repository inventory (agent freshness)

Last reviewed: **2026-10-25** (batch 10 — full `lib/` coverage omit cleared; bootstrap/runner unit tests; hub branching links to ecosystem-branching SSOT, PR #130).

Use this page to see what changed recently and which verify commands apply. Update the **Last reviewed** line when you materially refresh docs or CI in the long-running quality PR.

## CI and policy

- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — `changes`, `ci-policy`, `quality-static`, `build-test` (CI cost policy; [docs/ci.md](ci.md)).
- **`pathsFilterPin`** — `7b450fff21473bca461d4b92ce414b9d0420d706`; **`heavyCiPathFilters`** — SSOT for dorny `heavy:` globs ([`docs/ci-path-filters.md`](ci-path-filters.md)).
- **actionlint** — `actionlintVersion` + `actionlintCommitSha` + `actionlintLinuxAmd64Sha256` with `sha256sum -c` on the linux_amd64 tarball (exported from [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs); tested in [`scripts/ci-policy.test.mjs`](../scripts/ci-policy.test.mjs)).
- [`docs/ci.md`](ci.md) — triggers, `run_heavy`, Dependabot limits, concurrency group rules.
- [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs) — structural workflow policy; no workflow-level `paths:` filters; push to `main` only.
- [`scripts/check_quality_static.py`](../scripts/check_quality_static.py) — draft-safe ruff/mypy/secrets/pack-doc gates (CI job **`quality-static`**).
- [`scripts/check_ruff.py`](../scripts/check_ruff.py), [`scripts/check_mypy.py`](../scripts/check_mypy.py), [`scripts/check_mypy_strict.py`](../scripts/check_mypy_strict.py), [`scripts/check_coverage.py`](../scripts/check_coverage.py) — lint, types, **lib ≥ 90% lines / ≥ 85% branches** (`pyproject.toml` coverage omit list is empty).
- [`scripts/generate_pack_reference_docs.py`](../scripts/generate_pack_reference_docs.py) — per-pack markdown under [`docs/catalog-packs/`](catalog-packs/); `--check` drift gate.
- [`scripts/scan_secrets_patterns.py`](../scripts/scan_secrets_patterns.py), [`scripts/check_dead_code.py`](../scripts/check_dead_code.py) — secret-shaped token scan and unused-import gate.
- [`docs/performance-profiling.md`](performance-profiling.md) — Spark `PipelinePerfRecorder` profiling notes.

## SSOT trees

- **`contracts/`** — 19 data-product YAML files; bundled under `lib/ambient_contracts/bundled/`.
- **`catalog/`** — 18 industry packs in [`packs.yaml`](../catalog/packs.yaml); shared templates in `catalog/shared/`.
- [`docs/metrics-catalog.md`](metrics-catalog.md) — Q-099 tier map (documentation only).

## Tests added (PR #130)

- Catalog: loader/schema/merged/pack/Hypothesis/property tests; [`test_pack_data_quality_rules.py`](../tests/test_pack_data_quality_rules.py); [`test_catalog_field_rules.py`](../tests/test_catalog_field_rules.py)
- Contracts / CLI: validator errors, golden CLI, [`test_cli_ux.py`](../tests/test_cli_ux.py), [`test_hypothesis_catalog_contracts.py`](../tests/test_hypothesis_catalog_contracts.py)
- Pipeline / Spark: gold-layer idempotency/null tests, validation dedupe/skew, bronze Firestore fallback, perf/secrets coverage tests, [`test_colab_smoke_run_tmp.py`](../tests/test_colab_smoke_run_tmp.py), [`test_firestore_bridge_client.py`](../tests/test_firestore_bridge_client.py), [`test_colab_bootstrap_unit.py`](../tests/test_colab_bootstrap_unit.py), [`test_notebook_bootstrap_unit.py`](../tests/test_notebook_bootstrap_unit.py), [`test_runner_local_pipeline.py`](../tests/test_runner_local_pipeline.py); shared Spark fixture uses Delta (`tests/spark_fixtures.py`)
- Security: [`test_secrets_scan_fixtures.py`](../tests/test_secrets_scan_fixtures.py), [`test_pii_column_tagging.py`](../tests/test_pii_column_tagging.py)
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

- Demo recordings and synthetic demo CSVs — external demo packs (website zip or your own samples under `data/raw/`); not stored in git.
- GitHub Actions minutes (org quota) — run verify locally when Actions fails instantly.
