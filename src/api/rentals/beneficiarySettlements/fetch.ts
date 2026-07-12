import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCollectionBeneficiarySettlements } from "@/types/api/rentals/beneficiarySettlements/types";

export function apiCollectionBeneficiarySettlements(
  filters: { period_id?: string; beneficiary_id?: string } = {},
): Promise<ResponseData<ApiCollectionBeneficiarySettlements>> {
  return apiGet<ApiCollectionBeneficiarySettlements>(
    "/rentals/beneficiary_settlements/collection",
    { query: { ...filters } },
  );
}
