# Integrating ambient-core (canonical import)

Use this when you embed **ambient-core** in a monorepo, fork, or product repo (including [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)). There is **one** canonical tree: a tagged release of this repository. All updates to contracts, catalog, Maestro, and shared pipeline code happen here first.

Scope of what core owns: [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## 1. Pick a version

Choose a release tag from [ambient-core tags](https://github.com/Ambient-Team/ambient-core/tags), for example `v0.2.1`. Record the same tag everywhere you depend on core (pip, submodule, Docker).

## 2. Python install (required for CLIs and libraries)

```bash
pip install "ambient-core[inference,postgres] @ git+https://github.com/Ambient-Team/ambient-core.git@vX.Y.Z"
```

Extras: `inference`, `pipeline`, `postgres`, `dev`, `all` — see [USAGE.md](USAGE.md).

Editable install for core development:

```bash
git clone https://github.com/Ambient-Team/ambient-core.git
cd ambient-core
pip install -e ".[all]"
```

## 3. Full tree (catalog JS, on-disk contracts, pipeline tests)

For repos that import `catalog/runtime/*.js` or run validation against checkout paths:

```bash
git submodule add https://github.com/Ambient-Team/ambient-core.git ambient-core
cd ambient-core
git fetch --tags
git checkout vX.Y.Z   # detached HEAD at release tag
cd ..
git add ambient-core
```

Do **not** track `branch = main` on the submodule if you require reproducible builds; pin the tag SHA in the parent commit.

## 4. Environment variables (monorepo)

When the parent repo is not the core repo root, point tools at the submodule:

```bash
export AMBIENT_CORE_ROOT="$PWD/ambient-core"
export AMBIENT_CONTRACTS_DIR="$PWD/ambient-core/contracts"
export AMBIENT_CATALOG_DIR="$PWD/ambient-core/catalog"
```

Use these in CI before `validate-contracts` and `ambient-catalog-generate --check` so validation uses the same files as the submodule, not only wheel bundled data.

## 5. Verify after import or upgrade

From the core checkout (submodule or clone):

```bash
validate-contracts
validate-inference-registry
ambient-catalog-generate --check
pytest   # optional; Spark tests need Java and AMBIENT_SPARK_TESTS=1
```

In the consumer repo, run that project's CI (platform: `docs/testing.md`).

## 6. Upgrade loop

1. Merge changes in **ambient-core**; tag `vX.Y.Z` on `main`.
2. In the consumer repo:
   - Bump `ambient-core @ git+…@vX.Y.Z` in `pyproject.toml` (and any Docker Maestro build arg).
   - `cd ambient-core && git fetch --tags && git checkout vX.Y.Z`.
   - Set `AMBIENT_CORE_ROOT` in CI if used.
3. Regenerate catalog if YAML changed: `ambient-catalog-generate` (or consumer wrapper script).
4. Run consumer CI; merge.

## Appendix A — ambient-systems-platform checklist

After a core release:

- [ ] `pyproject.toml` — `ambient-core[…] @ git+…@vX.Y.Z` (`core` / `inference` extras).
- [ ] `ambient-core/` submodule — checkout **same** tag SHA; commit parent pointer.
- [ ] `docker/` Maestro image — pin same tag if applicable.
- [ ] CI — `AMBIENT_CORE_ROOT=${{ github.workspace }}/ambient-core` (or equivalent) before contract/catalog validation.
- [ ] No `contracts/*.yaml` or `catalog/manifest.json` outside `ambient-core/` (stub READMEs only at former root paths).
- [ ] App imports catalog JS from `ambient-core/catalog/runtime/` only (`src/platform/referenceCatalog.js`).
- [ ] OLAP notebooks resolve contracts under `ambient-core/contracts/`.
- [ ] Shared `ambient_pipeline` modules come from `ambient-core/lib`; platform keeps only `olap/lib/ambient_pipeline` glue.

Platform follow-up details: [CONTRIBUTING.md](CONTRIBUTING.md#platform-follow-up-after-core-merge).

## Appendix B — Maestro

- **Source** — `lib/ambient_inference/`, `services/maestro/` in core only.
- **Consumer** — HTTP client, Docker Compose, env config in the product repo; no fork of orchestration logic.

See [inference-layer.md](inference-layer.md).
