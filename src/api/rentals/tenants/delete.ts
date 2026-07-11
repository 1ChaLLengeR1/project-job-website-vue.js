import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenant } from "@/types/api/rentals/tenants/types";

export function apiDeleteTenant(
  tenantId: string,
): Promise<ResponseData<Tenant>> {
  return apiDelete<Tenant>(`/rentals/tenants/delete/${tenantId}`);
}
