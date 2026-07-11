import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionSettlements } from "@/api/rentals/settlements/fetch";

// types
import type { SettlementSnapshot } from "@/types/api/rentals/settlements/types";

export const RentalSettlementsStore = defineStore(
  "rentalSettlementsStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<SettlementSnapshot[]>([]);
    const isLoading = ref<boolean>(false);

    const apiFetchCollection = async (
      filters: { period_id?: string; apartment_id?: string } = {},
    ) => {
      isLoading.value = true;
      const response = await apiCollectionSettlements(filters);
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

    return { collection, isLoading, apiFetchCollection };
  },
);
