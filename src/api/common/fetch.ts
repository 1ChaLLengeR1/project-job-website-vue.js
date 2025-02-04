import type {
  ResponseApi,
  ResponseApiData,
  ResponseApiAdditional,
} from "@/types/global";

import type { Headers } from "@/types/api/common/types";

const DEBUG_USER_TOKEN = false;
const DEBUG_USER_DATA = false;

export async function apiGet(
  urlPath: string,
  lvl: number = 0,
  headers: Headers = {
    Authorization: false,
    UserData: false,
  },
): Promise<ResponseApi> {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const url: string = `${urlApi}${urlPath}`;

  try {
    const header = new Headers();

    const response = await fetch(url, {
      headers: header,
      method: "GET",
    });

    const responseData: ResponseApi = await response.json();

    if (!response.ok) {
      console.error(
        `Api status is not in the confirm pool: ${responseData.status_code} status`,
      );
    }

    if (responseData.status_code === 403) {
      if (lvl < 3) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return apiGet(urlPath, lvl + 1, headers);
      }
    }

    return responseData;
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiGet(urlPath, lvl + 1, headers);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

// if (headers.Authorization && clerkAuthStore.getToken()) {
//     header.append("Authorization", `Bearer ${clerkAuthStore.getToken()}`);
//   if (DEBUG_USER_TOKEN) {
//     console.info("Token:", clerkAuthStore.getToken());
//   }
// }

// if (headers.UserData && userAuthStore.getUserData()) {
//     header.append("UserData", `${JSON.stringify(userAuthStore.getUserData())}`);
//     if (DEBUG_USER_DATA) {
//         console.info("user data:", JSON.stringify(userAuthStore.getUserData()));
//     }
// }
