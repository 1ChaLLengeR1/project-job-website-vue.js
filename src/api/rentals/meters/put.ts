import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Meter } from "@/types/api/rentals/meters/types";
import type { UpdateMeterBody } from "@/types/rentals/meters/types";

export function apiUpdateMeter(
  meterId: string,
  body: UpdateMeterBody,
): Promise<ResponseData<Meter>> {
  return apiPut<Meter>(`/rentals/meters/update/${meterId}`, body);
}
