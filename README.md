# Ambient Core

MIT **open foundation** for Ambient Systems: vendor-neutral **data-product contracts**, reference **catalog**, **governance** helpers (ISO 8000 / BCBS 239), **Maestro** inference (`ambient_inference`), shared **pipeline** primitives, and a placeholder **agent** extension point. You can use this repository without the production SaaS platform.

**Canonical scope:** contracts, catalog, Maestro, and shared pipeline governance live **only** in this repo ([docs/CANONICAL_SCOPE.md](docs/CANONICAL_SCOPE.md)). Consumers pin a git tag and import via pip and/or submodule ([docs/INTEGRATING.md](docs/INTEGRATING.md)).

## Ecosystem

Three repositories share one product story; **this repo owns open contracts and catalog semantics**.

- **[ambient-systems](https://github.com/Ambient-Team/ambient-systems)** — private documentation vault (strategy, roadmap, master docs, finance/legal). Lane 1 intent.
- **[ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)** — production SaaS (React/Firebase OLTP, Databricks OLAP, deploy, platform CI). Lane 2 execution; **consumes** ambient-core via pip git tag and/or submodule at `ambient-core/`.
- **ambient-core** (here) — open packages, contract YAML SSOT, catalog generator, Maestro library and service skeleton.

Full map: [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md).

- **Using without the platform** — [docs/USAGE.md](docs/USAGE.md)
- **Core vs platform** — [docs/CORE_VS_PLATFORM.md](docs/CORE_VS_PLATFORM.md)
- **Contributing** — [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

## Purpose and open priorities

**ambient-core** is the reusable, inspectable foundation (contracts, catalog, governance, Maestro). **[ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)** is the production implementation: it depends on core via pip git tag and/or submodule, and adds UI, Firebase, Databricks, multi-tenancy, and deploy.

Highest-value open work, in order:

1. **`contracts/`** — foundational single source of truth for data-product schemas (neutral, versioned YAML).
2. **Maestro** (`lib/ambient_inference/` + `services/maestro/`) — headless OpenAI-compatible inference, routing, and council orchestration.
3. **`lib/ambient_pipeline/`** — governance primitives (provenance, PII pseudonymization, Silver validation, catalog mapping); some platform-specific code still lives under platform `olap/lib/ambient_pipeline` during migration.
4. **`catalog/`** — reference metrics, benchmarks, and industries (mature; lower urgency than contracts and Maestro).

Component table, how the stack fits together, and where to open PRs: [docs/ECOSYSTEM.md — Purpose and platform connection](docs/ECOSYSTEM.md#purpose-and-platform-connection).

## Business context

Ambient Systems builds a **governed medallion data platform** for **FP&A and operational intelligence** in asset-heavy, regulated industries—contract-backed Gold products, not a dashboard layer. **Solutions Flux D'IA Inc.** (Quebec) develops and operates the live platform; **Ambient Systems Limited** (Hong Kong) is the corporate/IP vehicle. Commercial activity is **frozen**; the stack is maintained as a technical moat.

## Where to read next

- [docs/USAGE.md](docs/USAGE.md) — integrator quick start without the platform repo
- [docs/INTEGRATING.md](docs/INTEGRATING.md) — pin and import a tagged release (monorepos, platform)
- [docs/CANONICAL_SCOPE.md](docs/CANONICAL_SCOPE.md) — what belongs only in core
- [docs/CORE_VS_PLATFORM.md](docs/CORE_VS_PLATFORM.md) — what runs here vs production SaaS
- [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md) — three-repo responsibilities and release flow
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Python packages and layer boundary
- [ambient-systems-platform ARCHITECTURE.md](https://github.com/Ambient-Team/ambient-systems-platform/blob/main/ARCHITECTURE.md) — full platform layers
- Private vault clone: `master/05_executive-summary.md` — technical executive summary

## Install

```bash
pip install -e ".[all]"
# minimal + inference only:
pip install -e ".[inference,dev]"
```

## Layout

- **`contracts/`** — neutral data-product YAML (source of truth; mirrored under `lib/ambient_contracts/bundled/` for wheels)
- **`catalog/`** — reference catalog YAML, schemas, generated `runtime/` + `manifest.json`
- **`lib/ambient_contracts/`** — contract load + validate
- **`lib/ambient_pipeline/`** — catalog loaders, Silver validation, provenance, bronze mapping
- **`lib/ambient_inference/`** — Maestro library + packaged run contract
- **`lib/ambient_agent/`** — open agent runtime extension point (non-commercial)
- **`services/maestro/`** — FastAPI Maestro service
- **`docs/`** — ecosystem, architecture, layer manuals

## Commands

```bash
validate-contracts
validate-inference-registry
ambient-catalog-generate          # or: python scripts/generate_reference_catalog.py
ambient-catalog-generate --check
pytest
npx repomix@latest   # writes repomix-output.md (gitignored)
```

## Local Maestro

```bash
pip install -e ".[inference,dev,postgres]"
uvicorn main:app --app-dir services/maestro --reload --port 8088
```

See [docs/inference-layer.md](docs/inference-layer.md).

## Contact

Solo-maintained for now—no team inbox or mailing list. Use [GitHub Issues](https://github.com/Ambient-Team/ambient-core/issues) for questions and bugs. For security-sensitive reports, use [GitHub Security Advisories](https://github.com/Ambient-Team/ambient-core/security/advisories) (do not post exploit details in public issues). Other reach-out: the maintainer’s **GitHub profile contact** (email via GitHub when enabled).

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and contributor expectations.

## License

MIT — [LICENSE](LICENSE).
