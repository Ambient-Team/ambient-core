# Security Policy

**Ambient Core** is an open-source library under the MIT License (contracts, catalog, calculations, and pipeline helpers). Report security issues in this codebase. Deployment choices in a consuming application are out of scope unless the flaw is in library defaults shipped here.

## Supported versions

Security fixes are applied to the latest tagged release on `main`. Older tags are not backported unless a critical issue warrants it.

## Reporting a vulnerability

If you discover a security issue in **this repository** (for example credential leakage in examples, unsafe defaults in library code, or a dependency concern):

1. Open a private security advisory with the repository maintainers. The issue-template contact list points at that form.
2. Do not open a public issue with exploit details for an unfixed vulnerability.

Please include:

- Affected package or path (for example `ambient_contracts`, `contracts/*.yaml`)
- Steps to reproduce
- Impact assessment (confidentiality, integrity, availability)

## Scope notes

This repository does not host live multi-tenant applications. Reports about a deployed service should go to the repository that runs that service, in addition to any issue in library code defined here.

Operator AI tools used by maintainers are not Ambient Core product surfaces.
