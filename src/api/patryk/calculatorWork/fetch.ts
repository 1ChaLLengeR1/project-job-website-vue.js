import { apiGet } from "@/api/common/fetch";
import type { ResponseData, ErrorResponseData } from "@/types/global";
import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";

export async function calculatorKeys(): Promise<ResponseData> {
  const urlPath = `/calculator_work/calculator_keys`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the calculator keys!");
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
