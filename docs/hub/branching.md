# Git branching (Ambient-Team/ambient-core)

Short reminders for contributors to **this** repository. Organization-wide branching policy, if any, lives outside this open-source tree.

## Main safety

- Integration branch: `main` only. Do not commit or push to `main`, including one-line fixes.
- Use a scoped feature branch and open a pull request into `main`.
- Prefer small scoped PRs. Never force-push `main`.

## Session close-out

- When CI is green and the work was requested: merge the pull request, then delete the head branch and prune local refs.
- If abandoning: close the pull request and delete the remote branch.
- Avoid leaving orphan automation branches or stale open pull requests after a session.

## Automation

- The legacy hub-receiver workflow is removed. Do not recreate `hub-sync/*` branches from it.

## CI

Workflow CI must be green on the pull request before merge. See [docs/ci.md](../ci.md).

## Parallel agents

Use a separate git worktree per branch when running multiple agents locally.

*Local pointer — not a policy copy.*
