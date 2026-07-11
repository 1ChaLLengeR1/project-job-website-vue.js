import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";
import type { UpdateAllocationRuleBody } from "@/types/rentals/allocationRules/types";

export function apiUpdateAllocationRule(
  ruleId: string,
  body: UpdateAllocationRuleBody,
): Promise<ResponseData<AllocationRule>> {
  return apiPut<AllocationRule>(
    `/rentals/allocation_rules/update/${ruleId}`,
    body,
  );
}
