# Security

**Ambient Core** is an MIT library and schema foundation (contracts, catalog, governance, Maestro). Report security issues **in this codebase** here; deployment and tenant isolation for a specific product are out of scope unless the flaw is in shipped library or service defaults in this tree.

## Supported versions

Security fixes are applied on the **`main`** branch and released via git tags (`vX.Y.Z`). Downstream projects should upgrade their pin after taking a new release.

## Reporting a vulnerability

If you discover a security issue in **this repository** (for example credential leakage in examples, unsafe defaults in the Maestro service, or a dependency concern):

1. **Do not** open a public GitHub issue with exploit details.
2. Use **GitHub Security Advisories** for this repository, or the maintainer contact on their GitHub profile.
3. If credentials were committed, rotate them immediately after confirmation.

We will acknowledge reports in a reasonable timeframe and coordinate a fix and disclosure.

## Expectations for contributors

- Never commit secrets, API keys, tokens, or production connection strings. Use local `.env` files (gitignored).
- Run `validate-contracts` and tests before pushing; CI mirrors the same gates.
- Local Repomix packs use `enableSecurityCheck` in `repomix.config.json`; do not disable it to bypass secret scanning.
- Treat `.env.example` and synthetic fixtures as non-production; do not place real tenant data in the repo.

## Scope

This repo does not host live multi-tenant applications or cloud workspaces. Reports about production tenant isolation or cloud configuration should go to the **repository that deploys** those services, in addition to any issue in the Maestro or library code defined here.
