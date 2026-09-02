# Demo data (OSS)

Manufacturing CSV demos for the local medallion notebooks and smoke runner. Filenames match the commercial platform demo set (`Allmanufacturingds-*.csv`).

## Layout

- **`raw/`** — upload-boundary CSVs (headers align with catalog data-option fields where those options exist).
- Downstream notebooks write Bronze / Silver / Gold under a local output directory (default `.lakehouse/`), not into this tree.

## Catalog alignment

Six files map to manufacturing catalog options in `catalog/`:

- `Allmanufacturingds-general-ledger`
- `Allmanufacturingds-bank-statements`
- `Allmanufacturingds-balance-sheet`
- `Allmanufacturingds-ar-aging`
- `Allmanufacturingds-ap-aging`
- `Allmanufacturingds-inventory-records`

`Allmanufacturingds-marketing-spend` and `Allmanufacturingds-crm-pipeline` use the same field shapes as peer industry packs (marketing spend / CRM pipeline). Manufacturing catalog keys for those two names are not yet published; notebooks still ingest the CSVs for the demo set.

## Synthetic content

Rows are small, fictional demo values for local Spark/Delta runs. Do not treat them as production or customer data.
