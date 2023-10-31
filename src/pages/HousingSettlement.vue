<template>
  <main
    class="flex h-[calc(100vh-64px)] w-full items-center justify-center text-white"
  >
    W trkacie robienia
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SavePage } from "../components/JS/SavePage";

export default defineComponent({
  setup() {
    SavePage("housingsettlement");
    return {};
  },
});
</script>

<style scoped></style>
