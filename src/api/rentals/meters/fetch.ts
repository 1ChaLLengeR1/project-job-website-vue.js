import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Meter,
  ApiCollectionMeters,
} from "@/types/api/rentals/meters/types";
import type { MeterFilters } from "@/types/rentals/meters/types";

export function apiCollectionMeters(
  filters: MeterFilters = {},
): Promise<ResponseData<ApiCollectionMeters>> {
  return apiGet<ApiCollectionMeters>("/rentals/meters/collection", {
    query: { ...filters },
  });
}

export function apiOneMeter(meterId: string): Promise<ResponseData<Meter>> {
  return apiGet<Meter>(`/rentals/meters/one/${meterId}`);
}
