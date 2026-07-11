import { apiGet } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type { ApiOutStandingMoneyCollection } from "@/types/api/outstandingMoney/types";

export function outStandingMoneyCollection(): Promise<
  ResponseData<ApiOutStandingMoneyCollection>
> {
  return apiGet<ApiOutStandingMoneyCollection>("/outstanding_money/collection");
}
