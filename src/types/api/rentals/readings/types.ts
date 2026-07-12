export type Reading = {
  id: string;
  period_id: string;
  meter_id: string;
  previous_value: number;
  current_value: number;
  error_correction: number;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionReadings = Reading[];
