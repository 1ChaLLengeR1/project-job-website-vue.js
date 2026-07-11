import type { ChargeType } from "@/types/api/rentals/costTypes/types";

export type CreateCostTypeBody = {
  name: string;
  charge_type: ChargeType;
  is_active?: boolean;
};

export type UpdateCostTypeBody = {
  name: string;
  charge_type: ChargeType;
  is_active: boolean;
};
