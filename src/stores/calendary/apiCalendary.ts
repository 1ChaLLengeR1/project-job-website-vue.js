import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import {
  apiCollectionCalendary,
  apiCollectionCalendaryStatistics,
} from "@/api/calendar/fetch";
import { apiCreateCalendary } from "@/api/calendar/post";

export const ApiCalendaryStore = defineStore("apiCalendaryStore", () => {
  const notificationStore = NotificationStore();

  const fetchCallendaryCollection = async () => {};

  const fetchCallendaryCollectionStatistics = async () => {};

  const postCalendaryCreated = async () => {};

  return {};
});
