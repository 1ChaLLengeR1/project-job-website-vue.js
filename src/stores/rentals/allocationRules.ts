import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionAllocationRules } from "@/api/rentals/allocationRules/fetch";
import { apiCreateAllocationRule } from "@/api/rentals/allocationRules/post";
import { apiUpdateAllocationRule } from "@/api/rentals/allocationRules/put";
import { apiDeleteAllocationRule } from "@/api/rentals/allocationRules/delete";

// types
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";
import type {
  CreateAllocationRuleBody,
  UpdateAllocationRuleBody,
  AllocationRuleFilters,
} from "@/types/rentals/allocationRules/types";

export const RentalAllocationRulesStore = defineStore(
  "rentalAllocationRulesStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<AllocationRule[]>([]);
    const isLoading = ref<boolean>(false);
    // ostatnio użyte filtry — refetch po mutacjach je zachowuje
    const lastFilters = ref<AllocationRuleFilters>({});

    const apiFetchCollection = async (filters: AllocationRuleFilters = {}) => {
      lastFilters.value = filters;
      isLoading.value = true;
      const response = await apiCollectionAllocationRules(filters);
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
      body: CreateAllocationRuleBody,
    ): Promise<boolean> => {
      const response = await apiCreateAllocationRule(body);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Dodano poprawnie regułę podziału!",
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
      ruleId: string,
      body: UpdateAllocationRuleBody,
    ): Promise<boolean> => {
      const response = await apiUpdateAllocationRule(ruleId, body);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Zaktualizowano poprawnie regułę podziału!",
        };
        return true;
      }
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
      return false;
    };

    const apiDelete = async (ruleId: string): Promise<boolean> => {
      const response = await apiDeleteAllocationRule(ruleId);
      if (response.isValid) {
        await apiFetchCollection(lastFilters.value);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Usunięto poprawnie regułę podziału!",
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
