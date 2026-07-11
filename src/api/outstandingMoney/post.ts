import { apiPost } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  CreateListBody,
  AddItemBody,
} from "@/types/outstandingMoney/types";
import type {
  ApiOutStandingMoneyCreateList,
  ApiAddItem,
} from "@/types/api/outstandingMoney/types";

export function outStandingMoneyCreateList(
  body: CreateListBody,
): Promise<ResponseData<ApiOutStandingMoneyCreateList>> {
  return apiPost<ApiOutStandingMoneyCreateList>(
    "/outstanding_money/create_list",
    body,
  );
}

export function outStandingMoneyAddItem(
  body: AddItemBody,
): Promise<ResponseData<ApiAddItem>> {
  return apiPost<ApiAddItem>("/outstanding_money/add_item", body);
}
