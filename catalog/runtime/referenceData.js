/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import { enrichDataOptions, inferFieldRule } from './catalogEnrichment.js';

export { inferFieldRule };

export const REFERENCE_DATA = {
  "dataOptions": {
    "AllrealestateGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1082,
      "industry": "Real Estate",
      "metricIds": [
        1,
        2,
        3,
        4,
        5,
        8
      ]
    },
    "Allrealestate5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1076,
      "industry": "Real Estate",
      "metricIds": [
        956
      ]
    },
    "AllrealestateQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1088,
      "industry": "Real Estate",
      "metricIds": [
        938,
        944,
        956
      ]
    },
    "AllrealestateqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1094,
      "industry": "Real Estate",
      "metricIds": [
        956,
        944
      ]
    },
    "2j9pysT31hgn2DQcejtz": {
      "description": "Records of income received from renting a property.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "rent_collection_date",
        "rent_amount",
        "tenant_name",
        "payment_method",
        "payment_status"
      ],
      "format": "Document",
      "id": 6,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        4,
        6
      ],
      "name": "Rental income records",
      "template": "Transactional Data Template"
    },
    "Grtv4vjRFWRmrDSFF8cS": {
      "description": "Records of energy consumption and billing.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "bill_date",
        "energy_consumed",
        "energy_cost",
        "provider_name"
      ],
      "format": "Document",
      "id": 21,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        2,
        3
      ],
      "name": "Energy bills",
      "template": "Document"
    },
    "TPRNcAtqtiY387QTkah7": {
      "description": "Loan agreements used to finance property purchases.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "mortgage_lender",
        "loan_amount",
        "interest_rate",
        "loan_term",
        "monthly_payment",
        "start_date",
        "end_date"
      ],
      "format": "Document",
      "id": 7,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        7
      ],
      "name": "Mortgage documents",
      "template": "Document"
    },
    "UVuuRwg8ksAOiP3WlKKr": {
      "description": "Documents related to the purchase of a property.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "purchase_date",
        "purchase_price",
        "seller_name",
        "property_location",
        "property_type",
        "mortgage_details"
      ],
      "format": "Document",
      "id": 2,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        1
      ],
      "name": "Property purchase records",
      "template": "Document"
    },
    "bs0gsbE2YDGDHyqRtkx8": {
      "description": "Documents related to the sale of a property.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "sale_date",
        "sale_price",
        "buyer_name",
        "property_location",
        "property_type",
        "agent_details"
      ],
      "format": "Document",
      "id": 3,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        1
      ],
      "name": "Sale records",
      "template": "Document"
    },
    "gKEmKLl2XRjSbTQGztuy": {
      "description": "Software used to manage rental properties.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "tenant_name",
        "lease_start_date",
        "lease_end_date",
        "monthly_rent",
        "maintenance_records",
        "payment_status"
      ],
      "format": "Software",
      "id": 4,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        2,
        9
      ],
      "name": "Property management systems",
      "template": "Document"
    },
    "jYYkOyU5EQfa40iMf9x8": {
      "description": "Documents containing an estimate of a property's value.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "property_id",
        "valuation_date",
        "valuation_amount",
        "valuer_name",
        "valuation_method",
        "property_location"
      ],
      "format": "Document",
      "id": 5,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        3,
        6
      ],
      "name": "Property valuation reports",
      "template": "Document"
    },
    "ohvSqlJVvLde3k1gqYZh": {
      "description": "Loan agreements used for various purposes (e.g., equipment financing).",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "format": "Document",
      "id": 8,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        8
      ],
      "name": "Loan documents",
      "template": "Document"
    },
    "Allrealestateds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1100,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        938,
        944,
        950,
        956,
        962,
        974,
        980,
        992,
        1034
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Allrealestateds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1106,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        926,
        932,
        968
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Allrealestateds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1112,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        926,
        932,
        968,
        986
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Allrealestateds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1118,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        974,
        986
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Allrealestateds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1124,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        980,
        986
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Allrealestateds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1130,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        992,
        998,
        1004
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Allrealestateds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1136,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1010,
        1016,
        1022,
        1028,
        1040,
        1046,
        1052
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allrealestateds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1142,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1010,
        1034
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allrealestateds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1148,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1022,
        1028
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allrealestateds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1154,
      "industry": "Real Estate",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1034,
        1046
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "AllverticalfarmingGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1083,
      "industry": "Vertical Farming",
      "metricIds": [
        927,
        939,
        945,
        957,
        951,
        993
      ]
    },
    "Allverticalfarming5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1077,
      "industry": "Vertical Farming",
      "metricIds": [
        18
      ]
    },
    "AllverticalfarmingQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1089,
      "industry": "Vertical Farming",
      "metricIds": [
        20,
        21,
        939
      ]
    },
    "AllverticalfarmingqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1095,
      "industry": "Vertical Farming",
      "metricIds": [
        18,
        20
      ]
    },
    "DRHUJoXTe9TO3vlfY8bK": {
      "description": "Records related to irrigation activities.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "format": "Document",
      "id": 20,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        16
      ],
      "name": "Irrigation logs",
      "template": "Document"
    },
    "QKVboc2mj2QQ8u2RFOF1": {
      "description": "Software used to manage agricultural operations.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "farm_id",
        "crop_planted"
      ],
      "format": "Software",
      "id": 10,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        15,
        16,
        17,
        19,
        20,
        21,
        22,
        23
      ],
      "name": "Farm management systems",
      "template": "Document"
    },
    "SuYpCOlDxv3Q0Sf2xq9L": {
      "description": "Records of the amount and type of produce harvested.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "farm_id",
        "crop_type",
        "harvest_date",
        "quantity_harvested",
        "market_price",
        "quality_grade"
      ],
      "format": "Document",
      "id": 9,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        15,
        18
      ],
      "name": "Harvest logs",
      "template": "Document"
    },
    "mZgKaZV2P6tbi7msxL3y": {
      "description": "Software used to monitor crop growth and health.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "format": "Software",
      "id": 19,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        15,
        19
      ],
      "name": "Crop monitoring systems",
      "template": "Document"
    },
    "Allverticalfarmingds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1101,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        939,
        945,
        951,
        957,
        963,
        975,
        981,
        993,
        1035
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Allverticalfarmingds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1107,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        927,
        933,
        969
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Allverticalfarmingds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1113,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        927,
        933,
        969,
        987
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Allverticalfarmingds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1119,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        975,
        987
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Allverticalfarmingds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1125,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        981,
        987
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Allverticalfarmingds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1131,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        993,
        999,
        1005
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Allverticalfarmingds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1137,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1011,
        1017,
        1023,
        1029,
        1041,
        1047,
        1053
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allverticalfarmingds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1143,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1011,
        1035
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allverticalfarmingds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1149,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1023,
        1029
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allverticalfarmingds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1155,
      "industry": "Vertical Farming",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1035,
        1047
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "AlltransportationGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1084,
      "industry": "Transportation",
      "metricIds": [
        928,
        940,
        946,
        958,
        952,
        994
      ]
    },
    "Alltransportation5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1078,
      "industry": "Transportation",
      "metricIds": [
        14
      ]
    },
    "AlltransportationQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1090,
      "industry": "Transportation",
      "metricIds": [
        940,
        946,
        958
      ]
    },
    "AlltransportationqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1096,
      "industry": "Transportation",
      "metricIds": [
        14,
        13
      ]
    },
    "5tZAB2WLZbRDQdj6l7X6": {
      "description": "Data collected from in-vehicle sensors to monitor vehicle performance.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "vehicle_id",
        "telematics_date",
        "engine_performance",
        "fuel_efficiency",
        "maintenance_alerts",
        "driver_behavior"
      ],
      "format": "Document",
      "id": 13,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        10
      ],
      "name": "Vehicle telematics data",
      "template": "Document"
    },
    "DclVZaLbyz6Pwxt5Ctr1": {
      "description": "Records of maintenance activities.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "format": "Document",
      "id": 16,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        13
      ],
      "name": "Maintenance logs",
      "template": "Document"
    },
    "Ta6fK4eo9bymVVQGYEpl": {
      "description": "Software used to manage a fleet of vehicles.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "fleet_id",
        "vehicle_ids",
        "maintenance_schedule",
        "fuel_logs",
        "insurance_details"
      ],
      "format": "Software",
      "id": 14,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        11
      ],
      "name": "Fleet management systems",
      "template": "Document"
    },
    "i0N19s7GpHi9QTyG5dhM": {
      "description": "Records of deliveries made, including location and timing.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "delivery_date",
        "vehicle_id",
        "route_id",
        "delivery_status",
        "delivery_address",
        "customer_name",
        "delivery_time"
      ],
      "format": "Document",
      "id": 15,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        12
      ],
      "name": "Delivery logs",
      "template": "Document"
    },
    "jHscrlnM67xOUF1IXfos": {
      "description": "Data collected from GPS devices to track location and movement.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "vehicle_id",
        "tracking_date",
        "start_location",
        "end_location",
        "distance_travelled",
        "average_speed",
        "route_taken"
      ],
      "format": "Document",
      "id": 12,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        10,
        11,
        12,
        13
      ],
      "name": "GPS tracking data",
      "template": "Document"
    },
    "uRTkFZUmJC2BLwoRtJxL": {
      "description": "Records of fuel consumption for vehicles or machinery.",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "vehicle_id",
        "fuel_type",
        "fuel_date",
        "fuel_quantity",
        "fuel_cost",
        "odometer_reading"
      ],
      "format": "Document",
      "id": 11,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        10
      ],
      "name": "Fuel logs",
      "template": "Document"
    },
    "Alltransportationds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1102,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        940,
        946,
        952,
        958,
        964,
        976,
        982,
        994,
        1036
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Alltransportationds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1108,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        928,
        934,
        970
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Alltransportationds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1114,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        928,
        934,
        970,
        988
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Alltransportationds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1120,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        976,
        988
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Alltransportationds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1126,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        982,
        988
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Alltransportationds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1132,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        994,
        1000,
        1006
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Alltransportationds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1138,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1012,
        1018,
        1024,
        1030,
        1042,
        1048,
        1054
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Alltransportationds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1144,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1012,
        1036
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Alltransportationds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1150,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1024,
        1030
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Alltransportationds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1156,
      "industry": "Transportation",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1036,
        1048
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "AllmanufacturingGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1085,
      "industry": "Manufacturing",
      "metricIds": [
        929,
        941,
        947,
        959,
        953,
        995
      ]
    },
    "Allmanufacturing5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1079,
      "industry": "Manufacturing",
      "metricIds": [
        959
      ]
    },
    "AllmanufacturingQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1091,
      "industry": "Manufacturing",
      "metricIds": [
        941,
        947,
        959
      ]
    },
    "AllmanufacturingqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1097,
      "industry": "Manufacturing",
      "metricIds": [
        959,
        947
      ]
    },
    "MfgMes901CatalogOptionKey01": {
      "id": 901,
      "name": "MES production export",
      "description": "Shop-floor production counts, run times, and work-order completion by line or cell.",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Transactional Data Template",
      "fields": [
        "date",
        "line_id",
        "work_order_id",
        "units_produced",
        "units_scrapped",
        "run_minutes",
        "planned_minutes"
      ],
      "metricIds": [
        901,
        902,
        905
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "MfgErp902CatalogOptionKey02": {
      "id": 902,
      "name": "ERP general ledger (manufacturing)",
      "description": "Period GL balances for COGS, inventory, and manufacturing overhead accounts.",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit",
        "credit",
        "balance",
        "cost_center"
      ],
      "metricIds": [
        903,
        905
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "MfgCmms903CatalogOptionKey03": {
      "id": 903,
      "name": "CMMS maintenance logs",
      "description": "Work orders, downtime reason codes, and mean time between failures by asset.",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "asset_id",
        "downtime_minutes",
        "reason_code",
        "planned_flag"
      ],
      "metricIds": [
        904
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "MfgQual904CatalogOptionKey04": {
      "id": 904,
      "name": "Quality inspection logs",
      "description": "Lot-level pass/fail, defect codes, and rework disposition (no customer PII).",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Transactional Data Template",
      "fields": [
        "date",
        "lot_id",
        "units_inspected",
        "units_failed",
        "defect_code"
      ],
      "metricIds": [
        902
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "Allmanufacturingds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1103,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        941,
        947,
        953,
        959,
        965,
        977,
        983,
        995,
        1037
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Allmanufacturingds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1109,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        929,
        935,
        971
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Allmanufacturingds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1115,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        929,
        935,
        971,
        989
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Allmanufacturingds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1121,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        977,
        989
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Allmanufacturingds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1127,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        983,
        989
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Allmanufacturingds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1133,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        995,
        1001,
        1007
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Allmanufacturingds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1139,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1013,
        1019,
        1025,
        1031,
        1043,
        1049,
        1055
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allmanufacturingds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1145,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1013,
        1037
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allmanufacturingds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1151,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1025,
        1031
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allmanufacturingds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1157,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1037,
        1049
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "Allmanufacturingds-production-output": {
      "description": "Production line output, downtime and quality counts per shift.",
      "fields": [
        "date",
        "line_id",
        "shift",
        "units_produced",
        "units_defective",
        "planned_runtime_min",
        "actual_runtime_min"
      ],
      "format": "Document",
      "id": 1163,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        901,
        1073
      ],
      "name": "Production output logs",
      "template": "Document"
    },
    "Allmanufacturingds-inventory-records": {
      "description": "Inventory on hand, valuation and movement for working-capital analysis.",
      "fields": [
        "date",
        "sku",
        "warehouse",
        "quantity_on_hand",
        "unit_cost",
        "reorder_point",
        "inventory_value"
      ],
      "format": "Document",
      "id": 1169,
      "industry": "Manufacturing",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        989,
        903
      ],
      "name": "Inventory records",
      "template": "Document"
    },
    "AllhealthcareGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1086,
      "industry": "Healthcare",
      "metricIds": [
        930,
        942,
        948,
        960,
        954,
        996
      ]
    },
    "Allhealthcare5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1080,
      "industry": "Healthcare",
      "metricIds": [
        914
      ]
    },
    "AllhealthcareQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1092,
      "industry": "Healthcare",
      "metricIds": [
        942,
        948,
        960
      ]
    },
    "AllhealthcareqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1098,
      "industry": "Healthcare",
      "metricIds": [
        960,
        948
      ]
    },
    "HcCensus911CatalogOptionKey01": {
      "id": 911,
      "name": "De-identified operational census export",
      "description": "Aggregated admissions, discharges, and bed days by service line. No patient names or MRNs in catalog templates.",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "service_line",
        "admissions",
        "discharges",
        "patient_days",
        "occupied_beds"
      ],
      "metricIds": [
        911,
        912
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "HcSched912CatalogOptionKey02": {
      "id": 912,
      "name": "Scheduling utilization summary",
      "description": "Shift-level staffed hours and utilization by department (aggregated counts only).",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "department",
        "staffed_hours",
        "scheduled_hours",
        "encounter_count"
      ],
      "metricIds": [
        911,
        914
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "HcRcm913CatalogOptionKey03": {
      "id": 913,
      "name": "Revenue cycle summary export",
      "description": "Claim submission, denial, and payment totals by payer category (no member identifiers).",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "payer_category",
        "claims_submitted",
        "claims_denied",
        "amount_billed",
        "amount_collected"
      ],
      "metricIds": [
        915
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "HcQual914CatalogOptionKey04": {
      "id": 914,
      "name": "De-identified quality outcomes summary",
      "description": "Cohort-level readmission and outcome indicators without PHI field names.",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "cohort_id",
        "discharges",
        "readmissions_30d"
      ],
      "metricIds": [
        913
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "Allhealthcareds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1104,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        942,
        948,
        954,
        960,
        966,
        978,
        984,
        996,
        1038
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Allhealthcareds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1110,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        930,
        936,
        972
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Allhealthcareds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1116,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        930,
        936,
        972,
        990
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Allhealthcareds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1122,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        978,
        990
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Allhealthcareds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1128,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        984,
        990
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Allhealthcareds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1134,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        996,
        1002,
        1008
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Allhealthcareds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1140,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1014,
        1020,
        1026,
        1032,
        1044,
        1050,
        1056
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allhealthcareds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1146,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1014,
        1038
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allhealthcareds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1152,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1026,
        1032
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allhealthcareds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1158,
      "industry": "Healthcare",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1038,
        1050
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "AllrestaurantsGvoI0Vg2YijGfgoBaqqe": {
      "name": "Financial statements",
      "description": "Records of a company's financial activities (income, expenses, assets, liabilities).",
      "format": "Document",
      "template": "Financial Statement Template",
      "lastUpdated": "2024-07-31 14:25:05",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        "date",
        "statement_type",
        "period_start_date",
        "period_end_date"
      ],
      "id": 1087,
      "industry": "Restaurants",
      "metricIds": [
        931,
        943,
        949,
        961,
        955,
        997
      ]
    },
    "Allrestaurants5aMhHPzshRFSHX4PjOMH": {
      "name": "HR records",
      "description": "Records related to human resources and employee data.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:07",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1081,
      "industry": "Restaurants",
      "metricIds": [
        922
      ]
    },
    "AllrestaurantsQO2mQ9iQZXjtLrZYLXcK": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1093,
      "industry": "Restaurants",
      "metricIds": [
        943,
        949,
        961
      ]
    },
    "AllrestaurantsqXzIFYqjk5et3S78BYew": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2024-07-31 14:25:08",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [],
      "id": 1099,
      "industry": "Restaurants",
      "metricIds": [
        961,
        949
      ]
    },
    "RestPos921CatalogOptionKey01": {
      "id": 921,
      "name": "POS daily close",
      "description": "End-of-day sales, tender, labor punches summary, and check times by location.",
      "industry": "Restaurants",
      "format": "Document",
      "template": "Transactional Data Template",
      "fields": [
        "date",
        "location_id",
        "gross_sales",
        "net_sales",
        "food_sales",
        "covers",
        "avg_check_minutes",
        "labor_hours",
        "labor_cost"
      ],
      "metricIds": [
        921,
        922,
        923,
        925
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "RestInv922CatalogOptionKey02": {
      "id": 922,
      "name": "Inventory count export",
      "description": "Periodic stock counts, usage, and waste/spoilage adjustments by SKU category.",
      "industry": "Restaurants",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "location_id",
        "category",
        "quantity_on_hand",
        "usage_value",
        "waste_value",
        "spoilage_value"
      ],
      "metricIds": [
        921,
        924
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "RestLabor923CatalogOptionKey03": {
      "id": 923,
      "name": "Labor scheduling export",
      "description": "Scheduled vs actual hours and labor cost by role and location (aggregated staff counts only).",
      "industry": "Restaurants",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "location_id",
        "role",
        "scheduled_hours",
        "actual_hours",
        "labor_cost"
      ],
      "metricIds": [
        922
      ],
      "lastUpdated": "2026-06-14 00:00:00"
    },
    "Allrestaurantsds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "journal_entry_id",
        "debit",
        "credit",
        "period",
        "currency"
      ],
      "format": "Financial Statement Template",
      "id": 1105,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        943,
        949,
        955,
        961,
        967,
        979,
        985,
        997,
        1039
      ],
      "name": "General ledger",
      "template": "Financial Statement Template"
    },
    "Allrestaurantsds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        "date",
        "account_code",
        "account_name",
        "debit_balance",
        "credit_balance",
        "period"
      ],
      "format": "Financial Statement Template",
      "id": 1111,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        931,
        937,
        973
      ],
      "name": "Trial balance",
      "template": "Financial Statement Template"
    },
    "Allrestaurantsds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        "date",
        "period_end_date",
        "inventory"
      ],
      "format": "Financial Statement Template",
      "id": 1117,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        931,
        937,
        973,
        991
      ],
      "name": "Balance sheet",
      "template": "Financial Statement Template"
    },
    "Allrestaurantsds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        "date",
        "customer_name",
        "invoice_id",
        "invoice_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1123,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        979,
        991
      ],
      "name": "Accounts receivable aging",
      "template": "Transactional Data Template"
    },
    "Allrestaurantsds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        "date",
        "supplier_name",
        "bill_id",
        "bill_date",
        "due_date",
        "amount_due",
        "days_outstanding",
        "aging_bucket"
      ],
      "format": "Transactional Data Template",
      "id": 1129,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        985,
        991
      ],
      "name": "Accounts payable aging",
      "template": "Transactional Data Template"
    },
    "Allrestaurantsds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        "date",
        "transaction_date",
        "account_id",
        "description",
        "amount",
        "direction",
        "balance",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1135,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        997,
        1003,
        1009
      ],
      "name": "Bank statements",
      "template": "Transactional Data Template"
    },
    "Allrestaurantsds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        "date",
        "customer_id",
        "plan_name",
        "mrr",
        "billing_period",
        "status",
        "start_date",
        "end_date"
      ],
      "format": "Transactional Data Template",
      "id": 1141,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1015,
        1021,
        1027,
        1033,
        1045,
        1051,
        1057
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allrestaurantsds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        "date",
        "opportunity_id",
        "account_name",
        "stage",
        "amount",
        "close_date",
        "owner",
        "probability"
      ],
      "format": "Software",
      "id": 1147,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1015,
        1039
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allrestaurantsds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1153,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1027,
        1033
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allrestaurantsds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        "date",
        "channel",
        "campaign",
        "spend",
        "leads",
        "new_customers",
        "currency"
      ],
      "format": "Transactional Data Template",
      "id": 1159,
      "industry": "Restaurants",
      "lastUpdated": "2026-05-30 00:00:00",
      "metricIds": [
        1039,
        1051
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    }
  }
};

export const DATA_OPTIONS = enrichDataOptions(REFERENCE_DATA.dataOptions);
