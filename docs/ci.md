# Continuous integration

GitHub Actions workflows live under [`.github/workflows/`](../.github/workflows/). This repository follows a **CI cost policy**: cheap jobs always run; **heavy** work runs only when changes warrant it and the pull request is not a draft.

## Workflows

- **`ci`** — [`ci.yml`](../.github/workflows/ci.yml): contract and catalog checks, pytest, wheel smoke (required check name **`build-test`**).
- **`release`** / **`cut-release`** — owner release publish; not part of pull request CI. Those workflows may use `workflow_dispatch`; only `ci.yml` is forbidden from doing so under `scripts/ci-policy.mjs`.

## Triggers (`ci`)

- **Push** — only the default branch (`main`).
- **Pull request** — `opened`, `synchronize`, `reopened`, and `ready_for_review` (marking a draft ready re-runs heavy checks).

There is no `workflow_dispatch` on `ci`.

## Concurrency

The `ci` workflow uses a concurrency group per ref or pull request with **`cancel-in-progress: true`**, so newer commits supersede older runs.

## Jobs (`ci`)

### `changes` (always)

Uses [dorny/paths-filter](https://github.com/dorny/paths-filter) pinned to `7b450fff21473bca461d4b92ce414b9d0420d706` (`pathsFilterPin` in [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs)) with `pull-requests: read` to classify **heavy** paths. The glob list SSOT is **`heavyCiPathFilters`** (see [ci-path-filters.md](ci-path-filters.md)). Documentation-only edits under `docs/` (and other paths not listed) do not set the heavy filter.

The `ci-policy` job pins **actionlint** `1.7.7` by version, git commit (`actionlintCommitSha`), and linux_amd64 tarball SHA256 (`actionlintLinuxAmd64Sha256`), verified with `sha256sum -c` after download.

Outputs **`run_heavy`**:

- **Push to `main`** — `true`.
- **Draft pull request** — `false` (live status from the GitHub API, not only the event payload).
- **Ready PR, only docs/metadata changes** — `false`.
- **Ready PR, heavy paths touched** — `true`.
- **Ambiguous filter or large PR (>3000 files)** — `true` (safe default).

### `ci-policy` (always)

1. **actionlint** on workflow files.
2. [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs) — structural policy checks.
3. [`scripts/ci-policy.test.mjs`](../scripts/ci-policy.test.mjs) — regression tests for the policy script.

### `quality-static` (always)

Runs on every pull request (including **drafts**): [`scripts/check_quality_static.py`](../scripts/check_quality_static.py). Uses `pip install -e ".[dev]"` only (no JDK/Spark).

Steps (fail fast, in order):

1. **ruff** — [`check_ruff.py`](../scripts/check_ruff.py): `F,E9,E7` on `lib/`, `scripts/`, `tests/`.
2. **mypy** — [`check_mypy.py`](../scripts/check_mypy.py): project config on `lib/` and `scripts/` (`--explicit-package-bases`; one-off `migrate_catalog_layout_027.py` excluded).
3. **mypy-strict** — [`check_mypy_strict.py`](../scripts/check_mypy_strict.py): `--strict` on every `lib/` module (34 files, SSOT list in that script).
4. **mypy-strict-support** — [`check_mypy_strict_support.py`](../scripts/check_mypy_strict_support.py): `--strict` on quality-gate `scripts/` and selected `tests/` (incremental SSOT; count grows with the quality PR).
5. **dead-code** — [`check_dead_code.py`](../scripts/check_dead_code.py): ruff `F401,F841` unused imports/variables on `lib/`, `scripts/`, `tests/`.
6. **secrets-scan** — [`scan_secrets_patterns.py`](../scripts/scan_secrets_patterns.py): pattern scan over repository sources.
7. **pack-reference-docs** — [`generate_pack_reference_docs.py`](../scripts/generate_pack_reference_docs.py) `--check`: industry pack reference doc drift.

### `build-test` (required check name)

Depends on `changes`. When `run_heavy` is `false`, the job **still succeeds** after a short gate step; heavy steps are skipped. When `run_heavy` is `true`, it runs the full sequence documented in [running-ci-locally.md](running-ci-locally.md), including **quality-static** again and [`scripts/check_coverage.py`](../scripts/check_coverage.py) (`AMBIENT_SPARK_TESTS=1` pytest with **lib ≥ 90%** line / **≥ 95%** branch coverage; `pyproject.toml` coverage omit list is empty).

Pip cache is keyed on `pyproject.toml` and `requirements-colab.txt`. JDK **17** (Temurin) is installed for Spark tests (`AMBIENT_SPARK_TESTS=1`).

## Dependabot

[`.github/dependabot.yml`](../.github/dependabot.yml) uses **grouped** updates and a low **open-pull-requests-limit** (2 per ecosystem) to limit PR noise.

## Local parity

```bash
node scripts/ci-policy.mjs
node --test scripts/ci-policy.test.mjs
```

Full verify loop: [running-ci-locally.md](running-ci-locally.md) and [AGENTS.md](../AGENTS.md).

See also [`.cursor/rules/ci.mdc`](../.cursor/rules/ci.mdc).
