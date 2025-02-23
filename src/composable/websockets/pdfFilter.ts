import { ref, onUnmounted } from "vue";

// stores
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

export function useWebSocket(
  userId: string,
  t: (key: string, values?: unknown) => string,
) {
  const loadingSpinnerStore = LoadingSpinnerStore();
  const progressMessage = ref("");
  let ws: WebSocket | null = null;

  const connectWebSocket = () => {
    const urlApi: string = import.meta.env.VITE_URL_SERVER_WEBSOCKET;
    ws = new WebSocket(`ws://${urlApi}/ws/progress/${userId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message: string = t("websocket.pdfFilter.message", {
        progress: data.progress,
        message: data.message,
      });
      loadingSpinnerStore.addProgressBarPdfFilter(message);
      progressMessage.value = data.message;
    };

    ws.onclose = () => {};
  };

  const closeWebSocket = () => {
    if (ws) {
      ws.close();
      ws = null;
      loadingSpinnerStore.progressBarPdfFilterCollection = [];
    }
  };

  onUnmounted(() => {
    closeWebSocket();
  });

  return { progressMessage, connectWebSocket, closeWebSocket };
}
