import { defineStore } from "pinia";
import { ref } from "vue";

// api
import { collectionLogs } from "@/api/logs/fetch";

// types
import type { Log } from "@/types/api/logs/types";

export const LogStore = defineStore("logStore", () => {
  const collection = ref<Log[]>([]);

  const apiFetchCollection = async (num: number) => {
    const response = await collectionLogs(num);
    if (response && response.isValid) {
      collection.value = response.data;
    }
  };

  return { collection, apiFetchCollection };
});
