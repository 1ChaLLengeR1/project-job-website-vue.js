import { apiPost } from "@/api/common/post";
import type { ResponseData, ErrorResponseData } from "@/types/global";
import type { Log } from "@/types/api/logs/types";
import type { LogBody } from "@/types/logs/types";

export async function login(body: LogBody): Promise<ResponseData> {
  const urlPath = "/logs/create/kalkulator_patryka";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create log!");
    return {
      isValid: false,
      data: response.data as ErrorResponseData,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as Log,
    additional: response.additional,
  };
}
