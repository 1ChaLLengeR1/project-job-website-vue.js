import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type { CreateApartmentCostBody } from "@/types/rentals/apartmentCosts/types";

export function apiCreateApartmentCost(
  body: CreateApartmentCostBody,
): Promise<ResponseData<ApartmentCost>> {
  return apiPost<ApartmentCost>("/rentals/apartment_costs/create", body);
}
