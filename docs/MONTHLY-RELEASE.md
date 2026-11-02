# Monthly release (ambient-core)

This document is the **cadence and chain-order** reference for **ambient-core** monthly tags. Cutting tags, CHANGELOG rules, and Ivan’s workflow live in [RELEASING.md](RELEASING.md).

## Cadence

- **When:** the **last Friday** of each calendar month (UTC), when Ivan merges and cuts the core tag. This is **not** the second Friday of the month.
- **No freeze days:** integration, quality, and feature work continue through release day on every track. Use local verification ([running-ci-locally.md](running-ci-locally.md), [`scripts/run_local_pr_ci.sh`](../scripts/run_local_pr_ci.sh)) when CI is throttled; avoid unnecessary workflow dispatches.
- **Exceptions:** if GitHub Actions capacity or billing blocks CI, Ivan may merge and cut on the next business day; document the slip in the release PR and CHANGELOG date if needed.

### Scheduled last Fridays (2026–27)

Hub monthly cuts on **ambient-core** (UTC), last Friday unless noted:

- **27 Nov 2026** — November 2026 (ships **`v0.3.11`**; see below)
- **18 Dec 2026** — December 2026
- **29 Jan 2027** — January 2027
- **26 Feb 2027** — February 2027
- **19 Mar 2027** — March 2027 (hub release date)
- **30 Apr 2027** — April 2027
- **28 May 2027** — May 2027
- **25 Jun 2027** — June 2027
- **30 Jul 2027** — July 2027
- **27 Aug 2027** — August 2027
- **24 Sep 2027** — September 2027
- **29 Oct 2027** — October 2027
- **26 Nov 2027** — November 2027
- **18 Dec 2027** — December 2027

## Release chain (hub order)

Ship downstream only **after** the upstream artifact exists. Same **`vX.Y.Z`** everywhere in a given monthly wave:

1. **ambient-core** — Ivan merges the version PR to `main`, then runs **Cut release** → annotated tag `vX.Y.Z` and GitHub Release wheel/sdist ([RELEASING.md](RELEASING.md)).
2. **ambient-systems-platform (dev)** — bump core pin (submodule, pip git ref, container build args); deploy or validate in **dev**; run consumer CI.
3. **ambient-systems-platform (prod)** — promote the same pin to **prod** after dev is green.
4. **Website / spokes** — publish messaging and docs that reference the **prod** platform pin (no price tables in this open-source repo).

Core is always first. Platform **dev** before **prod**. The site must not advertise a core tag that is not published, or a platform build that has not passed dev.

## Version bumps

- **Single source:** `ambient_contracts.__version__` in `lib/ambient_contracts/__init__.py` must equal the tag without the `v` prefix.
- **CHANGELOG:** a `## [X.Y.Z] - YYYY-MM-DD` section must exist for that version (`scripts/check_changelog_version.py` in CI).
- **Unused tags:** Cut release refuses an existing tag name. Before bumping, confirm `git ls-remote --tags origin vX.Y.Z` is empty (or accept that the workflow will fail until you pick the next patch).

## November 2026 note

Tag **`v0.3.10`** already exists on an earlier `main` commit (October 2026). The **27 Nov 2026** monthly release therefore ships as **`v0.3.11`** / package **`0.3.11`**. Downstream repos should pin **`v0.3.11`**, not re-cut `v0.3.10`.
