# Security Policy

**Ambient Core** is an MIT library and schema foundation (contracts, catalog, governance). Report security issues **in this codebase** here; deployment and tenant isolation for a specific product are out of scope unless the flaw is in shipped library defaults in this tree.

## Supported versions

Security fixes are applied to the latest tagged release on `main`. Older tags are not backported unless a critical issue warrants it.

## Reporting a vulnerability

If you discover a security issue in **this repository** (for example credential leakage in examples, unsafe defaults in library code, or a dependency concern):

1. Prefer **GitHub Security Advisories** for this repository (private disclosure).
2. If Advisories are unavailable, open a private channel with the maintainers or use the repository contact listed in the GitHub organization profile.

Do not open a public issue with exploit details for unfixed vulnerabilities.

Please include:

- Affected package or path (for example `ambient_contracts`, `contracts/*.yaml`)
- Steps to reproduce
- Impact assessment (confidentiality, integrity, availability)

## Scope notes

This repo does not host live multi-tenant applications or cloud workspaces. Reports about production tenant isolation or cloud configuration should go to the **repository that deploys** those services, in addition to any issue in library code defined here.

Operator AI tools (Cursor Agent / IDE) used by maintainers are not Ambient Core product surfaces.
