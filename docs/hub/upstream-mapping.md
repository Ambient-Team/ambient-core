# Hub-and-spoke mapping (ambient-systems)

**Purpose:** This repository is the floating-hub coordinator. Enabled spokes own business lane, technical lane, personal mirrors, or learning archives. The hub records sync rules in mapping.json and dispatches GitHub repository_dispatch events when eligible paths change on main.

Machine map: see mapping.json at repo root. Prose SSOT: interface/ecosystem-map.md. Dispatcher script: see .github/hub/dispatch.sh. Workflow: see .github/workflows/hub-dispatch.yml. Company ops start: interface/operating-lanes.md. Strategy cycle: commercial/strategy/strategy-cycle.md.

---

## Spokes

**Enabled dispatch spokes**

- **platform** — Ambient-Team/ambient-systems-platform — Technical lane: platform code, bundles, jobs, app, CI. Local tree: C:/GitHub/ambient-systems-platform
- **core** — Ambient-Team/ambient-core — Open-core contracts, catalog, shared pipeline. Local tree: C:/GitHub/ambient-core
- **site** — Ambient-Team/ambientsystems.ai — Business lane: marketing, wiki, messaging, validation engine, leads. Local tree: C:/GitHub/ambientsystems.ai
- **personal-site** — engineerID/EngineerID.github.io — Personal site and CV mirrors. Local tree: C:/GitHub/EngineerID.github.io
- **code-signal** — engineerID/code-signal — Personal CodeSignal learning repository; hub hook for interview-prep. Local tree: C:/GitHub/code-signal

Agents on this machine may **read** spoke repos via localPath in mapping.json. The cloud dispatcher never uses localPath and skips `enabled: false` entries.

---

## Sync rules (summary)

- **strategy-platform-intent** — Changes under commercial/strategy/ notify platform and core. Spokes should open a PR that refreshes contract drift markers, readme checklists, or doc references to the hub commit SHA.
- **product-engineering-intent** — Changes under product/ notify platform for engineering assessments that may imply platform work.
- **commercial-public-sync** — Changes under commercial/hypotheses.md, commercial/README.md, commercial/test/, commercial/outbound/, spokes/site/, or commercial/charter.md notify the site deploy spoke for mirror updates. Site remains the publish/deploy repo.
- **career-public-sync** — Changes under commercial/people/cv/ or commercial/people/job-search-targeting.md notify the personal site. Canonical repository CV paths are commercial/people/cv/, not legacy career/cv/ paths referenced in older site readme text.
- **interview-prep-learning** — Changes under commercial/people/interview-prep/ may notify code-signal when that spoke is enabled.
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

Configure in ambient-systems GitHub Actions secrets:

- **HUB_DISPATCH_TOKEN_AMBIENT** — Fine-grained PAT for Ambient-Team spokes: ambient-systems-platform, ambient-core, ambientsystems.ai. Permissions: repository_dispatch on each target repo.
- **HUB_DISPATCH_ENGINEERID** — Fine-grained PAT for engineerID spokes: ambient-systems (self), EngineerID.github.io, code-signal. Permissions: repository_dispatch on each target repo.

The dispatcher selects the token from the spoke owner (Ambient-Team vs engineerID). Both secrets are required for live dispatch to all enabled spokes.

**Reuse on spokes:** Store the same Ambient PAT on each Ambient-Team spoke as **HUB_DISPATCH_TOKEN_AMBIENT** (same secret name as on the hub). Store the same engineerID PAT on each engineerID spoke as **HUB_DISPATCH_ENGINEERID**. One PAT per org covers dispatch from the hub and git push to hub-sync branches on spokes when the token has contents, pull-requests, and actions write on that repo.

**Dry run:** Run workflow hub dispatch manually with dry_run true, or set DRY_RUN true when invoking dispatch.sh locally. No API calls are made in dry run mode.

---

## Spoke contract (phase 2)

Each spoke adds a receiver workflow (starter template at .github/hub/templates/spoke-receiver-workflow.yml):

1. Trigger on repository_dispatch with types ambient_hub_sync.
2. Check out the default branch, create a branch hub-sync/SHORT_SHA.
3. Apply sync logic using client_payload.data (or legacy flat fields).
4. Push the branch with the org dispatch PAT secret (see below), not GITHUB_TOKEN alone, so CI can run on the pull request.
5. Open a pull request. Never push directly to main.
6. **Merge policy:** do not merge hub-sync PRs until required CI is green on the PR. Pattern A remediate runs only on failed hub-sync pull_request CI, not on push to main.
7. **After merge:** delete the `hub-sync/*` head branch (enable auto-delete in GitHub PR settings). See interface/ecosystem-branching.md section 6.

**Branching SSOT for all repos:** interface/ecosystem-branching.md (naming, worktrees, orphan prevention, CI classes).

**Company validation (hub-owned):** commercial/ is the hypothesis-centered building-in-public OS (commercial/hypotheses.md). Product evidence: commercial/customers/hub-test/. Site is deploy spoke via commercial-public-sync.

**Spoke secrets (Ambient-Team; names match GitHub Actions secrets)**

- **HUB_FETCH_TOKEN** — read EngineerID/ambient-systems at the hub commit in client_payload.data.
- **HUB_DISPATCH_TOKEN_AMBIENT** — same PAT value as hub; git push to hub-sync branches and optional gh workflow run to kick CI.
- **CURSOR_API_KEY** — required for CI self-heal (Pattern A/B). See .github/hub/templates/CI_CURSOR_BRIDGE.md. Missing on a spoke means logs are captured but no Cursor CLI heal runs.
- **DATABRICKS_HOST** / **DATABRICKS_TOKEN** — platform only; CI Databricks Validate (see ambient-systems-platform docs/databricks-manual.md).

**Spoke secrets (engineerID)**

- **HUB_FETCH_TOKEN** — read private hub at payload sha.
- **HUB_DISPATCH_ENGINEERID** — same PAT value as hub **HUB_DISPATCH_ENGINEERID**.
- **CURSOR_API_KEY** — required for CI self-heal (Pattern A/B). Missing means logs only; no Cursor CLI heal.

**Branch protection (GitHub repo settings on main)**

- Require pull request before merge.
- Require status checks: ambient-core job **python** (workflow CI); platform jobs **pre-commit**, **python**, **javascript**, **e2e-release** (workflow CI Validate).
- Spokes without full CI: require manual review before merge.

Until a spoke workflow exists, dispatch still returns HTTP 204 from GitHub but no Actions run appears on the spoke.

---

## Operations

- **Automatic:** Push to main that touches commercial/strategy/, product/, commercial/, or people/ per workflow path filters.
- **Manual replay:** workflow_dispatch on hub dispatch with optional force_rule_ids comma list and dry_run.
- **After merge:** Ensure both dispatch secrets are set, merge hub changes to main, then test with workflow_dispatch dry_run false and force_rule_ids.

---

## Troubleshooting (live dispatch)

- **Hub dispatch HTTP 403 on Ambient-Team spokes:** Use HUB_DISPATCH_TOKEN_AMBIENT on the hub with access to each Ambient-Team target repo. engineerID-only HUB_DISPATCH_ENGINEERID cannot dispatch to Ambient-Team.
- **Hub dispatch HTTP 422 too many payload properties:** client_payload allows at most 10 top-level keys. Hub wraps metadata in client_payload.data (single key).
- **Spoke receiver: GitHub Actions is not permitted to create or approve pull requests:** In each spoke repo, Settings, Actions, General, enable workflow permission to create and approve pull requests. The sync job may still push hub-sync/SHORT_SHA; open a PR manually if needed until this is enabled.
- **Spoke fetch HTTP 403:** HUB_FETCH_TOKEN on the spoke must read the private hub repo EngineerID/ambient-systems at the commit in client_payload.data.sha (or legacy client_payload.sha).
- **Hub-sync merged but main CI red:** hub-sync PR may have merged without CI if push used GITHUB_TOKEN only. Set HUB_DISPATCH_TOKEN_AMBIENT (Ambient-Team) or HUB_DISPATCH_ENGINEERID (engineerID) on the spoke and require status checks before merge. Remediate skipped on push to main is expected.
- **Hub-sync PR without CI:** Confirm spoke secret name matches hub-receiver.yml (HUB_DISPATCH_TOKEN_AMBIENT or HUB_DISPATCH_ENGINEERID, not legacy HUB_DISPATCH_AMBIENT_TEAM or HUB_SYNC_PUSH_TOKEN).
- **Red check named .github/workflows/hub-receiver.yml on push with no jobs:** GitHub workflow file validation failed (invalid YAML), not a failed hub sync. repository_dispatch runs still use the Hub sync receiver workflow name when valid. Fix job-level env: do not reference steps context at job env (see ambient-core hub-receiver history).

---

## Related repository docs

- Lane 1 vs Lane 2 — AGENTS.md repository vs platform section
- Site vs repository — AGENTS.md repository vs site section
- Platform summary — README.md platform summary section
- CI self-heal (Cursor CLI and workflow_run bridge) — .github/hub/templates/CI_CURSOR_BRIDGE.md

*Last updated: July 10, 2026*
