export type ChargeType = "fixed" | "per_person";

export type CostType = {
  id: string;
  name: string;
  charge_type: ChargeType;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionCostTypes = CostType[];
