import type { MediaType } from "@/types/api/rentals/meters/types";

export type CreateMeterBody = {
  media_type: MediaType;
  apartment_id?: string | null;
  is_master?: boolean;
  name?: string | null;
  is_active?: boolean;
};

export type UpdateMeterBody = {
  is_master: boolean;
  name?: string | null;
  is_active: boolean;
};

export type MeterFilters = {
  apartment_id?: string;
  media_type?: MediaType;
  is_active?: boolean;
};
