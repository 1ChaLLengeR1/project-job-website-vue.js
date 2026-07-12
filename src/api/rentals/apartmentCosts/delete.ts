import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";

export function apiDeleteApartmentCost(
  apartmentCostId: string,
): Promise<ResponseData<ApartmentCost>> {
  return apiDelete<ApartmentCost>(
    `/rentals/apartment_costs/delete/${apartmentCostId}`,
  );
}
