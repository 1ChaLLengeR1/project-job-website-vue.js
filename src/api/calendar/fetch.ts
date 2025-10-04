import { apiGet } from "@/api/common/fetch";
import type { ResponseData, Error } from "@/types/global";
import type {
  ApiCollectionCalendary,
  ApiCalendaryStatistics,
} from "@/types/api/calendar/types";

export async function apiCollectionCalendary(
  year: number,
  month: number,
): Promise<ResponseData> {
  const urlPath = `/calendar/collection?year=${year}&month=${month}`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the collection calendary!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCollectionCalendary,
    additional: response.additional,
  };
}

export async function apiCollectionCalendaryStatistics(
  year: number,
): Promise<ResponseData> {
  const urlPath = `/calendar/statistics?year=${year}`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the statistics calendary!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCalendaryStatistics,
    additional: response.additional,
  };
}
