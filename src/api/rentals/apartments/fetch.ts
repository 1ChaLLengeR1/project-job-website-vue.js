import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Apartment,
  ApiCollectionApartments,
} from "@/types/api/rentals/apartments/types";

export function apiCollectionApartments(
  isActive?: boolean,
): Promise<ResponseData<ApiCollectionApartments>> {
  return apiGet<ApiCollectionApartments>("/rentals/apartments/collection", {
    query: { is_active: isActive },
  });
}

export function apiOneApartment(
  apartmentId: string,
): Promise<ResponseData<Apartment>> {
  return apiGet<Apartment>(`/rentals/apartments/one/${apartmentId}`);
}
