import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";

export function calculatorKeys(): Promise<ResponseData<ApiCalculatorKeys>> {
  return apiGet<ApiCalculatorKeys>("/calculator_work/calculator_keys");
}
