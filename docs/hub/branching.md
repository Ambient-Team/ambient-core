# Git branching (Ambient-Team/ambient-core)

This spoke keeps a **short local index** only. Authoritative branching, session close-out, worktree rules, and cross-repo edit routing live in the hub repository:

**[ecosystem-branching.md](https://github.com/EngineerID/ambient-systems/blob/main/company/strategy/governance/ecosystem-branching.md)** (EngineerID/ambient-systems)

Do not treat this file as a second SSOT; when policy changes, update the hub document and adjust links here if needed.

## Spoke-local reminders

- Integration branch: `main` only — no direct commits or pushes to `main`.
- Work on `repo/short-kebab-scope` (or automation branches your policy allows), open a PR into `main`.
- CI job **python** must be green before merge; see [docs/ci.md](../ci.md) and [docs/ci-path-filters.md](../ci-path-filters.md).
- Hub receiver workflow is removed; do not recreate `hub-sync/*` from it.
- Cursor Bugbot is off for this repo; hub policy: [cursor-integrations.md](https://github.com/EngineerID/ambient-systems/blob/main/company/strategy/governance/cursor-integrations.md).

*Hub mirror pointer — not a policy copy.*
