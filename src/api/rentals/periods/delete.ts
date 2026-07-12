import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Period } from "@/types/api/rentals/periods/types";

export function apiDeletePeriod(
  periodId: string,
): Promise<ResponseData<Period>> {
  return apiDelete<Period>(`/rentals/periods/delete/${periodId}`);
}
