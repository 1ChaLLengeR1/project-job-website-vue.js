import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  Period,
  PeriodCalculation,
} from "@/types/api/rentals/periods/types";
import type {
  CreatePeriodBody,
  PeriodCalculationBody,
} from "@/types/rentals/periods/types";

export function apiCreatePeriod(
  body: CreatePeriodBody,
): Promise<ResponseData<Period>> {
  return apiPost<Period>("/rentals/periods/create", body);
}

// Wylicza okres "na żywo" — nic nie zapisuje
export function apiPreviewPeriod(
  periodId: string,
  body: PeriodCalculationBody = { adjustments: [] },
): Promise<ResponseData<PeriodCalculation>> {
  return apiPost<PeriodCalculation>(
    `/rentals/periods/preview/${periodId}`,
    body,
  );
}

// Zamyka okres — zapisuje snapshoty rozliczeń i podziału rodzinnego
export function apiClosePeriod(
  periodId: string,
  body: PeriodCalculationBody = { adjustments: [] },
): Promise<ResponseData<PeriodCalculation>> {
  return apiPost<PeriodCalculation>(`/rentals/periods/close/${periodId}`, body);
}

// Ponownie otwiera zamknięty okres — kasuje snapshoty, zostawia odczyty
export function apiReopenPeriod(
  periodId: string,
): Promise<ResponseData<Period>> {
  return apiPost<Period>(`/rentals/periods/reopen/${periodId}`);
}
