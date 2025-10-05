import { apiPost } from "@/api/common/post";
import {
  PayloadBodyUpdateByIdCalendaryDay,
  PayloadBodyUpdateDaysMany,
} from "@/types/calendary/types";
import type { ResponseData, Error } from "@/types/global";

export async function apiUpdateCalendaryDayById(
  day_id: string,
  payload: PayloadBodyUpdateByIdCalendaryDay,
): Promise<ResponseData> {
  const urlPath = `/calendar/day/work/update/${day_id}`;
  const response = await apiPost(urlPath, payload, "PATCH", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return update calendary day!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: "Update success calendary",
    additional: null,
  };
}

export async function apiUpdateCalendaryDaysMany(
  payload: PayloadBodyUpdateDaysMany,
): Promise<ResponseData> {
  const urlPath = `/calendar/days/work/update`;
  const response = await apiPost(urlPath, payload, "PATCH", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return update calendary many day!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: "Update success calendary many",
    additional: null,
  };
}
