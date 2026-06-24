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

## Data formats and storage

This section is the default convention for which serialization format or store to use for a given kind of data, and where databases sit relative to the plain-text layer. It is deliberately simple: a baseline we build on until a concrete need challenges it, not a finished spec. The governing rule is **plain text first** — anything that defines what the core *is* lives as diffable, reviewable, LLM-parseable text under version control, and databases sit on either side of that text layer rather than inside it.

### Plain text first

Contracts, catalog semantics, and configuration are the source of truth, so they live as plain text in git. Binary or styled containers (`.xlsx`, `.pdf`, proprietary database dumps) are never the source of truth in this repo. Just as Markdown strips the layout overhead of a PDF, the formats below strip the styling, macros, and binary structure of formats like Excel, leaving pure data that both reviewers and LLMs parse with near-zero token waste. When data arrives in a binary or styled container, it is converted to the matching plain-text format at the ingestion boundary.

### Choosing a format

The core uses exactly four text formats. Each kind of data has one default:

- **YAML** — the human-authored source of truth: contracts, catalog metrics and industries, the core layer, and the Maestro registry and routing. Chosen for comments, anchors, and readability for authors and reviewers. Lives in `contracts/`, `catalog/`, and `config/`.
- **JSON** — machine-generated interchange, schemas, and structured records: the catalog manifest, JSON Schemas, bronze mapping files, and event/record output such as Maestro's per-run `maestro_run_complete` object. Generated, validated, and consumed by code and the JS runtime, not hand-edited. JSON is also the home for nested or ragged structures that do not fit a flat table.
- **CSV** (or **TSV** when cell text may contain commas) — flat tabular exchange: bronze uploads, test fixtures, and metric extracts. Compact and streamable, and every tool reads it; TSV reduces parsing confusion because tabs rarely appear inside cells. Used in bronze ingestion and `tests/pipeline/`.
- **Markdown / plain text** (`.md`, `.txt`) — prose: documentation, narrative, and the preferred carrier for unstructured or long-form text going into or out of processing (see below).

**Markdown pipe tables are forbidden** anywhere in the repo. They carry no information a CSV file does not, while being harder to diff, parse, and stream and adding pure layout overhead. Tabular data belongs in a `.csv`/`.tsv` file; comparisons inside prose are written as prose or bullet lists. This is enforced by `scripts/check_markdown_prose.py`.

When in doubt: use CSV (or TSV when cells contain commas) for flat tables, JSON when rows are nested or ragged, YAML only for files a human authors by hand, and Markdown/text for prose.

### Markdown and text over PDF for ingestion

For documents and unstructured content, Markdown (or its barer cousin plain `.txt`) is the default ingestion format, not PDF. The distinction is **layout versus information**: PDF, DOCX, and similar formats encode how a page *looks* — fonts, absolute positions, columns, embedded image fragments — and bury the actual content inside that scaffolding. Extracting clean text from them is lossy and error-prone (reading order breaks across columns, tables fracture, headers and footers leak in). Markdown and `.txt` carry the information directly, so both humans and models read them more accurately and at near-zero token waste. When a PDF or other styled document arrives, convert it to Markdown/text at the ingestion boundary and treat that as the canonical input.

Markdown earns the default for two further reasons:

- **Standardized equations.** Complex mathematical expressions have a single, text-native representation in Markdown (fenced/inline LaTeX, e.g. `$\frac{a}{b} + c^2$`), so formulas survive ingestion as parseable text instead of becoming flattened images or broken glyphs as they do in PDF. This lines up with the calculator's own text expressions (`calc.expr`).
- **Easy ASCII enforcement.** Because the content is plain text, a field can be constrained to a character band appropriate to its language, and linted cheaply. Two illustrative bands:
  - **English prose** — letters only, `A–Z` (`U+0041`–`U+005A`) and `a–z` (`U+0061`–`U+007A`), plus space and basic punctuation. Suitable for human-language labels and descriptions.
  - **English + programming/mathematics** — the full printable-ASCII band `U+0020`–`U+007E`, which adds the operator and symbol positions used by code and formulas: `+` (`U+002B`), `-` (`U+002D`), `*` (`U+002A`), `/` (`U+002F`), `=` (`U+003D`), `^` (`U+005E`), and parentheses. Suitable for `calc.expr`, identifiers, and any technical payload.

  Restricting a field to one band keeps content portable and diffable and rejects smart quotes, non-breaking spaces, and other invisible Unicode that silently breaks parsers.

### Where databases fit: precursors and forward cursors

Databases are not the system of record in core. They bracket the plain-text layer as **precursors** (sources upstream of the text layer) and **forward cursors** (durable sinks downstream of it):

- **Precursor stores (upstream).** Operational OLTP databases and the lakehouse **Bronze** zone are *sources*. Data originates in a real database — an application's Postgres, a warehouse — is **extracted to plain text** at the ingestion boundary, and only then enters governance. The core consumes the extract; it does not reach back into the source store. Example: a bronze CSV upload mapped into catalog shape via mapping JSON.
- **Forward cursors (downstream).** Once governed, data lands in durable stores that sit *after* the contract and catalog stage. Lakehouse **Silver → Gold** tables are written as columnar **Parquet / Delta** — validated, contract-shaped products whose defining contract still lives as YAML in `contracts/`. The **Maestro run store** holds operational control-plane state (`runs`, `run_events`) in **SQL**: `sqlite:///./maestro_runs.db` for local and dev, **Postgres** for platform deployments, selected by `MAESTRO_DATABASE_URL`.

The four text formats are the currency that crosses both boundaries: a database is never read or written directly by the core, only through an extract or product expressed in one of them. On the **upstream** side an extract is shaped by what it contains — flat tables become **CSV/TSV**, nested or ragged structures become **JSON**, hand-authored definitions become **YAML**, and documents become **Markdown/text**. On the **downstream** side the store is *defined* by **YAML** (the contract) even though it physically persists as Parquet/Delta or SQL. So a single fact flows: **upstream DB → text extract (CSV/JSON/YAML/MD) → governed by YAML contracts and catalog → downstream store (Parquet/Delta or SQL)**. This repo owns the middle text layer and the *definitions* of both ends; the binary and SQL ends themselves live in deployment, not here.

To choose a store: use plain text in git when you need source of truth, review, or LLM editing; Parquet/Delta (defined by a YAML contract) for durable, queryable, large-scale governed output; and SQL (SQLite for dev, Postgres for prod) for the operational state of a running service.

For an integrator-oriented view of this flow (catalog, contracts, and consumers), see [governed-data.md](governed-data.md).

### Encoding and enforcement

All text assets are UTF-8, LF-normalized, with a trailing newline, per `.editorconfig` and `.gitattributes`; YAML uses 2-space indentation, and JSON is generated rather than hand-formatted. Existing CI hooks enforce the structure of these assets — `validate_contracts.py` and `check_contract_schema.py` for contract YAML, `check_catalog_hygiene.py`, `check_naming.py`, and `check_formulas.py` for catalog YAML, `validate_inference_registry.py` for config YAML, and `check_markdown_prose.py` for docs. New format rules should extend these scripts rather than introduce a parallel checker.
