# Changelog

All notable changes to **ambient-core** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.11] - 2026-11-27

### Added

- Spark pipeline **E2E golden** tests (stubbed and real-PII paths), `metric_id`-based Real Estate gold pivot, and Silver/Gold **PII output guards**.
- **`AMBIENT_PII_SALT` runtime policy** for `PiiPseudonymizer` (blocks missing, empty, or golden test salt outside pytest / `AMBIENT_SPARK_TESTS=1`); `.env.example` placeholder and pipeline docs.
- **Structured pipeline logging** (`log_pipeline_event`) and generated **`lib/README.md`** API index (`generate_lib_readme.py --check` in CI).
- **Quality-static gates:** public API docstring check, vulture dead-code pass, golden PII fixture reference scan, sensitive-literal scan (emails, phones, personal paths), doc link check, secret-shaped token scan for `lib/` and `scripts/`.
- **`lib/ambient_pipeline/` coverage floor** (95% lines / 95% branches) in `check_coverage.py`.
- PEP 561 **`py.typed`** markers; mypy strict on core and support paths; broad lib branch/edge test coverage.

### Changed

- Release version **0.3.11** (tag **`v0.3.11`**) because **`v0.3.10`** was already tagged on an earlier commit; Cut release cannot reuse that name. See [docs/MONTHLY-RELEASE.md](docs/MONTHLY-RELEASE.md).
- Local Spark runner gold pivot prefers stable **`metric_id`** when present so display `name` can be pseudonymized in Silver.
- README quickstart documents Java 17, contracts bundle sync, and PII salt requirements.

### Fixed

- Colab bootstrap / secrets branch coverage gaps; gold transform and runner edge cases covered by tests.

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

[Unreleased]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.11...HEAD
[0.3.11]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.10...v0.3.11
[0.3.10]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.8...v0.3.10
[0.3.8]: https://github.com/Ambient-Team/ambient-core/compare/v0.3.0...v0.3.8
[0.3.0]: https://github.com/Ambient-Team/ambient-core/releases/tag/v0.3.0
