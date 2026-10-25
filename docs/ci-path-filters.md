# CI heavy path filters (SSOT)

EngineerID **CI-minutes policy** uses [dorny/paths-filter](https://github.com/dorny/paths-filter) in the `changes` job to decide when **`run_heavy`** is true for ready pull requests.

## Single source of truth

The canonical glob list is exported as **`heavyCiPathFilters`** from [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs). That array must match the `heavy:` block in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) exactly (order may differ; membership must not).

`node scripts/ci-policy.mjs` fails if `ci.yml` drifts from the SSOT.

Related pins from the same module:

- **`pathsFilterPin`** — commit SHA for `dorny/paths-filter@…`
- **`actionlintVersion`**, **`actionlintCommitSha`**, **`actionlintLinuxAmd64Sha256`** — actionlint install pins in the `ci-policy` job

Hub branching policy SSOT: [ecosystem-branching.md](https://github.com/EngineerID/ambient-systems/blob/main/company/strategy/governance/ecosystem-branching.md) (EngineerID/ambient-systems). This repo keeps a short pointer in [`docs/hub/branching.md`](hub/branching.md), not a full copy.

## When heavy CI runs

See [docs/ci.md](ci.md): push to `main`, ready PRs touching any `heavyCiPathFilters` glob, large PRs, or ambiguous filter results. Draft PRs skip heavy `build-test` steps but still run **`quality-static`** and **`ci-policy`**.
