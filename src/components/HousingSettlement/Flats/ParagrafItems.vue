<template>
  <div class="flex w-full flex-col gap-1 xl:flex-row">
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ house_name }}
    </p>
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      {{ professional_house_name }}
    </p>
    <p
      class="w-full bg-color-bg p-2 text-center font-syne text-lg font-bold text-color-yellow sm:p-3 sm:text-lg"
    >
      Cena za mieszkanie <span class="text-white">{{ price }}</span> zł
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    house_name: {
      required: true,
      type: String,
    },
    professional_house_name: {
      required: true,
      type: String,
    },
    price: {
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
