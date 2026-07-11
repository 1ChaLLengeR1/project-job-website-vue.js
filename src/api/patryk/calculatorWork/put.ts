import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";
import type { CalculationsUpdateBody } from "@/types/patryk/calculatorWork/types";

export function calculationUpdate(
  body: CalculationsUpdateBody,
): Promise<ResponseData<ApiCalculatorKeys>> {
  return apiPut<ApiCalculatorKeys>(
    "/calculator_work/calculator_keys/update",
    body,
  );
}
