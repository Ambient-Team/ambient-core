# Releasing ambient-core

Ambient Core ships as **semver git tags** (`vX.Y.Z`). Downstream repos (especially **ambient-systems-platform**) pin that tag for pip, submodules, and container build args. Release order in the hub is: **core tag first**, then **platform dev**, then **platform prod**, then the **website** (see [MONTHLY-RELEASE.md](MONTHLY-RELEASE.md)).

Only **Ivan** merges release PRs to `main` and runs the **Cut release** workflow. CI and agents do not merge for you.

## Monthly release cadence (ambient-core)

Ambient-core ships a **monthly** semver tag on the **last Friday** of each calendar month (UTC), not the second Friday. Examples on the **2026–27** hub calendar (full list in [MONTHLY-RELEASE.md](MONTHLY-RELEASE.md)):

- **Nov 2026** — Fri **27** Nov (`v0.3.11`)
- **Dec 2026** — Fri **18** Dec
- **Jan 2027** — Fri **29** Jan
- **Feb 2027** — Fri **26** Feb
- **Mar 2027** — Fri **19** Mar

**No freeze days** on any track — integration, quality, and feature work continue through release day. Keep the monthly release PR green with local verification when CI is throttled: [`scripts/run_local_pr_ci.sh`](../scripts/run_local_pr_ci.sh) (see [running-ci-locally.md](running-ci-locally.md)); avoid extra workflow dispatches.

Hub chain order (**core → platform dev → platform prod → website**), the **2026–27** last-Friday schedule, version-bump rules, and the November **`v0.3.11`** note (`v0.3.10` already exists and cannot be re-cut) are in **[MONTHLY-RELEASE.md](MONTHLY-RELEASE.md)**.

- **Merge:** Ivan merges the version PR on `main` on or before the last Friday when the branch is ready.
- **Cut:** Ivan runs **Actions → Cut release** after `main` carries the bumped `__version__` and CHANGELOG for that month (usually that last Friday).
- **Consumers:** pin the new `vX.Y.Z` tag per [Downstream: pin a core release](#downstream-pin-a-core-release) once the GitHub Release artifacts are published.

Patch releases between monthly tags are still allowed when needed; they follow the same cut workflow with a patch semver bump.

## Version source of truth

- **Package version:** `ambient_contracts.__version__` in `lib/ambient_contracts/__init__.py` (exported via `pyproject.toml` dynamic metadata).
- **Release identity:** git tag `vX.Y.Z` must match that version exactly (no `v` prefix in the Python string).
- **Human changelog:** [CHANGELOG.md](../CHANGELOG.md) (Keep a Changelog).

Bump the Python version and CHANGELOG in a normal PR; Ivan merges to `main`; then Ivan cuts the release from GitHub (no local git required).

## Ivan: cut a release (GitHub mobile or web)

1. **Prepare a version PR on `main`**
   - Set `__version__` in `lib/ambient_contracts/__init__.py` to the new `X.Y.Z`.
   - Move items from `[Unreleased]` into a new `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md` and update compare links at the bottom.
   - Ensure CI is green on the PR.
2. **Merge the PR** on `main` (Ivan only).
3. **Actions → Cut release → Run workflow** (Ivan only)
   - Branch: `main` (default).
   - **version:** leave the default if it matches `__version__` on `main` (the workflow file default tracks the current release; it must equal `ambient_contracts.__version__`).
4. **Cut release** verifies `version`, `CHANGELOG`, and that the tag does not already exist, then creates annotated tag `vX.Y.Z` on `main`.
5. Because **tags pushed by `GITHUB_TOKEN` do not start other workflows**, Cut release immediately calls **Release**, which re-runs validation and tests, builds wheel and sdist, and creates the GitHub Release with artifacts attached.

Maintainers with local git can still tag manually; a tag push also triggers **Release** (`.github/workflows/release.yml`).

## Downstream: pin a core release

Use the **same tag everywhere** you depend on core:

- **Git submodule or checkout:** `git fetch --tags && git checkout vX.Y.Z` in the `ambient-core` path.
- **Pip from git:** `ambient-core @ git+https://github.com/Ambient-Team/ambient-core.git@vX.Y.Z`
- **Built wheel:** download the wheel from the GitHub Release for that tag and `pip install ambient_core-X.Y.Z-py3-none-any.whl` (verify hash in your supply chain process).

Then re-run consumer CI (contract validation, `ambient-catalog-generate --check`, tests). On **ambient-systems-platform**, roll **dev** first, then **prod**, then update the **website** — same tag at each step. Details: [INTEGRATING.md](INTEGRATING.md), [MONTHLY-RELEASE.md](MONTHLY-RELEASE.md), and [CONTRIBUTING.md — Consumer follow-up](CONTRIBUTING.md#consumer-follow-up-after-a-release).

## Historical tags

Git tags **`v0.3.0`** through **`v0.3.7`** predate tag/package alignment. **`v0.3.8`** is the first release where tag, `__version__`, and CHANGELOG must match and Cut release + Release automation apply. **`v0.3.10`** was tagged on an earlier commit; the November 2026 monthly release ships as **`v0.3.11`**. Do not re-run Cut release for an existing tag name.
