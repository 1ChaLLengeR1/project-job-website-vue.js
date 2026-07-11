import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionBeneficiarySettlements } from "@/api/rentals/beneficiarySettlements/fetch";

// types
import type { BeneficiarySettlement } from "@/types/api/rentals/beneficiarySettlements/types";

export const RentalBeneficiarySettlementsStore = defineStore(
  "rentalBeneficiarySettlementsStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<BeneficiarySettlement[]>([]);

    const apiFetchCollection = async (
      filters: { period_id?: string; beneficiary_id?: string } = {},
    ) => {
      const response = await apiCollectionBeneficiarySettlements(filters);
      if (response.isValid) {
        collection.value = response.data;
      } else {
        notificationStore.data_to_notification = {
          type: "error",
          description: response.data.message,
        };
      }
    };

    return { collection, apiFetchCollection };
  },
);
