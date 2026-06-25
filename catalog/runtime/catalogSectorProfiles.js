/**
 * AUTO-GENERATED from catalog/core/financial_sector_profiles.yaml and
 * catalog/core/transportation_sector_profiles.yaml — do not edit by hand.
 * Run: npm run catalog:generate
 */
export const FINANCIAL_SECTOR_PROFILES = {
  "banking_depository": {
    "primaryRevenueDriver": "Net interest margin (interest spread on deposits and loans)",
    "globalAssetConcentration": "highest",
    "coreRiskProfile": "Credit risk and liquidity runs",
    "regulatoryIntensity": "extremely_high",
    "capitalModel": "balance_sheet_heavy",
    "cyclicality": "defensive",
    "regulatoryFrameworks": [
      "Basel III/IV"
    ],
    "catalogIndustry": "Banking",
    "catalogSegments": [
      "depository"
    ],
    "representativeMetricKeys": [
      "banking.depository.net_interest_margin",
      "banking.depository.non_performing_loan_ratio",
      "banking.depository.tier1_capital_ratio"
    ]
  },
  "insurance": {
    "primaryRevenueDriver": "Premiums and investment income on float",
    "globalAssetConcentration": "very_high",
    "coreRiskProfile": "Actuarial and catastrophic risk",
    "regulatoryIntensity": "high",
    "capitalModel": "balance_sheet_heavy",
    "cyclicality": "defensive",
    "regulatoryFrameworks": [
      "Solvency II",
      "IAIS"
    ],
    "catalogIndustry": "Insurance",
    "catalogSegments": [
      "property_casualty",
      "life",
      "health",
      "reinsurance"
    ],
    "representativeMetricKeys": [
      "insurance.property_casualty.combined_ratio",
      "insurance.property_casualty.loss_ratio",
      "insurance.property_casualty.premium_growth"
    ]
  },
  "fund": {
    "primaryRevenueDriver": "Assets under management fees, performance fees, and fund economics",
    "globalAssetConcentration": "moderate",
    "coreRiskProfile": "Market volatility, fund flow, and illiquidity risk",
    "regulatoryIntensity": "moderate_high",
    "capitalModel": "capital_light",
    "cyclicality": "mixed",
    "regulatoryFrameworks": [
      "UCITS",
      "Private fund rules",
      "Fiduciary duty"
    ],
    "catalogIndustry": "Funds",
    "catalogSegments": [
      "fund"
    ],
    "representativeMetricKeys": [
      "funds.fund.assets_under_management",
      "funds.fund.management_fee_yield",
      "funds.fund.tvpi"
    ]
  },
  "trust": {
    "primaryRevenueDriver": "Trust vehicle distributions and trustee administration fees",
    "globalAssetConcentration": "moderate",
    "coreRiskProfile": "Property and interest-rate sensitivity at vehicle level",
    "regulatoryIntensity": "high",
    "capitalModel": "balance_sheet_heavy",
    "cyclicality": "mixed",
    "regulatoryFrameworks": [
      "REIT and trust tax regimes",
      "Fiduciary duty"
    ],
    "catalogIndustry": "Trusts",
    "catalogSegments": [
      "trust"
    ],
    "representativeMetricKeys": [
      "trusts.trust.funds_from_operations",
      "trusts.trust.ffo_payout_ratio",
      "trusts.trust.trustee_fee_yield"
    ]
  },
  "investment_banking": {
    "primaryRevenueDriver": "Advisory and underwriting fees; trading revenues",
    "globalAssetConcentration": "low_moderate",
    "coreRiskProfile": "Market-making and counterparty risk",
    "regulatoryIntensity": "high",
    "capitalModel": "capital_light",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "Securities laws",
      "Volcker Rule"
    ],
    "catalogIndustry": "Financial Services",
    "catalogSegments": [
      "investment_banking"
    ],
    "representativeMetricKeys": [
      "financial_services.investment_banking.trading_revenue_ratio",
      "financial_services.investment_banking.advisory_fee_ratio"
    ]
  },
  "consumer_finance": {
    "primaryRevenueDriver": "High interest rates and transaction fees on consumer credit",
    "globalAssetConcentration": "moderate",
    "coreRiskProfile": "High default and macroeconomic risk",
    "regulatoryIntensity": "high",
    "capitalModel": "balance_sheet_heavy",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "Consumer protection",
      "Truth in Lending"
    ],
    "catalogIndustry": "Consumer Finance",
    "catalogSegments": [
      "consumer_lending"
    ],
    "representativeMetricKeys": [
      "consumer_finance.consumer_lending.portfolio_yield",
      "consumer_finance.consumer_lending.net_charge_off_rate",
      "consumer_finance.consumer_lending.delinquency_rate_30d"
    ]
  },
  "commercial_finance": {
    "primaryRevenueDriver": "Interest spread on C&I and middle-market commercial loans",
    "globalAssetConcentration": "high",
    "coreRiskProfile": "Credit concentration and cyclical default risk",
    "regulatoryIntensity": "extremely_high",
    "capitalModel": "balance_sheet_heavy",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "Basel III/IV"
    ],
    "catalogIndustry": "Commercial Finance",
    "catalogSegments": [
      "commercial_lending"
    ],
    "representativeMetricKeys": [
      "commercial_finance.commercial_lending.portfolio_yield",
      "commercial_finance.commercial_lending.non_performing_loan_ratio",
      "commercial_finance.commercial_lending.commercial_loan_growth"
    ]
  },
  "fintech": {
    "primaryRevenueDriver": "SaaS fees and per-transaction cuts",
    "globalAssetConcentration": "lowest",
    "coreRiskProfile": "Cybersecurity and technology obsolescence",
    "regulatoryIntensity": "evolving",
    "capitalModel": "capital_light",
    "cyclicality": "mixed",
    "regulatoryFrameworks": [
      "Regional payments licensing"
    ],
    "catalogIndustry": "Financial Services",
    "catalogSegments": [
      "subscription"
    ],
    "representativeMetricKeys": [
      "Allfinancesaas-mrr",
      "Allfinancesaas-nrr"
    ]
  }
};

export const TRANSPORTATION_SECTOR_PROFILES = {
  "aviation_network_carrier": {
    "primaryRevenueDriver": "Passenger and ancillary yield on available seat capacity",
    "assetIntensity": "very_high",
    "coreRiskProfile": "Fuel price, labor, and fleet utilization",
    "regulatoryIntensity": "high",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "ICAO",
      "National aviation authorities"
    ],
    "catalogIndustry": "Aviation",
    "catalogSegments": [
      "network_carrier"
    ],
    "conceptualAnalogue": "Road fleet utilization maps to load factor, not fleet_utilization percentage",
    "representativeMetricKeys": [
      "aviation.network_carrier.load_factor",
      "aviation.network_carrier.casm",
      "aviation.network_carrier.rasm",
      "aviation.network_carrier.on_time_performance"
    ]
  },
  "airport": {
    "primaryRevenueDriver": "Aeronautical charges and commercial concessions per passenger",
    "assetIntensity": "very_high",
    "coreRiskProfile": "Traffic volume and regulatory tariff caps",
    "regulatoryIntensity": "high",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "Airport economic regulation"
    ],
    "catalogIndustry": "Aviation",
    "catalogSegments": [
      "airport"
    ],
    "representativeMetricKeys": [
      "aviation.airport.passengers_enplaned_growth",
      "aviation.airport.aeronautical_revenue_per_passenger",
      "aviation.airport.commercial_revenue_share"
    ]
  },
  "travel_distribution": {
    "primaryRevenueDriver": "Take rate on gross bookings and advertising",
    "assetIntensity": "lowest",
    "coreRiskProfile": "Supplier concentration and search funnel conversion",
    "regulatoryIntensity": "evolving",
    "cyclicality": "mixed",
    "regulatoryFrameworks": [
      "Consumer travel protection"
    ],
    "catalogIndustry": "Aviation",
    "catalogSegments": [
      "travel_distribution"
    ],
    "representativeMetricKeys": [
      "aviation.travel_distribution.gbv_take_rate",
      "aviation.travel_distribution.look_to_book_conversion"
    ]
  },
  "air_cargo": {
    "primaryRevenueDriver": "Cargo yield per tonne-kilometer and load factor",
    "assetIntensity": "high",
    "coreRiskProfile": "Trade lanes and belly versus freighter mix",
    "regulatoryIntensity": "moderate_high",
    "cyclicality": "highly_cyclical",
    "catalogIndustry": "Aviation",
    "catalogSegments": [
      "air_cargo"
    ],
    "representativeMetricKeys": [
      "aviation.air_cargo.cargo_load_factor",
      "aviation.air_cargo.cargo_yield_per_tonne_km"
    ]
  },
  "road_freight_logistics": {
    "primaryRevenueDriver": "Shipper rates per mile and fleet utilization",
    "assetIntensity": "high",
    "coreRiskProfile": "Driver labor, fuel, and maintenance per mile",
    "regulatoryIntensity": "moderate_high",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "Hours of service",
      "Vehicle safety"
    ],
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "road_freight"
    ],
    "conceptualAnalogue": "Fleet utilization and MPG are road-specific; do not alias to aviation load factor or CASM",
    "representativeMetricKeys": [
      "iIaKhCCf0BGvHX1W1i7n",
      "biA3oIK816fwfInBKg2e",
      "SAZkxRxYFtf1EIxBXWMk"
    ]
  },
  "rail_freight": {
    "primaryRevenueDriver": "Ton-mile pricing and train utilization",
    "assetIntensity": "very_high",
    "coreRiskProfile": "Network congestion and interchange delays",
    "regulatoryIntensity": "high",
    "cyclicality": "mixed",
    "regulatoryFrameworks": [
      "Surface transportation board"
    ],
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "rail_freight"
    ],
    "representativeMetricKeys": [
      "transportation.rail_freight.train_utilization",
      "transportation.rail_freight.cost_per_ton_mile",
      "transportation.rail_freight.on_time_train_performance"
    ]
  },
  "rail_passenger": {
    "primaryRevenueDriver": "Farebox recovery and ridership density",
    "assetIntensity": "very_high",
    "coreRiskProfile": "Subsidy dependence and service frequency",
    "regulatoryIntensity": "high",
    "cyclicality": "defensive",
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "rail_passenger"
    ],
    "representativeMetricKeys": [
      "transportation.rail_passenger.ridership_per_train_mile",
      "transportation.rail_passenger.farebox_recovery"
    ]
  },
  "maritime_shipping": {
    "primaryRevenueDriver": "Time charter equivalent and vessel utilization",
    "assetIntensity": "very_high",
    "coreRiskProfile": "Bunker costs and charter rate cycles",
    "regulatoryIntensity": "moderate_high",
    "cyclicality": "highly_cyclical",
    "regulatoryFrameworks": [
      "IMO environmental rules"
    ],
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "maritime_shipping"
    ],
    "representativeMetricKeys": [
      "transportation.maritime_shipping.vessel_utilization",
      "transportation.maritime_shipping.time_charter_equivalent",
      "transportation.maritime_shipping.schedule_reliability"
    ]
  },
  "public_transit": {
    "primaryRevenueDriver": "Farebox recovery and public subsidy",
    "assetIntensity": "high",
    "coreRiskProfile": "Ridership recovery and operating subsidies",
    "regulatoryIntensity": "high",
    "cyclicality": "defensive",
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "public_transit"
    ],
    "representativeMetricKeys": [
      "transportation.public_transit.farebox_recovery_ratio",
      "transportation.public_transit.ridership_per_vehicle_hour",
      "transportation.public_transit.on_time_performance"
    ]
  },
  "freight_forwarding": {
    "primaryRevenueDriver": "Margin per shipment on buy-sell logistics",
    "assetIntensity": "low_moderate",
    "coreRiskProfile": "Carrier capacity and shipper SLA penalties",
    "regulatoryIntensity": "moderate",
    "cyclicality": "highly_cyclical",
    "catalogIndustry": "Transportation",
    "catalogSegments": [
      "freight_forwarding"
    ],
    "representativeMetricKeys": [
      "transportation.freight_forwarding.gross_margin_per_shipment",
      "transportation.freight_forwarding.on_time_delivery_shipper"
    ]
  }
};
