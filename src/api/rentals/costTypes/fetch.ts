import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  CostType,
  ApiCollectionCostTypes,
} from "@/types/api/rentals/costTypes/types";

export function apiCollectionCostTypes(
  isActive?: boolean,
): Promise<ResponseData<ApiCollectionCostTypes>> {
  return apiGet<ApiCollectionCostTypes>("/rentals/cost_types/collection", {
    query: { is_active: isActive },
  });
}

export function apiOneCostType(
  costTypeId: string,
): Promise<ResponseData<CostType>> {
  return apiGet<CostType>(`/rentals/cost_types/one/${costTypeId}`);
}
