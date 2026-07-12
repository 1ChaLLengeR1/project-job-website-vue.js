import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Tenant,
  ApiCollectionTenants,
} from "@/types/api/rentals/tenants/types";

export function apiCollectionTenants(
  isActive?: boolean,
): Promise<ResponseData<ApiCollectionTenants>> {
  return apiGet<ApiCollectionTenants>("/rentals/tenants/collection", {
    query: { is_active: isActive },
  });
}

export function apiOneTenant(tenantId: string): Promise<ResponseData<Tenant>> {
  return apiGet<Tenant>(`/rentals/tenants/one/${tenantId}`);
}
