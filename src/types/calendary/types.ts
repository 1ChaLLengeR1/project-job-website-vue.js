export type PayloadBodyCreateCalendary = {
  year: number;
};

export type PayloadBodyUpdateByIdCalendaryDay = {
  norm_hours: string;
  hours_worked: string;
  hourly_rate: string;
};

export type PayloadBodyUpdateDaysMany = {
  year: string;
  month: string;
  start_day: string;
  end_day: string;
  norm_hours: string;
  hours_worked: string;
  hourly_rate: string;
};

export type PayloadBodyCreateCondition = {
  norm_hours: string;
  hours_worked: string;
};
