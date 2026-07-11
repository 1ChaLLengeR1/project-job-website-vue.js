export type CreateTenantBody = {
  first_name: string;
  last_name?: string | null;
  note?: string | null;
  is_active?: boolean;
};

export type UpdateTenantBody = {
  first_name: string;
  last_name?: string | null;
  note?: string | null;
  is_active: boolean;
};
