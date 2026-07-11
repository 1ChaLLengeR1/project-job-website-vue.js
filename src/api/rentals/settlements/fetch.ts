import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  SettlementSnapshot,
  ApiCollectionSettlements,
} from "@/types/api/rentals/settlements/types";

export function apiCollectionSettlements(
  filters: { period_id?: string; apartment_id?: string } = {},
): Promise<ResponseData<ApiCollectionSettlements>> {
  return apiGet<ApiCollectionSettlements>("/rentals/settlements/collection", {
    query: { ...filters },
  });
}

export function apiOneSettlement(
  settlementId: string,
): Promise<ResponseData<SettlementSnapshot>> {
  return apiGet<SettlementSnapshot>(`/rentals/settlements/one/${settlementId}`);
}
