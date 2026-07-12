import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionBeneficiaries } from "@/api/rentals/beneficiaries/fetch";
import { apiCreateBeneficiary } from "@/api/rentals/beneficiaries/post";
import { apiUpdateBeneficiary } from "@/api/rentals/beneficiaries/put";
import { apiDeleteBeneficiary } from "@/api/rentals/beneficiaries/delete";

// types
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type {
  CreateBeneficiaryBody,
  UpdateBeneficiaryBody,
} from "@/types/rentals/beneficiaries/types";

export const RentalBeneficiariesStore = defineStore(
  "rentalBeneficiariesStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<Beneficiary[]>([]);
    const isLoading = ref<boolean>(false);
    // ostatnio użyty filtr — refetch po mutacjach go zachowuje
    const lastIsActive = ref<boolean | undefined>(undefined);

    const apiFetchCollection = async (isActive?: boolean) => {
      lastIsActive.value = isActive;
      isLoading.value = true;
      const response = await apiCollectionBeneficiaries(isActive);
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

    const apiCreate = async (body: CreateBeneficiaryBody): Promise<boolean> => {
      const response = await apiCreateBeneficiary(body);
      if (response.isValid) {
        await apiFetchCollection(lastIsActive.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Dodano poprawnie beneficjenta!",
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
      beneficiaryId: string,
      body: UpdateBeneficiaryBody,
    ): Promise<boolean> => {
      const response = await apiUpdateBeneficiary(beneficiaryId, body);
      if (response.isValid) {
        await apiFetchCollection(lastIsActive.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Zaktualizowano poprawnie beneficjenta!",
        };
        return true;
      }
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
      return false;
    };

    const apiDelete = async (beneficiaryId: string): Promise<boolean> => {
      const response = await apiDeleteBeneficiary(beneficiaryId);
      if (response.isValid) {
        await apiFetchCollection(lastIsActive.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Usunięto poprawnie beneficjenta!",
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
