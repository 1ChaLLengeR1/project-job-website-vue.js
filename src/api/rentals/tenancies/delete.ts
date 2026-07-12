import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenancy } from "@/types/api/rentals/tenancies/types";

export function apiDeleteTenancy(
  tenancyId: string,
): Promise<ResponseData<Tenancy>> {
  return apiDelete<Tenancy>(`/rentals/tenancies/delete/${tenancyId}`);
}
