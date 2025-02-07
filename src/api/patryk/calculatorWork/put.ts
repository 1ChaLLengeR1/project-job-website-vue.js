import { apiPost } from "@/api/common/post";
import type { ResponseData, ErrorResponseData } from "@/types/global";
import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";
import type { CalculationsUpdateBody } from "@/types/patryk/calculatorWork/types";

export async function calculations(
  body: CalculationsUpdateBody,
): Promise<ResponseData> {
  const urlPath = "/calculator_work/calculator_keys/update";
  const response = await apiPost(urlPath, body, "PUT", 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return calculations update!");
    return {
      isValid: false,
      data: response.data,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiCalculatorKeys,
    additional: response.additional,
  };
}
