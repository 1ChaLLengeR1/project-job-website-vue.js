import { apiGet } from "@/api/common/fetch";
import type { ResponseData, ErrorResponseData } from "@/types/global";
import type { ApiCollectionLogs } from "@/types/api/logs/types";

export async function collectionLogs(num: number): Promise<ResponseData> {
  const urlPath = `logs/collection/${num}`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the collection logs!");
    return {
      isValid: false,
      data: response.data,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCollectionLogs,
    additional: response.additional,
  };
}
