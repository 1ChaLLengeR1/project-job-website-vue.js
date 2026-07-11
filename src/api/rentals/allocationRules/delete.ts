import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";

export function apiDeleteAllocationRule(
  ruleId: string,
): Promise<ResponseData<AllocationRule>> {
  return apiDelete<AllocationRule>(
    `/rentals/allocation_rules/delete/${ruleId}`,
  );
}
