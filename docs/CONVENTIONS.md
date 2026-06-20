# Naming & versioning conventions

This document is the canonical reference for how catalogue and contract assets are named, identified, and versioned. The rules here are enforced by `scripts/check_naming.py`, `scripts/check_catalog_hygiene.py`, and the contract validators in CI.

## Catalogue metric and data-option keys

New catalogue entries use a stable, human-readable slug key of the form `industry.segment.slug`:

- `industry` — lowercase industry token (for example `healthcare`, `life_sciences`).
- `segment` — sub-vertical within the industry (see the segment enum below). Use `core` when an entry is not segment-specific.
- `slug` — short lowercase identifier for the metric or data option (for example `patient_volume`, `claim_denial_rate`).

Examples: `healthcare.provider.patient_volume`, `healthcare.revenue_cycle.claim_denial_rate`, `life_sciences.rnd.trial_cost_per_patient`.

Keys are lowercase, use `_` within a token and `.` only as the three-part separator, and match `^[a-z][a-z0-9_]*\.[a-z0-9_]+\.[a-z0-9_]+$`.

The **core layer** (`catalog/core/shared/core_metrics.yaml`) holds metrics shared by every industry. The generator expands each into every pack with the key `industry.core.slug` (for example `healthcare.core.gross_margin`), assigning per-industry ids from `core_ids.yaml`. Every industry pack is therefore an extension on top of this core. Legacy author-chosen keys that predate this convention remain valid until retired (see the alias policy) so existing downstream consumers do not break; their canonical slug for the calculator is carried in a `slug` field.

## Integer ID allocation

Every metric and data option carries a unique integer `id`, and uniqueness across the whole catalogue is enforced by the generator and by `scripts/check_naming.py`. Two kinds of id exist:

- **Author-assigned native ids.** Each vertical's hand-written metrics occupy a small dedicated band: healthcare native ids use `900–999` (currently `911–915`), and life-sciences native ids use the `1200–1299` band. When adding a vertical, reserve a fresh band here before assigning ids.
- **Generated core-layer ids.** The shared core metrics are expanded into each pack with ids allocated per industry in `catalog/core/shared/core_ids.yaml`; these occupy the higher `900–1099` range and are managed by the generator rather than chosen by hand.

When adding a vertical, reserve a new native band here first.

## Segment enum

Metrics carry a `segment` field placing them within the layered model. Allowed values:

- `core` — shared across all industries (the core layer: financials, headcount).
- `operations` — an industry's operational metrics.
- `financial` — an industry's vertical-specific financial metrics.
- `subscription` — recurring-revenue / SaaS overlay (any industry that sells subscriptions).
- `provider` — healthcare acute and ambulatory operations.
- `revenue_cycle` — healthcare claims, denials, accounts receivable, reimbursement.
- `quality` — healthcare outcomes, readmissions, value-based-care risk.
- `digital_health` — health-technology recurring revenue.
- `rnd` — life-sciences research and development.
- `supply_chain` — life-sciences / manufacturing production and supply.

## Alias policy

When a key is renamed, the old key is recorded in `catalog/aliases.yaml` mapping the legacy key to the canonical key. Aliases are retained for at least one minor release so downstream consumers keyed on the old identifier keep resolving, then removed in a subsequent release. Alias targets must be unique.

## Contract files and versions

Contract files live in `contracts/` and are named `product-slug-vMAJOR.yaml` (for example `healthcare-provider-ops-v1.yaml`). The major version in the filename must match the major component of `product.version` inside the file. Backward-incompatible schema changes (removing a column, narrowing a type, making an optional column required) require a major-version bump and a new file; backward-compatible additions are minor bumps recorded only in `product.version`. This relationship is checked by `scripts/check_contract_schema.py`.

## The core layer and calculation

Metrics live in three layers: a shared **core** (universal financials plus the one universal operational input, headcount), **business-model overlays** such as `subscription` that any industry can opt into, and **industry verticals** that extend the core with their own operational and financial metrics. FP&A is a consuming function, not an industry or a layer.

Each calculated metric carries a machine-readable `calc` block:

- `expr` — a safe arithmetic expression over named variables (numbers, `+ - * / **`, parentheses, and the whitelisted functions `min`, `max`, `abs`, `round`).
- `inputs` — the raw input variables the expression needs.

Names in `expr` that are not declared inputs must be the `slug` of another metric (a dependency, resolved in topological order). Metrics that are directly measured rather than derived carry `input: true` instead of a `calc` block. The reference evaluator is `lib/ambient_calc`; `scripts/check_formulas.py` validates every formula in CI.
