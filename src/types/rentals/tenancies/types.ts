export type CreateTenancyBody = {
  apartment_id: string;
  tenant_id: string;
  rent_amount: number;
  persons_count?: number;
  start_date: string;
  end_date?: string | null;
};

export type UpdateTenancyBody = {
  rent_amount: number;
  persons_count: number;
  start_date: string;
  end_date?: string | null;
};

export type TenancyFilters = {
  apartment_id?: string;
  tenant_id?: string;
  active_on?: string;
};
