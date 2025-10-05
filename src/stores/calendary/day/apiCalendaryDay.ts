import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import {
  apiUpdateCalendaryDayById,
  apiUpdateCalendaryDaysMany,
} from "@/api/calendar/days/patch";

export const ApiCalendaryDayStore = defineStore("apiCalendaryDayStore", () => {
  const notificationStore = NotificationStore();

  const updateCalendaryDayById = async () => {};

  const updateCalendaryDaysMany = async () => {};

  return {};
});
