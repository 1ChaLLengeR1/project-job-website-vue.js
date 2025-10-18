import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";

export async function apiDeleteCalendaryConditionById(
  condition_id: string,
): Promise<ResponseData> {
  const urlPath = `/calendar/condition/delete/${condition_id}`;
  const response = await apiPost(urlPath, {}, "DELETE", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return delete calendary condition!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: "Delete success calendary condition",
    additional: null,
  };
}
