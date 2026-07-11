export type MediaType = "electricity" | "water";

export type Meter = {
  id: string;
  apartment_id: string | null;
  media_type: MediaType;
  is_master: boolean;
  name: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionMeters = Meter[];
