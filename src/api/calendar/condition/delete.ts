import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { OneCalendaryCondition } from "@/types/api/calendar/condition/types";

export function apiDeleteCalendaryConditionById(
  condition_id: string,
): Promise<ResponseData<OneCalendaryCondition>> {
  return apiDelete<OneCalendaryCondition>(
    `/calendar/condition/delete/${condition_id}`,
  );
}
