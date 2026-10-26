# Monthly release (ambient-core)

This document is the **cadence and chain-order** reference for **ambient-core** monthly tags. Cutting tags, CHANGELOG rules, and the owner workflow live in [RELEASING.md](RELEASING.md).

## Cadence

- **When:** the **last Friday** of each calendar month (UTC) — for example **27 Nov 2026**, **18 Dec 2026**, **29 Jan 2027** (not the second Friday). **Ivan** merges and cuts the release.
- **Exceptions:** if GitHub Actions capacity or billing blocks CI, Ivan may merge and cut on the next business day; document the slip in the release PR and CHANGELOG date if needed.
- **No freeze days:** integration, quality, and feature work continue through release day on every track. Use local verification ([running-ci-locally.md](running-ci-locally.md), [`scripts/run_local_pr_ci.sh`](../scripts/run_local_pr_ci.sh)) when CI is throttled; avoid unnecessary workflow dispatches.

## Release chain (hub order)

Ship downstream only **after** the upstream artifact exists:

1. **ambient-core** — semver git tag `vX.Y.Z` on `main`, GitHub Release wheel/sdist (see [RELEASING.md](RELEASING.md)).
2. **ambient-systems-platform** — bump pins (submodule, pip git ref, container build args) to that tag; run consumer CI.
3. **Website / spokes** — publish messaging and docs that reference the platform pin (no price tables in this open-source repo).

Core is always first. Platform and site must not advertise a tag that is not yet published on core.

## Version bumps

- **Single source:** `ambient_contracts.__version__` in `lib/ambient_contracts/__init__.py` must equal the tag without the `v` prefix.
- **CHANGELOG:** a `## [X.Y.Z] - YYYY-MM-DD` section must exist for that version (`scripts/check_changelog_version.py` in CI).
- **Unused tags:** Cut release refuses an existing tag name. Before bumping, confirm `git ls-remote --tags origin vX.Y.Z` is empty (or accept that the workflow will fail until you pick the next patch).

## November 2026 note

Tag **`v0.3.10`** already exists on an earlier `main` commit (October 2026). The **27 Nov 2026** monthly release therefore ships as **`v0.3.11`** / package **`0.3.11`**. Downstream repos should pin **`v0.3.11`**, not re-cut `v0.3.10`.
