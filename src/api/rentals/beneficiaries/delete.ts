import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";

export function apiDeleteBeneficiary(
  beneficiaryId: string,
): Promise<ResponseData<Beneficiary>> {
  return apiDelete<Beneficiary>(
    `/rentals/beneficiaries/delete/${beneficiaryId}`,
  );
}
