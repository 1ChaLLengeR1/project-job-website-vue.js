<template>
  <div
    class="flex w-full cursor-pointer items-center justify-center gap-3 px-1 font-syne text-sm font-bold text-color-yellow sm:text-2xl"
  >
    <p>
      {{ name }} <span class="text-color-grey">{{ amount }}</span> {{ model }}
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
    model: {
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
