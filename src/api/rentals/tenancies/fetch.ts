import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Tenancy,
  ApiCollectionTenancies,
} from "@/types/api/rentals/tenancies/types";
import type { TenancyFilters } from "@/types/rentals/tenancies/types";

export function apiCollectionTenancies(
  filters: TenancyFilters = {},
): Promise<ResponseData<ApiCollectionTenancies>> {
  return apiGet<ApiCollectionTenancies>("/rentals/tenancies/collection", {
    query: { ...filters },
  });
}

export function apiOneTenancy(
  tenancyId: string,
): Promise<ResponseData<Tenancy>> {
  return apiGet<Tenancy>(`/rentals/tenancies/one/${tenancyId}`);
}
