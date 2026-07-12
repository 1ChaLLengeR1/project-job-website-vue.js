import type { ApiError, ApiResponse, ResponseData } from "@/types/global";
import type { QueryParams, RequestOptions } from "@/types/api/common/types";
import { AuthStore } from "@/stores/auth/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

function buildUrl(urlPath: string, query?: QueryParams): string {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    }
  }

  const queryString = params.toString();
  return `${urlApi}${urlPath}${queryString ? `?${queryString}` : ""}`;
}

function buildHeaders(options: RequestOptions, hasBody: boolean): Headers {
  const authStore = AuthStore();
  const headers = new Headers();

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  if (options.auth !== false && authStore.getToken()) {
    headers.append("Authorization", `Bearer ${authStore.getToken()}`);
  }

  if (options.refreshToken && authStore.getRefreshToken()) {
    headers.append("X-Refresh-Token", `${authStore.getRefreshToken()}`);
  }

  if (options.contactToken) {
    headers.append("X-Contact-Token", options.contactToken);
  }

  return headers;
}

function networkError(url: string): ResponseData<never> {
  const error: ApiError = {
    message: `Brak połączenia z serwerem (${url})`,
    type_module: "request",
    type_error: "NetworkError",
    key_type_error: "Exception",
  };
  return { isValid: false, status_code: 0, data: error, additional: null };
}

async function request<T>(
  method: HttpMethod,
  urlPath: string,
  body?: object,
  options: RequestOptions = {},
): Promise<ResponseData<T>> {
  const url = buildUrl(urlPath, options.query);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method,
        headers: buildHeaders(options, body !== undefined),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      const payload = (await response.json()) as ApiResponse<T>;

      if (payload.status === "SUCCESS" && payload.status_code < 400) {
        return {
          isValid: true,
          status_code: payload.status_code,
          data: payload.data as T,
          additional: payload.additional,
        };
      }

      const error = payload.data as ApiError;
      console.error(
        `API ${method} ${urlPath} failed: ${payload.status_code} — ${error?.message}`,
      );
      return {
        isValid: false,
        status_code: payload.status_code,
        data: error,
        additional: payload.additional,
      };
    } catch {
      // błąd sieciowy lub odpowiedź nie-JSON — ponawiamy
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }

  console.error(`${url} is not working`);
  return networkError(url);
}

export function apiGet<T>(
  urlPath: string,
  options?: RequestOptions,
): Promise<ResponseData<T>> {
  return request<T>("GET", urlPath, undefined, options);
}

export function apiPost<T>(
  urlPath: string,
  body: object = {},
  options?: RequestOptions,
): Promise<ResponseData<T>> {
  return request<T>("POST", urlPath, body, options);
}

export function apiPut<T>(
  urlPath: string,
  body: object = {},
  options?: RequestOptions,
): Promise<ResponseData<T>> {
  return request<T>("PUT", urlPath, body, options);
}

export function apiPatch<T>(
  urlPath: string,
  body: object = {},
  options?: RequestOptions,
): Promise<ResponseData<T>> {
  return request<T>("PATCH", urlPath, body, options);
}

export function apiDelete<T>(
  urlPath: string,
  options?: RequestOptions,
): Promise<ResponseData<T>> {
  return request<T>("DELETE", urlPath, undefined, options);
}
