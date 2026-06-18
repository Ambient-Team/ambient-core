# Ambient Core

MIT **open foundation** for Ambient Systems: vendor-neutral **data-product contracts**, reference **catalog**, **governance** helpers (ISO 8000 / BCBS 239), **Maestro** inference (`ambient_inference`), shared **pipeline** primitives, and a placeholder **agent** extension point. You can use this repository without the production SaaS platform.

## Ecosystem

Three repositories share one product story; **this repo owns open contracts and catalog semantics**.

- **[ambient-systems](https://github.com/Ambient-Team/ambient-systems)** — private documentation vault (strategy, roadmap, master docs, finance/legal). Lane 1 intent.
- **[ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform)** — production SaaS (React/Firebase OLTP, Databricks OLAP, deploy, platform CI). Lane 2 execution; **consumes** ambient-core via pip git tag and/or submodule at `ambient-core/`.
- **ambient-core** (here) — open packages, contract YAML SSOT, catalog generator, Maestro library and service skeleton.

Full map: [docs/ECOSYSTEM.md](docs/ECOSYSTEM.md).

- **Using without the platform** — [docs/USAGE.md](docs/USAGE.md)
- **Core vs platform** — [docs/CORE_VS_PLATFORM.md](docs/CORE_VS_PLATFORM.md)
- **Contributing** — [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

## Business context

Ambient Systems builds a **governed medallion data platform** for **FP&A and operational intelligence** in asset-heavy, regulated industries—contract-backed Gold products, not a dashboard layer. **Solutions Flux D'IA Inc.** (Quebec) develops and operates the live platform; **Ambient Systems Limited** (Hong Kong) is the corporate/IP vehicle. Commercial activity is **frozen**; the stack is maintained as a technical moat.

## Where to read next

- [docs/USAGE.md](docs/USAGE.md) — integrator quick start without the platform repo
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

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and contributor expectations.

## License

MIT — [LICENSE](LICENSE).
