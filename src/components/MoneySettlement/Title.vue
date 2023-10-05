<template>
  <div class="w-full text-center">
    <h1 class="text-3xl sm:text-[50px] font-syne text-white font-bold">
      {{ name }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
