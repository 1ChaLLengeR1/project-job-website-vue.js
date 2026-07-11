import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionMeters } from "@/api/rentals/meters/fetch";
import { apiCreateMeter } from "@/api/rentals/meters/post";
import { apiUpdateMeter } from "@/api/rentals/meters/put";
import { apiDeleteMeter } from "@/api/rentals/meters/delete";

// types
import type { Meter } from "@/types/api/rentals/meters/types";
import type {
  CreateMeterBody,
  UpdateMeterBody,
  MeterFilters,
} from "@/types/rentals/meters/types";

export const RentalMetersStore = defineStore("rentalMetersStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<Meter[]>([]);

  const apiFetchCollection = async (filters: MeterFilters = {}) => {
    const response = await apiCollectionMeters(filters);
    if (response.isValid) {
      collection.value = response.data;
    } else {
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
    }
  };

  const apiCreate = async (body: CreateMeterBody): Promise<boolean> => {
    const response = await apiCreateMeter(body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie licznik!",
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
    meterId: string,
    body: UpdateMeterBody,
  ): Promise<boolean> => {
    const response = await apiUpdateMeter(meterId, body);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie licznik!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (meterId: string): Promise<boolean> => {
    const response = await apiDeleteMeter(meterId);
    if (response.isValid) {
      await apiFetchCollection();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie licznik!",
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
