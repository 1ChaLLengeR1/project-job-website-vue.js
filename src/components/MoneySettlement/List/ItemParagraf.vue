<template>
  <div class="flex w-full justify-center gap-3">
    <p
      class="w-64 bg-color-bg text-center font-syne text-sm font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ name }}
    </p>
    <p
      class="w-64 bg-color-bg text-center font-syne text-sm font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ amount }} <span class="text-white">zł</span>
    </p>
    <p
      class="w-64 bg-color-bg text-center font-syne text-sm font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ date }}
    </p>
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
    amount: {
      required: true,
      type: Number,
    },
    date: {
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
