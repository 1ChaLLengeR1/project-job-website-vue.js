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
  const isLoading = ref<boolean>(false);
  // ostatnio użyty filtr — refetch po mutacjach go zachowuje
  const lastIsActive = ref<boolean | undefined>(undefined);

  const apiFetchCollection = async (isActive?: boolean) => {
    lastIsActive.value = isActive;
    isLoading.value = true;
    const response = await apiCollectionCostTypes(isActive);
    isLoading.value = false;
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
      await apiFetchCollection(lastIsActive.value);
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
      await apiFetchCollection(lastIsActive.value);
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
      await apiFetchCollection(lastIsActive.value);
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

  return {
    collection,
    isLoading,
    apiFetchCollection,
    apiCreate,
    apiUpdate,
    apiDelete,
  };
});
