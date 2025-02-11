import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";
import type { ApiCalculations } from "@/types/api/patryk/calculatorWork/types";
import type { ApiAuth } from "@/types/api/auth/types";
import type { ApiCollectionLogs, Log } from "@/types/api/logs/types";
import type {
  ApiOutStandingMoneyCollection,
  ApiOutStandingMoneyCreateList,
  ApiAddItem,
  ApiEditItem,
  ApiEditNameList,
  ApiDeleteList,
  ApiDeleteItem,
} from "@/types/api/outstandingMoney/types";

import type { ApiFuelCalculation } from "@/types/api/fuelCalculation/types";

export interface ResponseData {
  isValid: boolean;
  data: ResponseApiData | string | null;
  additional: ResponseApiAdditional;
}

export interface ResponseApi {
  status: string;
  status_code: number;
  data: ResponseApiData | string;
  additional: ResponseApiAdditional;
}

export interface ErrorResponseData {
  status: string;
  status_code: number;
  data: string;
  additional: string;
}

export type Error = { error: string };

export type ResponseApiData =
  | ApiAuth
  | ApiCalculatorKeys
  | ApiCalculations
  | ApiOutStandingMoneyCollection
  | ApiOutStandingMoneyCreateList
  | ApiAddItem
  | ApiEditNameList
  | ApiDeleteList
  | ApiDeleteItem
  | ApiEditItem
  | ApiFuelCalculation
  | ApiCollectionLogs
  | Log;
export type ResponseApiAdditional = {};
