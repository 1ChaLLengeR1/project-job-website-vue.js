import { apiGet } from "@/api/common/fetch";
import type { ResponseData, Error } from "@/types/global";
import type { CollectionTasks } from "@/types/api/tasks/types";

export async function apiCollectionTasks(
  active: boolean,
): Promise<ResponseData> {
  const urlPath = `/tasks/collection?active=${active}`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the collections tasks!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as CollectionTasks,
    additional: response.additional,
  };
}
