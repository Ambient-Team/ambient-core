---
title: Spoke broadcast - hub-and-spoke hardening
status: active
sensitivity: internal
updated: 2026-07-20
---

# Spoke broadcast - hub-and-spoke hardening (2026-07-20)

Hub ambient-systems now mirrors hub-and-spoke. Deploy apps stay in your spoke repos. This note is the shared summary for every spoke.

## Three hub zones

- interface/ -- shared join (branching, ecosystem map, MAPPING, REPOS, operating-lanes). Machine inventory still mapping.json at hub root.
- spokes/ -- per-spoke interconnect packages on the hub
- Hub-unique -- commercial/ (validation), corporate/, operations/finance/, assets/, inbox/

## Hub jobs

- A -- Control spokes and propagate intent
- B -- Commercial validation centered on commercial/hypotheses.md
- C -- Lane 1 roadmap through spokes/platform/ into ambient-systems-platform

## What changed for each spoke

### site (ambientsystems.ai)

- Hub package: spokes/site/ (website instructions, messaging, public disclosures)
- Sync: commercial-public-sync watches spokes/site/** plus commercial hypotheses, README, test, outbound, charter
- Deploy and Astro/Wix stay in this repo. Refresh mirrors from hub spokes/site/ and commercial/ when hub-sync fires
- Gold ecosystem dashboard is gone on the hub; do not expect operations/ecosystem/dashboard.md

### platform (ambient-systems-platform)

- Hub package: spokes/platform/ (engineering assessments moved from product/engineering/)
- Roadmap pointers: commercial/strategy/02_platform-roadmap.md and commercial/strategy/
- Sync: spokes/platform/** and commercial/strategy/** via strategy-platform-intent / product-engineering-intent
- Update any docs that still cite product/engineering/ to spokes/platform/engineering/

### core (ambient-core)

- Hub package: spokes/core/ (pointer to commercial/strategy/03_data-product-contracts.md)
- Sync still covers commercial/strategy/** and interface/**
- No contract YAML invented on the hub; core remains YAML SSOT

### personal-site (EngineerID.github.io)

- Company spoke package **removed** (see spokes/README.md §Retired spokes). Personal site owned under EngineerID/master-hub.
- CV SSOT: commercial/ivan-damnjanovic/cv/
- Sync rule career-public-sync remains disabled for company dispatch; watches cv/assurance/advisory paths only

### code-signal

- Company spoke package **removed** (see spokes/README.md §Retired spokes). Learning lane under master-hub.
- Interview / drill banks: commercial/ivan-damnjanovic/assurance/ and commercial/ivan-damnjanovic/advisory/
- Sync rule interview-prep-learning remains disabled for company dispatch

## Removed on hub

- Ecosystem Gold dashboard (dashboard.md/html), sync_ecosystem_dashboard.py, ecosystem-dashboard-sync workflow
- Active focus remains `_data/ecosystem/hub-focus.yaml` only
- Top-level `product/`, `company/`, `people/` move-stubs (folded into spokes/platform, interface, commercial/ivan-damnjanovic)

## What spokes should do next

1. Treat spokes/site/ as instruction and copy SSOT from hub
2. Platform: treat spokes/platform/engineering/ as Lane 1 assessment home
3. Do not restore hub Gold PM dashboard or deleted move-stub folders

Full map: interface/ecosystem-map.md. Operating lanes: interface/operating-lanes.md.

*Last alignment: 2026-08-20 | Folder-depth cleanup*
