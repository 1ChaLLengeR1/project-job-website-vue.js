import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Meter } from "@/types/api/rentals/meters/types";

export function apiDeleteMeter(meterId: string): Promise<ResponseData<Meter>> {
  return apiDelete<Meter>(`/rentals/meters/delete/${meterId}`);
}
