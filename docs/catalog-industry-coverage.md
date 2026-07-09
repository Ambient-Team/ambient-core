# Catalog industry coverage and taxonomy gaps

This document tracks **how much of the global industry universe** the reference catalog covers today, and how packs map to **official classification codes**. The goal is a catalog for **all industries** over time; core ships KPI **templates** per vertical pack, not every ISIC class.

Authoring rules for codes on each pack: [catalog/README.md](../catalog/README.md#industry-classification). Schema: [catalog/schema/pack-v1.json](../catalog/schema/pack-v1.json).

## Pinned taxonomy versions

- **ISIC** — United Nations International Standard Industrial Classification, **Rev.4** (class = 4-digit).
- **NAICS** — U.S. Census **2022** (industry = 5–6 digits).
- **NACE** — Eurostat Statistical Classification of Economic Activities, **Rev.2** (class = `NN.NN`).
- **GICS** — MSCI Global Industry Classification Standard, **2023** (industry / sub-industry = 6–8 digits).

When UN, Census, Eurostat, or MSCI publish breaking revisions, update `revision` fields on affected packs, regenerate the manifest, and note the migration here.

## Current packs (16)

Each row is one directory under `catalog/industries/<pack>/`. Primary codes are class-level unless noted.

- **real_estate** — ISIC 6810, NAICS 531120, NACE 68.10, GICS 601020; secondaries for related real-estate services.
- **vertical_farming** — ISIC 0113, NAICS 111219, NACE 01.13, GICS 302020.
- **transportation** — ISIC 4923 (+4911, 5022); NAICS 484110 (+482111, 483111); multimodal freight/transit/maritime; confidence **medium**.
- **aviation** — ISIC 5110, NAICS 481111, NACE 51.10, GICS 203020.
- **manufacturing** — ISIC 2819, NAICS 333999, NACE 28.19, GICS 201060; confidence **provisional** (broad pack; split candidate).
- **healthcare** — ISIC 8610, NAICS 622110, NACE 86.10, GICS 351020.
- **restaurants** — ISIC 5610, NAICS 722511, NACE 56.10, GICS 253010.
- **life_sciences** — ISIC 7210, NAICS 541714, NACE 72.11, GICS 352010.
- **banking** — ISIC 6419, NAICS 522110, NACE 64.19, GICS 401010.
- **financial_services** — ISIC 6612 (+6611, 6630); NAICS 523150 (+523940); mixed securities, advisory, fund activity.
- **funds** — ISIC 6630, NAICS 523940, NACE 66.30, GICS 402030.
- **trusts** — ISIC 6430, NAICS 525120, NACE 64.30, GICS 601060.
- **insurance** — ISIC 6512, NAICS 524126, NACE 65.12, GICS 403010.
- **consumer_finance** — ISIC 6492, NAICS 522291, NACE 64.92, GICS 402020.
- **commercial_finance** — ISIC 6492, NAICS 522220, NACE 64.92, GICS 401010.
- **retail** — ISIC 4711, NAICS 455219, NACE 47.11, GICS 255040.

## ISIC Rev.4 section coverage (high level)

ISIC has 21 sections (A–U). Packs today materially cover only a subset:

- **C Manufacturing** — partial (single provisional pack; most divisions uncovered).
- **G Wholesale and retail** — partial (retail only; wholesale largely uncovered).
- **H Transportation and storage** — partial (transportation + aviation; many classes uncovered).
- **K Financial and insurance** — partial (multiple finance packs; not every class).
- **L Real estate** — partial (commercial real estate lens).
- **I Accommodation and food** — partial (restaurants; hotels 5510 uncovered).
- **Q Human health** — partial (provider lens; many classes uncovered).
- **M Professional, scientific** — partial (life sciences R&D lens).

**Uncovered or barely covered sections** (no dedicated pack yet): A Agriculture (except vertical farming niche), B Mining, D Electricity/gas, E Water/waste, F Construction, J Information/media (except tangential tech metrics), N Administrative support, O Public administration, P Education, R Arts/entertainment, S Other services, T Households, U Extraterritorial.

## Split and merge candidates

- **Manufacturing** — one pack cannot represent all of ISIC section C; plan division-level packs (e.g. food, chemicals, electronics) or NAICS 3-digit groups.
- **Transportation vs aviation** — separate packs are correct; align peer comparison on NAICS/GICS, not legacy combined profiles.
- **Financial_services vs banking vs funds** — overlapping ISIC 64–66; use **primary + secondary** codes and separate tenant orgs in the platform.
- **Healthcare vs life_sciences** — distinct ISIC sections (Q vs M); keep separate packs.

## Provisional / needs class review

- **manufacturing** — `confidence: provisional`; primary ISIC 2819 is illustrative, not a full section-C representation.

## Platform follow-ups (not in ambient-core)

- Hierarchical taxonomy browser (section → division → class) for assigning org industry codes.
- Cross-system mapping tables (ISIC ↔ NAICS ↔ NACE ↔ GICS) beyond per-pack primaries.
- Keyword and AI-assisted code suggestion with human review (`source: expert`).
- Peer benchmarking cohorts keyed off manifest `industryCodes` and tenant-selected primary system.

## Former sector profiles

Legacy `catalog/sector_profiles/` (financial and transportation comparison YAML) and manifest `financialSectorProfiles` were **removed** in favor of official taxonomy tags. Narrative comparison fields (revenue driver, regulation intensity) belong in the **platform** or future optional metadata—not duplicate taxonomies in core.

## Metric inputs and data options

Every metric should link to at least one data option (`metricIds`); run [`scripts/check_metric_inputs.py`](../scripts/check_metric_inputs.py) for per-industry `inputCoverage`. Enumerated upload templates use typed fields and `fieldCoverage: enumerated`; financial/document paths use `upload`. Harden packs with [`scripts/harden_catalog_data_options.py`](../scripts/harden_catalog_data_options.py); gap report: [catalog-input-field-gaps.md](catalog-input-field-gaps.md).
