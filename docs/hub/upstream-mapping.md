# Hub-and-spoke mapping (ambient-systems)

**Purpose:** This repository is the company floating-hub coordinator for three Ambient-Team remotes (platform, core, site). Personal EngineerID spokes are disabled here. Oversight: EngineerID/master-hub. The hub records sync rules in mapping.json and dispatches GitHub repository_dispatch events when eligible paths change on main. Remote vs local policy: spokes/platform/engineering/remote-ci-and-local-policy.md.

Machine map: see mapping.json at repo root. Prose SSOT: interface/ecosystem-map.md. Dispatcher script: see .github/hub/dispatch.sh. Workflow: see .github/workflows/hub-dispatch.yml. Company ops start: interface/operating-lanes.md. Strategy cycle: commercial/strategy/strategy-cycle.md.

---

## Spokes

**Enabled dispatch spokes (Ambient-Team only)**

- **platform** — Ambient-Team/ambient-systems-platform — remoteOnly; CI and Actions prod deploy. No required local tree.
- **core** — Ambient-Team/ambient-core — remoteOnly; public MIT contracts. No required local tree.
- **site** — Ambient-Team/ambientsystems.ai — remoteOnly; hub-sync via GitHub; Wix publish via Actions CI Deploy Wix. No required local tree.

**Disabled on this hub**

- **personal-site**, **code-signal** — enabled false; personal lane under EngineerID/master-hub.

The cloud dispatcher never uses localPath and skips `enabled: false` entries. Agents must not require a local platform or core clone.

---

## Sync rules (summary)

- **strategy-platform-intent** — Changes under commercial/strategy/ notify platform and core. Spokes should open a PR that refreshes contract drift markers, readme checklists, or doc references to the hub commit SHA.
- **product-engineering-intent** — Changes under product/ notify platform for engineering assessments that may imply platform work.
- **commercial-public-sync** — Changes under commercial/hypotheses.md, commercial/README.md, commercial/test/, commercial/outbound/, spokes/site/, or commercial/charter.md notify the site deploy spoke for mirror updates. Site remains the publish/deploy repo.
- **career-public-sync** — Changes under commercial/ivan-damnjanovic/cv/ or commercial/ivan-damnjanovic/career/job-search-targeting.md notify the personal site. Canonical repository CV paths are commercial/ivan-damnjanovic/cv/, not legacy career/cv/ paths referenced in older site readme text.
- **interview-prep-learning** — Changes under commercial/ivan-damnjanovic/pitch-prep/ may notify code-signal when that spoke is enabled.
- **customer-package-platform-note** — Changes under commercial/customers/ notify platform to refresh docs/hub customer-package mirrors.

**Global excludes:** operations/finance/, corporate/ (including legal and archive), assets/archive/, and commercial/archive/ (path retired; keep exclude harmless) never trigger dispatch.

**Inbox:** Ecosystem landing and reverse-consolidation live under inbox/ (PROTOCOL.md). Inbox paths do not have a dedicated sync rule in v1; triage into watched prefixes above so spokes are notified. Spoke outcomes that need hub decisions land in inbox/returns/ (manual or agent-assisted; no reverse repository_dispatch yet).

---

## Cloud operation

1. A push lands on hub main under watched prefixes (see hub-dispatch workflow path filters).
2. The workflow lists changed files, excludes globalExcludes, matches syncRules in mapping.json.
3. For each enabled spoke, the hub calls GitHub API POST repos/OWNER/REPO/dispatches with event_type ambient_hub_sync.

**client_payload (v2, current):**

Hub sends one top-level key **data** containing the metadata object (avoids GitHub 10-key limit on client_payload):

- source_repo — hub slug, e.g. EngineerID/ambient-systems
- sha — commit on main
- sourceRef — branch name, usually main
- mappingVersion — integer from mapping.json
- ruleIds — matched rule ids
- payloadProfiles — optional tags such as platform-intent, site-gtm, cv-public
- changedPaths — up to 50 paths; see pathCount and pathsTruncated when the list is longer

**Legacy v1:** flat fields at the top level of client_payload (source_repo, sha, or older sourceRepo, sourceSha). Spoke receivers accept both during transition.

Spokes fetch hub file content via GitHub API (contents or archive) using a spoke-side token. The hub workflow does not clone spoke repositories.

---

## Secrets (hub repository)

Only these PAT/secret names are in use (see EngineerID/master-hub `docs/pat-matrix.md`):

- **HUB_DISPATCH_AMBIENT_TEAM** — Ambient-Team spokes (platform, core, site). Required for company Hub dispatch.
- **FETCH_MASTER** — Contents: Read on EngineerID/master-hub. Used by **Master hub sync receiver** (`actions/checkout` + API probe). Store on ambient-systems only — never on EngineerID.github.io.

Upstream cascade: event `master_hub_sync` → `master-hub-receiver.yml` → `interface/master-hub/**` → sync rule `master-hub-oversight` → Ambient-Team. See master-hub `docs/remote-control.md` and `docs/ambient-team-gate.md`.

**Hard gate:** do not edit Ambient-Team remotes directly; all Ambient-Team-bound changes go through this hub. Successful wakes append `_data/ecosystem/ambient-team-dispatch-log.jsonl`.

**Spoke FETCH:** Ambient-Team repos use **FETCH_AMBIENT_SYSTEMS** (Contents: Read on this hub).

**Site build FETCH:** ambientsystems.ai uses **FETCH_SITE_UPDATES** (Contents: Read on ambient-core + ambient-systems-platform) for Wix `_sources`.

**Site hub-receiver fetch list:** extending the ambientsystems.ai receiver to fetch new hub files must go through ambient-systems hub-sync of spoke Actions config (template `.github/hub/templates/site-hub-receiver.yml`), or an explicit Attended operator one-time exception — never a direct Ambient-Team agent PR. Current mirrored cascade proof is `spokes-site-readme` plus `hub-hypotheses`. Attended 2026-08-12 exception: also fetch `spokes/site/messaging/boundary.md` (master-hub boundary bridge) into the site messaging mirror path.

**Spoke push (optional):** same value as hub **HUB_DISPATCH_AMBIENT_TEAM** on the spoke if hub-receiver should push with a PAT (otherwise `github.token`).

**Dry run:** workflow_dispatch on Hub dispatch with dry_run true, or DRY_RUN true when invoking dispatch.sh locally.

---

## Spoke contract (phase 2)

Each spoke adds a receiver workflow (starter template at .github/hub/templates/spoke-receiver-workflow.yml):

1. Trigger on repository_dispatch with types ambient_hub_sync.
2. Check out the default branch, create a branch hub-sync/SHORT_SHA.
3. Apply sync logic using client_payload.data (or legacy flat fields).
4. Push the branch with **HUB_DISPATCH_AMBIENT_TEAM** or `github.token`.
5. Open a pull request. Never push directly to main.
6. **Merge policy:** do not merge hub-sync PRs until required CI is green on the PR.
7. **After merge:** delete the `hub-sync/*` head branch.

**Branching SSOT for all repos:** interface/ecosystem-branching.md.

**Spoke secrets (Ambient-Team)**

- **FETCH_AMBIENT_SYSTEMS** — read EngineerID/ambient-systems at the hub commit in client_payload.data.
- **HUB_DISPATCH_AMBIENT_TEAM** — optional; git push to hub-sync branches (same PAT as hub).
- **FETCH_SITE_UPDATES** — site only; read core + platform for Wix `_sources`.
- **DATABRICKS_HOST** / **DATABRICKS_TOKEN** / **DATABRICKS_SQL_WAREHOUSE_ID** / **FIREBASE_SERVICE_ACCOUNT** — platform deploy. See remote-ci-and-local-policy.md.

**master-hub**

- **HUB_DISPATCH_ENGINEERID** — POST `master_hub_sync` to this hub only.

**Branch protection (GitHub repo settings on main)**

- Require pull request before merge.
- Require status checks per spoke CI.

Until a spoke workflow exists, dispatch still returns HTTP 204 from GitHub but no Actions run appears on the spoke.

---

## Operations

- **Automatic:** Push to main that touches watched paths per hub-dispatch.yml.
- **Manual replay:** workflow_dispatch on Hub dispatch with optional force_rule_ids and dry_run.

---

## Troubleshooting (live dispatch)

- **Hub dispatch HTTP 403 on Ambient-Team spokes:** Use **HUB_DISPATCH_AMBIENT_TEAM** on the hub with access to each Ambient-Team target repo. **HUB_DISPATCH_ENGINEERID** cannot dispatch to Ambient-Team.
- **Hub dispatch HTTP 422 too many payload properties:** client_payload allows at most 10 top-level keys. Hub wraps metadata in client_payload.data.
- **Spoke receiver: GitHub Actions is not permitted to create or approve pull requests:** Settings → Actions → General → allow workflows to create and approve pull requests.
- **Spoke fetch HTTP 403:** **FETCH_AMBIENT_SYSTEMS** on the spoke must read EngineerID/ambient-systems at the payload sha.
- **Hub-sync PR without CI:** Prefer **HUB_DISPATCH_AMBIENT_TEAM** for spoke push so PR workflows run; `github.token` pushes often skip downstream CI.
- **Red check named .github/workflows/hub-receiver.yml on push with no jobs:** invalid YAML on the workflow file, not a failed hub sync.

---

## Related repository docs

- Lane 1 vs Lane 2 — AGENTS.md repository vs platform section
- Site vs repository — AGENTS.md repository vs site section
- Platform summary — README.md platform summary section
- CI self-heal (Cursor CLI and workflow_run bridge) — .github/hub/templates/CI_CURSOR_BRIDGE.md
- PAT names — EngineerID/master-hub docs/pat-matrix.md

*Last updated: 2026-08-11*
