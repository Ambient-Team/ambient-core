# Documentation

Ambient Core is **self-contained**: everything you need to develop, integrate, and release lives in this repository.

## Start here

1. [USAGE.md](USAGE.md) — install, extras, and command recipes.
2. [INTEGRATING.md](INTEGRATING.md) — pin a tagged release in another repo (pip, submodule, CI env vars).
3. [governed-data.md](governed-data.md) — catalog vs contracts; how UI, jobs, and agents consume SSOT.
4. [work-cycles.md](work-cycles.md) — hub: benchmarking, assurance, investor disclosure (core vs platform).
5. [benchmarking-lifecycle.md](benchmarking-lifecycle.md) — compare vs improve; peer gaps and decomposition.
6. [assurance-lifecycle.md](assurance-lifecycle.md) — defend metrics; quality, lineage, ops–finance bridge.
7. [investor-disclosure-lifecycle.md](investor-disclosure-lifecycle.md) — mandates, fundraising, disclosure packs.
8. [planning-variance-lifecycle.md](planning-variance-lifecycle.md) — budget and forecast vs actuals.
9. [catalog-consumption.md](catalog-consumption.md) — manifest vs industry YAML; manifest field glossary.
10. [crosswalk.md](crosswalk.md) — catalog metric → contract links.
11. [pipeline.md](pipeline.md) — lakehouse governance helpers and test walkthroughs.
12. [inference-layer.md](inference-layer.md) — run and extend Maestro.
13. [AGENTS.md](AGENTS.md) — agent profiles, core tools, plan-execute loop (`tool_definitions.yaml`, `agent_profiles.yaml`).
14. [agent-security.md](agent-security.md) — production threat model for agent workers.

## Understand the system

- [POSITIONING.md](POSITIONING.md) — how Ambient Core compares to agent/RAG frameworks and data-governance tools.
- [ECOSYSTEM.md](ECOSYSTEM.md) — components, how they connect, maintainer priorities, release flow.
- [ARCHITECTURE.md](ARCHITECTURE.md) — Python packages and repository layout.
- [CONVENTIONS.md](CONVENTIONS.md) — naming/versioning rules, the core layer, and the data-format & storage standard (which format to use when; where databases fit).
- [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md) — what must be edited only here (no downstream mirrors).
- [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md) — foundation vs a full application repository.
- [integrator-roadmap.md](integrator-roadmap.md) — what is shipped vs deferred for integrators.

## Contribute and ship

- [CONTRIBUTING.md](CONTRIBUTING.md) — setup, contract/catalog workflow, tagging, consumer follow-up.
- [../SECURITY.md](../SECURITY.md) — vulnerability reporting.
- [../CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) — community standards.

## Catalog authoring

- [../catalog/README.md](../catalog/README.md) — YAML layout, industry packs, generator commands.
