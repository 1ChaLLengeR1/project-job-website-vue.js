<template>
  <div class="w-96 flex flex-col gap-5">
    <div class="w-full p-2 bg-color-bg-dark rounded-t-3xl">
      <div class="w-full bg-color-yellow text-center rounded-t-3xl">
        <p class="text-xl sm:text-3xl font-syne font-bold py-4">
          Kalkulator Prowizji
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col gap-3 p-2 bg-color-bg-dark rounded-b-3xl">
      <div class="text-white text-xl sm:text-2xl bg-color-bg py-3 px-2">
        <p>
          Brutto: <span class="text-red-600">{{ brutto }}</span> zł
        </p>
      </div>
      <div class="text-white text-xl sm:text-2xl bg-color-bg py-3 px-2">
        <p>
          Na czysto: <span class="text-blue-700">{{ netto }}</span> zł
        </p>
      </div>
      <div
        class="text-white text-xl sm:text-2xl bg-color-bg py-3 px-2 rounded-b-3xl"
      >
        <p>
          Zwrot Procentowy: <span class="text-green-700">{{ precent }}</span> %
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    brutto: {
      required: false,
      type: Number,
    },
    netto: {
      required: false,
      type: Number,
    },
    precent: {
      required: false,
      type: Number,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
