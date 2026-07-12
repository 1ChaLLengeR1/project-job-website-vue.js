import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Tenant } from "@/types/api/rentals/tenants/types";
import type { CreateTenantBody } from "@/types/rentals/tenants/types";

export function apiCreateTenant(
  body: CreateTenantBody,
): Promise<ResponseData<Tenant>> {
  return apiPost<Tenant>("/rentals/tenants/create", body);
}
