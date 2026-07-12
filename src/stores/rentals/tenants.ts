import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionTenants } from "@/api/rentals/tenants/fetch";
import { apiCreateTenant } from "@/api/rentals/tenants/post";
import { apiUpdateTenant } from "@/api/rentals/tenants/put";
import { apiDeleteTenant } from "@/api/rentals/tenants/delete";

// types
import type { Tenant } from "@/types/api/rentals/tenants/types";
import type {
  CreateTenantBody,
  UpdateTenantBody,
} from "@/types/rentals/tenants/types";

export const RentalTenantsStore = defineStore("rentalTenantsStore", () => {
  const notificationStore = NotificationStore();
  const collection = ref<Tenant[]>([]);
  const isLoading = ref<boolean>(false);
  // ostatnio użyty filtr — refetch po mutacjach go zachowuje
  const lastIsActive = ref<boolean | undefined>(undefined);

  const apiFetchCollection = async (isActive?: boolean) => {
    lastIsActive.value = isActive;
    isLoading.value = true;
    const response = await apiCollectionTenants(isActive);
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

  const apiCreate = async (body: CreateTenantBody): Promise<boolean> => {
    const response = await apiCreateTenant(body);
    if (response.isValid) {
      await apiFetchCollection(lastIsActive.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie najemcę!",
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
    tenantId: string,
    body: UpdateTenantBody,
  ): Promise<boolean> => {
    const response = await apiUpdateTenant(tenantId, body);
    if (response.isValid) {
      await apiFetchCollection(lastIsActive.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano poprawnie najemcę!",
      };
      return true;
    }
    notificationStore.data_to_notification = {
      type: "error",
      description: response.data.message,
    };
    return false;
  };

  const apiDelete = async (tenantId: string): Promise<boolean> => {
    const response = await apiDeleteTenant(tenantId);
    if (response.isValid) {
      await apiFetchCollection(lastIsActive.value);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Usunięto poprawnie najemcę!",
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
