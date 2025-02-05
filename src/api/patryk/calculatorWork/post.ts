import { apiPost } from "@/api/common/post";
import type { ResponseData, ErrorResponseData } from "@/types/global";
import type { ApiCalculations } from "@/types/api/patryk/calculatorWork/types";
import type { CalculationsBody } from "@/types/patryk/calculatorWork/types";

export async function calculations(
  body: CalculationsBody,
): Promise<ResponseData> {
  const urlPath = "/calculator_work/calculator_keys/calculations";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return calculator keys calculations!");
    return {
      isValid: false,
      data: response.data as ErrorResponseData,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCalculations,
    additional: response.additional,
  };
}
