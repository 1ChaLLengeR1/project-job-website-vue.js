import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Period } from "@/types/api/rentals/periods/types";
import type { UpdatePeriodBody } from "@/types/rentals/periods/types";

export function apiUpdatePeriod(
  periodId: string,
  body: UpdatePeriodBody,
): Promise<ResponseData<Period>> {
  return apiPut<Period>(`/rentals/periods/update/${periodId}`, body);
}
