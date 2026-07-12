import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCollectionLogs } from "@/types/api/logs/types";

export function collectionLogs(
  num: number,
): Promise<ResponseData<ApiCollectionLogs>> {
  return apiGet<ApiCollectionLogs>(`/logs/collection/${num}`);
}
