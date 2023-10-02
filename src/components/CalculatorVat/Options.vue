<template>
  <div class="w-96 sm:w-[70rem] bg-color-bg-dark rounded-3xl p-2">
    <div class="w-full flex flex-col gap-3">
      <div
        class="w-full flex justify-end bg-color-yellow py-5 px-2 rounded-t-3xl"
      >
        <ellipsis-svg></ellipsis-svg>
      </div>
      <div class="w-full flex flex-wrap sm:flex-nowrap gap-3">
        <input
          type="number"
          placeholder="Cena sprzedaży (zł)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
        />
        <input
          type="number"
          placeholder="Cena zakupu (zł)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
        />
        <input
          type="number"
          placeholder="Prowizja (%)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
        />
        <input
          type="number"
          placeholder="Wyróżnienie (%)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EllipsisSvgVue from "../CalculatorVat/EllipsisSvg.vue";

export default defineComponent({
  components: {
    "ellipsis-svg": EllipsisSvgVue,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
