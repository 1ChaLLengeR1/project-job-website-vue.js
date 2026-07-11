import { apiPut } from "@/api/common/request";
import type { ResponseData } from "@/types/global";
import type {
  EditNameListBody,
  EditItemBody,
} from "@/types/outstandingMoney/types";
import type {
  ApiEditNameList,
  ApiEditItem,
} from "@/types/api/outstandingMoney/types";

export function outStandingMoneyEditNameList(
  body: EditNameListBody,
): Promise<ResponseData<ApiEditNameList>> {
  return apiPut<ApiEditNameList>("/outstanding_money/edit_name_list", body);
}

export function outStandingMoneyEditItem(
  body: EditItemBody,
): Promise<ResponseData<ApiEditItem>> {
  return apiPut<ApiEditItem>("/outstanding_money/edit_item", body);
}
