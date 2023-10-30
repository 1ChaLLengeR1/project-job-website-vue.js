<template>
  <div
    class="w-full flex justify-center items-center gap-3 font-syne font-bold text-color-yellow text-sm sm:text-2xl px-1 cursor-pointer"
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
