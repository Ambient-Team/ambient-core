# Hub-and-spoke mapping (ambient-systems)

**Purpose:** This vault is the coordination hub. Spoke repositories own execution surfaces, public site content, personal site mirrors, or personal learning archives. The hub records sync rules in mapping.json and dispatches GitHub repository_dispatch events when eligible paths change on main.

Machine map: see mapping.json at repo root. Dispatcher script: see .github/hub/dispatch.sh. Workflow: see .github/workflows/hub-dispatch.yml.

---

## Spokes

- **platform** — EngineerID/ambient-systems-platform — Lane 2 execution: platform code, bundles, jobs, app, CI. Local tree: C:/GitHub/ambient-systems-platform
- **core** — Ambient-Team/ambient-core — Open-core contracts, catalog, shared pipeline, Maestro source. Local tree: C:/GitHub/ambient-core
- **site** — Ambient-Team/ambientsystems.ai — Public marketing site, messaging SSOT, internal-docs mirrors. Local tree: C:/GitHub/ambientsystems.ai
- **personal-site** — engineerID/EngineerID.github.io — Personal site and machine-readable CV mirrors. Local tree: C:/GitHub/EngineerID.github.io
- **code-signal** — engineerID/code-signal — Personal CodeSignal learning vault; hub hook enabled for interview-prep sync into the learning vault. Local tree: C:/GitHub/code-signal

Agents on this machine may read spoke repos via localPath in mapping.json. The cloud dispatcher never uses localPath.

---

## Sync rules (summary)

- **strategy-platform-intent** — Changes under company/strategy/ notify platform and core. Spokes should open a PR that refreshes contract drift markers, readme checklists, or doc references to the hub commit SHA.
- **product-engineering-intent** — Changes under product/ notify platform for engineering assessments that may imply platform work.
- **commercial-public-sync** — Changes under commercial/outbound/ or commercial/validation/ notify the site repo for messaging or validation mirror updates per commercial/README.md boundaries.
- **career-public-sync** — Changes under people/cv/ or people/job-search-targeting.md notify the personal site. Canonical vault CV paths are people/cv/, not legacy career/cv/ paths referenced in older site readme text.
- **interview-prep-learning** — Changes under people/interview-prep/ may notify code-signal when that spoke is enabled.

**Global excludes:** operations/finance/, company/legal/, assets/archive/, and commercial/playbook/ never trigger dispatch.

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

Configure in ambient-systems GitHub Actions secrets:

- **HUB_DISPATCH_TOKEN_AMBIENT** — Fine-grained PAT for Ambient-Team spokes: ambient-systems-platform, ambient-core, ambientsystems.ai. Permissions: repository_dispatch on each target repo.
- **HUB_DISPATCH_TOKEN** — Fine-grained PAT for engineerID spokes: ambient-systems (self), EngineerID.github.io, code-signal. Permissions: repository_dispatch on each target repo.

The dispatcher selects the token from the spoke owner (Ambient-Team vs engineerID). Both secrets are required for live dispatch to all enabled spokes.

**Dry run:** Run workflow hub dispatch manually with dry_run true, or set DRY_RUN true when invoking dispatch.sh locally. No API calls are made in dry run mode.

---

## Spoke contract (phase 2)

Each spoke adds a receiver workflow (starter template at .github/hub/templates/spoke-receiver-workflow.yml):

1. Trigger on repository_dispatch with types ambient_hub_sync.
2. Check out the default branch, create a branch hub-sync/DATE-SHORT_SHA.
3. Apply sync logic using client_payload.data (or legacy flat fields).
4. Open a pull request. Never push directly to main.

Until a spoke workflow exists, dispatch still returns HTTP 204 from GitHub but no Actions run appears on the spoke.

---

## Operations

- **Automatic:** Push to main that touches company/strategy/, product/, commercial/, or people/ per workflow path filters.
- **Manual replay:** workflow_dispatch on hub dispatch with optional force_rule_ids comma list and dry_run.
- **After merge:** Ensure both dispatch secrets are set, merge hub changes to main, then test with workflow_dispatch dry_run false and force_rule_ids.

---

## Troubleshooting (live dispatch)

- **Hub dispatch HTTP 403 on Ambient-Team spokes:** Use HUB_DISPATCH_TOKEN_AMBIENT with access to each Ambient-Team target repo. engineerID-only HUB_DISPATCH_TOKEN cannot dispatch to Ambient-Team.
- **Hub dispatch HTTP 422 too many payload properties:** client_payload allows at most 10 top-level keys. Hub wraps metadata in client_payload.data (single key).
- **Spoke receiver: GitHub Actions is not permitted to create or approve pull requests:** In each spoke repo, Settings, Actions, General, enable workflow permission to create and approve pull requests. The sync job may still push hub-sync/SHORT_SHA; open a PR manually if needed until this is enabled.
- **Spoke fetch HTTP 403:** HUB_FETCH_TOKEN on the spoke must read the private hub repo EngineerID/ambient-systems at the commit in client_payload.data.sha (or legacy client_payload.sha).

---

## Related vault docs

- Lane 1 vs Lane 2 — AGENTS.md vault vs platform section
- Site vs vault — AGENTS.md vault vs site section
- Platform summary — README.md platform summary section

*Last updated: July 9, 2026*
