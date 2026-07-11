import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  ApiCollectionCalendary,
  ApiCalendaryStatistics,
} from "@/types/api/calendar/types";

export function apiCollectionCalendary(
  year: number,
  month: number,
): Promise<ResponseData<ApiCollectionCalendary>> {
  return apiGet<ApiCollectionCalendary>("/calendar/collection", {
    query: { year, month },
  });
}

export function apiCollectionCalendaryStatistics(
  year: number,
): Promise<ResponseData<ApiCalendaryStatistics>> {
  return apiGet<ApiCalendaryStatistics>("/calendar/statistics", {
    query: { year },
  });
}
