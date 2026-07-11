<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-3 p-3"
  >
    <ConditionPanelVue />
    <CalendaryGridVue />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { savePage } from "@/composable/navigation";

//componets
import ConditionPanelVue from "@/components/CalendarySettlement/ConditionPanel.vue";
import CalendaryGridVue from "@/components/CalendarySettlement/CalendaryGrid.vue";

// utils
import { paths } from "@/utils/paths";

export default defineComponent({
  components: {
    ConditionPanelVue,
    CalendaryGridVue,
  },
  setup() {
    savePage(paths.calendarSettlement);
    return {};
  },
});
</script>

<style scoped></style>
