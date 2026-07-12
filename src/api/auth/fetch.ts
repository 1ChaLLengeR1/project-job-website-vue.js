import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiAuth } from "@/types/api/auth/types";

export function automaticallyLogin(
  user_id: string,
): Promise<ResponseData<ApiAuth>> {
  return apiGet<ApiAuth>(`/authentication/automatically_login/${user_id}`, {
    auth: false,
    refreshToken: true,
  });
}
