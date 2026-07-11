import { apiDelete } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  ApiDeleteList,
  ApiDeleteItem,
} from "@/types/api/outstandingMoney/types";

export function outStandingMoneyDeleteList(
  id: string,
): Promise<ResponseData<ApiDeleteList>> {
  return apiDelete<ApiDeleteList>(`/outstanding_money/delete_list/${id}`);
}

export function outStandingMoneyDeleteItem(
  id: string,
): Promise<ResponseData<ApiDeleteItem>> {
  return apiDelete<ApiDeleteItem>(`/outstanding_money/delete_item/${id}`);
}
