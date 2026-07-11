import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Reading } from "@/types/api/rentals/readings/types";
import type { UpdateReadingBody } from "@/types/rentals/readings/types";

export function apiUpdateReading(
  readingId: string,
  body: UpdateReadingBody,
): Promise<ResponseData<Reading>> {
  return apiPut<Reading>(`/rentals/readings/update/${readingId}`, body);
}
