import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { apiCollectionApartments } from "@/api/rentals/apartments/fetch";
import { apiCreateApartment } from "@/api/rentals/apartments/post";
import { apiUpdateApartment } from "@/api/rentals/apartments/put";
import { apiDeleteApartment } from "@/api/rentals/apartments/delete";

// types
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type {
  CreateApartmentBody,
  UpdateApartmentBody,
} from "@/types/rentals/apartments/types";

export const RentalApartmentsStore = defineStore(
  "rentalApartmentsStore",
  () => {
    const notificationStore = NotificationStore();
    const collection = ref<Apartment[]>([]);

    const apiFetchCollection = async (isActive?: boolean) => {
      const response = await apiCollectionApartments(isActive);
      if (response.isValid) {
        collection.value = response.data;
      } else {
        notificationStore.data_to_notification = {
          type: "error",
          description: response.data.message,
        };
      }
    };

    const apiCreate = async (body: CreateApartmentBody): Promise<boolean> => {
      const response = await apiCreateApartment(body);
      if (response.isValid) {
        await apiFetchCollection();
        notificationStore.data_to_notification = {
          type: "success",
          description: "Dodano poprawnie mieszkanie!",
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
      apartmentId: string,
      body: UpdateApartmentBody,
    ): Promise<boolean> => {
      const response = await apiUpdateApartment(apartmentId, body);
      if (response.isValid) {
        await apiFetchCollection();
        notificationStore.data_to_notification = {
          type: "success",
          description: "Zaktualizowano poprawnie mieszkanie!",
        };
        return true;
      }
      notificationStore.data_to_notification = {
        type: "error",
        description: response.data.message,
      };
      return false;
    };

    const apiDelete = async (apartmentId: string): Promise<boolean> => {
      const response = await apiDeleteApartment(apartmentId);
      if (response.isValid) {
        await apiFetchCollection();
        notificationStore.data_to_notification = {
          type: "success",
          description: "Usunięto poprawnie mieszkanie!",
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
  },
);
