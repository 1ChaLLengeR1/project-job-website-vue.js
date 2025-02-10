<template>
  <div class="flex w-96 flex-col gap-5">
    <div class="w-full rounded-t-3xl bg-color-bg-dark p-2">
      <div class="w-full rounded-t-3xl bg-color-yellow text-center">
        <p class="py-4 font-syne text-xl font-bold sm:text-3xl">
          {{ t("pages.calculatorVat.title") }}
        </p>
      </div>
    </div>
    <div class="flex w-full flex-col gap-3 rounded-b-3xl bg-color-bg-dark p-2">
      <div class="bg-color-bg px-2 py-3 text-xl text-white sm:text-2xl">
        <p>
          {{ t("pages.calculatorVat.result.brutto") }}:
          <span class="text-red-600">{{ brutto }}</span> zł
        </p>
      </div>
      <div class="bg-color-bg px-2 py-3 text-xl text-white sm:text-2xl">
        <p>
          {{ t("pages.calculatorVat.result.netto") }}:
          <span class="text-blue-700">{{ netto }}</span> zł
        </p>
      </div>
      <div
        class="rounded-b-3xl bg-color-bg px-2 py-3 text-xl text-white sm:text-2xl"
      >
        <p>
          {{ t("pages.calculatorVat.result.procent") }}:
          <span class="text-green-700">{{ precent }}</span> %
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

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
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style scoped></style>
