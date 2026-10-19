# Repository inventory (agent freshness)

Last reviewed: **2026-10-19** (branch `cursor/oct31-quality-pass-2b6a`, PR #130).

Use this page to see what changed recently and which verify commands apply. Update the **Last reviewed** line when you materially refresh docs or CI in the long-running quality PR.

## CI and policy

- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — `changes`, `ci-policy`, `build-test` (EngineerID CI-minutes policy).
- [`docs/ci.md`](ci.md) — triggers, `run_heavy`, Dependabot limits.
- [`scripts/ci-policy.mjs`](../scripts/ci-policy.mjs) — structural workflow policy; Node tests in [`scripts/ci-policy.test.mjs`](../scripts/ci-policy.test.mjs); pytest wrapper [`tests/test_ci_policy.py`](../tests/test_ci_policy.py).
- [`docs/running-ci-locally.md`](running-ci-locally.md) — full verify loop parity with heavy `build-test`.

## SSOT trees

- **`contracts/`** — 19 data-product YAML files; bundled under `lib/ambient_contracts/bundled/`.
- **`catalog/`** — 18 industry packs in [`packs.yaml`](../catalog/packs.yaml); shared templates in `catalog/shared/`.
- **`docs/metrics-catalog.md`** — Q-099 tier map (documentation only; generated from YAML heuristics).

## Python packages (`lib/`)

- **`ambient_contracts`** — contract load/validate CLI `validate-contracts`.
- **`ambient_calc`** — formula evaluation for catalogue metrics.
- **`ambient_cli`** — `ambient-catalog-generate` wrapper.
- **`ambient_pipeline`** — Colab/pandas path; Spark helpers under `lib/ambient_pipeline/`.

## Verify commands (quick)

```bash
node scripts/ci-policy.mjs && node --test scripts/ci-policy.test.mjs
# then AGENTS.md Verify block (contracts, catalog checks, AMBIENT_SPARK_TESTS=1 pytest, wheel)
```

## Out of scope for this repo

- Demo recordings and synthetic demo CSVs — [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/).
- GitHub Actions minutes (org quota) — run verify locally when Actions fails instantly.
