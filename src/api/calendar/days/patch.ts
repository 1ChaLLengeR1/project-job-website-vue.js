import { apiPatch } from "@/api/common/request";
import type {
  PayloadBodyUpdateByIdCalendaryDay,
  PayloadBodyUpdateDaysMany,
  PayloadBodyUpdateDaysManySalary,
} from "@/types/calendary/types";
import type { ResponseData } from "@/types/global";

export function apiUpdateCalendaryDayById(
  day_id: string,
  payload: PayloadBodyUpdateByIdCalendaryDay,
): Promise<ResponseData<unknown>> {
  return apiPatch<unknown>(`/calendar/day/work/update/${day_id}`, payload);
}

export function apiUpdateCalendaryDaysMany(
  payload: PayloadBodyUpdateDaysMany,
): Promise<ResponseData<unknown>> {
  return apiPatch<unknown>("/calendar/days/work/update", payload);
}

export function apiUpdateCalendaryDaysManySalary(
  payload: PayloadBodyUpdateDaysManySalary,
): Promise<ResponseData<unknown>> {
  return apiPatch<unknown>("/calendar/days/work/update/salary", payload);
}
