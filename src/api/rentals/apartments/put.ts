import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { UpdateApartmentBody } from "@/types/rentals/apartments/types";

export function apiUpdateApartment(
  apartmentId: string,
  body: UpdateApartmentBody,
): Promise<ResponseData<Apartment>> {
  return apiPut<Apartment>(`/rentals/apartments/update/${apartmentId}`, body);
}
