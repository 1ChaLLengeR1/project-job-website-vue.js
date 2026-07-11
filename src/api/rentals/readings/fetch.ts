import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCollectionReadings } from "@/types/api/rentals/readings/types";

export function apiCollectionReadings(
  periodId: string,
): Promise<ResponseData<ApiCollectionReadings>> {
  return apiGet<ApiCollectionReadings>(
    `/rentals/readings/collection/${periodId}`,
  );
}
