export type CreateBeneficiaryBody = {
  name: string;
  is_active?: boolean;
};

export type UpdateBeneficiaryBody = {
  name: string;
  is_active: boolean;
};
