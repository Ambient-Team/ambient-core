# Ambient Systems Data Product Contracts

**Version:** 3
**Date:** July 2, 2026
**Author:** Ivan Damnjanovic
**Status:** Living catalog — production contracts
**Owner:** Platform Technical Team
**Linked roadmap:** 02_platform-roadmap.md (Horizon 1)
**YAML source of truth:** `contracts/` in Ambient-Team/ambient-core — https://github.com/Ambient-Team/ambient-core/tree/v0.2.6/contracts (platform pins tag **v0.2.6** via submodule; see ambient-systems-platform docs/ambient-core.md)

---

## Overview

- Platform summary: see README § Platform Summary — ../README.md#platform-summary.

The platform's only durable output is **contract-backed data products** — consumed by Consumption Adapter v1 (Firestore / React), Tableau, Power BI, and future read-only adapters. The platform is not a dashboard layer.

Explicit contracts define ownership, SLAs, quality guarantees, lineage, and the platform/consumption boundary. **Reference catalog** packs (industry benchmarks and metric templates under `catalog/` in ambient-core) support authoring; they are not substitutes for Gold contract outputs.

---

## Standard Contract Template

Every contract follows this structure (YAML + Unity Catalog metadata):

- **Product Name** (required) -- Human-readable name + version
- **Owner** (required) -- Accountable team or individual
- **Description & Purpose** (required) -- Intended use cases
- **Production Pipeline** (required) -- Notebook(s)/Job(s) or job bundle that produce it
- **Source Layers** (required) -- Bronze / Silver / Gold dependency
- **Schema Contract** (required) -- Columns, types, mandatory provenance
- **Quality Contract** (required) -- ISO 8000 tier, completeness/accuracy, quarantine rules
- **Freshness SLA** (required) -- Maximum acceptable lag
- **Multi-Tenant Isolation** (required) -- `org_id` partitioning + RLS
- **Access & Governance** (required) -- RLS, column masking, tags, RBAC
- **Allowed Consumption Paths** (required) -- Firestore, direct Gold, etc.
- **Versioning & Compatibility** (required) -- Semantic versioning + breaking-change policy
- **Deprecation Policy** (required) -- Notice period and migration path
- **Observability Link** (required) -- `pipeline_health` / freshness monitoring
- **Rationale & Trade-offs** (required) -- Key decisions

Contracts are materialized in Unity Catalog via table/column comments, `TBLPROPERTIES`, CHECK constraints, and RLS. Authoring rules and validation live in ambient-core (`validate-contracts`, meta-schema under `schema/`).

---

## Production mirror set (Consumption Adapter v1)

These core contracts map to the Firestore Gold mirror under each org gold collection (Consumption Adapter v1). Registry SSOT: ambient-systems-platform `schemas/firestore/registry.yaml`.

### Tenant Metrics Product (v1)

**YAML:** `contracts/tenant-metrics-v1.yaml`
**Layer:** Silver
**Purpose:** Cleansed, deduplicated, GDPR-pseudonymized, range-validated tenant metrics.
**Consumption:** Internal (Gold KPIs) + authorized BI tools.

### Org KPI Product (v1)

**YAML:** `contracts/org-kpi-v1.yaml`
**Layer:** Gold
**Purpose:** Vertical-specific KPIs (DSCR, Cap Rate, NOI, cost and efficiency metrics, etc.) using industry-standard methodologies.
**Consumption:** React via Firestore Consumption Adapter; Tableau/Power BI via direct Gold where policy allows.

### Data Quality and Lineage Product (v1)

**YAML:** `contracts/quality-v1.yaml`
**Layer:** Gold
**Purpose:** Per-org, per-run ISO 8000-aligned quality scorecard and audit trail.
**Consumption:** Internal monitoring + consumption-layer pipeline health views.

### Optimization Opportunity Product (v1)

**YAML:** `contracts/opportunity-v1.yaml`
**Layer:** Gold
**Purpose:** Governed optimization recommendations with provenance and confidence scores (WIPO WO2022240365 reference lineage).
**Status:** Contract live; full platform workflow materialization on Horizon 2 (see core docs/CORE_VS_PLATFORM.md).

### Observability Pipeline Product (v1)

**YAML:** `contracts/observability-pipeline-v1.yaml`
**Layer:** Gold
**Purpose:** Pipeline health, freshness, run history, anomaly detection.
**Consumption:** React data-pipeline views via Firestore sync; alerting and BI tools.
**Note:** Audit-oriented fields may use logical contract `observability-pipeline-audit-v1` in the registry.

### Operational Financial Bridge Product (v1)

**YAML:** `contracts/operational-financial-bridge-v1.yaml`
**Layer:** Gold
**Purpose:** Operational-to-financial alignment and variance signals for FP&A consumption.
**Consumption:** Firestore mirror + BI paths per contract.

---

## Extended catalog in ambient-core (v0.2.6)

Full column-level semantics: ambient-core `contracts/README.md` on the pinned tag. Summary by domain:

**Platform and metering**

- `commercial-usage-v1.yaml` — usage snapshot contract for finance and BI export (not a commercial SKU statement for core itself)

**Healthcare and life sciences**

- `healthcare-provider-ops-v1.yaml`, `healthcare-revenue-cycle-v1.yaml`, `healthcare-quality-outcomes-v1.yaml`
- `life-sciences-rnd-v1.yaml`

**Finance vertical Gold products**

- `finance-banking-v1.yaml`, `finance-commercial-finance-v1.yaml`, `finance-consumer-finance-v1.yaml`, `finance-investment-banking-v1.yaml`, `finance-funds-v1.yaml`, `finance-private-capital-ops-v1.yaml`, `finance-trusts-v1.yaml`, `finance-insurance-v1.yaml`

Finance contracts crosswalk to reference catalog industries via `catalog/crosswalk.yaml`. Regenerate catalog runtime artifacts with `ambient-catalog-generate` in core.

---

## Roadmap intent (not yet in core contracts)

**ESG Carbon Metrics Product** — HKEX ESG disclosure, carbon portfolio scoring, and cross-jurisdictional real-estate metrics remain **vault roadmap intent** for Horizon 2 until a YAML is authored in ambient-core. Do not cite a contract file until it exists in the pinned core release.

---

## Implementation and enforcement (July 2026)

- YAML in **ambient-core** `contracts/` is the single source of truth; platform consumes via git submodule pin (currently **v0.2.6**).
- Core CLIs: `validate-contracts`, `ambient-catalog-generate`; platform CI enforces contract validation and consumption release gates.
- Unity Catalog materialization and medallion jobs run in ambient-systems-platform OLAP layer; orchestration includes Databricks Asset Bundles and jobs (Lakeflow/declarative migration tracked in backlog/technical-backlog.md).
- Firestore path: `FirestoreConsumptionAdapter.js` reads governed Gold mirror only; external BI may use Delta Sharing or UC SQL per policy.
- Do not maintain a parallel editable `contracts/` tree in the platform repo.

---

## Trade-offs

- Lightweight YAML + Unity Catalog (no separate catalog service) — intentional.
- Observability and bridge contracts close Horizon 1 observability and FP&A alignment gaps.
- Vertical finance and healthcare contracts expand diligence surface in open core without duplicating full schemas in this vault.

---

**Related Documents**
- Platform Roadmap → 02_platform-roadmap.md
- User Journey → 04_user-journey.md
- Strategy → 01_internal-master-strategy.md
- Executive Summary → 05_executive-summary.md
- Repo map (legacy vs platform vs core) → ../../product/engineering/LEGACY-vs-PLATFORM.md
- Repository SSOT → ../README.md

*Last alignment: July 2, 2026 | Public doctrine alignment*
