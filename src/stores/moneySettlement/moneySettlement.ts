import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { outStandingMoneyCollection } from "@/api/outstandingMoney/fetch";
import {
  outStandingMoneyAddItem,
  outStandingMoneyCreateList,
} from "@/api/outstandingMoney/post";
import {
  outStandingMoneyEditItem,
  outStandingMoneyEditNameList,
} from "@/api/outstandingMoney/put";
import {
  outStandingMoneyDeleteItem,
  outStandingMoneyDeleteList,
} from "@/api/outstandingMoney/delete";

// types
import type { ApiOutStandingMoneyCollection } from "@/types/api/outstandingMoney/types";
import type {
  CreateListBody,
  AddItemBody,
  EditNameListBody,
  EditItemBody,
} from "@/types/outstandingMoney/types";

export const MoneySettlementStore = defineStore("moneySettlementStore", () => {
  const notificationStore = NotificationStore();
  const collectionList = ref<ApiOutStandingMoneyCollection>([]);

  const apiCollectionList = async (restart: boolean = false) => {
    if (restart) {
      collectionList.value = [];
    }

    if (collectionList.value.length > 0) {
      return;
    }

    const response = await outStandingMoneyCollection();
    if (response && response.isValid) {
      const responseData = response.data as ApiOutStandingMoneyCollection;
      collectionList.value = responseData;
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiCreateList = async (body: CreateListBody): Promise<boolean> => {
    const response = await outStandingMoneyCreateList(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie liste!",
      };
      return true;
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
      return false;
    }
  };
  const apiAddItem = async (body: AddItemBody) => {};

  const apiEditNameList = async (body: EditNameListBody) => {};
  const apiEditItem = async (body: EditItemBody) => {};

  const apiDeleteList = async (id: string) => {};
  const apiDeleteItem = async (id: string) => {};

  return {
    collectionList,
    apiCollectionList,
    apiCreateList,
    apiAddItem,
    apiEditNameList,
    apiEditItem,
    apiDeleteList,
    apiDeleteItem,
  };
});
