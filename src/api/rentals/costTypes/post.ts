import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { CostType } from "@/types/api/rentals/costTypes/types";
import type { CreateCostTypeBody } from "@/types/rentals/costTypes/types";

export function apiCreateCostType(
  body: CreateCostTypeBody,
): Promise<ResponseData<CostType>> {
  return apiPost<CostType>("/rentals/cost_types/create", body);
}
