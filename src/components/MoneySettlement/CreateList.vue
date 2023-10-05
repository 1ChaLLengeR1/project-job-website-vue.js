<template>
  <div class="w-full sm:w-4/6 flex flex-col gap-3">
    <open-panel-list></open-panel-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import OpenPanelList from "./OpenPanelList.vue";

export default defineComponent({
  components: {
    "open-panel-list": OpenPanelList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
