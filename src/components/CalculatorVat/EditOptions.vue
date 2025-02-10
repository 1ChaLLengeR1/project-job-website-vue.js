<template>
  <div
    class="absolute left-0 top-1 flex w-full flex-col gap-3 rounded-b-3xl rounded-t-3xl bg-color-yellow p-1"
  >
    <div class="flex w-full justify-end px-2 py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50px"
        viewBox="0 0 384 512"
        class="cursor-pointer"
        @click="close_edit_panel"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <div class="flex w-full flex-wrap justify-center gap-3">
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.vat')"
        :number="calculatorVatStore.calculation.vat"
        type="vat"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.income_tax')"
        :number="calculatorVatStore.calculation.income_tax"
        type="income_tax"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.inpost_parcel_locker')"
        :number="calculatorVatStore.calculation.inpost_parcel_locker"
        type="inpost_parcel_locker"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.inpost_courier')"
        :number="calculatorVatStore.calculation.inpost_courier"
        type="inpost_courier"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.dpd')"
        :number="calculatorVatStore.calculation.dpd"
        type="dpd"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.allegro_matt')"
        :number="calculatorVatStore.calculation.allegro_matt"
        type="allegro_matt"
        @update:number="updateNumber"
      />
      <InputEdit
        :name="t('pages.calculatorVat.placeholder.without_smart')"
        :number="calculatorVatStore.calculation.without_smart"
        type="without_smart"
        @update:number="updateNumber"
      />
    </div>
    <div class="flex w-full flex-col gap-3">
      <ul v-if="errorsMessage.length > 0" class="w-full">
        <li v-for="(item, index) in errorsMessage" :key="index">
          <span class="font-bold text-red-600">{{ item }}</span>
        </li>
      </ul>
      <button
        class="w-full rounded-b-3xl bg-color-bg p-3 text-lg text-white"
        @click.prevent="handlerSubmit"
      >
        {{ t("pages.calculatorVat.button.save") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

//componets
import InputEdit from "./InputEdit.vue";

// stores
import { CalculatorVatStore } from "@/stores/patryk/calculatorVat";
import type { Calculations } from "@/types/patryk/calculatorWork/types";

export default defineComponent({
  emits: ["close-edit-panel", "response-message"],
  components: {
    InputEdit,
  },
  setup(_, ctx) {
    const { t } = useI18n();
    const calculatorVatStore = CalculatorVatStore();
    const errorsMessage = ref<string[]>([]);

    const handlerSubmit = async () => {
      const errors: string[] = [];
      if (isNaN(calculatorVatStore.calculation.income_tax)) {
        errors.push("Podatek_Dochodowy nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.vat)) {
        errors.push("Vat nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.inpost_parcel_locker)) {
        errors.push("Paczkomat nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.inpost_courier)) {
        errors.push("Kurier nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.dpd)) {
        errors.push("Dpd nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.allegro_matt)) {
        errors.push("Allegro_matt nie może być pusty!");
      }
      if (isNaN(calculatorVatStore.calculation.without_smart)) {
        errors.push("Bez_smarta nie może być pusty!");
      }

      if (errors.length > 0) {
        errorsMessage.value = errors;
        return;
      }

      await calculatorVatStore.apiCalculationUpdate(
        calculatorVatStore.calculation,
      );

      errorsMessage.value = [];
    };

    const close_edit_panel = () => {
      ctx.emit("close-edit-panel", false);
    };

    (async () => {
      await calculatorVatStore.apiFetch();
    })();

    const updateNumber = (type: keyof Calculations, num: number) => {
      if (num !== null || num !== undefined || type !== "id") {
        calculatorVatStore.setCalculation(type, num);
      }
    };

    return {
      errorsMessage,
      calculatorVatStore,
      close_edit_panel,
      handlerSubmit,
      updateNumber,
      t,
    };
  },
});
</script>
