<template>
  <div class="flex w-full flex-col gap-1 xl:flex-row">
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ name }}
    </p>
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ name_flats }}
    </p>
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      Ilość osób wynajmująceych:
      <span class="text-white">{{ quantity_users }}</span>
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
    name_flats: {
      required: true,
      type: String,
    },
    quantity_users: {
      required: true,
      type: Number,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
