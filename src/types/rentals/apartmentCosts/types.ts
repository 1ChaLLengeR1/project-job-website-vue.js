export type CreateApartmentCostBody = {
  apartment_id: string;
  cost_type_id: string;
  amount: number;
  start_date: string;
  end_date?: string | null;
};

export type UpdateApartmentCostBody = {
  amount: number;
  start_date: string;
  end_date?: string | null;
};

export type ApartmentCostFilters = {
  apartment_id?: string;
  active_on?: string;
};
