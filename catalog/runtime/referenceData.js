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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1082,
      "industry": "Real Estate",
      "segment": "core",
      "metricIds": [
        926,
        932,
        938,
        944,
        956,
        950,
        992,
        962,
        968,
        974,
        980,
        986,
        998,
        1004,
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1076,
      "industry": "Real Estate",
      "segment": "core",
      "metricIds": [
        1082
      ]
    },
    "real_estate.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "rent_collection_date",
          "type": "date"
        },
        {
          "name": "rent_amount",
          "type": "decimal"
        },
        {
          "name": "tenant_name",
          "type": "string"
        },
        {
          "name": "payment_method",
          "type": "enum"
        },
        {
          "name": "payment_status",
          "type": "enum"
        },
        {
          "name": "rental_income",
          "type": "string"
        },
        {
          "name": "operating_expenses",
          "type": "string"
        },
        {
          "name": "debt_service",
          "type": "string"
        },
        {
          "name": "property_price",
          "type": "decimal"
        },
        {
          "name": "gross_rental_income",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "energy_consumed",
          "type": "string"
        },
        {
          "name": "energy_cost",
          "type": "decimal"
        },
        {
          "name": "total_energy_cost",
          "type": "decimal"
        },
        {
          "name": "rentable_square_feet",
          "type": "string"
        },
        {
          "name": "gross_rental_income",
          "type": "string"
        },
        {
          "name": "operating_expenses",
          "type": "string"
        },
        {
          "name": "property_value",
          "type": "string"
        },
        {
          "name": "provider_name",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 21,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        2,
        3,
        1060
      ],
      "name": "Energy bills",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "mortgage_lender",
          "type": "string"
        },
        {
          "name": "loan_amount",
          "type": "decimal"
        },
        {
          "name": "interest_rate",
          "type": "decimal"
        },
        {
          "name": "loan_term",
          "type": "string"
        },
        {
          "name": "monthly_payment",
          "type": "string"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        }
      ],
      "format": "Document",
      "id": 7,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        7
      ],
      "name": "Mortgage documents",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "purchase_date",
          "type": "date"
        },
        {
          "name": "purchase_price",
          "type": "decimal"
        },
        {
          "name": "seller_name",
          "type": "string"
        },
        {
          "name": "property_location",
          "type": "string"
        },
        {
          "name": "property_type",
          "type": "enum"
        },
        {
          "name": "mortgage_details",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 2,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        1
      ],
      "name": "Property purchase records",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "sale_date",
          "type": "date"
        },
        {
          "name": "sale_price",
          "type": "decimal"
        },
        {
          "name": "buyer_name",
          "type": "string"
        },
        {
          "name": "property_location",
          "type": "string"
        },
        {
          "name": "property_type",
          "type": "enum"
        },
        {
          "name": "agent_details",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 3,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        1
      ],
      "name": "Sale records",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "tenant_name",
          "type": "string"
        },
        {
          "name": "lease_start_date",
          "type": "date"
        },
        {
          "name": "lease_end_date",
          "type": "date"
        },
        {
          "name": "monthly_rent",
          "type": "string"
        },
        {
          "name": "maintenance_records",
          "type": "string"
        },
        {
          "name": "payment_status",
          "type": "enum"
        },
        {
          "name": "same_store_noi_growth",
          "type": "string"
        },
        {
          "name": "operating_expenses",
          "type": "string"
        },
        {
          "name": "effective_gross_income",
          "type": "string"
        },
        {
          "name": "rentable_square_feet",
          "type": "string"
        },
        {
          "name": "gross_rental_income",
          "type": "string"
        },
        {
          "name": "vacant_units",
          "type": "string"
        },
        {
          "name": "total_units",
          "type": "decimal"
        },
        {
          "name": "total_energy_cost",
          "type": "decimal"
        }
      ],
      "metricIds": [
        2,
        9,
        1058,
        1059,
        1060
      ],
      "format": "Software",
      "id": 4,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "name": "Property management systems",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "valuation_date",
          "type": "date"
        },
        {
          "name": "valuation_amount",
          "type": "decimal"
        },
        {
          "name": "valuer_name",
          "type": "string"
        },
        {
          "name": "valuation_method",
          "type": "enum"
        },
        {
          "name": "property_location",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "property_id",
          "type": "id"
        },
        {
          "name": "lender_name",
          "type": "string"
        },
        {
          "name": "loan_amount",
          "type": "decimal"
        },
        {
          "name": "interest_rate",
          "type": "decimal"
        },
        {
          "name": "loan_term_months",
          "type": "decimal"
        },
        {
          "name": "maturity_date",
          "type": "date"
        },
        {
          "name": "outstanding_balance",
          "type": "decimal"
        },
        {
          "name": "annual_debt_service",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 8,
      "industry": "Real Estate",
      "lastUpdated": "2024-07-31 14:25:06",
      "metricIds": [
        8
      ],
      "name": "Loan documents",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "plan_name",
          "type": "string"
        },
        {
          "name": "mrr",
          "type": "string"
        },
        {
          "name": "billing_period",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        },
        {
          "name": "avg_revenue_per_account",
          "type": "decimal"
        },
        {
          "name": "churn_rate",
          "type": "decimal"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "opportunity_id",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "stage",
          "type": "enum"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "close_date",
          "type": "date"
        },
        {
          "name": "owner",
          "type": "string"
        },
        {
          "name": "probability",
          "type": "string"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "active_users",
          "type": "string"
        },
        {
          "name": "sessions",
          "type": "string"
        },
        {
          "name": "feature_adoption",
          "type": "string"
        },
        {
          "name": "usage_minutes",
          "type": "string"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrealestateds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "channel",
          "type": "enum"
        },
        {
          "name": "campaign",
          "type": "string"
        },
        {
          "name": "spend",
          "type": "string"
        },
        {
          "name": "leads",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "real_estate.reit.reit_supplemental": {
      "id": 1950,
      "name": "REIT supplemental reporting",
      "description": "REIT FFO, distributions, and same-store NOI (vehicle reporting). No beneficiary identifiers.",
      "industry": "Real Estate",
      "segment": "reit",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "trust_vehicle_id",
          "type": "id"
        },
        {
          "name": "vehicle_type",
          "type": "enum"
        },
        {
          "name": "funds_from_operations",
          "type": "decimal"
        },
        {
          "name": "ffo",
          "type": "string"
        },
        {
          "name": "distributions",
          "type": "string"
        },
        {
          "name": "current_noi",
          "type": "string"
        },
        {
          "name": "prior_noi",
          "type": "string"
        },
        {
          "name": "trust_assets_under_administration",
          "type": "decimal"
        },
        {
          "name": "trustee_fees",
          "type": "string"
        },
        {
          "name": "average_trust_aua",
          "type": "string"
        }
      ],
      "metricIds": [
        1940,
        1941,
        1942
      ],
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1083,
      "industry": "Vertical Farming",
      "segment": "core",
      "metricIds": [
        927,
        933,
        939,
        945,
        957,
        951,
        993,
        963,
        969,
        975,
        981,
        987,
        999,
        1005
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1077,
      "industry": "Vertical Farming",
      "segment": "core",
      "metricIds": [
        1085,
        18
      ]
    },
    "vertical_farming.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1089,
      "industry": "Vertical Farming",
      "segment": "core",
      "metricIds": [
        939,
        945,
        957,
        20,
        21
      ]
    },
    "vertical_farming.core.payroll_records": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1095,
      "industry": "Vertical Farming",
      "segment": "core",
      "metricIds": [
        957,
        945,
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "farm_id",
          "type": "id"
        },
        {
          "name": "zone_id",
          "type": "id"
        },
        {
          "name": "water_volume_liters",
          "type": "decimal"
        },
        {
          "name": "irrigation_duration_minutes",
          "type": "decimal"
        },
        {
          "name": "nutrient_ec",
          "type": "decimal"
        },
        {
          "name": "ph_level",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_water_liters",
          "type": "decimal"
        }
      ],
      "format": "Document",
      "id": 20,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        16
      ],
      "name": "Irrigation logs",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "farm_id",
          "type": "id"
        },
        {
          "name": "crop_planted",
          "type": "string"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_growing_area",
          "type": "decimal"
        },
        {
          "name": "total_water_liters",
          "type": "decimal"
        },
        {
          "name": "total_energy_kwh",
          "type": "decimal"
        },
        {
          "name": "sum_health_scores",
          "type": "string"
        },
        {
          "name": "total_crops",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "energy_consumed",
          "type": "string"
        },
        {
          "name": "total_light_delivered",
          "type": "decimal"
        },
        {
          "name": "repair_cost_avoided",
          "type": "decimal"
        },
        {
          "name": "predictive_maintenance_cost",
          "type": "decimal"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "farm_id",
          "type": "id"
        },
        {
          "name": "crop_type",
          "type": "enum"
        },
        {
          "name": "harvest_date",
          "type": "date"
        },
        {
          "name": "quantity_harvested",
          "type": "string"
        },
        {
          "name": "market_price",
          "type": "decimal"
        },
        {
          "name": "quality_grade",
          "type": "enum"
        }
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "farm_id",
          "type": "id"
        },
        {
          "name": "crop_id",
          "type": "id"
        },
        {
          "name": "health_score",
          "type": "decimal"
        },
        {
          "name": "growth_stage",
          "type": "enum"
        },
        {
          "name": "pest_pressure_index",
          "type": "decimal"
        },
        {
          "name": "sensor_reading_count",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_growing_area",
          "type": "decimal"
        },
        {
          "name": "sum_health_scores",
          "type": "string"
        },
        {
          "name": "total_crops",
          "type": "decimal"
        }
      ],
      "format": "Software",
      "id": 19,
      "industry": "Vertical Farming",
      "lastUpdated": "2024-07-31 14:25:08",
      "metricIds": [
        15,
        19
      ],
      "name": "Crop monitoring systems",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "plan_name",
          "type": "string"
        },
        {
          "name": "mrr",
          "type": "string"
        },
        {
          "name": "billing_period",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        },
        {
          "name": "avg_revenue_per_account",
          "type": "decimal"
        },
        {
          "name": "churn_rate",
          "type": "decimal"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "opportunity_id",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "stage",
          "type": "enum"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "close_date",
          "type": "date"
        },
        {
          "name": "owner",
          "type": "string"
        },
        {
          "name": "probability",
          "type": "string"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "active_users",
          "type": "string"
        },
        {
          "name": "sessions",
          "type": "string"
        },
        {
          "name": "feature_adoption",
          "type": "string"
        },
        {
          "name": "usage_minutes",
          "type": "string"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allverticalfarmingds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "channel",
          "type": "enum"
        },
        {
          "name": "campaign",
          "type": "string"
        },
        {
          "name": "spend",
          "type": "string"
        },
        {
          "name": "leads",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1084,
      "industry": "Transportation",
      "segment": "core",
      "metricIds": [
        928,
        934,
        940,
        946,
        958,
        952,
        994,
        964,
        970,
        976,
        982,
        988,
        1000,
        1006
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1078,
      "industry": "Transportation",
      "segment": "core",
      "metricIds": [
        1084,
        14
      ]
    },
    "transportation.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1096,
      "industry": "Transportation",
      "segment": "core",
      "metricIds": [
        958,
        946,
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "vehicle_id",
          "type": "id"
        },
        {
          "name": "telematics_date",
          "type": "date"
        },
        {
          "name": "engine_performance",
          "type": "string"
        },
        {
          "name": "fuel_efficiency",
          "type": "string"
        },
        {
          "name": "maintenance_alerts",
          "type": "string"
        },
        {
          "name": "driver_behavior",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 13,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        10
      ],
      "name": "Vehicle telematics data",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "fleet_id",
          "type": "id"
        },
        {
          "name": "vehicle_ids",
          "type": "string"
        },
        {
          "name": "maintenance_schedule",
          "type": "string"
        },
        {
          "name": "fuel_logs",
          "type": "string"
        },
        {
          "name": "insurance_details",
          "type": "string"
        },
        {
          "name": "fleet_time_in_use",
          "type": "string"
        },
        {
          "name": "fleet_available_time",
          "type": "string"
        }
      ],
      "format": "Software",
      "id": 14,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        11
      ],
      "name": "Fleet management systems",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "delivery_date",
          "type": "date"
        },
        {
          "name": "vehicle_id",
          "type": "id"
        },
        {
          "name": "route_id",
          "type": "id"
        },
        {
          "name": "delivery_status",
          "type": "enum"
        },
        {
          "name": "delivery_address",
          "type": "string"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "delivery_time",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 15,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        12
      ],
      "name": "Delivery logs",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "vehicle_id",
          "type": "id"
        },
        {
          "name": "tracking_date",
          "type": "date"
        },
        {
          "name": "start_location",
          "type": "string"
        },
        {
          "name": "end_location",
          "type": "string"
        },
        {
          "name": "distance_travelled",
          "type": "string"
        },
        {
          "name": "average_speed",
          "type": "string"
        },
        {
          "name": "route_taken",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "vehicle_id",
          "type": "id"
        },
        {
          "name": "fuel_type",
          "type": "enum"
        },
        {
          "name": "fuel_date",
          "type": "date"
        },
        {
          "name": "fuel_quantity",
          "type": "string"
        },
        {
          "name": "fuel_cost",
          "type": "decimal"
        },
        {
          "name": "odometer_reading",
          "type": "string"
        }
      ],
      "format": "Document",
      "id": 11,
      "industry": "Transportation",
      "lastUpdated": "2024-07-31 14:25:07",
      "metricIds": [
        10
      ],
      "name": "Fuel logs",
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
        994
      ],
      "name": "General ledger",
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Alltransportationds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "transportation.rail_freight.operations_summary": {
      "id": 1170,
      "name": "Rail freight operations summary",
      "description": "Aggregated rail freight utilization, cost, and service metrics.",
      "industry": "Transportation",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "loaded_train_miles",
          "type": "string"
        },
        {
          "name": "available_train_miles",
          "type": "string"
        },
        {
          "name": "total_operating_cost",
          "type": "decimal"
        },
        {
          "name": "ton_miles_moved",
          "type": "string"
        },
        {
          "name": "on_time_shipments",
          "type": "string"
        },
        {
          "name": "total_shipments",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1860,
        1861,
        1862
      ],
      "lastUpdated": "2026-07-04 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "transportation.maritime.operations_summary": {
      "id": 1172,
      "name": "Maritime fleet operations summary",
      "description": "Aggregated vessel utilization and TCE inputs.",
      "industry": "Transportation",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "operating_days",
          "type": "string"
        },
        {
          "name": "available_days",
          "type": "string"
        },
        {
          "name": "voyage_revenue",
          "type": "decimal"
        },
        {
          "name": "voyage_costs",
          "type": "decimal"
        },
        {
          "name": "on_hire_days",
          "type": "string"
        },
        {
          "name": "on_schedule_voyages",
          "type": "string"
        },
        {
          "name": "total_voyages",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1865,
        1866,
        1867
      ],
      "lastUpdated": "2026-07-04 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "transportation.freight_forwarding.operations_summary": {
      "id": 1174,
      "name": "Freight forwarding operations summary",
      "description": "Aggregated shipper SLA and margin inputs.",
      "industry": "Transportation",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "shipments_handled",
          "type": "string"
        },
        {
          "name": "on_time_shipments",
          "type": "string"
        },
        {
          "name": "total_shipments",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1871,
        1872
      ],
      "lastUpdated": "2026-07-04 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "passenger_transit.core.financial_statements": {
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2060,
      "industry": "Passenger Transit",
      "segment": "core",
      "metricIds": [
        2020,
        2021,
        2022,
        2023,
        2025,
        2024,
        2031,
        2026,
        2027,
        2028,
        2029,
        2030,
        2032,
        2033
      ]
    },
    "passenger_transit.core.hr_records": {
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2061,
      "industry": "Passenger Transit",
      "segment": "core",
      "metricIds": [
        2034
      ]
    },
    "passenger_transit.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2062,
      "industry": "Passenger Transit",
      "segment": "core",
      "metricIds": [
        2022,
        2023,
        2025
      ]
    },
    "passenger_transit.core.payroll_records": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2063,
      "industry": "Passenger Transit",
      "segment": "core",
      "metricIds": [
        2025,
        2023
      ]
    },
    "passenger_transit.rail_passenger.operations_summary": {
      "id": 1171,
      "name": "Rail passenger operations summary",
      "description": "Aggregated passenger rail ridership and fare recovery inputs.",
      "industry": "Passenger Transit",
      "segment": "rail_passenger",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "total_boardings",
          "type": "decimal"
        },
        {
          "name": "train_miles_operated",
          "type": "decimal"
        },
        {
          "name": "fare_revenue",
          "type": "decimal"
        },
        {
          "name": "operating_cost",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1863,
        1864
      ],
      "lastUpdated": "2026-07-16 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "passenger_transit.public_transit.operations_summary": {
      "id": 1173,
      "name": "Public transit operations summary",
      "description": "Aggregated transit ridership, recovery, and OTP inputs.",
      "industry": "Passenger Transit",
      "segment": "public_transit",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "operating_revenue",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "string"
        },
        {
          "name": "unlinked_trips",
          "type": "string"
        },
        {
          "name": "vehicle_revenue_hours",
          "type": "decimal"
        },
        {
          "name": "on_time_trips",
          "type": "string"
        },
        {
          "name": "total_trips",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1868,
        1869,
        1870
      ],
      "lastUpdated": "2026-07-16 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1815,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1800,
        1801,
        1802,
        1803,
        1805,
        1804,
        1811,
        1806,
        1807,
        1808,
        1809,
        1810,
        1812,
        1813
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1816,
      "industry": "Aviation",
      "segment": "core",
      "metricIds": [
        1814
      ]
    },
    "aviation.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "available_seat_kilometers",
          "type": "string"
        },
        {
          "name": "revenue_passenger_kilometers",
          "type": "decimal"
        },
        {
          "name": "revenue_capacity_units",
          "type": "decimal"
        },
        {
          "name": "available_capacity_units",
          "type": "string"
        },
        {
          "name": "total_operating_cost",
          "type": "decimal"
        },
        {
          "name": "total_operating_revenue",
          "type": "decimal"
        },
        {
          "name": "on_time_arrivals",
          "type": "string"
        },
        {
          "name": "total_arrivals",
          "type": "decimal"
        },
        {
          "name": "fuel_expense",
          "type": "string"
        },
        {
          "name": "cargo_tonne_km_carried",
          "type": "string"
        },
        {
          "name": "available_tonne_km",
          "type": "string"
        },
        {
          "name": "cargo_revenue",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1820,
        1821,
        1822,
        1823,
        1824,
        1830,
        1831
      ],
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "aviation.airport.traffic_revenue_summary": {
      "id": 1833,
      "name": "Airport traffic and revenue summary",
      "description": "Enplanements and aeronautical versus commercial revenue splits (aggregated).",
      "industry": "Aviation",
      "segment": "airport",
      "format": "Document",
      "fields": [
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "enplaned_passengers",
          "type": "string"
        },
        {
          "name": "passengers_enplaned_growth",
          "type": "string"
        },
        {
          "name": "aeronautical_revenue",
          "type": "decimal"
        },
        {
          "name": "commercial_revenue",
          "type": "decimal"
        },
        {
          "name": "total_revenue",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1825,
        1826,
        1827
      ],
      "fieldCoverage": "enumerated",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
    },
    "aviation.travel_distribution.booking_summary": {
      "id": 1834,
      "name": "Travel distribution booking summary",
      "description": "Gross bookings, platform revenue, and session counts (aggregated).",
      "industry": "Aviation",
      "segment": "travel_distribution",
      "format": "Document",
      "fields": [
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "platform_revenue",
          "type": "decimal"
        },
        {
          "name": "gross_booking_value",
          "type": "string"
        },
        {
          "name": "completed_bookings",
          "type": "string"
        },
        {
          "name": "qualified_sessions",
          "type": "string"
        }
      ],
      "metricIds": [
        1828,
        1829
      ],
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1085,
      "industry": "Manufacturing",
      "segment": "core",
      "metricIds": [
        929,
        935,
        941,
        947,
        959,
        953,
        995,
        965,
        971,
        977,
        983,
        989,
        1001,
        1007
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1079,
      "industry": "Manufacturing",
      "segment": "core",
      "metricIds": [
        1081
      ]
    },
    "manufacturing.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "line_id",
          "type": "id"
        },
        {
          "name": "work_order_id",
          "type": "id"
        },
        {
          "name": "units_produced",
          "type": "string"
        },
        {
          "name": "units_scrapped",
          "type": "string"
        },
        {
          "name": "run_minutes",
          "type": "string"
        },
        {
          "name": "planned_minutes",
          "type": "string"
        },
        {
          "name": "availability",
          "type": "string"
        },
        {
          "name": "performance",
          "type": "string"
        },
        {
          "name": "quality",
          "type": "string"
        },
        {
          "name": "scrapped_units",
          "type": "string"
        },
        {
          "name": "total_units",
          "type": "decimal"
        },
        {
          "name": "total_manufacturing_cogs",
          "type": "decimal"
        }
      ],
      "metricIds": [
        901,
        902,
        905
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "MfgErp902CatalogOptionKey02": {
      "id": 902,
      "name": "ERP general ledger (manufacturing)",
      "description": "Period GL balances for COGS, inventory, and manufacturing overhead accounts.",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "cost_center",
          "type": "decimal"
        }
      ],
      "metricIds": [
        903,
        905
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "MfgCmms903CatalogOptionKey03": {
      "id": 903,
      "name": "CMMS maintenance logs",
      "description": "Work orders, downtime reason codes, and mean time between failures by asset.",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "asset_id",
          "type": "id"
        },
        {
          "name": "downtime_minutes",
          "type": "string"
        },
        {
          "name": "reason_code",
          "type": "id"
        },
        {
          "name": "planned_flag",
          "type": "string"
        }
      ],
      "metricIds": [
        904
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "MfgQual904CatalogOptionKey04": {
      "id": 904,
      "name": "Quality inspection logs",
      "description": "Lot-level pass/fail, defect codes, and rework disposition (no customer PII).",
      "industry": "Manufacturing",
      "format": "Document",
      "template": "Transactional Data Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "lot_id",
          "type": "id"
        },
        {
          "name": "units_inspected",
          "type": "string"
        },
        {
          "name": "units_failed",
          "type": "string"
        },
        {
          "name": "defect_code",
          "type": "id"
        },
        {
          "name": "scrapped_units",
          "type": "string"
        },
        {
          "name": "total_units",
          "type": "decimal"
        }
      ],
      "metricIds": [
        902
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "Allmanufacturingds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
        995
      ],
      "name": "General ledger",
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allmanufacturingds-production-output": {
      "description": "Production line output, downtime and quality counts per shift.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "line_id",
          "type": "id"
        },
        {
          "name": "shift",
          "type": "string"
        },
        {
          "name": "units_produced",
          "type": "string"
        },
        {
          "name": "units_defective",
          "type": "string"
        },
        {
          "name": "planned_runtime_min",
          "type": "string"
        },
        {
          "name": "actual_runtime_min",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "Allmanufacturingds-inventory-records": {
      "description": "Inventory on hand, valuation and movement for working-capital analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "sku",
          "type": "string"
        },
        {
          "name": "warehouse",
          "type": "string"
        },
        {
          "name": "quantity_on_hand",
          "type": "string"
        },
        {
          "name": "unit_cost",
          "type": "decimal"
        },
        {
          "name": "reorder_point",
          "type": "string"
        },
        {
          "name": "inventory_value",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1086,
      "industry": "Healthcare",
      "segment": "core",
      "metricIds": [
        930,
        936,
        942,
        948,
        960,
        954,
        996,
        966,
        972,
        978,
        984,
        990,
        1002,
        1008
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1080,
      "industry": "Healthcare",
      "segment": "core",
      "metricIds": [
        1080,
        914
      ]
    },
    "healthcare.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "service_line",
          "type": "string"
        },
        {
          "name": "admissions",
          "type": "string"
        },
        {
          "name": "discharges",
          "type": "string"
        },
        {
          "name": "patient_days",
          "type": "string"
        },
        {
          "name": "occupied_beds",
          "type": "decimal"
        },
        {
          "name": "available_beds",
          "type": "decimal"
        }
      ],
      "metricIds": [
        911,
        912,
        1400
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "HcProviderOps916CatalogOptionKey05": {
      "id": 916,
      "name": "De-identified provider operations summary",
      "description": "Aggregated clinical and operational KPI inputs by period (no PHI).",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "occupied_beds",
          "type": "decimal"
        },
        {
          "name": "available_beds",
          "type": "decimal"
        },
        {
          "name": "or_time_used",
          "type": "string"
        },
        {
          "name": "or_time_available",
          "type": "string"
        },
        {
          "name": "ed_wait_time",
          "type": "string"
        },
        {
          "name": "case_mix_index",
          "type": "string"
        },
        {
          "name": "total_operating_cost",
          "type": "decimal"
        },
        {
          "name": "discharges",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "net_patient_revenue",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "clean_claims",
          "type": "string"
        },
        {
          "name": "total_claims",
          "type": "decimal"
        },
        {
          "name": "inpatient_deaths",
          "type": "string"
        },
        {
          "name": "infections",
          "type": "string"
        },
        {
          "name": "patient_days",
          "type": "string"
        }
      ],
      "metricIds": [
        1400,
        1401,
        1402,
        1403,
        1404,
        1405,
        1406,
        1407,
        1408
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "HcSched912CatalogOptionKey02": {
      "id": 912,
      "name": "Scheduling utilization summary",
      "description": "Shift-level staffed hours and utilization by department (aggregated counts only).",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "department",
          "type": "string"
        },
        {
          "name": "staffed_hours",
          "type": "decimal"
        },
        {
          "name": "scheduled_hours",
          "type": "decimal"
        },
        {
          "name": "encounter_count",
          "type": "decimal"
        }
      ],
      "metricIds": [
        911,
        914
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "HcRcm913CatalogOptionKey03": {
      "id": 913,
      "name": "Revenue cycle summary export",
      "description": "Claim submission, denial, and payment totals by payer category (no member identifiers).",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "payer_category",
          "type": "string"
        },
        {
          "name": "claims_submitted",
          "type": "string"
        },
        {
          "name": "claims_denied",
          "type": "string"
        },
        {
          "name": "amount_billed",
          "type": "decimal"
        },
        {
          "name": "amount_collected",
          "type": "decimal"
        }
      ],
      "metricIds": [
        915
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "HcQual914CatalogOptionKey04": {
      "id": 914,
      "name": "De-identified quality outcomes summary",
      "description": "Cohort-level readmission and outcome indicators without PHI field names.",
      "industry": "Healthcare",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "cohort_id",
          "type": "id"
        },
        {
          "name": "discharges",
          "type": "string"
        },
        {
          "name": "readmissions_30d",
          "type": "string"
        }
      ],
      "metricIds": [
        913
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "plan_name",
          "type": "string"
        },
        {
          "name": "mrr",
          "type": "string"
        },
        {
          "name": "billing_period",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        },
        {
          "name": "avg_revenue_per_account",
          "type": "decimal"
        },
        {
          "name": "churn_rate",
          "type": "decimal"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "opportunity_id",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "stage",
          "type": "enum"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "close_date",
          "type": "date"
        },
        {
          "name": "owner",
          "type": "string"
        },
        {
          "name": "probability",
          "type": "string"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "active_users",
          "type": "string"
        },
        {
          "name": "sessions",
          "type": "string"
        },
        {
          "name": "feature_adoption",
          "type": "string"
        },
        {
          "name": "usage_minutes",
          "type": "string"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allhealthcareds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "channel",
          "type": "enum"
        },
        {
          "name": "campaign",
          "type": "string"
        },
        {
          "name": "spend",
          "type": "string"
        },
        {
          "name": "leads",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1087,
      "industry": "Restaurants",
      "segment": "core",
      "metricIds": [
        931,
        937,
        943,
        949,
        961,
        955,
        997,
        967,
        973,
        979,
        985,
        991,
        1003,
        1009
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1081,
      "industry": "Restaurants",
      "segment": "core",
      "metricIds": [
        1083,
        922
      ]
    },
    "restaurants.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "location_id",
          "type": "id"
        },
        {
          "name": "gross_sales",
          "type": "string"
        },
        {
          "name": "net_sales",
          "type": "string"
        },
        {
          "name": "food_sales",
          "type": "string"
        },
        {
          "name": "covers",
          "type": "string"
        },
        {
          "name": "avg_check_minutes",
          "type": "string"
        },
        {
          "name": "labor_hours",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "food_cogs",
          "type": "string"
        },
        {
          "name": "food_revenue",
          "type": "decimal"
        },
        {
          "name": "total_labor",
          "type": "decimal"
        },
        {
          "name": "total_revenue",
          "type": "decimal"
        },
        {
          "name": "table_turnover",
          "type": "string"
        },
        {
          "name": "current_sss",
          "type": "string"
        },
        {
          "name": "prior_sss",
          "type": "string"
        }
      ],
      "metricIds": [
        921,
        922,
        923,
        925
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "daily",
      "grain": "day"
    },
    "RestInv922CatalogOptionKey02": {
      "id": 922,
      "name": "Inventory count export",
      "description": "Periodic stock counts, usage, and waste/spoilage adjustments by SKU category.",
      "industry": "Restaurants",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "location_id",
          "type": "id"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "quantity_on_hand",
          "type": "string"
        },
        {
          "name": "usage_value",
          "type": "string"
        },
        {
          "name": "waste_value",
          "type": "string"
        },
        {
          "name": "spoilage_value",
          "type": "string"
        }
      ],
      "metricIds": [
        921,
        924
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "RestLabor923CatalogOptionKey03": {
      "id": 923,
      "name": "Labor scheduling export",
      "description": "Scheduled vs actual hours and labor cost by role and location (aggregated staff counts only).",
      "industry": "Restaurants",
      "format": "Document",
      "template": "Document",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "location_id",
          "type": "id"
        },
        {
          "name": "role",
          "type": "string"
        },
        {
          "name": "scheduled_hours",
          "type": "decimal"
        },
        {
          "name": "actual_hours",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        }
      ],
      "metricIds": [
        922
      ],
      "lastUpdated": "2026-06-14 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
    },
    "Allrestaurantsds-general-ledger": {
      "description": "Complete record of all financial transactions posted to the chart of accounts.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "journal_entry_id",
          "type": "id"
        },
        {
          "name": "debit",
          "type": "string"
        },
        {
          "name": "credit",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        },
        {
          "name": "currency",
          "type": "currency"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-trial-balance": {
      "description": "Period-end list of all ledger account balances used to prepare statements.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "account_code",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "debit_balance",
          "type": "string"
        },
        {
          "name": "credit_balance",
          "type": "string"
        },
        {
          "name": "period",
          "type": "enum"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-balance-sheet": {
      "description": "Statement of assets, liabilities and equity at a point in time.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "inventory",
          "type": "string"
        }
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
      "template": "Financial Statement Template",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-ar-aging": {
      "description": "Outstanding customer invoices grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_name",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "id"
        },
        {
          "name": "invoice_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_receivable",
          "type": "decimal"
        },
        {
          "name": "total_credit_sales",
          "type": "decimal"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-ap-aging": {
      "description": "Outstanding supplier bills grouped by how overdue they are.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "supplier_name",
          "type": "string"
        },
        {
          "name": "bill_id",
          "type": "id"
        },
        {
          "name": "bill_date",
          "type": "date"
        },
        {
          "name": "due_date",
          "type": "date"
        },
        {
          "name": "amount_due",
          "type": "decimal"
        },
        {
          "name": "days_outstanding",
          "type": "string"
        },
        {
          "name": "aging_bucket",
          "type": "string"
        },
        {
          "name": "accounts_payable",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "days",
          "type": "string"
        },
        {
          "name": "days_inventory_outstanding",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-bank-statements": {
      "description": "Bank account transaction lines used for cash-flow and reconciliation.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "transaction_date",
          "type": "date"
        },
        {
          "name": "account_id",
          "type": "id"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "direction",
          "type": "string"
        },
        {
          "name": "balance",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "net_income",
          "type": "string"
        },
        {
          "name": "non_cash_charges",
          "type": "string"
        },
        {
          "name": "increase_in_working_capital",
          "type": "string"
        },
        {
          "name": "cash_out",
          "type": "string"
        },
        {
          "name": "cash_in",
          "type": "string"
        },
        {
          "name": "current_cash_balance",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-subscription-billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "plan_name",
          "type": "string"
        },
        {
          "name": "mrr",
          "type": "string"
        },
        {
          "name": "billing_period",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        },
        {
          "name": "avg_revenue_per_account",
          "type": "decimal"
        },
        {
          "name": "churn_rate",
          "type": "decimal"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-crm-pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "opportunity_id",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "stage",
          "type": "enum"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "close_date",
          "type": "date"
        },
        {
          "name": "owner",
          "type": "string"
        },
        {
          "name": "probability",
          "type": "string"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-product-usage": {
      "description": "Product engagement and usage telemetry used for retention and churn analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "active_users",
          "type": "string"
        },
        {
          "name": "sessions",
          "type": "string"
        },
        {
          "name": "feature_adoption",
          "type": "string"
        },
        {
          "name": "usage_minutes",
          "type": "string"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
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
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "Allrestaurantsds-marketing-spend": {
      "description": "Marketing and sales spend by channel and campaign for CAC and efficiency.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "channel",
          "type": "enum"
        },
        {
          "name": "campaign",
          "type": "string"
        },
        {
          "name": "spend",
          "type": "string"
        },
        {
          "name": "leads",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        }
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
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1320,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1300,
        1301,
        1302,
        1303,
        1305,
        1304,
        1311,
        1306,
        1307,
        1308,
        1309,
        1310,
        1312,
        1313
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1321,
      "industry": "Life Sciences",
      "segment": "core",
      "metricIds": [
        1314
      ]
    },
    "life_sciences.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "program_id",
          "type": "id"
        },
        {
          "name": "phase",
          "type": "string"
        },
        {
          "name": "patients_enrolled",
          "type": "string"
        },
        {
          "name": "phases_passed",
          "type": "string"
        },
        {
          "name": "phases_attempted",
          "type": "string"
        },
        {
          "name": "total_trial_cost",
          "type": "decimal"
        },
        {
          "name": "pipeline_active_count",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1330,
        1331,
        1332
      ],
      "lastUpdated": "2026-06-20 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "life_sciences.supply_chain.production_batch_records": {
      "id": 1341,
      "name": "Production batch records",
      "industry": "Life Sciences",
      "segment": "supply_chain",
      "format": "Transactional Data Template",
      "template": "Transactional Data Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "batch_id",
          "type": "id"
        },
        {
          "name": "good_units",
          "type": "string"
        },
        {
          "name": "total_units",
          "type": "decimal"
        },
        {
          "name": "total_cogs",
          "type": "decimal"
        },
        {
          "name": "units_produced",
          "type": "string"
        }
      ],
      "metricIds": [
        1333,
        1334
      ],
      "lastUpdated": "2026-06-20 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1515,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1500,
        1501,
        1502,
        1503,
        1505,
        1504,
        1511,
        1506,
        1507,
        1508,
        1509,
        1510,
        1512,
        1513
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1516,
      "industry": "Banking",
      "segment": "core",
      "metricIds": [
        1514
      ]
    },
    "banking.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "entity_segment",
          "type": "string"
        },
        {
          "name": "net_interest_income",
          "type": "string"
        },
        {
          "name": "average_earning_assets",
          "type": "string"
        },
        {
          "name": "non_performing_loans",
          "type": "string"
        },
        {
          "name": "total_loans",
          "type": "decimal"
        },
        {
          "name": "total_deposits",
          "type": "decimal"
        },
        {
          "name": "operating_expense",
          "type": "string"
        },
        {
          "name": "total_revenue",
          "type": "decimal"
        }
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
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1615,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1600,
        1601,
        1602,
        1603,
        1605,
        1604,
        1611,
        1606,
        1607,
        1608,
        1609,
        1610,
        1612,
        1613
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1616,
      "industry": "Financial Services",
      "segment": "core",
      "metricIds": [
        1614
      ]
    },
    "financial_services.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "division",
          "type": "string"
        },
        {
          "name": "trading_revenue",
          "type": "decimal"
        },
        {
          "name": "advisory_fee_revenue",
          "type": "decimal"
        },
        {
          "name": "total_revenue",
          "type": "decimal"
        },
        {
          "name": "market_making_revenue",
          "type": "decimal"
        },
        {
          "name": "value_at_risk_99",
          "type": "string"
        },
        {
          "name": "stressed_var_99",
          "type": "string"
        },
        {
          "name": "prime_brokerage_balance_growth",
          "type": "string"
        },
        {
          "name": "trading_venue_volume_growth",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1535,
        1553,
        1590,
        1591,
        1592,
        1593,
        1594,
        1615
      ],
      "lastUpdated": "2026-06-24 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "daily",
      "grain": "day"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1918,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1970,
        1971,
        1972,
        1973,
        1975,
        1974,
        1981,
        1976,
        1977,
        1978,
        1979,
        1980,
        1982,
        1983
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1919,
      "industry": "Funds",
      "segment": "core",
      "metricIds": [
        1984
      ]
    },
    "funds.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "fund_vehicle_id",
          "type": "id"
        },
        {
          "name": "book_type",
          "type": "enum"
        },
        {
          "name": "assets_under_management",
          "type": "string"
        },
        {
          "name": "inflows",
          "type": "string"
        },
        {
          "name": "outflows",
          "type": "string"
        },
        {
          "name": "beginning_aum",
          "type": "string"
        },
        {
          "name": "management_fees",
          "type": "string"
        },
        {
          "name": "average_aum",
          "type": "string"
        },
        {
          "name": "custody_fees",
          "type": "string"
        },
        {
          "name": "average_auc",
          "type": "string"
        },
        {
          "name": "failed_settlements",
          "type": "string"
        },
        {
          "name": "total_settlement_instructions",
          "type": "decimal"
        }
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
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "fund_vehicle_id",
          "type": "id"
        },
        {
          "name": "fund_irr",
          "type": "string"
        },
        {
          "name": "distributions",
          "type": "string"
        },
        {
          "name": "nav",
          "type": "string"
        },
        {
          "name": "paid_in_capital",
          "type": "string"
        },
        {
          "name": "called_capital",
          "type": "string"
        },
        {
          "name": "committed_capital",
          "type": "string"
        },
        {
          "name": "performance_fees",
          "type": "string"
        },
        {
          "name": "total_fund_revenue",
          "type": "decimal"
        },
        {
          "name": "liquidity_gate_frequency",
          "type": "string"
        },
        {
          "name": "strategy_return_volatility",
          "type": "decimal"
        }
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
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "reporting_entity_id",
          "type": "id"
        },
        {
          "name": "closed_investments",
          "type": "string"
        },
        {
          "name": "qualified_opportunities",
          "type": "string"
        },
        {
          "name": "deployed_capital",
          "type": "string"
        },
        {
          "name": "new_investments",
          "type": "string"
        },
        {
          "name": "follow_on_investments",
          "type": "string"
        },
        {
          "name": "eligible_portfolio_companies",
          "type": "string"
        },
        {
          "name": "impaired_carrying_value",
          "type": "string"
        },
        {
          "name": "portfolio_cost_basis",
          "type": "decimal"
        },
        {
          "name": "deals_with_co_investors",
          "type": "string"
        },
        {
          "name": "total_closed_deals",
          "type": "decimal"
        },
        {
          "name": "committed_capital",
          "type": "string"
        },
        {
          "name": "fundraising_target",
          "type": "string"
        },
        {
          "name": "management_fees",
          "type": "string"
        },
        {
          "name": "operating_expenses",
          "type": "string"
        },
        {
          "name": "program_investments",
          "type": "string"
        },
        {
          "name": "program_participants",
          "type": "string"
        },
        {
          "name": "inbound_qualified_opportunities",
          "type": "string"
        },
        {
          "name": "total_qualified_opportunities",
          "type": "decimal"
        },
        {
          "name": "active_portfolio_company_count",
          "type": "decimal"
        },
        {
          "name": "new_investments_count",
          "type": "decimal"
        },
        {
          "name": "qualified_opportunities_count",
          "type": "decimal"
        }
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
      "lastUpdated": "2026-06-28 00:00:00",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1946,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1985,
        1986,
        1987,
        1988,
        1990,
        1989,
        1996,
        1991,
        1992,
        1993,
        1994,
        1995,
        1997,
        1998
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1947,
      "industry": "Trusts",
      "segment": "core",
      "metricIds": [
        1999
      ]
    },
    "trusts.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "trust_vehicle_id",
          "type": "id"
        },
        {
          "name": "vehicle_type",
          "type": "enum"
        },
        {
          "name": "funds_from_operations",
          "type": "decimal"
        },
        {
          "name": "ffo",
          "type": "string"
        },
        {
          "name": "distributions",
          "type": "string"
        },
        {
          "name": "current_noi",
          "type": "string"
        },
        {
          "name": "prior_noi",
          "type": "string"
        },
        {
          "name": "trust_assets_under_administration",
          "type": "decimal"
        },
        {
          "name": "trustee_fees",
          "type": "string"
        },
        {
          "name": "average_trust_aua",
          "type": "string"
        }
      ],
      "metricIds": [
        1943,
        1944
      ],
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1621,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1620,
        1621,
        1622,
        1623,
        1625,
        1624,
        1631,
        1626,
        1627,
        1628,
        1629,
        1630,
        1632,
        1633
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1622,
      "industry": "Insurance",
      "segment": "core",
      "metricIds": [
        1634
      ]
    },
    "insurance.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "line_of_business",
          "type": "string"
        },
        {
          "name": "entity_segment",
          "type": "string"
        },
        {
          "name": "incurred_losses",
          "type": "string"
        },
        {
          "name": "underwriting_expense",
          "type": "string"
        },
        {
          "name": "earned_premiums",
          "type": "string"
        },
        {
          "name": "premium_growth",
          "type": "string"
        },
        {
          "name": "benefits_paid",
          "type": "string"
        },
        {
          "name": "catastrophe_losses",
          "type": "string"
        },
        {
          "name": "prior_reserve_development",
          "type": "string"
        }
      ],
      "metricIds": [
        1547,
        1548,
        1549,
        1555,
        1574,
        1575
      ],
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "quarterly",
      "grain": "quarter"
    },
    "credit_granting.core.financial_statements": {
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1715,
      "industry": "Credit Granting",
      "segment": "core",
      "metricIds": [
        1700,
        1701,
        1702,
        1703,
        1705,
        1704,
        1711,
        1706,
        1707,
        1708,
        1709,
        1710,
        1712,
        1713
      ]
    },
    "credit_granting.core.hr_records": {
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1716,
      "industry": "Credit Granting",
      "segment": "core",
      "metricIds": [
        1714
      ]
    },
    "credit_granting.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1717,
      "industry": "Credit Granting",
      "segment": "core",
      "metricIds": [
        1702,
        1703,
        1705
      ]
    },
    "credit_granting.core.payroll_records": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1718,
      "industry": "Credit Granting",
      "segment": "core",
      "metricIds": [
        1705,
        1703
      ]
    },
    "credit_granting.consumer_lending.loan_tape_summary": {
      "id": 1730,
      "name": "Aggregated consumer loan tape summary",
      "description": "Period aggregates by product line (cards, auto, personal). No account numbers. line_of_business distinguishes product; not mortgage collateral.",
      "industry": "Credit Granting",
      "segment": "consumer_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "product_line",
          "type": "string"
        },
        {
          "name": "interest_income",
          "type": "string"
        },
        {
          "name": "average_receivables",
          "type": "string"
        },
        {
          "name": "net_charge_offs",
          "type": "string"
        },
        {
          "name": "delinquent_balance_30_plus",
          "type": "string"
        },
        {
          "name": "total_receivables",
          "type": "decimal"
        },
        {
          "name": "origination_volume_growth",
          "type": "decimal"
        },
        {
          "name": "payment_volume",
          "type": "decimal"
        },
        {
          "name": "bnpl_origination_growth",
          "type": "string"
        },
        {
          "name": "embedded_channel_revenue",
          "type": "enum"
        },
        {
          "name": "total_consumer_finance_revenue",
          "type": "decimal"
        },
        {
          "name": "rtp_payment_volume",
          "type": "decimal"
        },
        {
          "name": "merchant_acquiring_volume",
          "type": "decimal"
        }
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
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "credit_granting.residential_mortgage.residential_mortgage_book_summary": {
      "id": 1794,
      "name": "Aggregated residential mortgage book summary",
      "description": "Lender-view mortgage portfolio aggregates. No borrower or loan identifiers.",
      "industry": "Credit Granting",
      "segment": "residential_mortgage",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "product_line",
          "type": "string"
        },
        {
          "name": "interest_income",
          "type": "string"
        },
        {
          "name": "average_mortgage_balances",
          "type": "string"
        },
        {
          "name": "delinquent_balance_30_plus",
          "type": "string"
        },
        {
          "name": "total_mortgage_balances",
          "type": "decimal"
        },
        {
          "name": "weighted_ltv_numerator",
          "type": "string"
        },
        {
          "name": "origination_volume",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1790,
        1791,
        1792,
        1793
      ],
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "credit_granting.commercial_lending.commercial_loan_book_summary": {
      "id": 1770,
      "name": "Aggregated commercial loan book summary",
      "description": "Period aggregates by book segment (C&I, middle market). No borrower identifiers or account numbers.",
      "industry": "Credit Granting",
      "segment": "commercial_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "entity_segment",
          "type": "string"
        },
        {
          "name": "outstanding_commercial_loans",
          "type": "string"
        },
        {
          "name": "interest_income",
          "type": "string"
        },
        {
          "name": "average_commercial_loans",
          "type": "string"
        },
        {
          "name": "non_performing_commercial_loans",
          "type": "string"
        },
        {
          "name": "total_commercial_loans",
          "type": "decimal"
        },
        {
          "name": "net_charge_offs",
          "type": "string"
        },
        {
          "name": "delinquent_balance_30_plus",
          "type": "string"
        },
        {
          "name": "origination_volume",
          "type": "decimal"
        },
        {
          "name": "weighted_ltv_numerator",
          "type": "string"
        },
        {
          "name": "drawn_commitments",
          "type": "string"
        },
        {
          "name": "total_commitments",
          "type": "decimal"
        },
        {
          "name": "sustainable_loan_balance",
          "type": "string"
        }
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
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "credit_granting.commercial_lending.commercial_treasury_summary": {
      "id": 1778,
      "name": "Aggregated commercial treasury summary",
      "description": "Treasury services fees, commercial deposits, and B2B payment volume. No client identifiers.",
      "industry": "Credit Granting",
      "segment": "commercial_lending",
      "format": "Document",
      "template": "Financial Statement Template",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "entity_segment",
          "type": "string"
        },
        {
          "name": "treasury_fee_revenue",
          "type": "decimal"
        },
        {
          "name": "average_commercial_deposits",
          "type": "string"
        },
        {
          "name": "commercial_payment_volume",
          "type": "decimal"
        }
      ],
      "metricIds": [
        1775,
        1776
      ],
      "lastUpdated": "2026-06-25 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    },
    "software_saas.core.financial_statements": {
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2055,
      "industry": "Software (SaaS)",
      "segment": "core",
      "metricIds": [
        2040,
        2041,
        2042,
        2043,
        2045,
        2044,
        2051,
        2046,
        2047,
        2048,
        2049,
        2050,
        2052,
        2053
      ]
    },
    "software_saas.core.hr_records": {
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2056,
      "industry": "Software (SaaS)",
      "segment": "core",
      "metricIds": [
        2054
      ]
    },
    "software_saas.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2057,
      "industry": "Software (SaaS)",
      "segment": "core",
      "metricIds": [
        2042,
        2043,
        2045
      ]
    },
    "software_saas.core.payroll_records": {
      "name": "Payroll records",
      "description": "Records related to employee salaries and payments.",
      "format": "Document",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 2058,
      "industry": "Software (SaaS)",
      "segment": "core",
      "metricIds": [
        2045,
        2043
      ]
    },
    "software_saas.subscription.subscription_billing": {
      "description": "Subscription and billing records for recurring-revenue analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "plan_name",
          "type": "string"
        },
        {
          "name": "mrr",
          "type": "string"
        },
        {
          "name": "billing_period",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "date"
        },
        {
          "name": "end_date",
          "type": "date"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
      ],
      "format": "Transactional Data Template",
      "id": 1570,
      "industry": "Software (SaaS)",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1580,
        1581,
        1582,
        1583,
        1587
      ],
      "name": "Subscription billing records",
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month",
      "segment": "subscription"
    },
    "software_saas.subscription.crm_pipeline": {
      "description": "Sales pipeline and CRM opportunities used for bookings and CAC analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "opportunity_id",
          "type": "id"
        },
        {
          "name": "account_name",
          "type": "decimal"
        },
        {
          "name": "stage",
          "type": "enum"
        },
        {
          "name": "amount",
          "type": "decimal"
        },
        {
          "name": "close_date",
          "type": "date"
        },
        {
          "name": "owner",
          "type": "string"
        },
        {
          "name": "probability",
          "type": "string"
        },
        {
          "name": "active_subscriptions",
          "type": "string"
        },
        {
          "name": "avg_monthly_price",
          "type": "decimal"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        }
      ],
      "format": "Software",
      "id": 1571,
      "industry": "Software (SaaS)",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1580,
        1584
      ],
      "name": "CRM / Sales pipeline",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month",
      "segment": "subscription"
    },
    "software_saas.subscription.product_usage": {
      "description": "Product engagement telemetry for retention and churn analysis.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "customer_id",
          "type": "id"
        },
        {
          "name": "active_users",
          "type": "string"
        },
        {
          "name": "sessions",
          "type": "string"
        },
        {
          "name": "feature_adoption",
          "type": "string"
        },
        {
          "name": "usage_minutes",
          "type": "string"
        },
        {
          "name": "starting_mrr",
          "type": "string"
        },
        {
          "name": "expansion_mrr",
          "type": "string"
        },
        {
          "name": "contraction_mrr",
          "type": "string"
        },
        {
          "name": "churned_mrr",
          "type": "string"
        }
      ],
      "format": "Software",
      "id": 1572,
      "industry": "Software (SaaS)",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1582,
        1583
      ],
      "name": "Product usage logs",
      "template": "Document",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month",
      "segment": "subscription"
    },
    "software_saas.subscription.marketing_spend": {
      "description": "Marketing and sales spend by channel for CAC and efficiency.",
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "channel",
          "type": "enum"
        },
        {
          "name": "campaign",
          "type": "string"
        },
        {
          "name": "spend",
          "type": "string"
        },
        {
          "name": "leads",
          "type": "string"
        },
        {
          "name": "new_customers",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "currency"
        },
        {
          "name": "sales_marketing_spend",
          "type": "string"
        },
        {
          "name": "avg_revenue_per_account",
          "type": "decimal"
        },
        {
          "name": "churn_rate",
          "type": "decimal"
        }
      ],
      "format": "Transactional Data Template",
      "id": 1573,
      "industry": "Software (SaaS)",
      "lastUpdated": "2026-06-24 00:00:00",
      "metricIds": [
        1584,
        1585
      ],
      "name": "Marketing spend records",
      "template": "Transactional Data Template",
      "fieldCoverage": "enumerated",
      "collectionFrequency": "monthly",
      "grain": "month",
      "segment": "subscription"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "statement_type",
          "type": "enum"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1641,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1640,
        1641,
        1642,
        1643,
        1645,
        1644,
        1651,
        1646,
        1647,
        1648,
        1649,
        1650,
        1652,
        1653
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
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
      "id": 1642,
      "industry": "Retail",
      "segment": "core",
      "metricIds": [
        1654
      ]
    },
    "retail.core.accounting_software": {
      "name": "Accounting Software",
      "description": "Software used for financial record keeping and reporting.",
      "format": "Software",
      "template": "Document",
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "cogs",
          "type": "decimal"
        },
        {
          "name": "cost_of_goods",
          "type": "decimal"
        },
        {
          "name": "operating_expenses",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "produce_revenue",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
      "lastUpdated": "2026-07-16 13:30:00",
      "dummyFields": [
        "Date",
        "Revenue_Streams",
        "Operating_Expenses",
        "Asset_Values",
        "Liability_Amounts"
      ],
      "fields": [
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "period_start_date",
          "type": "date"
        },
        {
          "name": "period_end_date",
          "type": "date"
        },
        {
          "name": "headcount",
          "type": "decimal"
        },
        {
          "name": "gross_pay",
          "type": "decimal"
        },
        {
          "name": "net_pay",
          "type": "decimal"
        },
        {
          "name": "employer_taxes",
          "type": "decimal"
        },
        {
          "name": "labor_cost",
          "type": "decimal"
        },
        {
          "name": "revenue",
          "type": "decimal"
        },
        {
          "name": "net_income",
          "type": "decimal"
        },
        {
          "name": "total_labor_costs",
          "type": "decimal"
        },
        {
          "name": "total_harvested_kg",
          "type": "decimal"
        },
        {
          "name": "total_production_cost",
          "type": "decimal"
        },
        {
          "name": "total_operational_cost",
          "type": "decimal"
        },
        {
          "name": "drivers_left",
          "type": "decimal"
        },
        {
          "name": "total_drivers",
          "type": "decimal"
        },
        {
          "name": "total_maintenance_costs",
          "type": "decimal"
        },
        {
          "name": "total_miles",
          "type": "decimal"
        }
      ],
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month",
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "store_id",
          "type": "id"
        },
        {
          "name": "current_period_sales",
          "type": "enum"
        },
        {
          "name": "prior_period_sales",
          "type": "enum"
        },
        {
          "name": "net_sales",
          "type": "string"
        },
        {
          "name": "selling_square_footage",
          "type": "string"
        },
        {
          "name": "transactions",
          "type": "string"
        },
        {
          "name": "visitors",
          "type": "string"
        }
      ],
      "metricIds": [
        1670,
        1673,
        1674
      ],
      "lastUpdated": "2026-06-24 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "weekly",
      "grain": "week"
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
        {
          "name": "date",
          "type": "date"
        },
        {
          "name": "banner",
          "type": "string"
        },
        {
          "name": "cogs",
          "type": "string"
        },
        {
          "name": "average_inventory_value",
          "type": "string"
        },
        {
          "name": "shrinkage_value",
          "type": "string"
        },
        {
          "name": "sales",
          "type": "string"
        }
      ],
      "metricIds": [
        1671,
        1672
      ],
      "lastUpdated": "2026-06-24 00:00:00",
      "fieldCoverage": "upload",
      "collectionFrequency": "monthly",
      "grain": "month"
    }
  }
};

export const DATA_OPTIONS = enrichDataOptions(REFERENCE_DATA.dataOptions);
