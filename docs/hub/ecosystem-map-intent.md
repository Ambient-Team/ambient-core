# Ecosystem map (hub and spokes)

**Version:** 1
**Date:** July 9, 2026
**Purpose:** Agent and human SSOT for all repositories in mapping.json: roles, lanes, hub dispatch, spoke receivers, secrets, and where to edit. Machine list: mapping.json at hub root. Operations detail: MAPPING.md. Branching: ecosystem-branching.md.

Platform summary: see README Platform Summary — ../../../README.md#platform-summary.

---

## When to read this

- Before cross-repo work, hub-sync PR review, or choosing which clone to open.
- When Lane 1 intent in the vault should become Lane 2 execution, site mirrors, or personal mirrors.
- When unsure whether finance, legal, or playbook paths trigger dispatch (they do not).

---

## Repository inventory

**Hub**

- id: hub (implicit)
- GitHub: EngineerID/ambient-systems
- Class: hub
- Local: C:/GitHub/ambient-systems
- Visibility: private vault
- Primary edits: company/strategy/, product/, commercial/, people/, operations/finance/, company/legal/, mapping.json, AGENTS.md, README.md

**Spoke platform**

- id: platform
- GitHub: Ambient-Team/ambient-systems-platform
- Class: execution
- Local: C:/GitHub/ambient-systems-platform
- Role: Lane 2 — platform code, Databricks bundles, jobs, app, CI and pre-commit

**Spoke core**

- id: core
- GitHub: Ambient-Team/ambient-core
- Class: execution
- Local: C:/GitHub/ambient-core
- Role: Contract and catalog YAML SSOT, shared pipeline libraries, Maestro source (public MIT)

**Spoke site**

- id: site
- GitHub: Ambient-Team/ambientsystems.ai
- Class: site
- Local: C:/GitHub/ambientsystems.ai
- Role: Marketing site, wiki, company-external messaging, internal-docs mirrors, leads

**Spoke personal-site**

- id: personal-site
- GitHub: engineerID/EngineerID.github.io
- Class: personal
- Local: C:/GitHub/EngineerID.github.io
- Role: Personal site and machine-readable CV mirrors

**Spoke code-signal**

- id: code-signal
- GitHub: engineerID/code-signal
- Class: personal
- Local: C:/GitHub/code-signal
- Role: Personal CodeSignal learning vault; optional interview-prep hook from hub

Each spoke may ship docs/hub/ecosystem.md (this repo slice) and docs/hub/branching.md (short branching copy).

---

## Lanes and canonical ownership

**Lane 1 (hub vault)**

- Doctrine, roadmap, contracts prose, technical backlog, product engineering assessments, commercial validation ops, people and career validation.
- Ecosystem PM snapshots and Gold dashboard: operations/ecosystem/ (sync_ecosystem_dashboard.py; Actions ecosystem-dashboard-sync).
- Hub-test customer package (production orchestration from vault): commercial/customers/hub-test/. Commercial capture playbooks live here; platform demos no longer hold commercial media.
- Ecosystem inbox (land + reverse consolidate): inbox/ — PROTOCOL.md. Items land in open/, route to hub SSOT, spokes receive via hub-dispatch; spoke outcomes return to inbox/returns/ for hub review. Not a second PM dashboard (that remains operations/ecosystem/).
- Founder Uni curriculum and Pass / Master / Finish progress: commercial/learning/founder-uni/ (hub-owned). Spoke expectations and return shape live there. Thin sync rule founder-learning-sync mirrors curriculum-map.md and spoke-expectations.md only to the site validation-engine. Returns may cite fu-week and fu-level per inbox/PROTOCOL.md (no PII).
- No production contract YAML SSOT and no deployable platform code.

**Lane 2 (platform)**

- Runnable integration code consumed in production workflows.
- Implements intent recorded in company/strategy/backlog/technical-backlog.md with platform PR links when done.

**Contracts (core)**

- YAML catalog and data product contracts.
- Platform consumes ambient-core via pinned submodule tag. Contract changes require core PR plus platform pin bump. Hub dispatch does not replace that pin workflow.

**Site (ambientsystems.ai)**

- Public and company-external surfaces. Vault commercial/ and site internal-docs/ stay aligned per commercial/README.md and people/validation-bridge.md.

**Personal spokes**

- Career artifacts and learning vault. Not company doctrine or GTM SSOT.

Vault vs platform vs site agent sections: AGENTS.md vault vs platform and vault vs site.

---

## Hub dispatch (summary)

**Trigger:** Push to hub main under path filters in .github/workflows/hub-dispatch.yml (company/strategy/, product/, commercial/, people/, mapping.json).

**Script:** .github/hub/dispatch.sh reads mapping.json, applies globalExcludes, matches syncRules, POSTs repository_dispatch with event_type ambient_hub_sync.

**Payload v2:** client_payload.data holds source_repo, sha, sourceRef, mappingVersion, ruleIds, payloadProfiles, changedPaths (up to 50 listed), pathCount, pathsTruncated.

**Spoke response:** hub-receiver workflow fetches selected hub files at sha, branch hub-sync/SHORT_SHA, open PR to main. Never push hub-sync content directly to main.

Full secrets and troubleshooting: MAPPING.md.

---

## Sync rules and receiver mirrors

**strategy-platform-intent**

- Hub paths: company/strategy/** and company/strategy/backlog/**
- Spokes: platform, core
- Profile: platform-intent
- Core receiver copies: docs/hub/upstream-mapping.md (MAPPING.md), docs/hub/data-product-contracts-intent.md (company/strategy/03_data-product-contracts.md), docs/hub/ecosystem-map-intent.md (company/strategy/governance/ecosystem-map.md)
- Platform receiver copies: docs/upstream-mapping.md, docs/hub/repos-ecosystem.md (REPOS.md), docs/hub/data-product-contracts-intent.md, docs/hub/ecosystem-map-intent.md

**product-engineering-intent**

- Hub paths: product/**
- Spokes: platform
- Profile: platform-intent
- Platform receiver: same fetch set as strategy rule when dispatch fires (receiver does not filter by rule id; refreshes configured mirrors)

**commercial-public-sync**

- Hub paths: commercial/validation/**
- Spokes: site
- Profile: site-gtm
- Site receiver copies: internal-docs/hub/upstream-mapping.md, internal-docs/hub/vault-validation-readme.md (commercial/validation/README.md), internal-docs/hub/ecosystem-map-intent.md
- Note: dormant outbound and playbook vault leftovers live under commercial/archive/ (excluded). Site SSOT: ambientsystems.ai internal-docs/commercial/.

**founder-learning-sync**

- Hub paths: commercial/learning/founder-uni/curriculum-map.md, commercial/learning/founder-uni/spoke-expectations.md
- Spokes: site
- Profile: site-gtm
- Site receiver copies: internal-docs/hub/founder-uni/curriculum-map.md, internal-docs/hub/founder-uni/spoke-expectations.md
- Never sync notes.md or progress.md

**career-public-sync**

- Hub paths: people/cv/**, people/job-search-targeting.md
- Spokes: personal-site
- Profile: cv-public
- Personal-site receiver copies: docs/hub/upstream-mapping.md, hub-sync/cv/ivan-damnjanovic.md, docs/hub/ecosystem-map-intent.md

**interview-prep-learning**

- Hub paths: people/interview-prep/**
- Spokes: code-signal
- Profile: interview-prep
- Code-signal receiver copies: docs/hub/upstream-mapping.md, hub-sync/interview-prep/two-question-answers.md, docs/hub/ecosystem-map-intent.md

**Global excludes (never dispatch)**

- operations/finance/
- company/legal/
- assets/archive/
- commercial/archive/

---

## Sensitivity (hub paths)

Aligns with branch-map.yaml sensitivity hints and AGENTS.md:

- operations/finance/ and company/legal/ — confidential; excluded from dispatch
- commercial/validation/ — internal-contingent; may dispatch to site when paths match commercial-public-sync
- people/ — internal-contingent; career paths may dispatch to personal spokes

---

## Secrets topology (org split)

**On hub (Actions secrets)**

- HUB_DISPATCH_TOKEN_AMBIENT — Ambient-Team spokes (platform, core, site)
- HUB_DISPATCH_ENGINEERID — engineerID spokes (hub self-dispatch if needed, personal-site, code-signal)

**On Ambient-Team spokes**

- HUB_FETCH_TOKEN — read private hub at payload sha
- HUB_DISPATCH_TOKEN_AMBIENT — same name and PAT value as hub; push hub-sync branches and optional CI kick
- CURSOR_API_KEY — optional; CI bridge
- DATABRICKS_HOST and DATABRICKS_TOKEN — platform only (CI Databricks Validate)

**On engineerID spokes**

- HUB_FETCH_TOKEN
- HUB_DISPATCH_ENGINEERID — same PAT value as hub HUB_DISPATCH_ENGINEERID
- CURSOR_API_KEY — optional; CI bridge

---

## Branching and automation

- Human and agent work: repo/short-kebab-scope off main, PR only, agents never merge.
- hub-sync/SHORT_SHA — automation only; wait for required CI on execution spokes before merge.
- cursor/ — CI remediate; review as bot output.
- Parallel agents: separate git worktree per branch (ecosystem-branching.md section 4).

**Required CI on merge (execution spokes)**

- core: workflow CI, job python
- platform: CI Validate jobs pre-commit, python, javascript, e2e-release; plus CI Databricks Validate as configured

---

## Agent routing (multi-repo)

1. Doctrine or backlog change — hub repo/* PR first; merge to main triggers dispatch.
2. Platform implementation — ambient-systems-platform repo/* PR; link from backlog entry.
3. Contract YAML change — ambient-core repo/* PR then platform submodule pin PR.
4. Public messaging or validation mirror — hub commercial/ and site internal-docs/ or wait for hub-sync PR on site.
5. CV or interview prep public mirror — hub people/ then personal spoke hub-sync PR.

**Vault cross-cutting index:** one hub PR when README.md, AGENTS.md, doc-map.yaml, mapping.json, MAPPING.md, and REPOS.md change together (ecosystem-branching.md section 8).

**Integration target hint:** py -3 operations/finance/engine/scripts/suggest_branch_name.py --from-git prints main as merge target under branch-map v4.

---

## Non-goals

- Hub dispatch does not deploy Databricks or run platform jobs.
- Hub dispatch does not sync finance, legal, assets/archive/, or commercial/archive/.
- Hub mirrors on spokes are intent and reference copies; execution SSOT stays in each repo tree.
- Hub dispatch does not bump ambient-core submodule pins on platform.

---

## Related documents

- Machine map — mapping.json
- Dispatch operations — MAPPING.md
- Branching prose — ecosystem-branching.md
- Machine branch classes — branch-map.yaml
- Short ecosystem orientation — REPOS.md
- Spoke template — .github/hub/templates/spoke-ecosystem.md
- Cursor policy — cursor-integrations.md
- Career vs company validation — people/validation-bridge.md

*Last alignment: July 10, 2026 | Public doctrine alignment*
