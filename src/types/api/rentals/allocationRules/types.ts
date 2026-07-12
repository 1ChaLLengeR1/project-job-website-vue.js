export type RuleComponent =
  | "rent"
  | "electricity"
  | "water"
  | "cost_type"
  | "recurring";

export type RuleMode = "fixed_amount" | "full";

export type AllocationRule = {
  id: string;
  beneficiary_id: string;
  apartment_id: string | null;
  component: RuleComponent;
  cost_type_id: string | null;
  mode: RuleMode;
  amount: number | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionAllocationRules = AllocationRule[];
