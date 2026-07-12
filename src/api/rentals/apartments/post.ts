import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { CreateApartmentBody } from "@/types/rentals/apartments/types";

export function apiCreateApartment(
  body: CreateApartmentBody,
): Promise<ResponseData<Apartment>> {
  return apiPost<Apartment>("/rentals/apartments/create", body);
}
