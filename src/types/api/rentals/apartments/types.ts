export type Apartment = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionApartments = Apartment[];
