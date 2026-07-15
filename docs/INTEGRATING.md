# Integrating a tagged release

Use this when you embed **ambient-core** in a monorepo, fork, or product application. There is **one** canonical tree: a tagged release of **this** repository. All updates to contracts, catalog, and shared pipeline code happen here first.

Scope: [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## 1. Pick a version

Choose a release tag `vX.Y.Z` from this repo’s **Releases** (or tags). Record the same tag everywhere you depend on core (pip, submodule, container build args).

## 2. Python install (required for CLIs and libraries)

```bash
pip install "ambient-core[pipeline,postgres] @ git+<repository-url>@vX.Y.Z"
```

Replace `<repository-url>` with the HTTPS git URL of **this** repository (or your fork if you maintain one). Extras: `pipeline`, `postgres`, `dev`, `all` — see [USAGE.md](USAGE.md).

Editable install for core development:

```bash
git clone <repository-url>
cd ambient-core
pip install -e ".[all]"
```

## 3. Full tree (catalog JS, on-disk contracts, pipeline tests)

For repos that import `catalog/runtime/*.js` or validate against checkout paths:

```bash
git submodule add <repository-url> ambient-core
cd ambient-core
git fetch --tags
git checkout vX.Y.Z   # detached HEAD at release tag
cd ..
git add ambient-core
```

Pin the submodule SHA in the parent commit; avoid tracking `branch = main` if you need reproducible builds.

## 4. Environment variables (monorepo)

When the parent repo is not the core repo root:

```bash
export AMBIENT_CORE_ROOT="$PWD/ambient-core"
export AMBIENT_CONTRACTS_DIR="$PWD/ambient-core/contracts"
export AMBIENT_CATALOG_DIR="$PWD/ambient-core/catalog"
```

Set these in CI before `validate-contracts` and `ambient-catalog-generate --check` so validation uses the submodule tree, not only wheel bundled data.

## 5. Verify after import or upgrade

From the core checkout (submodule or clone):

```bash
validate-contracts
ambient-catalog-generate --check
pytest   # optional; Spark tests need Java and AMBIENT_SPARK_TESTS=1
```

Run your application repository’s CI as well.

## 6. Upgrade loop

1. Merge changes in **this** repository; tag `vX.Y.Z` on `main`.
2. In each consumer repo:
   - Bump `ambient-core @ git+…@vX.Y.Z` in dependency files.
   - `cd ambient-core && git fetch --tags && git checkout vX.Y.Z`.
   - Set `AMBIENT_CORE_ROOT` in CI if used.
3. Regenerate catalog if YAML changed: `ambient-catalog-generate` (or a thin wrapper script in the consumer).
4. Run consumer CI; merge.

## Appendix A — Consumer checklist (after a core release)

- [ ] Dependency pin — `ambient-core[…] @ git+…@vX.Y.Z` matches the new tag.
- [ ] Submodule — `ambient-core/` checked out at the **same** tag SHA; parent commit records the pointer.
- [ ] CI — `AMBIENT_CORE_ROOT` (and catalog/contracts dirs) set before contract/catalog validation.
- [ ] No mirrors — no `contracts/*.yaml` or `catalog/manifest.json` outside the `ambient-core/` checkout (stub README pointers are fine).
- [ ] Authoring rules — read [CONVENTIONS.md](CONVENTIONS.md) before changing catalog keys, contract major versions, or ingestion formats; do not use binary spreadsheets or PDFs as SSOT in the consumer repo (extract to CSV/JSON/YAML at the boundary).
- [ ] Catalog JS — import from `ambient-core/catalog/runtime/` (single bridge module in the app is a common pattern).
- [ ] Notebooks and jobs — resolve contracts under `ambient-core/contracts/`.
- [ ] Pipeline — shared modules from `ambient-core/lib`; app-only glue stays in the consumer repo.

Follow-up details: [CONTRIBUTING.md](CONTRIBUTING.md#consumer-follow-up-after-a-release).

## Product work cycles (platform)

If you ship workflows on governed KPIs, pin ambient-core for catalog metrics, per-pack `benchmarks.yaml`, industry packs (`industryCodes`), `ambient_calc`, and contracts (`quality-v1`, `operational-financial-bridge-v1`, and others). Implement tenancy, UI, and cycle-specific logic in your application repository:

- **Benchmarking** — peer actuals, normalization, waterfalls, improvement; [benchmarking-lifecycle.md](benchmarking-lifecycle.md).
- **Assurance** — control packs, evidence, DQ and bridge reconciliation, attestation exports; [assurance-lifecycle.md](assurance-lifecycle.md).
- **Investor disclosure / fundraising** — mandate mapping, gap-to-requirement, data room; [investor-disclosure-lifecycle.md](investor-disclosure-lifecycle.md).
- **Planning and variance** — budgets, scenarios, variance bridges; [planning-variance-lifecycle.md](planning-variance-lifecycle.md).

Overview and metadata conventions: [work-cycles.md](work-cycles.md).
