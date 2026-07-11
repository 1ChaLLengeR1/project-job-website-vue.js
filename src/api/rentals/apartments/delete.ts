import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Apartment } from "@/types/api/rentals/apartments/types";

export function apiDeleteApartment(
  apartmentId: string,
): Promise<ResponseData<Apartment>> {
  return apiDelete<Apartment>(`/rentals/apartments/delete/${apartmentId}`);
}
