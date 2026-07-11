import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type { UpdateBeneficiaryBody } from "@/types/rentals/beneficiaries/types";

export function apiUpdateBeneficiary(
  beneficiaryId: string,
  body: UpdateBeneficiaryBody,
): Promise<ResponseData<Beneficiary>> {
  return apiPut<Beneficiary>(
    `/rentals/beneficiaries/update/${beneficiaryId}`,
    body,
  );
}
