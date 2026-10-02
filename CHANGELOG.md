# Changelog

All notable changes to **ambient-core** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions release workflow (tag `vX.Y.Z` on `main`) that runs CI checks, verifies the tag matches package metadata, builds wheel and sdist artifacts, and attaches them to the GitHub Release.
- [docs/RELEASING.md](docs/RELEASING.md) for maintainers and downstream integrators.

## [0.3.0] - 2026-10-02

Baseline semver release for integrators (for example **ambient-systems-platform**) that pin a single git tag for contracts, catalog, and shared pipeline code.

### Added

- Governed data-product **contracts** (`contracts/`, bundled under `lib/ambient_contracts/bundled/`).
- Reference **catalog** with industry packs, manifest generation, and validation scripts.
- **ambient_pipeline**, **ambient_calc**, and **ambient_cli** packages installable from this tree.
- CI validation for contracts, catalog, naming, formulas, PHI policy, and PySpark pipeline tests.

[Unreleased]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/Ambient-Team/ambient-core/releases/tag/v0.3.0
