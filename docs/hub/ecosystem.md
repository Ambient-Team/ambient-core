# Ecosystem slice (ambient-core)

Spoke id: core. Full map on hub: https://github.com/EngineerID/ambient-systems/blob/main/company/strategy/governance/ecosystem-map.md

## This repository

- GitHub: Ambient-Team/ambient-core
- Class: execution (contracts SSOT)
- Local: C:/GitHub/ambient-core

## Hub dispatch to this spoke

- Rules: strategy-platform-intent
- Hub path prefixes: company/strategy/, company/strategy/backlog/
- Event: ambient_hub_sync via .github/workflows/hub-receiver.yml

## What hub-sync copies today

- Hub MAPPING.md to docs/hub/upstream-mapping.md
- Hub company/strategy/03_data-product-contracts.md to docs/hub/data-product-contracts-intent.md
- Hub company/strategy/governance/ecosystem-map.md to docs/hub/ecosystem-map-intent.md

## Where to edit

- Contract and catalog YAML, shared libraries: this repo.
- Doctrine prose and backlog intent: hub vault; mirrors here are reference only.
- Platform integration: ambient-systems-platform submodule pin after tagged core release.

## Siblings

- ambient-systems-platform — consumes this repo via submodule pin.
- Hub vault — strategy and contracts prose that informs catalog work.

## Branching and CI

See docs/hub/branching.md. Require workflow CI job python green on hub-sync PRs before merge.

*Hand-maintained slice; align with hub-receiver.yml fetch steps.*
