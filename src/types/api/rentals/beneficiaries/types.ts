export type Beneficiary = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiCollectionBeneficiaries = Beneficiary[];
