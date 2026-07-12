export type SettlementSnapshotItem = {
  id: string;
  settlement_id: string;
  cost_type_id: string | null;
  name: string;
  kind: string;
  amount: number;
  created_at: string | null;
  updated_at: string | null;
};

export type SettlementSnapshot = {
  id: string;
  period_id: string;
  apartment_id: string;
  tenancy_id: string | null;
  rent_amount: number;
  electricity_consumption: number;
  electricity_cost: number;
  water_consumption: number;
  water_cost: number;
  total_media_amount: number;
  total_amount: number;
  note: string | null;
  created_at: string | null;
  updated_at: string | null;
  items: SettlementSnapshotItem[];
};

export type ApiCollectionSettlements = SettlementSnapshot[];
