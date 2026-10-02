# Releasing ambient-core

Ambient Core ships as **semver git tags** (`vX.Y.Z`). Downstream repos (especially **ambient-systems-platform**) pin that tag for pip, submodules, and container build args. Release order in the hub is: **core tag first**, then platform pins the tag, then the site.

Only the repository owner cuts tags on `main` and approves GitHub Releases. CI and this workflow do not merge or tag for you.

## Version source of truth

- **Package version:** `ambient_contracts.__version__` in `lib/ambient_contracts/__init__.py` (exported via `pyproject.toml` dynamic metadata).
- **Release identity:** git tag `vX.Y.Z` must match that version exactly (no `v` prefix in the Python string).
- **Human changelog:** [CHANGELOG.md](../CHANGELOG.md) (Keep a Changelog).

Bump the Python version and CHANGELOG in a normal PR; merge to `main`; then tag.

## Owner: cut a release

1. **Prepare a version PR on `main`**
   - Set `__version__` in `lib/ambient_contracts/__init__.py` to the new `X.Y.Z`.
   - Move items from `[Unreleased]` into a new `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md` and add the compare link at the bottom.
   - Run the same checks as CI (`validate-contracts`, catalog `--check` scripts, `pytest` with `AMBIENT_SPARK_TESTS=1` if pipeline code changed).
2. **Merge the PR** (owner only).
3. **Tag on `main`** at the merge commit:
   - `git tag -a vX.Y.Z -m "ambient-core vX.Y.Z"`
   - `git push origin vX.Y.Z`
4. **Release workflow** (`.github/workflows/release.yml`) runs on the tag push:
   - Re-runs lint/validation and tests.
   - Fails if the tag (without `v`) ≠ `ambient_contracts.__version__` or if `CHANGELOG.md` has no `## [X.Y.Z]` heading.
   - Builds **wheel** and **sdist**, creates or updates the GitHub Release, and uploads artifacts.

You can also publish a GitHub Release from the UI for an existing tag; the workflow runs on `release: published` as well.

## Downstream: pin a core release

Use the **same tag everywhere** you depend on core:

- **Git submodule or checkout:** `git fetch --tags && git checkout vX.Y.Z` in the `ambient-core` path.
- **Pip from git:** `ambient-core @ git+https://github.com/Ambient-Team/ambient-core.git@vX.Y.Z`
- **Built wheel:** download the wheel from the GitHub Release for that tag and `pip install ambient_core-X.Y.Z-py3-none-any.whl` (verify hash in your supply chain process).

Then re-run consumer CI (contract validation, `ambient-catalog-generate --check`, tests). Details: [INTEGRATING.md](INTEGRATING.md) and [CONTRIBUTING.md — Consumer follow-up](CONTRIBUTING.md#consumer-follow-up-after-a-release).

## First release note

This repository already has git tags through **`v0.3.7`**, while `ambient_contracts.__version__` is still **`0.3.0`**. Those older tags were cut before tag/package alignment was enforced.

After this release automation merges:

1. Open a version PR that sets `__version__` to the next semver you want (for example **`0.3.8`** if platform should move past `v0.3.7`), with a matching `CHANGELOG.md` section.
2. Merge, then push a **new** tag `v0.3.8` (do not reuse an existing tag name).

Tags and `__version__` must agree for every release the workflow builds.
