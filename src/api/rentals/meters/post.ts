import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Meter } from "@/types/api/rentals/meters/types";
import type { CreateMeterBody } from "@/types/rentals/meters/types";

export function apiCreateMeter(
  body: CreateMeterBody,
): Promise<ResponseData<Meter>> {
  return apiPost<Meter>("/rentals/meters/create", body);
}
