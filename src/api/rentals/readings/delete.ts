import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Reading } from "@/types/api/rentals/readings/types";

export function apiDeleteReading(
  readingId: string,
): Promise<ResponseData<Reading>> {
  return apiDelete<Reading>(`/rentals/readings/delete/${readingId}`);
}
