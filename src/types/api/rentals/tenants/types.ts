export type Tenant = {
  id: string;
  first_name: string;
  last_name: string | null;
  note: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionTenants = Tenant[];
