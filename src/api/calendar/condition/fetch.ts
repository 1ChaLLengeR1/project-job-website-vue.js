import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCollectionCalendaryCondition } from "@/types/api/calendar/condition/types";

export function apiCollectionCalendaryCondition(): Promise<
  ResponseData<ApiCollectionCalendaryCondition>
> {
  return apiGet<ApiCollectionCalendaryCondition>(
    "/calendar/condition/collection",
  );
}
