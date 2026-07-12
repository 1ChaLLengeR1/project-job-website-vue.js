import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiAuth } from "@/types/api/auth/types";
import type { AuthBody } from "@/types/auth/types";

export function login(body: AuthBody): Promise<ResponseData<ApiAuth>> {
  return apiPost<ApiAuth>("/authentication/login", body, { auth: false });
}
