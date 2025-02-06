import { defineStore } from "pinia";
import { ref } from "vue";

export const LoadingSpinnerStore = defineStore("loadingSpinnerStore", () => {
  const isLoading = ref<boolean>(false);

  return { isLoading };
});
