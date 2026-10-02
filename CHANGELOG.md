# Changelog

All notable changes to **ambient-core** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.8] - 2026-10-02

### Added

- GitHub Actions **Release** workflow on tag `vX.Y.Z` that runs CI checks, verifies the tag matches package metadata, builds wheel and sdist artifacts, and attaches them to the GitHub Release.
- **Cut release** workflow (`workflow_dispatch`) for owners without local git: validates version and CHANGELOG on `main`, pushes the annotated tag, then invokes Release (GITHUB_TOKEN tag pushes do not trigger tag workflows).
- [docs/RELEASING.md](docs/RELEASING.md) for maintainers and downstream integrators.

## [0.3.0] - 2026-10-02

Baseline semver release for integrators (for example **ambient-systems-platform**) that pin a single git tag for contracts, catalog, and shared pipeline code.

### Added

- Governed data-product **contracts** (`contracts/`, bundled under `lib/ambient_contracts/bundled/`).
- Reference **catalog** with industry packs, manifest generation, and validation scripts.
- **ambient_pipeline**, **ambient_calc**, and **ambient_cli** packages installable from this tree.
- CI validation for contracts, catalog, naming, formulas, PHI policy, and PySpark pipeline tests.

[Unreleased]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.8...HEAD
[0.3.8]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.0...v0.3.8
[0.3.0]: https://github.com/Ambient-Team/ambient-core/releases/tag/v0.3.0
