// Koperta i typy błędów zgodne z docs/API_ENDPOINTS.md

export type ApiErrorKey =
  | "IntegrityError"
  | "NotFound"
  | "Forbidden"
  | "Unauthorized"
  | "ExternalService"
  | "Exception";

export interface ApiError {
  message: string;
  type_module: string;
  type_error: string;
  key_type_error: ApiErrorKey;
}

// Surowa koperta odpowiedzi backendu
export type ApiResponse<T> =
  | {
      status: "SUCCESS";
      status_code: number;
      data: T;
      additional: unknown;
    }
  | {
      status: "ERROR";
      status_code: number;
      data: ApiError;
      additional: unknown;
    };

// Wynik zwracany przez funkcje z src/api — po `if (res.isValid)`
// TypeScript sam zawęża `res.data` do T albo ApiError
export type ResponseData<T> =
  | {
      isValid: true;
      status_code: number;
      data: T;
      additional: unknown;
    }
  | {
      isValid: false;
      status_code: number;
      data: ApiError;
      additional: unknown;
    };
