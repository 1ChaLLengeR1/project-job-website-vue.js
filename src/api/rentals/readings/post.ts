import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { Reading } from "@/types/api/rentals/readings/types";
import type { CreateReadingBody } from "@/types/rentals/readings/types";

export function apiCreateReading(
  body: CreateReadingBody,
): Promise<ResponseData<Reading>> {
  return apiPost<Reading>("/rentals/readings/create", body);
}
