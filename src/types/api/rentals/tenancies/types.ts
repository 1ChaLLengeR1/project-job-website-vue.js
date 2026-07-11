export type Tenancy = {
  id: string;
  apartment_id: string;
  tenant_id: string;
  rent_amount: number;
  persons_count: number;
  start_date: string;
  end_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionTenancies = Tenancy[];
