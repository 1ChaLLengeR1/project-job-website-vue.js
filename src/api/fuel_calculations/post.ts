import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiFuelCalculation } from "@/types/api/fuelCalculation/types";
import type { fuelCalculationBody } from "@/types/fuelCalculation/types";

export function fuelCalculations(
  body: fuelCalculationBody,
): Promise<ResponseData<ApiFuelCalculation>> {
  return apiPost<ApiFuelCalculation>("/fuel/fuel_calculations", body);
}
