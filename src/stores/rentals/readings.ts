import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionReadings } from "@/api/rentals/readings/fetch";
import { apiCreateReading } from "@/api/rentals/readings/post";
import { apiUpdateReading } from "@/api/rentals/readings/put";
import { apiDeleteReading } from "@/api/rentals/readings/delete";

// types
import type { Reading } from "@/types/api/rentals/readings/types";
import type {
  CreateReadingBody,
  UpdateReadingBody,
} from "@/types/rentals/readings/types";

export const RentalReadingsStore = defineStore("rentalReadingsStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<Reading[]>([]);
  // okres, którego odczyty są aktualnie załadowane
  const currentPeriodId = ref<string | null>(null);

  const apiFetchCollection = async (periodId: string) => {
    const response = await apiCollectionReadings(periodId);
    if (response.isValid) {
      collection.value = response.data;
      currentPeriodId.value = periodId;
    } else {
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
    }
  };

  const refresh = async () => {
    if (currentPeriodId.value) {
      await apiFetchCollection(currentPeriodId.value);
    }
  };

  const apiCreate = async (body: CreateReadingBody): Promise<boolean> => {
    const response = await apiCreateReading(body);
    if (response.isValid) {
      await apiFetchCollection(body.period_id);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie odczyt licznika!",
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
    readingId: string,
    body: UpdateReadingBody,
  ): Promise<boolean> => {
    const response = await apiUpdateReading(readingId, body);
    if (response.isValid) {
      await refresh();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie odczyt licznika!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (readingId: string): Promise<boolean> => {
    const response = await apiDeleteReading(readingId);
    if (response.isValid) {
      await refresh();
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie odczyt licznika!",
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
    currentPeriodId,
    apiFetchCollection,
    apiCreate,
    apiUpdate,
    apiDelete,
  };
});
