import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionPeriods } from "@/api/rentals/periods/fetch";
import {
  apiCreatePeriod,
  apiPreviewPeriod,
  apiClosePeriod,
  apiReopenPeriod,
} from "@/api/rentals/periods/post";
import { apiUpdatePeriod } from "@/api/rentals/periods/put";
import { apiDeletePeriod } from "@/api/rentals/periods/delete";

// types
import type {
  Period,
  PeriodStatus,
  PeriodCalculation,
} from "@/types/api/rentals/periods/types";
import type {
  CreatePeriodBody,
  UpdatePeriodBody,
  PeriodCalculationBody,
} from "@/types/rentals/periods/types";

export const RentalPeriodsStore = defineStore("rentalPeriodsStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<Period[]>([]);
  // wynik preview/close — pełne wyliczenie okresu
  const calculation = ref<PeriodCalculation | null>(null);
  const isLoading = ref<boolean>(false);
  // osobna flaga: preview/close potrafią trwać dłużej niż zwykły odczyt
  const isCalculating = ref<boolean>(false);
  // ostatnio użyty filtr — refetch po mutacjach go zachowuje
  const lastStatus = ref<PeriodStatus | undefined>(undefined);

  const apiFetchCollection = async (status?: PeriodStatus) => {
    lastStatus.value = status;
    isLoading.value = true;
    const response = await apiCollectionPeriods(status);
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

  const apiCreate = async (body: CreatePeriodBody): Promise<boolean> => {
    const response = await apiCreatePeriod(body);
    if (response.isValid) {
      await apiFetchCollection(lastStatus.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Utworzono poprawnie okres rozliczeniowy!",
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
    periodId: string,
    body: UpdatePeriodBody,
  ): Promise<boolean> => {
    const response = await apiUpdatePeriod(periodId, body);
    if (response.isValid) {
      await apiFetchCollection(lastStatus.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie okres rozliczeniowy!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiPreview = async (
    periodId: string,
    body: PeriodCalculationBody = { adjustments: [] },
  ): Promise<boolean> => {
    isCalculating.value = true;
    const response = await apiPreviewPeriod(periodId, body);
    isCalculating.value = false;
    if (response.isValid) {
      calculation.value = response.data;
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiClose = async (
    periodId: string,
    body: PeriodCalculationBody = { adjustments: [] },
  ): Promise<boolean> => {
    isCalculating.value = true;
    const response = await apiClosePeriod(periodId, body);
    isCalculating.value = false;
    if (response.isValid) {
      calculation.value = response.data;
      await apiFetchCollection(lastStatus.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zamknięto poprawnie okres rozliczeniowy!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiReopen = async (periodId: string): Promise<boolean> => {
    const response = await apiReopenPeriod(periodId);
    if (response.isValid) {
      calculation.value = null;
      await apiFetchCollection(lastStatus.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Otwarto ponownie okres rozliczeniowy!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (periodId: string): Promise<boolean> => {
    const response = await apiDeletePeriod(periodId);
    if (response.isValid) {
      calculation.value = null;
      await apiFetchCollection(lastStatus.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie okres rozliczeniowy!",
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
    calculation,
    isLoading,
    isCalculating,
    apiFetchCollection,
    apiCreate,
    apiUpdate,
    apiPreview,
    apiClose,
    apiReopen,
    apiDelete,
  };
});
