<template>
  <main class="w-full h-[calc(100vh-64px)]">
    <p class="text-white">Provisions</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SavePage } from "../components/JS/SavePage";

export default defineComponent({
  setup() {
    SavePage("provision");
    return {};
  },
});
</script>

<style scoped></style>
