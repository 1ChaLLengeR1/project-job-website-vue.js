import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { CostType } from "@/types/api/rentals/costTypes/types";
import type { UpdateCostTypeBody } from "@/types/rentals/costTypes/types";

export function apiUpdateCostType(
  costTypeId: string,
  body: UpdateCostTypeBody,
): Promise<ResponseData<CostType>> {
  return apiPut<CostType>(`/rentals/cost_types/update/${costTypeId}`, body);
}
