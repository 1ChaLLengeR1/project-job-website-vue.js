import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type { CreateTenancyBody } from "@/types/rentals/tenancies/types";

export function apiCreateTenancy(
  body: CreateTenancyBody,
): Promise<ResponseData<Tenancy>> {
  return apiPost<Tenancy>("/rentals/tenancies/create", body);
}
