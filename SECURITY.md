# Security

**ambient-core** is the public MIT open-source foundation for Ambient Systems (contracts, catalog, governance helpers, Maestro inference). Platform runtime security (Unity Catalog RLS, masking, multi-tenant isolation in production) is implemented in [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform) and described in the private [ambient-systems](https://github.com/Ambient-Team/ambient-systems) documentation vault—not in this repository.

## Supported versions

Security fixes are applied on the **`main`** branch and released via git tags (`vX.Y.Z`). The production platform pins a specific tag in its `pyproject.toml`; upgrade the pin after taking a new core release.

## Reporting a vulnerability

If you discover a security issue in **this repository** (for example credential leakage in examples, unsafe defaults in the Maestro service, or a dependency concern):

1. **Do not** open a public GitHub issue with exploit details.
2. Use [GitHub Security Advisories](https://github.com/Ambient-Team/ambient-core/security/advisories) for this repository, or the maintainer contact on their GitHub profile.
3. If credentials were committed, rotate them immediately after confirmation.

We will acknowledge reports in a reasonable timeframe and coordinate a fix and disclosure.

## Expectations for contributors

- Never commit secrets, API keys, tokens, or production connection strings. Use local `.env` files (gitignored).
- Run `validate-contracts` and tests before pushing; CI mirrors the same gates.
- Local Repomix packs use `enableSecurityCheck` in `repomix.config.json`; do not disable it to bypass secret scanning.
- Treat `.env.example` and synthetic fixtures as non-production; do not place real tenant data in the repo.

## Scope

This repo does not host the Firebase app, Databricks workspaces, or live infrastructure. Reports about production tenant isolation or cloud configuration belong in **ambient-systems-platform** (same GitHub contact pattern) when that repo is public, or via Issues/Advisories on the repo that hosts the deployment.
