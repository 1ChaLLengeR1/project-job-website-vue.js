import type {
  ResponseApi,
  ResponseApiData,
  ResponseApiAdditional,
} from "@/types/global";

import type { Headers } from "@/types/api/common/types";
import { AuthStore } from "@/stores/auth/auth";

const DEBUG_TOKEN = true;
const DEBUG_REFRESH_TOKEN = true;
const DEBUG_USER_DATA = true;

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
  const authStore = AuthStore();

  try {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    if (headers.Authorization && authStore.getToken()) {
      header.append("Authorization", `Bearer ${authStore.getToken()}`);
      if (DEBUG_TOKEN) {
        console.info("Token:", authStore.getToken());
      }
    }

    if (headers["X-Refresh-Token"] && authStore.getRefreshToken()) {
      header.append("X-Refresh-Token", `${authStore.getRefreshToken()}`);
      if (DEBUG_REFRESH_TOKEN) {
        console.info("Refresh Token:", authStore.getToken());
      }
    }

    if (headers.UserData && authStore.getUser()) {
      header.append("UserData", `${JSON.stringify(authStore.getUser())}`);
      if (DEBUG_USER_DATA) {
        console.info("UserData:", authStore.getUser());
      }
    }

    const response = await fetch(url, {
      headers: header,
      method: method,
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
