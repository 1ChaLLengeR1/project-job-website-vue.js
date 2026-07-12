import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  AllocationRule,
  ApiCollectionAllocationRules,
} from "@/types/api/rentals/allocationRules/types";
import type { AllocationRuleFilters } from "@/types/rentals/allocationRules/types";

export function apiCollectionAllocationRules(
  filters: AllocationRuleFilters = {},
): Promise<ResponseData<ApiCollectionAllocationRules>> {
  return apiGet<ApiCollectionAllocationRules>(
    "/rentals/allocation_rules/collection",
    { query: { ...filters } },
  );
}

export function apiOneAllocationRule(
  ruleId: string,
): Promise<ResponseData<AllocationRule>> {
  return apiGet<AllocationRule>(`/rentals/allocation_rules/one/${ruleId}`);
}
