import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { pdfFilterDownload } from "@/api/patryk/pdfFilter/post";

export const PdfFilterStore = defineStore("pdfFilterStore", () => {
  const notificationStore = NotificationStore();
  const apiCreatePdfFilter = async (body: FormData) => {
    const response = await pdfFilterDownload(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawnie pobrano PDF!",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  return { apiCreatePdfFilter };
});
