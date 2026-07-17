---
title: Data product contracts
status: active
sensitivity: internal
updated: 2026-07-13
version: 4
author: Ivan Damnjanovic
---

# Data product contracts

Purpose: human-readable catalog of contract-backed data products (path B). Layer: technical lane intent.

YAML source of truth: contracts/ in Ambient-Team/ambient-core on pin v0.3.3 -- https://github.com/Ambient-Team/ambient-core/tree/v0.3.3/contracts (platform pins via submodule; see ambient-systems-platform docs/ambient-core.md).

Not PhD-derived claims. Not commercial SKU statements from metering contracts.

Platform summary: see README Platform Summary -- ../../README.md#platform-summary.

---

## Overview

The platform's only durable output is contract-backed data products -- consumed by Consumption Adapter v1 (Firestore / React), Tableau, Power BI, and future read-only adapters. The platform is not a dashboard layer.

Explicit contracts define ownership, SLAs, quality guarantees, lineage, and the platform/consumption boundary. Reference catalog packs (industry benchmarks and metric templates under catalog/ in ambient-core) support authoring; they are not substitutes for Gold contract outputs.

---

## Standard contract template

Every contract follows this structure (YAML + Unity Catalog metadata):

- Product Name (required) -- Human-readable name + version
- Owner (required) -- Accountable team or individual
- Description and Purpose (required) -- Intended use cases
- Production Pipeline (required) -- Notebook(s)/Job(s) or job bundle that produce it
- Source Layers (required) -- Bronze / Silver / Gold dependency
- Schema Contract (required) -- Columns, types, mandatory provenance
- Quality Contract (required) -- ISO 8000 tier, completeness/accuracy, quarantine rules
- Freshness SLA (required) -- Maximum acceptable lag
- Multi-Tenant Isolation (required) -- org_id partitioning + RLS
- Access and Governance (required) -- RLS, column masking, tags, RBAC
- Allowed Consumption Paths (required) -- Firestore, direct Gold, etc.
- Versioning and Compatibility (required) -- Semantic versioning + breaking-change policy
- Deprecation Policy (required) -- Notice period and migration path
- Observability Link (required) -- pipeline_health / freshness monitoring
- Rationale and Trade-offs (required) -- Key decisions

Contracts are materialized in Unity Catalog via table/column comments, TBLPROPERTIES, CHECK constraints, and RLS. Authoring rules and validation live in ambient-core (validate-contracts, meta-schema under schema/).

---

## Production mirror set (Consumption Adapter v1)

These core contracts map to the Firestore Gold mirror under each org gold collection (Consumption Adapter v1). Registry SSOT: ambient-systems-platform schemas/firestore/registry.yaml.

### Tenant Metrics Product (v1)

- YAML: contracts/tenant-metrics-v1.yaml
- Layer: Silver
- Purpose: Cleansed, deduplicated, GDPR-pseudonymized, range-validated tenant metrics.
- Consumption: Internal (Gold KPIs) + authorized BI tools.

### Org KPI Product (v1)

- YAML: contracts/org-kpi-v1.yaml
- Layer: Gold
- Purpose: Vertical-specific KPIs (DSCR, Cap Rate, NOI, cost and efficiency metrics, etc.) using industry-standard methodologies.
- Consumption: React via Firestore Consumption Adapter; Tableau/Power BI via direct Gold where policy allows.

### Data Quality and Lineage Product (v1)

- YAML: contracts/quality-v1.yaml
- Layer: Gold
- Purpose: Per-org, per-run ISO 8000-aligned quality scorecard and audit trail.
- Consumption: Internal monitoring + consumption-layer pipeline health views.

### Optimization Opportunity Product (v1)

- YAML: contracts/opportunity-v1.yaml
- Layer: Gold
- Purpose: Governed optimization recommendations with provenance and confidence scores (WIPO WO2022240365 reference lineage).
- Status: Contract live; full platform workflow materialization on Horizon 2 (see core docs/CORE_VS_PLATFORM.md).

### Observability Pipeline Product (v1)

- YAML: contracts/observability-pipeline-v1.yaml
- Layer: Gold
- Purpose: Pipeline health, freshness, run history, anomaly detection.
- Consumption: React data-pipeline views via Firestore sync; alerting and BI tools.
- Note: Audit-oriented fields may use logical contract observability-pipeline-audit-v1 in the registry.

### Operational Financial Bridge Product (v1)

- YAML: contracts/operational-financial-bridge-v1.yaml
- Layer: Gold
- Purpose: Operational-to-financial alignment and variance signals for FP and A consumption.
- Consumption: Firestore mirror + BI paths per contract.

---

## Extended catalog in ambient-core (v0.3.3)

Full column-level semantics: ambient-core contracts/README.md on the pinned tag. Summary by domain:

Platform and metering:

- commercial-usage-v1.yaml -- usage snapshot contract for finance and BI export (not a commercial SKU statement for core itself)
Healthcare and life sciences:

- healthcare-provider-ops-v1.yaml, healthcare-revenue-cycle-v1.yaml, healthcare-quality-outcomes-v1.yaml
- life-sciences-rnd-v1.yaml

Finance vertical Gold products:

- finance-banking-v1.yaml, finance-commercial-finance-v1.yaml, finance-consumer-finance-v1.yaml, finance-investment-banking-v1.yaml, finance-funds-v1.yaml, finance-private-capital-ops-v1.yaml, finance-trusts-v1.yaml, finance-insurance-v1.yaml

Finance contracts crosswalk to reference catalog industries via catalog/crosswalk.yaml. Regenerate catalog runtime artifacts with ambient-catalog-generate in core.

### Reference catalog industry identity (ISIC-first)

Catalog vertical packs in ambient-core are analysis lenses tagged with official codes. Identity is ISIC Rev.4 class-level primary; NAICS 2022, NACE Rev.2, and GICS 2023 are published equivalents on the same pack (crosswalk), not competing primary trees. Manifest export may include derived ISIC section, division, and group for hierarchy browsing. Pack YAML and coverage roadmap live only in ambient-core (docs/catalog-industry-coverage.md); this repository does not duplicate pack tables. Lane 1 tracking: backlog/technical-backlog.md -- ISIC Rev.4 hierarchy full catalog alignment.

---

## Roadmap intent (not yet in core contracts)

ESG Carbon Metrics Product -- HKEX ESG disclosure, carbon portfolio scoring, and cross-jurisdictional real-estate metrics remain repository roadmap intent for Horizon 2 until a YAML is authored in ambient-core. Do not cite a contract file until it exists in the pinned core release.

---

## Implementation and enforcement (July 2026)

- YAML in ambient-core contracts/ is the single source of truth; platform consumes via git submodule pin (currently v0.3.3).
- Core CLIs: validate-contracts, ambient-catalog-generate; platform CI enforces contract validation and consumption release gates.
- Unity Catalog materialization and medallion jobs run in ambient-systems-platform OLAP layer; orchestration includes Databricks Asset Bundles and jobs (Lakeflow/declarative migration tracked in backlog/technical-backlog.md).
- Firestore path: FirestoreConsumptionAdapter.js reads governed Gold mirror only; external BI may use Delta Sharing or UC SQL per policy.
- Do not maintain a parallel editable contracts/ tree in the platform repo.

---

## Trade-offs

- Lightweight YAML + Unity Catalog (no separate catalog service) -- intentional.
- Observability and bridge contracts close Horizon 1 observability and FP and A alignment gaps.
- Vertical finance and healthcare contracts expand diligence surface in open core without duplicating full schemas in this repository.

---

## Related documents

- Platform roadmap -- 02_platform-roadmap.md
- User journey -- 04_user-journey.md
- Strategy -- 01_internal-master-strategy.md
- Executive summary -- 05_executive-summary.md
- Repo map (legacy vs platform vs core) -- ../../product/engineering/LEGACY-vs-PLATFORM.md

*Last alignment: July 16, 2026 | Public doctrine alignment*
