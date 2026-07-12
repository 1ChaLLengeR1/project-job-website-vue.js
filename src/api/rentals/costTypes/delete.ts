import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { CostType } from "@/types/api/rentals/costTypes/types";

export function apiDeleteCostType(
  costTypeId: string,
): Promise<ResponseData<CostType>> {
  return apiDelete<CostType>(`/rentals/cost_types/delete/${costTypeId}`);
}
