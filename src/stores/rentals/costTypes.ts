import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionCostTypes } from "@/api/rentals/costTypes/fetch";
import { apiCreateCostType } from "@/api/rentals/costTypes/post";
import { apiUpdateCostType } from "@/api/rentals/costTypes/put";
import { apiDeleteCostType } from "@/api/rentals/costTypes/delete";

// types
import type { CostType } from "@/types/api/rentals/costTypes/types";
import type {
  CreateCostTypeBody,
  UpdateCostTypeBody,
} from "@/types/rentals/costTypes/types";

export const RentalCostTypesStore = defineStore("rentalCostTypesStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<CostType[]>([]);

  const apiFetchCollection = async (isActive?: boolean) => {
    const response = await apiCollectionCostTypes(isActive);
    if (response.isValid) {
      collection.value = response.data;
    } else {
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
    }
  };

  const apiCreate = async (body: CreateCostTypeBody): Promise<boolean> => {
    const response = await apiCreateCostType(body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie rodzaj kosztu!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiUpdate = async (
    costTypeId: string,
    body: UpdateCostTypeBody,
  ): Promise<boolean> => {
    const response = await apiUpdateCostType(costTypeId, body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie rodzaj kosztu!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (costTypeId: string): Promise<boolean> => {
    const response = await apiDeleteCostType(costTypeId);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie rodzaj kosztu!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  return { collection, apiFetchCollection, apiCreate, apiUpdate, apiDelete };
});
