import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionApartmentCosts } from "@/api/rentals/apartmentCosts/fetch";
import { apiCreateApartmentCost } from "@/api/rentals/apartmentCosts/post";
import { apiUpdateApartmentCost } from "@/api/rentals/apartmentCosts/put";
import { apiDeleteApartmentCost } from "@/api/rentals/apartmentCosts/delete";

// types
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type {
  CreateApartmentCostBody,
  UpdateApartmentCostBody,
  ApartmentCostFilters,
} from "@/types/rentals/apartmentCosts/types";

export const RentalApartmentCostsStore = defineStore(
  "rentalApartmentCostsStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<ApartmentCost[]>([]);
    const isLoading = ref<boolean>(false);
    // ostatnio użyte filtry — refetch po mutacjach je zachowuje
    const lastFilters = ref<ApartmentCostFilters>({});

    const apiFetchCollection = async (filters: ApartmentCostFilters = {}) => {
      lastFilters.value = filters;
      isLoading.value = true;
      const response = await apiCollectionApartmentCosts(filters);
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

    const apiCreate = async (
      body: CreateApartmentCostBody,
    ): Promise<boolean> => {
      const response = await apiCreateApartmentCost(body);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Dodano poprawnie koszt mieszkania!",
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
      apartmentCostId: string,
      body: UpdateApartmentCostBody,
    ): Promise<boolean> => {
      const response = await apiUpdateApartmentCost(apartmentCostId, body);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Zaktualizowano poprawnie koszt mieszkania!",
        };
        return true;
      }
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
      return false;
    };

    const apiDelete = async (apartmentCostId: string): Promise<boolean> => {
      const response = await apiDeleteApartmentCost(apartmentCostId);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Usunięto poprawnie koszt mieszkania!",
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
  },
);
