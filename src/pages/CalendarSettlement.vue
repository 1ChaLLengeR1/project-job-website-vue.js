<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-3 p-3"
  ></main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { savePage } from "@/composable/navigation";

// stores
import { LogStore } from "@/stores/log/log";

//componets
import { paths } from "@/utils/paths";

export default defineComponent({
  setup() {
    const logStore = LogStore();
    (async () => {
      await logStore.apiCreateLog("Kalendarz Rozliczeń");
    })();

    savePage(paths.calendarSettlement);
    return {};
  },
});
</script>

<style scoped></style>
