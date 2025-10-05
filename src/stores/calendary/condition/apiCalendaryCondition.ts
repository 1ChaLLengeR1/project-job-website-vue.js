import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import { apiCollectionCalendaryCondition } from "@/api/calendar/condition/fetch";
import { apiCreateCalendaryCondition } from "@/api/calendar/condition/post";
import { apiUpdateCalendaryConditionById } from "@/api/calendar/condition/patch";
import { apiDeleteCalendaryConditionById } from "@/api/calendar/condition/delete";

export const ApiCalendaryCinditionStore = defineStore(
  "apiCalendaryCinditionStore",
  () => {
    const notificationStore = NotificationStore();

    const fetchCalendaryCollectionCondition = async () => {};

    const postCalendaryCreateCondition = async () => {};

    const patchCalendaryUpdateByIdCondition = async () => {};

    const deleteCalendaryDeleteByIdCondition = async () => {};

    return {};
  },
);
