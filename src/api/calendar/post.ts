import { apiPost } from "@/api/common/post";
import { PayloadBodyCreateCalendary } from "@/types/calendary/types";
import type { ResponseData, Error } from "@/types/global";

export async function apiCreateCalendary(
  payload: PayloadBodyCreateCalendary,
): Promise<ResponseData> {
  const urlPath = `/calendar/generate`;
  const response = await apiPost(urlPath, payload, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create calendary!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: "Create success calendary",
    additional: null,
  };
}
