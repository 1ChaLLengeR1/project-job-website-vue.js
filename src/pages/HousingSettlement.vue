<template>
  <main class="w-full h-[calc(100vh-64px)]">Program rozliczeniowy</main>
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
