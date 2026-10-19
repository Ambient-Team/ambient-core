# Continuous integration

GitHub Actions workflows live under [`.github/workflows/`](../.github/workflows/). This repository follows an **EngineerID CI-minutes policy**: cheap jobs always run; **heavy** work runs only when changes warrant it and the pull request is not a draft.

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

Uses [dorny/paths-filter](https://github.com/dorny/paths-filter) (SHA-pinned) with `pull-requests: read` to classify **heavy** paths (`contracts/`, `catalog/`, `lib/`, `ambient_pipeline/`, `tests/`, `scripts/`, lockfiles, CI config, and similar). Documentation-only edits under `docs/` (and other paths not listed) do not set the heavy filter.

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

### `build-test` (required check name)

Depends on `changes`. When `run_heavy` is `false`, the job **still succeeds** after a short gate step; heavy steps are skipped. When `run_heavy` is `true`, it runs the full sequence documented in [running-ci-locally.md](running-ci-locally.md).

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
