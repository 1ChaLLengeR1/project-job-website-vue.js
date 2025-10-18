import { apiPost } from "@/api/common/post";
import type { PayloadBodyCreateCondition } from "@/types/calendary/types";
import type { ResponseData, Error } from "@/types/global";

export async function apiUpdateCalendaryConditionById(
  condition_id: string,
  payload: PayloadBodyCreateCondition,
): Promise<ResponseData> {
  const urlPath = `/calendar/condition/update/${condition_id}`;
  const response = await apiPost(urlPath, payload, "PATCH", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return update calendary condition!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: "Update success calendary condition",
    additional: null,
  };
}
