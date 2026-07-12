import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type { UpdateApartmentCostBody } from "@/types/rentals/apartmentCosts/types";

export function apiUpdateApartmentCost(
  apartmentCostId: string,
  body: UpdateApartmentCostBody,
): Promise<ResponseData<ApartmentCost>> {
  return apiPut<ApartmentCost>(
    `/rentals/apartment_costs/update/${apartmentCostId}`,
    body,
  );
}
