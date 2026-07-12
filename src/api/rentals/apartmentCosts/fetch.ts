import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  ApartmentCost,
  ApiCollectionApartmentCosts,
} from "@/types/api/rentals/apartmentCosts/types";
import type { ApartmentCostFilters } from "@/types/rentals/apartmentCosts/types";

export function apiCollectionApartmentCosts(
  filters: ApartmentCostFilters = {},
): Promise<ResponseData<ApiCollectionApartmentCosts>> {
  return apiGet<ApiCollectionApartmentCosts>(
    "/rentals/apartment_costs/collection",
    { query: { ...filters } },
  );
}

export function apiOneApartmentCost(
  apartmentCostId: string,
): Promise<ResponseData<ApartmentCost>> {
  return apiGet<ApartmentCost>(
    `/rentals/apartment_costs/one/${apartmentCostId}`,
  );
}
