export type CreateReadingBody = {
  period_id: string;
  meter_id: string;
  previous_value: number;
  current_value: number;
  error_correction?: number;
};

export type UpdateReadingBody = {
  previous_value: number;
  current_value: number;
  error_correction: number;
};
