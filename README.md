# Ambient Core

[![CI](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)

**Governed data products and headless AI—in one MIT foundation.**

Versioned **contracts**, a reference **catalog**, lakehouse **governance** helpers, and **Maestro** (OpenAI-compatible inference with routing and model council). Built for teams that need medallion-style discipline and open-weight LLMs without baking intelligence into every UI.

Use this repo on its own, as a library, or pinned inside a larger product ([INTEGRATING.md](docs/INTEGRATING.md)).

## Why this exists

- **Contract-first Gold products** — YAML schemas define what “done” means for analytics outputs, not ad hoc tables in a warehouse UI.
- **Catalog + contracts stay separate** — reference KPIs and industries do not collide with governed data-product interfaces.
- **Governance you can import** — provenance, PII handling, Silver validation, and catalog mapping as reusable Python modules.
- **Maestro as a service** — registry, router, and council orchestration behind a small HTTP API; clients stay thin.

## Who it's for

- **Data platform engineers** building Bronze → Gold pipelines with explicit product contracts.
- **FP&A and ops analytics teams** in regulated, asset-heavy domains who want shared metric semantics.
- **Integrators** shipping governed lakehouses or internal tools who need a canonical contracts/catalog/Maestro layer.
- **Contributors** who care about open, inspectable foundations rather than black-box SaaS bundles.

## Quick start

```bash
git clone https://github.com/Ambient-Team/ambient-core.git
cd ambient-core
py -3.12 -m venv .venv
# Windows: .venv\Scripts\activate
pip install -e ".[all]"
validate-contracts
ambient-catalog-generate --check
pytest
```

**Maestro locally** (optional):

```bash
pip install -e ".[inference,dev]"
uvicorn main:app --app-dir services/maestro --reload --port 8088
```

Pin a release from another project: [docs/INTEGRATING.md](docs/INTEGRATING.md). More recipes: [docs/USAGE.md](docs/USAGE.md).

## What's in the box

- **`contracts/`** — data-product YAML (SSOT; bundled for wheels).
- **`catalog/`** — industries, metrics, benchmarks; generator → `manifest.json` + `runtime/` JS.
- **`lib/ambient_pipeline/`** — governance primitives for Spark/lakehouse jobs.
- **`lib/ambient_inference/`** + **`services/maestro/`** — inference library and FastAPI service.
- **`lib/ambient_contracts`**, **`ambient_cli`**, **`ambient_agent`** (extension point) — load, validate, and ship.

Layout and packages: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Scope rules: [docs/CANONICAL_SCOPE.md](docs/CANONICAL_SCOPE.md).

## Documentation

Full map: **[docs/README.md](docs/README.md)**.

- **Start** — [USAGE.md](docs/USAGE.md)
- **Embed a release** — [INTEGRATING.md](docs/INTEGRATING.md)
- **Positioning** — [POSITIONING.md](docs/POSITIONING.md)
- **Components & releases** — [ECOSYSTEM.md](docs/ECOSYSTEM.md)
- **Maestro** — [inference-layer.md](docs/inference-layer.md)

## Community

- **Questions and bugs** — [GitHub Issues](https://github.com/Ambient-Team/ambient-core/issues) (search before opening a duplicate).
- **Security** — [SECURITY.md](SECURITY.md) (use Security Advisories for sensitive reports).
- **Contributing** — [CONTRIBUTING.md](docs/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- **Releases** — [GitHub Releases](https://github.com/Ambient-Team/ambient-core/releases) / tags `vX.Y.Z`.

### Support the project

Open source grows when people **use it, star it, file good issues, and send focused PRs**. If this saves you time in a regulated analytics stack, consider starring the repo and contributing contracts, catalog packs, or Maestro improvements. GitHub Sponsors can be enabled on the maintainer profile when available—there is no separate paid product tied to this repository.

## License

MIT — see [LICENSE](LICENSE).
