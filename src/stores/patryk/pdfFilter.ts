import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";
import { AuthStore } from "@/stores/auth/auth";

// api
import { pdfFilterDownload } from "@/api/patryk/pdfFilter/post";

export const PdfFilterStore = defineStore("pdfFilterStore", () => {
  const authStore = AuthStore();
  const notificationStore = NotificationStore();
  const downloadProgress = ref(0);
  const progressMessage = ref("Rozpoczynam...");
  let ws: WebSocket | null = null;

  const connectWebSocket = (userId: string) => {
    console.log("Połączenie Start");
    ws = new WebSocket(`ws://127.0.0.1:3000/ws/progress/${userId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`📡 Postęp: ${data.progress}% - ${data.message}`);
      downloadProgress.value = data.progress;
      progressMessage.value = data.message;
    };

    ws.onclose = () => {
      console.log("❌ Połączenie WebSocket zamknięte");
    };
  };

  const apiCreatePdfFilter = async (body: FormData) => {
    downloadProgress.value = 0;
    progressMessage.value = "Łączenie z serwerem...";
    const userId: string = authStore.getUser()?.id.toString();
    connectWebSocket(userId);

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

    ws?.close();
    downloadProgress.value = 100;
  };

  return { apiCreatePdfFilter };
});
