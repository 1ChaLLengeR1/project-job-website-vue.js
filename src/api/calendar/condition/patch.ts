import { apiPatch } from "@/api/common/request";
import type { PayloadBodyCreateCondition } from "@/types/calendary/types";
import type { ResponseData } from "@/types/global";
import type { OneCalendaryCondition } from "@/types/api/calendar/condition/types";

export function apiUpdateCalendaryConditionById(
  condition_id: string,
  payload: PayloadBodyCreateCondition,
): Promise<ResponseData<OneCalendaryCondition>> {
  return apiPatch<OneCalendaryCondition>(
    `/calendar/condition/update/${condition_id}`,
    payload,
  );
}
