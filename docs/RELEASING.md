# Releasing ambient-core

Ambient Core ships as **semver git tags** (`vX.Y.Z`). Downstream repos (especially **ambient-systems-platform**) pin that tag for pip, submodules, and container build args. Release order in the hub is: **core tag first**, then platform pins the tag, then the site.

Only the repository owner merges release PRs and runs the cut workflow. CI does not merge for you.

## Version source of truth

- **Package version:** `ambient_contracts.__version__` in `lib/ambient_contracts/__init__.py` (exported via `pyproject.toml` dynamic metadata).
- **Release identity:** git tag `vX.Y.Z` must match that version exactly (no `v` prefix in the Python string).
- **Human changelog:** [CHANGELOG.md](../CHANGELOG.md) (Keep a Changelog).

Bump the Python version and CHANGELOG in a normal PR; merge to `main`; then cut the release from GitHub (no local git required).

## Owner: cut a release (GitHub mobile or web)

1. **Prepare a version PR on `main`**
   - Set `__version__` in `lib/ambient_contracts/__init__.py` to the new `X.Y.Z`.
   - Move items from `[Unreleased]` into a new `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md` and update compare links at the bottom.
   - Ensure CI is green on the PR.
2. **Merge the PR** on `main` (owner only).
3. **Actions → Cut release → Run workflow**
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

Then re-run consumer CI (contract validation, `ambient-catalog-generate --check`, tests). Details: [INTEGRATING.md](INTEGRATING.md) and [CONTRIBUTING.md — Consumer follow-up](CONTRIBUTING.md#consumer-follow-up-after-a-release).

## Historical tags

Git tags **`v0.3.0`** through **`v0.3.7`** predate tag/package alignment. **`v0.3.8`** is the first release where tag, `__version__`, and CHANGELOG must match and Cut release + Release automation apply. Do not re-run Cut release for an existing tag name.
