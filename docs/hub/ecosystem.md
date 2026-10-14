# Ecosystem slice (ambient-core)

Spoke id: core. Full map on hub: https://github.com/EngineerID/ambient-systems/blob/main/company/strategy/governance/ecosystem-map.md

## This repository

- GitHub: Ambient-Team/ambient-core
- Class: execution (contracts SSOT)
- Local: C:/GitHub/ambient-core

## Hub dispatch to this spoke

- The hub receiver workflow is removed. `EngineerID/ambient-systems` is not available to this repo, the fetch paths failed, and the workflow required secrets `FETCH_AMBIENT_SYSTEMS` and `HUB_DISPATCH_AMBIENT_TEAM`.
- Files already under `docs/hub/` stay as reference prose. Nothing refreshes them automatically.

## What hub-sync used to copy

- Hub MAPPING.md to docs/hub/upstream-mapping.md
- Hub company/strategy/03_data-product-contracts.md to docs/hub/data-product-contracts-intent.md
- Hub company/strategy/governance/ecosystem-map.md to docs/hub/ecosystem-map-intent.md

## Where to edit

- Contract and catalog YAML, shared libraries: this repo.
- Doctrine prose and backlog intent: hub repository; mirrors here are reference only.
- Platform integration: ambient-systems-platform submodule pin after tagged core release.

## Siblings

- ambient-systems-platform — consumes this repo via submodule pin.
- Hub repository — strategy and contracts prose that informs catalog work.

## Branching and CI

See docs/hub/branching.md. Require workflow CI job python green before merge.

*Hand-maintained slice. The hub receiver workflow is no longer in this repo.*
