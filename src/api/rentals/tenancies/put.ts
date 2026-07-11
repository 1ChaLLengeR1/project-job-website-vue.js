import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type { UpdateTenancyBody } from "@/types/rentals/tenancies/types";

export function apiUpdateTenancy(
  tenancyId: string,
  body: UpdateTenancyBody,
): Promise<ResponseData<Tenancy>> {
  return apiPut<Tenancy>(`/rentals/tenancies/update/${tenancyId}`, body);
}
