/**
 * AUTO-GENERATED from catalog/ — do not edit by hand.
 * Run: npm run catalog:generate
 */
import { enrichDataOptions, inferFieldRule } from './catalogEnrichment.js';

export { inferFieldRule };

export const REFERENCE_DATA = {
  "dataOptions": {
    "real_estate.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        1,
        2,
        3,
        4,
        5,
        8
      ]
    },
    "real_estate.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        956
      ]
    },
    "real_estate.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        938,
        944,
        956
      ]
    },
    "real_estate.core.payroll_records": {
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
      "segment": "core",
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
    "vertical_farming.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        927,
        939,
        945,
        957,
        951,
        993
      ]
    },
    "vertical_farming.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        18
      ]
    },
    "vertical_farming.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        20,
        21,
        939
      ]
    },
    "vertical_farming.core.payroll_records": {
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
      "segment": "core",
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
    "transportation.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        928,
        940,
        946,
        958,
        952,
        994
      ]
    },
    "transportation.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        14
      ]
    },
    "transportation.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        940,
        946,
        958
      ]
    },
    "transportation.core.payroll_records": {
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
      "segment": "core",
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
    "aviation.core.financial_statements": {
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
      "id": 1815,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1800,
        1802,
        1803,
        1805,
        1804,
        1811
      ]
    },
    "aviation.core.hr_records": {
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
      "id": 1816,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1805
      ]
    },
    "aviation.core.accounting_software": {
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
      "id": 1817,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1802,
        1803,
        1805
      ]
    },
    "aviation.core.payroll_records": {
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
      "id": 1818,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1805,
        1803
      ]
    },
    "aviation.network_carrier.operational_statistics_summary": {
      "id": 1832,
      "name": "Airline operational statistics summary",
      "description": "Period aggregates for ASK, RPM, OTP, and fuel (no flight-level PII).",
      "industry": "Aviation",
      "segment": "network_carrier",
      "format": "Document",
      "fields": [
        "period_start_date",
        "period_end_date",
        "available_seat_kilometers",
        "revenue_passenger_kilometers"
      ],
      "metricIds": [
        1820,
        1821,
        1822,
        1823,
        1824,
        1830,
        1831
      ]
    },
    "aviation.airport.traffic_revenue_summary": {
      "id": 1833,
      "name": "Airport traffic and revenue summary",
      "description": "Enplanements and aeronautical versus commercial revenue splits (aggregated).",
      "industry": "Aviation",
      "segment": "airport",
      "format": "Document",
      "fields": [
        "period_start_date",
        "period_end_date",
        "enplaned_passengers"
      ],
      "metricIds": [
        1825,
        1826,
        1827
      ]
    },
    "aviation.travel_distribution.booking_summary": {
      "id": 1834,
      "name": "Travel distribution booking summary",
      "description": "Gross bookings, platform revenue, and session counts (aggregated).",
      "industry": "Aviation",
      "segment": "travel_distribution",
      "format": "Document",
      "fields": [
        "period_start_date",
        "period_end_date"
      ],
      "metricIds": [
        1828,
        1829
      ]
    },
    "manufacturing.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        929,
        941,
        947,
        959,
        953,
        995
      ]
    },
    "manufacturing.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        959
      ]
    },
    "manufacturing.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        941,
        947,
        959
      ]
    },
    "manufacturing.core.payroll_records": {
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
      "segment": "core",
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
    "healthcare.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        930,
        942,
        948,
        960,
        954,
        996
      ]
    },
    "healthcare.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        914
      ]
    },
    "healthcare.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        942,
        948,
        960
      ]
    },
    "healthcare.core.payroll_records": {
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
      "segment": "core",
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
    "restaurants.core.financial_statements": {
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
      "segment": "core",
      "metricIds": [
        931,
        943,
        949,
        961,
        955,
        997
      ]
    },
    "restaurants.core.hr_records": {
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
      "segment": "core",
      "metricIds": [
        922
      ]
    },
    "restaurants.core.accounting_software": {
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
      "segment": "core",
      "metricIds": [
        943,
        949,
        961
      ]
    },
    "restaurants.core.payroll_records": {
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
      "segment": "core",
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
    },
    "life_sciences.core.financial_statements": {
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
      "id": 1320,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1300,
        1302,
        1303,
        1305,
        1304,
        1311
      ]
    },
    "life_sciences.core.hr_records": {
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
      "id": 1321,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1305
      ]
    },
    "life_sciences.core.accounting_software": {
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
      "id": 1322,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1302,
        1303,
        1305
      ]
    },
    "life_sciences.core.payroll_records": {
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
      "id": 1323,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1305,
        1303
      ]
    },
    "life_sciences.rnd.clinical_trial_summary": {
      "id": 1340,
      "name": "De-identified clinical trial summary",
      "industry": "Life Sciences",
      "segment": "rnd",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "program_id",
        "phase",
        "patients_enrolled",
        "phases_passed",
        "phases_attempted",
        "total_trial_cost"
      ],
      "metricIds": [
        1330,
        1331,
        1332
      ],
      "lastUpdated": "2026-06-20 00:00:00"
    },
    "life_sciences.supply_chain.production_batch_records": {
      "id": 1341,
      "name": "Production batch records",
      "industry": "Life Sciences",
      "segment": "supply_chain",
      "format": "Transactional Data Template",
      "template": "Transactional Data Template",
      "fields": [
        "date",
        "batch_id",
        "good_units",
        "total_units",
        "total_cogs",
        "units_produced"
      ],
      "metricIds": [
        1333,
        1334
      ],
      "lastUpdated": "2026-06-20 00:00:00"
    },
    "banking.core.financial_statements": {
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
      "id": 1515,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1500,
        1502,
        1503,
        1505,
        1504,
        1511
      ]
    },
    "banking.core.hr_records": {
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
      "id": 1516,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1505
      ]
    },
    "banking.core.accounting_software": {
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
      "id": 1517,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1502,
        1503,
        1505
      ]
    },
    "banking.core.payroll_records": {
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
      "id": 1518,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1505,
        1503
      ]
    },
    "banking.depository.regulatory_summary": {
      "id": 1560,
      "name": "Aggregated regulatory and financial summary",
      "description": "Period-level depository bank aggregates (NIM, credit, deposits, capital). Not investment banking.",
      "industry": "Banking",
      "segment": "depository",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "entity_segment",
        "net_interest_income",
        "average_earning_assets",
        "non_performing_loans",
        "total_loans",
        "total_deposits",
        "operating_expense",
        "total_revenue"
      ],
      "metricIds": [
        1530,
        1531,
        1532,
        1533,
        1534,
        1554,
        1556,
        1557,
        1558,
        1559,
        1567,
        1568
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "financial_services.core.financial_statements": {
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
      "id": 1615,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1600,
        1602,
        1603,
        1605,
        1604,
        1611
      ]
    },
    "financial_services.core.hr_records": {
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
      "id": 1616,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1605
      ]
    },
    "financial_services.core.accounting_software": {
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
      "id": 1617,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1602,
        1603,
        1605
      ]
    },
    "financial_services.core.payroll_records": {
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
      "id": 1618,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1605,
        1603
      ]
    },
    "financial_services.investment_banking.trading_summary": {
      "id": 1561,
      "name": "Aggregated investment banking summary",
      "description": "Trading and advisory fee revenue (markets and IB division; no deposit book).",
      "industry": "Financial Services",
      "segment": "investment_banking",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "division",
        "trading_revenue",
        "advisory_fee_revenue",
        "total_revenue"
      ],
      "metricIds": [
        1535,
        1553
      ],
      "lastUpdated": "2026-06-24 00:00:00"
    },
    "Allfinancesaas-subscription-billing": {
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
      "id": 1570,
      "industry": "Financial Services",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1580,
        1581,
        1582,
        1583
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template"
    },
    "Allfinancesaas-crm-pipeline": {
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
      "id": 1571,
      "industry": "Financial Services",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1580,
        1584
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document"
    },
    "Allfinancesaas-product-usage": {
      "description": "Product engagement telemetry for retention and churn analysis.",
      "fields": [
        "date",
        "customer_id",
        "active_users",
        "sessions",
        "feature_adoption",
        "usage_minutes"
      ],
      "format": "Software",
      "id": 1572,
      "industry": "Financial Services",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1582,
        1583
      ],
      "name": "Product usage logs",
      "template": "Document"
    },
    "Allfinancesaas-marketing-spend": {
      "description": "Marketing and sales spend by channel for CAC and efficiency.",
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
      "id": 1573,
      "industry": "Financial Services",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1584,
        1585
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template"
    },
    "funds.core.financial_statements": {
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
      "id": 1918,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1970,
        1972,
        1973,
        1975,
        1974,
        1981
      ]
    },
    "funds.core.hr_records": {
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
      "id": 1919,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1975
      ]
    },
    "funds.core.accounting_software": {
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
      "id": 1920,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1972,
        1973,
        1975
      ]
    },
    "funds.core.payroll_records": {
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
      "id": 1921,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1975,
        1973
      ]
    },
    "funds.fund.fund_summary": {
      "id": 1916,
      "name": "Aggregated fund summary",
      "description": "AUM, flows, fees, and custody aggregates by book_type. No LP or client identifiers.",
      "industry": "Funds",
      "segment": "fund",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "fund_vehicle_id",
        "book_type",
        "assets_under_management",
        "inflows",
        "outflows",
        "beginning_aum",
        "management_fees",
        "average_aum",
        "custody_fees",
        "average_auc",
        "failed_settlements",
        "total_settlement_instructions"
      ],
      "metricIds": [
        1900,
        1901,
        1902,
        1911,
        1912,
        1913,
        1914
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "funds.fund.fund_performance_summary": {
      "id": 1917,
      "name": "Aggregated fund performance summary",
      "description": "Closed-end and alternatives performance without LP names.",
      "industry": "Funds",
      "segment": "fund",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "fund_vehicle_id",
        "fund_irr",
        "distributions",
        "nav",
        "paid_in_capital",
        "called_capital",
        "committed_capital",
        "performance_fees",
        "total_fund_revenue"
      ],
      "metricIds": [
        1903,
        1904,
        1905,
        1906,
        1907,
        1908,
        1909,
        1910,
        1922
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "funds.operations.investment_program_summary": {
      "id": 1936,
      "name": "Aggregated investment program summary",
      "description": "Private-capital GP sourcing, deployment, portfolio, and funnel aggregates. No LP, founder, or deal identifiers.",
      "industry": "Funds",
      "segment": "operations",
      "format": "Document",
      "template": "Document",
      "fields": [
        "date",
        "reporting_entity_id",
        "closed_investments",
        "qualified_opportunities",
        "deployed_capital",
        "new_investments",
        "follow_on_investments",
        "eligible_portfolio_companies",
        "impaired_carrying_value",
        "portfolio_cost_basis",
        "deals_with_co_investors",
        "total_closed_deals",
        "committed_capital",
        "fundraising_target",
        "management_fees",
        "operating_expenses",
        "program_investments",
        "program_participants",
        "inbound_qualified_opportunities",
        "total_qualified_opportunities",
        "active_portfolio_company_count"
      ],
      "metricIds": [
        1923,
        1924,
        1925,
        1926,
        1927,
        1928,
        1929,
        1930,
        1931,
        1932,
        1933,
        1934
      ],
      "lastUpdated": "2026-06-28 00:00:00"
    },
    "trusts.core.financial_statements": {
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
      "id": 1946,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1985,
        1987,
        1988,
        1990,
        1989,
        1996
      ]
    },
    "trusts.core.hr_records": {
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
      "id": 1947,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1990
      ]
    },
    "trusts.core.accounting_software": {
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
      "id": 1948,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1987,
        1988,
        1990
      ]
    },
    "trusts.core.payroll_records": {
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
      "id": 1949,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1990,
        1988
      ]
    },
    "trusts.trust.trust_vehicle_summary": {
      "id": 1945,
      "name": "Aggregated trust vehicle summary",
      "description": "Trust and listed-vehicle reporting (FFO, distributions, NOI). No beneficiary identifiers.",
      "industry": "Trusts",
      "segment": "trust",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "trust_vehicle_id",
        "vehicle_type",
        "funds_from_operations",
        "ffo",
        "distributions",
        "current_noi",
        "prior_noi",
        "trust_assets_under_administration",
        "trustee_fees",
        "average_trust_aua"
      ],
      "metricIds": [
        1940,
        1941,
        1942,
        1943,
        1944
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "insurance.core.financial_statements": {
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
      "id": 1621,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1620,
        1622,
        1623,
        1625,
        1624,
        1631
      ]
    },
    "insurance.core.hr_records": {
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
      "id": 1622,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1625
      ]
    },
    "insurance.core.accounting_software": {
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
      "id": 1623,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1622,
        1623,
        1625
      ]
    },
    "insurance.core.payroll_records": {
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
      "id": 1624,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1625,
        1623
      ]
    },
    "insurance.property_casualty.loss_summary": {
      "id": 1565,
      "name": "Aggregated insurance loss summary",
      "description": "Earned premiums, losses, and expenses by line_of_business (property_casualty, life, health, reinsurance).",
      "industry": "Insurance",
      "segment": "property_casualty",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "line_of_business",
        "entity_segment",
        "incurred_losses",
        "underwriting_expense",
        "earned_premiums",
        "premium_growth",
        "benefits_paid",
        "catastrophe_losses",
        "prior_reserve_development"
      ],
      "metricIds": [
        1547,
        1548,
        1549,
        1555,
        1574,
        1575
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "consumer_finance.core.financial_statements": {
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
      "id": 1715,
      "industry": "Consumer Finance",
      "segment": "core",
      "metricIds": [
        1700,
        1702,
        1703,
        1705,
        1704,
        1711
      ]
    },
    "consumer_finance.core.hr_records": {
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
      "id": 1716,
      "industry": "Consumer Finance",
      "segment": "core",
      "metricIds": [
        1705
      ]
    },
    "consumer_finance.core.accounting_software": {
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
      "id": 1717,
      "industry": "Consumer Finance",
      "segment": "core",
      "metricIds": [
        1702,
        1703,
        1705
      ]
    },
    "consumer_finance.core.payroll_records": {
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
      "id": 1718,
      "industry": "Consumer Finance",
      "segment": "core",
      "metricIds": [
        1705,
        1703
      ]
    },
    "consumer_finance.consumer_lending.loan_tape_summary": {
      "id": 1730,
      "name": "Aggregated consumer loan tape summary",
      "description": "Period aggregates by product line (cards, auto, personal). No account numbers. line_of_business distinguishes product; not mortgage collateral.",
      "industry": "Consumer Finance",
      "segment": "consumer_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "product_line",
        "interest_income",
        "average_receivables",
        "net_charge_offs",
        "delinquent_balance_30_plus",
        "total_receivables",
        "origination_volume_growth",
        "payment_volume",
        "bnpl_origination_growth",
        "embedded_channel_revenue",
        "total_consumer_finance_revenue",
        "rtp_payment_volume",
        "merchant_acquiring_volume"
      ],
      "metricIds": [
        1720,
        1721,
        1722,
        1723,
        1724,
        1725,
        1726,
        1727,
        1728
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "consumer_finance.residential_mortgage.residential_mortgage_book_summary": {
      "id": 1794,
      "name": "Aggregated residential mortgage book summary",
      "description": "Lender-view mortgage portfolio aggregates. No borrower or loan identifiers.",
      "industry": "Consumer Finance",
      "segment": "residential_mortgage",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "product_line",
        "interest_income",
        "average_mortgage_balances",
        "delinquent_balance_30_plus",
        "total_mortgage_balances",
        "weighted_ltv_numerator",
        "origination_volume"
      ],
      "metricIds": [
        1790,
        1791,
        1792,
        1793
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "commercial_finance.core.financial_statements": {
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
      "id": 1755,
      "industry": "Commercial Finance",
      "segment": "core",
      "metricIds": [
        1740,
        1742,
        1743,
        1745,
        1744,
        1751
      ]
    },
    "commercial_finance.core.hr_records": {
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
      "id": 1756,
      "industry": "Commercial Finance",
      "segment": "core",
      "metricIds": [
        1745
      ]
    },
    "commercial_finance.core.accounting_software": {
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
      "id": 1757,
      "industry": "Commercial Finance",
      "segment": "core",
      "metricIds": [
        1742,
        1743,
        1745
      ]
    },
    "commercial_finance.core.payroll_records": {
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
      "id": 1758,
      "industry": "Commercial Finance",
      "segment": "core",
      "metricIds": [
        1745,
        1743
      ]
    },
    "commercial_finance.commercial_lending.commercial_loan_book_summary": {
      "id": 1770,
      "name": "Aggregated commercial loan book summary",
      "description": "Period aggregates by book segment (C&I, middle market). No borrower identifiers or account numbers.",
      "industry": "Commercial Finance",
      "segment": "commercial_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "entity_segment",
        "outstanding_commercial_loans",
        "interest_income",
        "average_commercial_loans",
        "non_performing_commercial_loans",
        "total_commercial_loans",
        "net_charge_offs",
        "delinquent_balance_30_plus",
        "origination_volume",
        "weighted_ltv_numerator",
        "drawn_commitments",
        "total_commitments",
        "sustainable_loan_balance"
      ],
      "metricIds": [
        1760,
        1761,
        1762,
        1763,
        1764,
        1765,
        1771,
        1772,
        1773,
        1774,
        1777
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "commercial_finance.commercial_lending.commercial_treasury_summary": {
      "id": 1778,
      "name": "Aggregated commercial treasury summary",
      "description": "Treasury services fees, commercial deposits, and B2B payment volume. No client identifiers.",
      "industry": "Commercial Finance",
      "segment": "commercial_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "entity_segment",
        "treasury_fee_revenue",
        "average_commercial_deposits",
        "commercial_payment_volume"
      ],
      "metricIds": [
        1775,
        1776
      ],
      "lastUpdated": "2026-06-25 00:00:00"
    },
    "retail.core.financial_statements": {
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
      "id": 1641,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1640,
        1642,
        1643,
        1645,
        1644,
        1651
      ]
    },
    "retail.core.hr_records": {
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
      "id": 1642,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1645
      ]
    },
    "retail.core.accounting_software": {
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
      "id": 1643,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1642,
        1643,
        1645
      ]
    },
    "retail.core.payroll_records": {
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
      "id": 1644,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1645,
        1643
      ]
    },
    "retail.operations.store_sales_summary": {
      "id": 1680,
      "name": "Store sales summary export",
      "description": "Aggregated comp and total sales, traffic, and selling area by store or banner. No payment instrument detail.",
      "industry": "Retail",
      "segment": "operations",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "store_id",
        "current_period_sales",
        "prior_period_sales",
        "net_sales",
        "selling_square_footage",
        "transactions",
        "visitors"
      ],
      "metricIds": [
        1670,
        1673,
        1674
      ],
      "lastUpdated": "2026-06-24 00:00:00"
    },
    "retail.financial.inventory_summary": {
      "id": 1681,
      "name": "Inventory valuation export",
      "description": "Period COGS, average inventory, and shrink adjustments (aggregated).",
      "industry": "Retail",
      "segment": "financial",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        "date",
        "banner",
        "cogs",
        "average_inventory_value",
        "shrinkage_value",
        "sales"
      ],
      "metricIds": [
        1671,
        1672
      ],
      "lastUpdated": "2026-06-24 00:00:00"
    }
  }
};

export const DATA_OPTIONS = enrichDataOptions(REFERENCE_DATA.dataOptions);
