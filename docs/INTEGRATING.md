# Integrating a tagged release

Use this when you embed **ambient-core** in a monorepo, fork, or product application. There is **one** canonical tree: a tagged release of **this** repository. All updates to contracts, catalog, Maestro, and shared pipeline code happen here first.

Scope: [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md).

## 1. Pick a version

Choose a release tag `vX.Y.Z` from this repo’s **Releases** (or tags). Record the same tag everywhere you depend on core (pip, submodule, container build args).

## 2. Python install (required for CLIs and libraries)

```bash
pip install "ambient-core[inference,postgres] @ git+<repository-url>@vX.Y.Z"
```

Replace `<repository-url>` with the HTTPS git URL of **this** repository (or your fork if you maintain one). Extras: `inference`, `pipeline`, `postgres`, `dev`, `all` — see [USAGE.md](USAGE.md).

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
validate-inference-registry
validate-agent-config
ambient-catalog-generate --check
pytest   # optional; Spark tests need Java and AMBIENT_SPARK_TESTS=1
```

Run your application repository’s CI as well.

## 6. Upgrade loop

1. Merge changes in **this** repository; tag `vX.Y.Z` on `main`.
2. In each consumer repo:
   - Bump `ambient-core @ git+…@vX.Y.Z` in dependency files (and any Maestro image build arg).
   - `cd ambient-core && git fetch --tags && git checkout vX.Y.Z`.
   - Set `AMBIENT_CORE_ROOT` in CI if used.
3. Regenerate catalog if YAML changed: `ambient-catalog-generate` (or a thin wrapper script in the consumer).
4. Run consumer CI; merge.

## Appendix A — Consumer checklist (after a core release)

- [ ] Dependency pin — `ambient-core[…] @ git+…@vX.Y.Z` matches the new tag.
- [ ] Submodule — `ambient-core/` checked out at the **same** tag SHA; parent commit records the pointer.
- [ ] Container builds — Maestro or core clone args use the same tag if applicable.
- [ ] CI — `AMBIENT_CORE_ROOT` (and catalog/contracts dirs) set before contract/catalog validation.
- [ ] Agents — `validate-agent-config` if you fork profiles or tools; worker hardening per [agent-security.md](agent-security.md).
- [ ] No mirrors — no `contracts/*.yaml` or `catalog/manifest.json` outside the `ambient-core/` checkout (stub README pointers are fine).
- [ ] Catalog JS — import from `ambient-core/catalog/runtime/` (single bridge module in the app is a common pattern).
- [ ] Notebooks and jobs — resolve contracts under `ambient-core/contracts/`.
- [ ] Pipeline — shared modules from `ambient-core/lib`; app-only glue stays in the consumer repo.

Follow-up details: [CONTRIBUTING.md](CONTRIBUTING.md#consumer-follow-up-after-a-release).

## Appendix B — Maestro

- **Source** — `lib/ambient_inference/`, `services/maestro/` in this repo only.
- **Consumer** — HTTP client, Compose, env config in the application repo; do not fork orchestration logic into UI tiers.

See [inference-layer.md](inference-layer.md).

## Appendix C — Agents

- **Source** — `lib/ambient_agent/`, `tool_definitions.yaml`, `agent_profiles.yaml` in this repo only.
- **Consumer** — call `run_plan_execute(profile_id=..., user_message=..., context=AgentRunContext(...))` from a backend worker; register tenant tools with `register_tool()` at process startup.
- **Config** — run `validate-agent-config` in CI after profile or tool changes.
- **Maestro** — set `MAESTRO_URL` (default `http://127.0.0.1:8088`) and `AMBIENT_MAESTRO_API_KEY` when the service requires auth.
- **Docs** — [AGENTS.md](AGENTS.md), [governed-data.md](governed-data.md), [agent-security.md](agent-security.md).
