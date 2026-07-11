import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionTenancies } from "@/api/rentals/tenancies/fetch";
import { apiCreateTenancy } from "@/api/rentals/tenancies/post";
import { apiUpdateTenancy } from "@/api/rentals/tenancies/put";
import { apiDeleteTenancy } from "@/api/rentals/tenancies/delete";

// types
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type {
  CreateTenancyBody,
  UpdateTenancyBody,
  TenancyFilters,
} from "@/types/rentals/tenancies/types";

export const RentalTenanciesStore = defineStore("rentalTenanciesStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<Tenancy[]>([]);

  const apiFetchCollection = async (filters: TenancyFilters = {}) => {
    const response = await apiCollectionTenancies(filters);
    if (response.isValid) {
      collection.value = response.data;
    } else {
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
    }
  };

  const apiCreate = async (body: CreateTenancyBody): Promise<boolean> => {
    const response = await apiCreateTenancy(body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie najem!",
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
    tenancyId: string,
    body: UpdateTenancyBody,
  ): Promise<boolean> => {
    const response = await apiUpdateTenancy(tenancyId, body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie najem!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (tenancyId: string): Promise<boolean> => {
    const response = await apiDeleteTenancy(tenancyId);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie najem!",
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
