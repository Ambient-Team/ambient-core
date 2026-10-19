# Git branching (Ambient-Team/ambient-core)

Short policy for this spoke. Full SSOT: EngineerID/ambient-systems company/strategy/governance/ecosystem-branching.md.

## Main safety

- Integration branch: `main` only. Do not commit or push to `main`, including one-line fixes.
- Human and agent work: branch `repo/short-kebab-scope` off updated `main`, open a PR into `main`.
- Prefer small scoped PRs. Never force-push `main`.

## Session close-out

- When CI is green and the work was requested this session: the owner merges the PR, then delete the head branch and prune local.
- If abandoning: close the PR and delete the remote branch.
- Do not leave orphan `repo/*`, `hub-sync/*`, or `cursor/*` branches or ready open PRs after a session.
- Prefer one open `repo/*` PR per repo; do not open a second overlapping PR for the same scope.
- Do not merge while required CI job python is red.

## Automation

- Hub sync receiver (`.github/workflows/hub-receiver.yml`) is removed. It only accepted `EngineerID/ambient-systems`, fetched paths that no longer return successfully, and needed `FETCH_AMBIENT_SYSTEMS` plus `HUB_DISPATCH_AMBIENT_TEAM`. GitHub had already disabled it after failed dispatches. Do not recreate `hub-sync/*` branches from that workflow.
- Do not use `cursor/*` manually for hub-sync remediate; CI does not run Cursor agents on runners (One Foreman).

## CI

Workflow CI must be green on the PR before merge. Required check on main: job python.

## Parallel agents

Use a separate git worktree per branch (see hub ecosystem-branching.md section 4).

## Cursor Bugbot

Off for this repo. Disable at https://cursor.com/dashboard/bugbot if the app still comments on PRs. Hub policy: company/strategy/governance/cursor-integrations.md in EngineerID/ambient-systems.

*Hub mirror; update via hub sync or edit with hub SSOT change.*
