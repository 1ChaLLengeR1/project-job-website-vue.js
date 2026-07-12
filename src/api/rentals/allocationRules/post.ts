import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";
import type { CreateAllocationRuleBody } from "@/types/rentals/allocationRules/types";

export function apiCreateAllocationRule(
  body: CreateAllocationRuleBody,
): Promise<ResponseData<AllocationRule>> {
  return apiPost<AllocationRule>("/rentals/allocation_rules/create", body);
}
