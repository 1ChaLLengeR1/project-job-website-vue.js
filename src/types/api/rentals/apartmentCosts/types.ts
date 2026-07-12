export type ApartmentCost = {
  id: string;
  apartment_id: string;
  cost_type_id: string;
  amount: number;
  start_date: string;
  end_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionApartmentCosts = ApartmentCost[];
