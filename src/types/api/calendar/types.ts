export type ApiCalendaryStatistics = {
  year: number;
  total_hours_worked: number;
  total_earnings: number;
  working_days_count: number;
  total_norm_hours: number;
  hours_difference: number;
  total_holidays: number;
  total_days_in_year: number;
  average_hours_per_working_day: number;
  average_daily_earnings: number;
  work_efficiency_percentage: number;
};

export type ApiCollectionCalendary = {
  year: number;
  month: number;
  month_name: string;
  days: Array<OneCalendaryDay>;
  statistics: OneCalendaryStatistics;
};

export type OneCalendaryStatistics = {
  total_hours_worked: number;
  total_norm_hours: number;
  total_salary: number;
  weeks: OneCalendaryWeek;
};

export type OneCalendaryDay = {
  id: string;
  date: string;
  day_number: number;
  day_name: string;
  hours_worked: number;
  is_holiday: boolean;
  norm_hours: number;
  hourly_rate: number;
  daily_salary: number;
};

export type OneCalendaryWeek = {
  week_number: number;
  total_hours: number;
  total_norm_hours: number;
  hourly_rate: number;
  salary: number;
};
