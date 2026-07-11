import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiCalculations } from "@/types/api/patryk/calculatorWork/types";
import type { CalculationsBody } from "@/types/patryk/calculatorWork/types";

export function calculations(
  body: CalculationsBody,
): Promise<ResponseData<ApiCalculations>> {
  return apiPost<ApiCalculations>(
    "/calculator_work/calculator_keys/calculations",
    body,
  );
}
