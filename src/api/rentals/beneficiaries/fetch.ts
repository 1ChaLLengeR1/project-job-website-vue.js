import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Beneficiary,
  ApiCollectionBeneficiaries,
} from "@/types/api/rentals/beneficiaries/types";

export function apiCollectionBeneficiaries(
  isActive?: boolean,
): Promise<ResponseData<ApiCollectionBeneficiaries>> {
  return apiGet<ApiCollectionBeneficiaries>(
    "/rentals/beneficiaries/collection",
    { query: { is_active: isActive } },
  );
}

export function apiOneBeneficiary(
  beneficiaryId: string,
): Promise<ResponseData<Beneficiary>> {
  return apiGet<Beneficiary>(`/rentals/beneficiaries/one/${beneficiaryId}`);
}
