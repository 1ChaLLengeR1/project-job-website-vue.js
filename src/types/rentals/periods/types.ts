export type CreatePeriodBody = {
  period_month: string;
  electricity_bill_amount?: number | null;
  electricity_rate?: number | null;
  electricity_rate_is_manual?: boolean;
  water_rate?: number;
  note?: string | null;
};

export type UpdatePeriodBody = {
  electricity_bill_amount?: number | null;
  electricity_rate?: number | null;
  electricity_rate_is_manual: boolean;
  water_rate: number;
  note?: string | null;
};

// Korekta jednorazowa per mieszkanie (body preview/close)
export type PeriodAdjustment = {
  apartment_id: string;
  name: string;
  amount: number;
};

export type PeriodCalculationBody = {
  adjustments?: PeriodAdjustment[];
};
