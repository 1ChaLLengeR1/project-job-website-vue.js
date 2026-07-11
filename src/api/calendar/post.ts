import { apiPost } from "@/api/common/request";
import type { PayloadBodyCreateCalendary } from "@/types/calendary/types";
import type { ResponseData } from "@/types/global";

export function apiCreateCalendary(
  payload: PayloadBodyCreateCalendary,
): Promise<ResponseData<unknown>> {
  return apiPost<unknown>("/calendar/generate", payload);
}
