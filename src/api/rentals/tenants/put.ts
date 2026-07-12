import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenant } from "@/types/api/rentals/tenants/types";
import type { UpdateTenantBody } from "@/types/rentals/tenants/types";

export function apiUpdateTenant(
  tenantId: string,
  body: UpdateTenantBody,
): Promise<ResponseData<Tenant>> {
  return apiPut<Tenant>(`/rentals/tenants/update/${tenantId}`, body);
}
