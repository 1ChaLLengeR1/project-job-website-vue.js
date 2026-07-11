export type PeriodStatus = "draft" | "closed";

export type Period = {
  id: string;
  period_month: string;
  status: PeriodStatus;
  electricity_bill_amount: number | null;
  electricity_rate: number | null;
  electricity_rate_is_manual: boolean;
  water_rate: number;
  note: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionPeriods = Period[];

// Pełne wyliczenie okresu — response POST preview/{id} i POST close/{id}

export type MainMeterErrorProposal = {
  meter_id: string;
  apartment_id: string | null;
  proposed_correction: number;
};

export type MainMeterError = {
  main_difference: number;
  apartments_total: number;
  error: number;
  proposals: MainMeterErrorProposal[];
};

export type MeterConsumption = {
  meter_id: string;
  apartment_id: string | null;
  media_type: string;
  raw_difference: number;
  consumption: number;
  error_correction: number;
  is_master: boolean;
};

export type CalculationSettlementItem = {
  name: string;
  kind: string;
  amount: number;
  cost_type_id: string | null;
};

export type CalculationSettlement = {
  apartment_id: string;
  tenancy_id: string | null;
  rent_amount: number;
  electricity_consumption: number;
  electricity_cost: number;
  water_consumption: number;
  water_cost: number;
  total_media_amount: number;
  total_amount: number;
  items: CalculationSettlementItem[];
};

export type CalculationSettlementEntry = {
  apartment_id: string;
  apartment_name: string;
  settlement: CalculationSettlement;
};

export type CalculationBeneficiaryItem = {
  description: string;
  amount: number;
  rule_id: string | null;
  settlement_id: string | null;
};

export type CalculationBeneficiary = {
  beneficiary_id: string;
  beneficiary_name: string;
  total_amount: number;
  items: CalculationBeneficiaryItem[];
};

export type PeriodCalculation = {
  period: Period;
  electricity_rate: number;
  electricity_total_consumption: number;
  main_meter_error: MainMeterError | null;
  consumptions: MeterConsumption[];
  settlements: CalculationSettlementEntry[];
  beneficiaries: CalculationBeneficiary[];
  warnings: string[];
};
