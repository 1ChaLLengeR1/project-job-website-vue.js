export type BeneficiarySettlementItem = {
  id: string;
  beneficiary_settlement_id: string;
  description: string;
  amount: number;
  rule_id: string | null;
  settlement_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BeneficiarySettlement = {
  id: string;
  period_id: string;
  beneficiary_id: string;
  total_amount: number;
  created_at: string | null;
  updated_at: string | null;
  items: BeneficiarySettlementItem[];
};

export type ApiCollectionBeneficiarySettlements = BeneficiarySettlement[];
