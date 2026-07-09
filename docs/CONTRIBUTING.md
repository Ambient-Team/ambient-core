# Contributing to ambient-core

## Scope

This repository is **open and reusable** without the Ambient SaaS platform. Put foundational, general-purpose assets here:

- Data-product **contracts** (`contracts/`)
- **Catalog** YAML and generator output (`catalog/`)
- **Governance** helpers (`lib/ambient_pipeline/` — validation, provenance, catalog rules)
- **Inference** (`lib/ambient_inference/`, `services/maestro/`)
- **Agent** extension point (`lib/ambient_agent/`)
- **CLI** entrypoints (`validate-contracts`, `ambient-catalog-generate`, etc.)

SaaS-only UI, Firebase, Databricks deploy bindings, and commercial plans stay in [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform).

## Development setup

```bash
git clone https://github.com/Ambient-Team/ambient-core.git
cd ambient-core
py -3.12 -m venv .venv
pip install -e ".[all]"
validate-contracts
pytest
```

## Contract changes

1. Edit YAML under `contracts/`.
2. Copy to bundled package data: `cp contracts/*.yaml lib/ambient_contracts/bundled/` (CI enforces sync).
3. Run `validate-contracts`.

## Catalog changes

1. Edit YAML under `catalog/`.
2. Run `ambient-catalog-generate` (or `python scripts/generate_reference_catalog.py`).
3. Run `ambient-catalog-generate --check` before pushing.

## Releases

Tag `vX.Y.Z` on `main`; bump the git pin in ambient-systems-platform `pyproject.toml` and `docker/maestro.Dockerfile`.
