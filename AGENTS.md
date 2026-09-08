# AGENTS

Repository-wide guidance for AI agents working on this codebase (operator tooling such as Cursor Agent / IDE Auto). This repository does not ship customer-facing AI, inference services, or model orchestration.

## Open source

This repository is **Ambient Core**, fully **open source** (not an open-core product).

- The **MIT License** is the usage license that governs how the software may be used: use, copy, modify, merge, publish, and distribute, including commercially, provided the copyright notice and license text are included. It is not a university or program brand.
- Prefer: "Ambient Core is open source under the MIT License." Never write "open core". Never write "Ambient Core (MIT)", "MIT Ambient Core", or "MIT open core".
- Commercial platform features live in a separate repository. That split does not make this repo open-core.

## Product AI boundary

- **Customer / product AI:** none in Ambient Core. No Maestro, no open-weight hosting, no agent runtime for end users, no re-sale of third-party models.
- **Internal AI only:** Cursor Agent / IDE (and CI Cursor SDK heal where configured) for maintainers editing this repo.
- **Future proprietary AI/ML:** if revived, lives in the commercial platform application — never in this repository, and never as commodity model resale. Do not invent product AI features here.

## Cursor Cloud specific instructions

Ambient Core is a Python foundation library (contracts, catalog, pipeline governance). There is no GUI/web frontend and no runnable inference service; everything is validated via CLIs and `pytest`.

### Environment

- Dependencies are installed by the startup update script into a virtualenv at `.venv` (the base image also has the `python3.12-venv` apt package). Activate it before running anything: `source .venv/bin/activate`. The system Python only exposes `python3`; the `python` command comes from the venv.
- Java (JDK 21) is preinstalled and works for the PySpark 3.5 pipeline tests even though CI pins Java 17.

### Lint / validate

- The repo has no formatter/linter; "lint" is the set of CI validation scripts. Run the exact commands listed under the `python:` job in `.github/workflows/ci.yml` (e.g. `validate-contracts`, `python scripts/harden_catalog_data_options.py --check`, `python scripts/generate_reference_catalog.py --check --strict-data-option-inputs`, and the `scripts/check_*.py` checks).
- Markdown must not use pipe tables — `scripts/check_markdown_prose.py` enforces this (see `.cursor/rules/markdown-prose.mdc`).

### Test

- Run `pytest` (config lives in `pyproject.toml`).
- To match CI, run PySpark pipeline tests with `AMBIENT_SPARK_TESTS=1 pytest`.
