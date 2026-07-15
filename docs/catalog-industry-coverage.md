# Catalog industry coverage and taxonomy gaps

This document tracks how much of the global industry universe the reference catalog covers today, and how packs map to official classification codes. The goal is a catalog for all industries over time; core ships KPI templates per vertical pack, not every ISIC class.

Authoring rules for codes on each pack: catalog/README.md -- Industry classification. Schema: catalog/schema/pack-v1.json.

## Pinned taxonomy versions

- ISIC -- United Nations International Standard Industrial Classification, Rev.4 (class = 4-digit).
- NAICS -- U.S. Census 2022 (industry = 5-6 digits).
- NACE -- Eurostat Statistical Classification of Economic Activities, Rev.2 (class = NN.NN).
- GICS -- MSCI Global Industry Classification Standard, 2023 (industry / sub-industry = 6-8 digits).

When UN, Census, Eurostat, or MSCI publish breaking revisions, update `revision` fields on affected packs, regenerate the manifest, and note the migration here.

## Current packs (17)

Each row is one directory under `catalog/industries/`. Primary codes are class-level unless noted.

- **real_estate** -- ISIC 6810, NAICS 531120, NACE 68.10, GICS 601020; secondaries for related real-estate services.
- **vertical_farming** -- ISIC 0113, NAICS 111219, NACE 01.13, GICS 302020.
- **transportation** -- ISIC 4923 (secondary 4912, 5022); NAICS 484110 (secondary 484122, 483111); freight-only: road, rail, maritime, forwarding; confidence high.
- **passenger_transit** -- ISIC 4922 (secondary 4911); NAICS 485111; NACE 49.31 (secondary 49.10); GICS 203040; rail passenger and public/urban transit; confidence medium.
- **aviation** -- ISIC 5110, NAICS 481111, NACE 51.10, GICS 203020.
- **manufacturing** -- ISIC 2819, NAICS 333999, NACE 28.19, GICS 201060; machinery and discrete; confidence medium.
- **healthcare** -- ISIC 8610, NAICS 622110, NACE 86.10, GICS 351020.
- **restaurants** -- ISIC 5610, NAICS 722511, NACE 56.10, GICS 253010.
- **life_sciences** -- ISIC 7210, NAICS 541714, NACE 72.11, GICS 352010.
- **banking** -- ISIC 6419, NAICS 522110, NACE 64.19, GICS 401010; depository institutions.
- **financial_services** -- ISIC 6612 (secondary 6611); NAICS 523150; securities intermediation and investment banking; funds-management activity moved to funds pack.
- **funds** -- ISIC 6630, NAICS 523940, NACE 66.30, GICS 402030.
- **trusts** -- ISIC 6430, NAICS 525120, NACE 64.30, GICS 402010; fiduciary and investment trusts; REIT FFO metrics moved to real_estate.reit segment.
- **insurance** -- ISIC 6512 (secondary 6511), NAICS 524126, NACE 65.12 (secondary 65.11), GICS 403010; P and C primary, life secondary.
- **credit_granting** -- ISIC 6492, NAICS 522291 (secondary 522220), NACE 64.92, GICS 402020 (secondary 402010); merged from former consumer_finance and commercial_finance packs; segments: consumer_lending, residential_mortgage, commercial_lending.
- **software_saas** -- ISIC 5820, NAICS 511210, NACE 58.29, GICS 451030; subscription software; SaaS metrics consolidated here from all other packs.
- **retail** -- ISIC 4711, NAICS 455219, NACE 47.11, GICS 255040.

## Pack migrations (July 2026)

The following structural changes were applied in the ISIC Rev.4 alignment pass:

- **consumer_finance and commercial_finance merged into credit_granting** -- both packs targeted ISIC 6492 (other credit granting). Segments consumer_lending, residential_mortgage, and commercial_lending are preserved. All old keys aliased in catalog/aliases.yaml.
- **SaaS metrics consolidated into software_saas** -- subscription KPIs (MRR, ARR, NRR, gross churn, CAC, LTV, LTV/CAC, Rule of 40) were duplicated across financial_services, manufacturing, and transportation. They now live only in software_saas (ISIC 5820). Old keys aliased.
- **passenger_transit created from transportation** -- rail_passenger and public_transit segments split out; transportation is now freight-only (road, rail freight, maritime, forwarding). Old keys aliased.
- **trusts GICS retargeted** -- GICS moved from 601060 (Real Estate Investment Trusts) to 402010 (Diversified Financials), reflecting that trusts here are fiduciary/investment vehicles, not REITs. FFO, FFO payout ratio, and same-store NOI growth moved to real_estate.reit segment. Old keys aliased.
- **financial_services narrowed** -- dropped ISIC/NACE 6630/66.30 secondary (moved to funds pack); kept ISIC 6612 + secondary 6611.
- **insurance widened** -- added ISIC secondary 6511 and NACE secondary 65.11 for life segment.
- **manufacturing confidence lifted** -- provisional to medium after scope narrowed to machinery and discrete (ISIC 2819).
- **transportation confidence lifted** -- medium to high after scope narrowed to freight-only (ISIC 4923).

## ISIC Rev.4 section coverage (high level)

ISIC has 21 sections (A-U). Packs today materially cover only a subset:

- **A Agriculture, Forestry and Fishing** -- partial (vertical farming niche only; division 01 class 0113).
- **C Manufacturing** -- partial (single pack; machinery and discrete only; most divisions uncovered).
- **G Wholesale and Retail Trade** -- partial (retail only; wholesale largely uncovered).
- **H Transportation and Storage** -- partial (transportation freight + aviation + passenger transit; many classes uncovered).
- **I Accommodation and Food Service** -- partial (restaurants; hotels 5510 uncovered).
- **J Information and Communication** -- partial (software_saas covers 5820; most of J uncovered).
- **K Financial and Insurance Activities** -- good coverage (banking 6419, financial_services 6612, funds 6630, credit_granting 6492, trusts 6430, insurance 6512).
- **L Real Estate Activities** -- partial (commercial real estate and REIT lens).
- **M Professional, Scientific and Technical** -- partial (life sciences R&D lens; 7210).
- **Q Human Health and Social Work** -- partial (provider lens; 8610 only).

Uncovered or barely covered sections (no dedicated pack yet): B Mining, D Electricity/gas, E Water/waste, F Construction, N Administrative support, O Public administration, P Education, R Arts/entertainment, S Other services, T Households, U Extraterritorial.

## ISIC hierarchy on manifest

The manifest generator derives `section` (letter A-U), `division` (2-digit), and `group` (3-digit) from the 4-digit ISIC primary class code at generate time using the Rev.4 section letter map. These fields appear on the ISIC block of each industry row in catalog/manifest.json. They are read-only derived values; do not add them to pack.yaml source files.

## Split and merge candidates

- **Manufacturing** -- one pack cannot represent all of ISIC section C; plan division-level packs (e.g. food and beverage, chemicals, electronics) or NAICS 3-digit groups.
- **Transportation vs aviation** -- separate packs are correct; align peer comparison on NAICS/GICS.
- **Financial_services vs banking vs funds vs credit_granting** -- overlapping ISIC 64-66; use primary and secondary codes and separate tenant orgs in the platform.
- **Healthcare vs life_sciences** -- distinct ISIC sections (Q vs M); keep separate packs.

## Provisional / needs class review

- No packs at provisional confidence after July 2026 pass. Manufacturing and passenger_transit are medium.

## Platform follow-ups (not in ambient-core)

- Hierarchical taxonomy browser (section to division to class) for assigning org industry codes.
- Cross-system mapping tables (ISIC to NAICS to NACE to GICS) beyond per-pack primaries.
- Keyword and AI-assisted code suggestion with human review (source: expert).
- Peer benchmarking cohorts keyed off manifest industryCodes and tenant-selected primary system.

## Former sector profiles

Legacy `catalog/sector_profiles/` (financial and transportation comparison YAML) and manifest `financialSectorProfiles` were removed in favor of official taxonomy tags. Narrative comparison fields (revenue driver, regulation intensity) belong in the platform or future optional metadata -- not duplicate taxonomies in core.

## Metric inputs and data options

Every metric should link to at least one data option (metricIds); run `scripts/check_metric_inputs.py` for per-industry inputCoverage. Enumerated upload templates use typed fields and fieldCoverage: enumerated; financial/document paths use upload. Harden packs with `scripts/harden_catalog_data_options.py`; gap report: catalog-input-field-gaps.md.
