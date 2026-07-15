# Naming & versioning conventions

This document is the canonical reference for how catalogue and contract assets are named, identified, and versioned. The rules here are enforced by `scripts/check_naming.py`, `scripts/check_catalog_hygiene.py`, and the contract validators in CI.

## Catalogue metric and data-option keys

New catalogue entries use a stable, human-readable slug key of the form `industry.segment.slug`:

- `industry` — lowercase industry token (for example `healthcare`, `life_sciences`).
- `segment` — sub-vertical within the industry (see the segment enum below). Use `core` when an entry is not segment-specific.
- `slug` — short lowercase identifier for the metric or data option (for example `patient_volume`, `claim_denial_rate`).

Examples: `healthcare.provider.patient_volume`, `healthcare.revenue_cycle.claim_denial_rate`, `life_sciences.rnd.trial_cost_per_patient`.

Keys are lowercase, use `_` within a token and `.` only as the three-part separator, and match `^[a-z][a-z0-9_]*\.[a-z0-9_]+\.[a-z0-9_]+$`.

The **core layer** (`catalog/shared/metrics.yaml`) holds metrics shared by every industry. The generator expands each into every pack with the key `industry.core.slug` (for example `healthcare.core.gross_margin`), assigning per-industry ids from `industryIds` in the same file. Every industry pack is therefore an extension on top of this shared layer.

## Integer ID allocation

Every metric and data option carries a unique integer `id`, and uniqueness across the whole catalogue is enforced by the generator and by `scripts/check_naming.py`. Two kinds of id exist:

- **Author-assigned native ids.** Each vertical's hand-written metrics occupy a small dedicated band: healthcare native ids use `900–999` (currently `911–915`), life-sciences native ids use the `1200–1299` band, banking and fee-market verticals use `1530–1605` (split across Banking, Financial Services, and Insurance packs), retail native ids use `1670–1689`, consumer finance natives use `1720–1799`, commercial finance natives use `1760–1789` (core expansion ids `1740–1754`), aviation natives use `1820–1859`, multimodal transportation natives (rail, maritime, transit, 3PL) use `1860–1899`, **Funds** natives use `1900–1917` and GP extension natives **`1922–1939`** (core expansion ids `1970–1984`; common data-option ids `1918–1921`), and **Trusts** natives use `1940–1949`. When adding a vertical, reserve a fresh band here before assigning ids.
- **Generated core-layer ids.** The shared metrics are expanded into each pack with ids allocated per industry in `catalog/shared/metrics.yaml` (`industryIds`); these occupy the higher `900–1099` range and are managed by the generator rather than chosen by hand.

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
- `depository` — deposit-taking bank book only (NIM, deposits, loan book, regulatory capital). Lives in the **Banking** catalog pack; not investment banking or wealth.
- `banking` — reserved segment label; prefer `depository` for new Banking-pack metrics.
- `investment_banking` — markets and advisory businesses without deposit funding (trading and mandate fee intensity).
- `fund` — pooled, advised, and institutional fund economics (AUM, flows, fees, closed-end performance, custody). Use the **Funds** industry pack; not a separate wealth, asset management, or private markets segment. On the same pack, segment **`operations`** holds private-capital **GP** metrics (sourcing, deployment, portfolio, co-investment, fundraising, program funnel)—aggregated at manager roll-up, not per LP or deal.
- `trust` — trust vehicles and trust administration (FFO, payout, vehicle-level same-store NOI). Use the **Trusts** industry pack; operational property metrics stay on **Real Estate**. Do not add a `reits` segment or REITs industry class.
- `insurance` — P&C and life insurers (combined and loss ratios, premium growth); prefer segment `property_casualty`, `life`, `health`, or `reinsurance` for new metrics.
- `life` — life insurance benefit and mortality experience.
- `health` — health insurance underwriting (reserved for future metrics).
- `property_casualty` — P&C combined and loss ratios, premium growth.
- `reinsurance` — reinsurance treaties (reserved for future metrics).
- `consumer_lending` — unsecured consumer and card portfolios (Consumer Finance industry).
- `commercial_lending` — C&I, middle-market, and commercial CRE loan books (Commercial Finance industry).
- `residential_mortgage` — residential mortgage lender book (Consumer Finance industry); property-operator collateral metrics stay on Real Estate.
- `network_carrier` — mainline passenger airlines (Aviation pack).
- `regional_carrier` — regional and capacity-purchase flying (reserved).
- `airport` — airport operators (aeronautical and commercial revenue).
- `travel_distribution` — OTAs, GDS, and metasearch (Aviation pack).
- `air_cargo` — dedicated and belly cargo (Aviation pack).
- `mro` — maintenance, repair, and overhaul (reserved).
- `aircraft_leasing` — lessors (reserved).
- `road_freight` — trucking and road fleet logistics (Transportation pack).
- `rail_freight` — freight railroads.
- `rail_passenger` — intercity and commuter passenger rail.
- `maritime_shipping` — ocean shipping and liner operators.
- `public_transit` — bus and urban rail agencies.
- `freight_forwarding` — 3PL and freight forwarders.

## Lens vs entity

Catalog **segments** describe business lines **within an industry pack** (the analysis lens), not SEC or statutory reportable segments unless your platform maps them intentionally one-to-one. Do not alias metrics across lenses (for example banking NIM vs real estate NOI, or road fleet utilization vs airline load factor)—each lens keeps its own keys; see analogous-concepts notes under transportation profiles in this document.

**Deposits and lending** are related on a balance sheet (`banking.depository.loan_to_deposit_ratio`) but are not the same economic line: institutions can gather deposits with a thin loan book, or lend with non-deposit funding. The **Banking** pack groups institution-wide depository and funding metrics under segment `depository`; **Commercial Finance** covers commercial and CRE lender books; **Consumer Finance** covers unsecured consumer credit and residential mortgage lender books; **Real Estate** covers property operations and collateral economics for RE orgs; **Funds** covers pooled and institutional fund books (`segment: fund`) and private-capital GP operating KPIs (`segment: operations` on the same pack; Gold shape `finance-private-capital-ops-v1`); fee-based accelerator or education programs billed as subscriptions compare on **Financial Services** (`subscription` segment) as a separate tenant org when needed; **Trusts** covers REIT and trust **vehicle** investor reporting (FFO, payout)—not a separate REITs picker. Risk and payments are not separate catalog industries—embed credit, liquidity, market, and payment-volume metrics on the pack and `finance-*-v1` contract for that lens. Macro peer benchmarks stay on the platform ([benchmarking-lifecycle.md](benchmarking-lifecycle.md)), not org Gold tables. A platform may assign books to different tenant orgs rather than forcing one legal name to one catalog picker.

**Gold contracts** — Each `finance-*-v1.yaml` product owns optional columns for its lens; backward-compatible column adds bump `product.version` minor (for example `1.1`) without a new filename. There is no `finance-risk-v1` or payments-industry contract; treasury and payment flows use Commercial or Consumer Finance columns where relevant.

## Financial sector comparison profiles

Cross-sector peer and comparison design should use **official industry codes** on each catalog pack (`industryCodes` in [`catalog/industries/<pack>/pack.yaml`](../catalog/industries/banking/pack.yaml)), exported on manifest industry rows (**manifest version 3**). Packs are registered in [`catalog/packs.yaml`](../catalog/packs.yaml). See [catalog-industry-coverage.md](catalog-industry-coverage.md) for taxonomy versions and global coverage gaps.

**Catalog data options (manifest v3)** export typed `fields`, `fieldCoverage` (`upload` | `enumerated`), `collectionFrequency`, `grain`, and per-metric `frequency`. After editing `data_options.yaml`, run [`scripts/harden_catalog_data_options.py`](../scripts/harden_catalog_data_options.py) and `ambient-catalog-generate --check` (CI also passes `--strict-data-option-inputs`). See [catalog-consumption.md](catalog-consumption.md) and [catalog/README.md](../catalog/README.md).

Allowed enum values in profiles include `globalAssetConcentration` (`highest`, `very_high`, `moderate`, `low_moderate`, `lowest`), `regulatoryIntensity` (`extremely_high`, `high`, `moderate_high`, `evolving`), `capitalModel` (`balance_sheet_heavy`, `capital_light`), and `cyclicality` (`highly_cyclical`, `defensive`, `mixed`).

## Transportation and aviation sector comparison profiles

Multimodal transport and aviation packs use **NAICS / ISIC / NACE / GICS** tags on [`catalog/industries/transportation/pack.yaml`](../catalog/industries/transportation/pack.yaml) and [`catalog/industries/aviation/pack.yaml`](../catalog/industries/aviation/pack.yaml) (see [catalog-industry-coverage.md](catalog-industry-coverage.md)).

**Integer ID bands (native metrics):** Aviation natives use **1820–1859** (data options through **1834**); Aviation core expansion ids use **1800–1814**; multimodal Transportation natives (rail, maritime, transit, 3PL) use **1860–1899**. Road-fleet legacy natives in the Transportation pack retain author ids **10–14** with segment `road_freight`.

### Analogous concepts across modes

Some KPI themes recur (utilization, energy, punctuality, unit economics), but **definitions and catalog keys are modal-specific**. Do not add aliases that equate road `fleet_utilization` to airline `load_factor`, or road `on_time_delivery_rate` to aviation `on_time_performance`.

- **Capacity use** — road `fleet_utilization` (time in use); aviation `load_factor` (RPM/ASM); maritime `vessel_utilization`; rail `train_utilization`.
- **Energy** — road `fuel_efficiency` (MPG); aviation `fuel_cost_pct_operating`; maritime bunker cost flows through TCE and voyage economics.
- **Reliability** — road `on_time_delivery_rate`; aviation, rail, transit, and forwarder each carry their own OTP or OTD slugs.
- **Unit economics** — road `maintenance_cost_per_mile`; aviation `casm` and `rasm`; maritime `time_charter_equivalent`; transit `ridership_per_vehicle_hour`.
- **Corporate close** — every industry pack still exposes `industry.core.*` from the shared core layer for comparable financial close metrics.
- **Subscription SaaS** — logistics and telematics SaaS metrics remain on the **Transportation** pack (`subscription` segment). Air **travel_distribution** uses booking take-rate and conversion metrics on the **Aviation** pack.

**Catalog industries:** **Aviation** (air ecosystem) and **Transportation (multimodal)** (surface freight, rail, maritime, public transit, forwarding) are separate pickers, analogous to Banking versus Financial Services.

## Alias policy

When a key is renamed, the old key is recorded in `catalog/aliases.yaml` mapping the legacy key to the canonical key. Aliases are retained for at least one minor release so downstream consumers keyed on the old identifier keep resolving, then removed in a subsequent release. Alias targets must be unique.

## Contract files and versions

Contract files live in `contracts/` and are named `product-slug-vMAJOR.yaml` (for example `healthcare-provider-ops-v1.yaml`). The major version in the filename must match the major component of `product.version` inside the file. Backward-incompatible schema changes (removing a column, narrowing a type, making an optional column required) require a major-version bump and a new file; backward-compatible additions are minor bumps recorded only in `product.version`. This relationship is checked by `scripts/check_contract_schema.py`.

Vertical Gold products declare **`product.consumption_id`** (for example `FINANCE_BANKING`) aligned with `contractProductId` in [`catalog/crosswalk.yaml`](../catalog/crosswalk.yaml). Platform-facing products may instead expose `firestore.paths[].logical_key` (for example `TENANT_METRICS` on tenant-metrics). CI validates crosswalk ids with `python scripts/check_crosswalk.py`.

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

Plain-text assets in git fall into a small set of roles. Each kind of data has one default:

- **YAML** — the human-authored source of truth: contracts, catalog metrics and industries, and the core layer. Chosen for comments, anchors, and readability for authors and reviewers. Lives in `contracts/` and `catalog/`.
- **JSON** — machine-generated interchange and schemas: the catalog `manifest.json`, JSON Schemas under `*/schema/`, and bronze upload mapping payloads. Generated, validated, and consumed by code; not hand-edited except through the generator or ingestion pipeline.
- **JavaScript (`.js`)** — machine-generated catalog **runtime** modules under `catalog/runtime/` (from `ambient-catalog-generate`), for browser or Node consumers that need the same expansion rules as the manifest. Same hygiene as JSON: regenerate after YAML edits; the only routine hand-edit is `catalog/runtime/catalogEnrichment.js` when documented in [catalog/README.md](../catalog/README.md).
- **JSONL** — append-only event or record streams: one JSON object per line, streamable and tolerant of nested values. Optional for structured logging in downstream apps, not for catalogue SSOT.
- **CSV** (or **TSV** when cell text may contain commas) — flat tabular exchange: bronze uploads, test fixtures, and metric extracts. Compact and streamable; TSV when commas appear inside cells. Used in bronze ingestion and `tests/pipeline/`.
- **Markdown / plain text** (`.md`, `.txt`) — prose: documentation, narrative, and the preferred carrier for unstructured or long-form text going into or out of processing (see below).

**Markdown pipe tables are forbidden** anywhere in the repo. They carry no information a CSV file does not, while being harder to diff, parse, and stream and adding pure layout overhead. Tabular data belongs in a `.csv`/`.tsv` file; comparisons inside prose are written as prose or bullet lists. This is enforced by `scripts/check_markdown_prose.py`.

When in doubt: use CSV (or TSV when cells contain commas) for flat tables, JSON for generated files and nested mapping payloads, JSONL for append-only event lines, YAML only for files a human authors by hand, generated `.js` only from `ambient-catalog-generate`, and Markdown/text for prose.

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
- **Forward cursors (downstream).** Once governed, data lands in durable stores that sit *after* the contract and catalog stage. Lakehouse **Silver → Gold** tables are written as columnar **Parquet / Delta** — validated, contract-shaped products whose defining contract still lives as YAML in `contracts/`. Downstream apps may store operational state in SQL as needed; Ambient Core does not ship an inference run store.

These plain-text formats are the currency that crosses both boundaries: a database is never read or written directly by the core, only through an extract or product expressed in one of them. On the **upstream** side an extract is shaped by what it contains — flat tables become **CSV/TSV**, nested or ragged structures become **JSON**, hand-authored definitions become **YAML**, and documents become **Markdown/text**. On the **downstream** side the store is *defined* by **YAML** (the contract) even though it physically persists as Parquet/Delta or SQL. Catalogue and contract semantics stay in YAML/JSON/JS in git. So a single fact flows: **upstream DB → text extract (CSV/JSON/YAML/MD) → governed by YAML contracts and catalog → downstream store (Parquet/Delta or SQL)**. This repo owns the middle text layer and the *definitions* of both ends; the binary and SQL ends themselves live in deployment, not here.

To choose a store: use plain text in git when you need source of truth or review; Parquet/Delta (defined by a YAML contract) for durable, queryable, large-scale governed output; and SQL (SQLite for dev, Postgres for prod) for the operational state of a running downstream service.

For an integrator-oriented view of this flow (catalog, contracts, and consumers), see [governed-data.md](governed-data.md).

### Encoding and enforcement

All text assets are UTF-8, LF-normalized, with a trailing newline, per `.editorconfig` and `.gitattributes`; YAML uses 2-space indentation; JSON and generated `.js` come from `ambient-catalog-generate` or other generators rather than hand-formatting. Existing CI hooks enforce the structure of these assets — `validate_contracts.py` and `check_contract_schema.py` for contract YAML, `check_catalog_hygiene.py`, `check_naming.py`, and `check_formulas.py` for catalog YAML, `harden_catalog_data_options.py --check` and `generate_reference_catalog.py --check --strict-data-option-inputs` for catalog data-option shape and manifest/runtime drift, and `check_markdown_prose.py` for docs. New format rules should extend these scripts rather than introduce a parallel checker.
