<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-1"
  >
    <p>W trakcie budowy</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "@/utils/formats";
import { paths } from "@/utils/paths";
import { useI18n } from "vue-i18n";

import { savePage } from "@/composable/navigation";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LogStore } from "@/stores/log/log";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const logStore = LogStore();
    const apiTaskStore = ApiTaskStore();

    (async () => {
      await apiTaskStore.apiGetTasks();
      await logStore.apiCreateLog("Zadania");
    })();

    savePage(paths.tasks);

    return {};
  },
});
</script>

<style scoped></style>
