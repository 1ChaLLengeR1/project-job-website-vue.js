import type {
  ResponseApi,
  ResponseApiData,
  ResponseApiAdditional,
} from "@/types/global";

import type { Headers } from "@/types/api/common/types";

const DEBUG_USER_TOKEN = false;
const DEBUG_USER_DATA = false;

export async function apiPost(
  urlPath: string,
  body: object,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  lvl: number = 0,
  headers: Headers = {
    Authorization: false,
    UserData: false,
    "X-Refresh-Token": false,
  },
): Promise<ResponseApi> {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const url: string = `${urlApi}${urlPath}`;

  try {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const response = await fetch(url, {
      headers: header,
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData: ResponseApi = await response.json();
    return responseData;
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiPost(urlPath, body, method, lvl + 1, headers);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}
