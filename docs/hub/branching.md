# Git branching (Ambient-Team/ambient-core)

Short policy for this spoke. Full SSOT lives in the private hub vault: company/strategy/governance/ecosystem-branching.md (EngineerID/ambient-systems).

## Rules

- Integration branch: `main` only. Do not commit on `main`.
- Human and agent work: branch `repo/<short-kebab-scope>` off updated `main`, PR, human merge.
- Hub automation: `hub-sync/*` branches only from hub-receiver workflow; open PR, wait for CI job **python**, merge, delete head branch.
- Do not use `cursor/*` manually; review bot remediate PRs separately.

## CI

Workflow **CI** must be green on the PR before merge. Required check on `main`: job **python**.

## Parallel agents

Use a separate git worktree per branch (see hub ecosystem-branching.md section 4).

## Cursor Bugbot

Off for this repo. Disable at https://cursor.com/dashboard/bugbot if the app still comments on PRs. Hub policy: company/strategy/governance/cursor-integrations.md in EngineerID/ambient-systems.

*Hub mirror; update via hub sync or edit with vault SSOT change.*
