import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Period,
  PeriodStatus,
  ApiCollectionPeriods,
} from "@/types/api/rentals/periods/types";

export function apiCollectionPeriods(
  status?: PeriodStatus,
): Promise<ResponseData<ApiCollectionPeriods>> {
  return apiGet<ApiCollectionPeriods>("/rentals/periods/collection", {
    query: { status },
  });
}

export function apiOnePeriod(periodId: string): Promise<ResponseData<Period>> {
  return apiGet<Period>(`/rentals/periods/one/${periodId}`);
}
