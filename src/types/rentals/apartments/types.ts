export type CreateApartmentBody = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export type UpdateApartmentBody = {
  name: string;
  description?: string | null;
  is_active: boolean;
};
