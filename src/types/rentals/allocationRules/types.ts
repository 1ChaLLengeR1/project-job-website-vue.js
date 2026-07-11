import type {
  RuleComponent,
  RuleMode,
} from "@/types/api/rentals/allocationRules/types";

export type CreateAllocationRuleBody = {
  beneficiary_id: string;
  component: RuleComponent;
  mode: RuleMode;
  start_date: string;
  apartment_id?: string | null;
  cost_type_id?: string | null;
  amount?: number | null;
  description?: string | null;
  end_date?: string | null;
};

export type UpdateAllocationRuleBody = {
  component: RuleComponent;
  mode: RuleMode;
  start_date: string;
  apartment_id?: string | null;
  cost_type_id?: string | null;
  amount?: number | null;
  description?: string | null;
  end_date?: string | null;
};

export type AllocationRuleFilters = {
  beneficiary_id?: string;
  apartment_id?: string;
  active_on?: string;
};
