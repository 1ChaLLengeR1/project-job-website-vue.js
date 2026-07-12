import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type { CreateBeneficiaryBody } from "@/types/rentals/beneficiaries/types";

export function apiCreateBeneficiary(
  body: CreateBeneficiaryBody,
): Promise<ResponseData<Beneficiary>> {
  return apiPost<Beneficiary>("/rentals/beneficiaries/create", body);
}
