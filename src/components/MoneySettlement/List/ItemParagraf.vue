<template>
  <div class="w-full flex justify-center gap-3">
    <p
      class="w-64 text-color-yellow font-syne font-bold text-sm sm:text-lg  sm:p-3 text-center bg-color-bg"
    >
      {{ name }}
    </p>
    <p
      class="w-64 text-color-yellow font-syne font-bold text-sm sm:text-lg  sm:p-3 text-center bg-color-bg"
    >
      {{ amount }} <span class="text-white">zł</span>
    </p>
    <p
      class="w-64 text-color-yellow font-syne font-bold text-sm sm:text-lg  sm:p-3 text-center bg-color-bg"
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
