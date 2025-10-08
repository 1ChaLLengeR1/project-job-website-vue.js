import { apiGet } from "@/api/common/fetch";
import type { ResponseData, Error } from "@/types/global";
import type { ApiCollectionCalendaryCondition } from "@/types/api/calendar/condition/types";

export async function apiCollectionCalendaryCondition(): Promise<ResponseData> {
  const urlPath = `/calendar/condition/collection`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error(
      "API response does not return the collection calendary condition!",
    );
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCollectionCalendaryCondition,
    additional: response.additional,
  };
}
