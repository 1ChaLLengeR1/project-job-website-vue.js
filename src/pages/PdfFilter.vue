<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-1"
  >
    <div class="mx-auto flex w-full max-w-lg flex-col items-center space-y-4">
      <!-- Strefa Drag & Drop -->
      <div
        class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500 hover:border-blue-400 hover:text-blue-600"
        @dragover.prevent
        @dragenter.prevent="dragging = true"
        @dragleave="dragging = false"
        @drop.prevent="handleDrop"
      >
        <p v-if="!fileName">{{ t("pages.pdfFilter.description") }}</p>
        <p v-else class="text-green-600">{{ fileName }}</p>
        <button
          class="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          @click="selectFile"
        >
          {{ t("pages.pdfFilter.button.open") }}
        </button>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept=".xlsx"
          @change="handleFileUpload"
        />
      </div>

      <!-- Informacja o błędzie -->
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { paths } from "@/utils/paths";
import { savePage } from "@/composable/navigation";

// stores
import { LogStore } from "@/stores/log/log";
import { PdfFilterStore } from "@/stores/patryk/pdfFilter";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

export default defineComponent({
  name: "FileUpload",
  setup() {
    const { t } = useI18n();
    const pdfFilterStore = PdfFilterStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const logStore = LogStore();
    const fileInput = ref(null);
    const fileName = ref("");
    const errorMessage = ref("");
    const dragging = ref(false);

    const selectFile = () => {
      fileInput.value.click();
    };

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      validateFile(file);

      if (!file) return;

      let formData = new FormData();
      formData.append("file", file);

      loadingSpinnerStore.isLoading = true;
      await pdfFilterStore.apiCreatePdfFilter(formData);
      loadingSpinnerStore.isLoading = false;
    };

    const handleDrop = (event) => {
      const file = event.dataTransfer.files[0];
      validateFile(file);
      dragging.value = false;
    };

    const validateFile = (file) => {
      if (!file) return;

      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension !== "xlsx") {
        errorMessage.value = t("pages.pdfFilter.error.invalidFile");
        fileName.value = "";
        return;
      }

      fileName.value = file.name;
      errorMessage.value = "";
    };

    (async () => {
      await logStore.apiCreateLog("Pdf_Filter");
      savePage(paths.pdfFilter);
    })();

    return {
      fileInput,
      fileName,
      errorMessage,
      dragging,
      t,
      selectFile,
      handleFileUpload,
      handleDrop,
    };
  },
});
</script>
