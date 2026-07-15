# Ambient Core

[![CI](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Ambient-Team/ambient-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10--3.12-blue.svg)](https://www.python.org/downloads/)

**Governed data products — MIT foundation.**

Versioned **contracts**, a reference **catalog**, and lakehouse **governance** helpers. Built for teams that need medallion-style discipline without embedding product AI or third-party model orchestration in the open core.

Use this repo on its own, as a library, or pinned inside a larger product ([INTEGRATING.md](docs/INTEGRATING.md)).

## Why this exists

- **Contract-first Gold products** — YAML schemas define what “done” means for analytics outputs, not ad hoc tables in a warehouse UI.
- **Catalog + contracts stay separate** — reference KPIs and industries do not collide with governed data-product interfaces.
- **Governance you can import** — provenance, PII handling, Silver validation, and catalog mapping as reusable Python modules.

## Who it's for

- **Data platform engineers** building Bronze → Gold pipelines with explicit product contracts.
- **FP&A and ops analytics teams** in regulated, asset-heavy domains who want shared metric semantics.
- **Integrators** shipping governed lakehouses or internal tools who need a canonical contracts/catalog layer.
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

Pin a release from another project: [docs/INTEGRATING.md](docs/INTEGRATING.md). More recipes: [docs/USAGE.md](docs/USAGE.md).

## What's in the box

- **`contracts/`** — data-product YAML (SSOT; bundled for wheels). Product inventory and how catalog mapping ties to Silver/Gold: [contracts/README.md](contracts/README.md).
- **`catalog/`** — industries, metrics, benchmarks; typed data-option fields and manifest **v3**; each pack tagged with ISIC, GICS, NAICS, and NACE; generator → `manifest.json` + `runtime/` JS. Field sync and coverage: [docs/catalog-input-field-gaps.md](docs/catalog-input-field-gaps.md), [docs/catalog-consumption.md](docs/catalog-consumption.md). Global taxonomy roadmap: [docs/catalog-industry-coverage.md](docs/catalog-industry-coverage.md).
- **`lib/ambient_pipeline/`** — governance primitives for Spark/lakehouse jobs.
- **`lib/ambient_contracts`**, **`ambient_cli`** — load, validate, and ship.
- **`lib/ambient_calc`** — open-source reference calculator: safe formula evaluation from contract inputs to metric values, shared across all industries.

Layout and packages: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Scope rules: [docs/CANONICAL_SCOPE.md](docs/CANONICAL_SCOPE.md).

This repository does **not** ship customer-facing AI, model hosting, or inference orchestration. Operator AI tooling (for example Cursor Agent in IDE sessions) is internal engineering practice, not an Ambient Core product.

## Documentation

Full map: **[docs/README.md](docs/README.md)**.

- **Start** — [USAGE.md](docs/USAGE.md)
- **Embed a release** — [INTEGRATING.md](docs/INTEGRATING.md)
- **Governed data** — [governed-data.md](docs/governed-data.md) (catalog + contracts)
- **Pipeline helpers** — [pipeline.md](docs/pipeline.md)
- **Conventions** — [CONVENTIONS.md](docs/CONVENTIONS.md) (catalogue/contract naming, core layer, calculation spec, data formats and storage)
- **Positioning** — [POSITIONING.md](docs/POSITIONING.md)
- **Components & releases** — [ECOSYSTEM.md](docs/ECOSYSTEM.md)

## Community

- **Questions and bugs** — [GitHub Issues](https://github.com/Ambient-Team/ambient-core/issues) (search before opening a duplicate).
- **Security** — [SECURITY.md](SECURITY.md) (use Security Advisories for sensitive reports).
- **Contributing** — [CONTRIBUTING.md](docs/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- **Releases** — [GitHub Releases](https://github.com/Ambient-Team/ambient-core/releases) / tags `vX.Y.Z`.

### Support the project

Open source grows when people **use it, star it, file good issues, and send focused PRs**. If this saves you time in a regulated analytics stack, consider starring the repo and contributing contracts or catalog packs. GitHub Sponsors can be enabled on the maintainer profile when available—there is no separate paid product tied to this repository.

## License

MIT — see [LICENSE](LICENSE).
