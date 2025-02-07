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
      <edit-input
        :name="t('pages.calculatorVat.placeholder.vat')"
        :number="calculatorVatStore.calculation.vat"
        type="vat"
        @update:number="updateNumber"
      />
      <edit-input
        :name="t('pages.calculatorVat.placeholder.income_tax')"
        :number="calculatorVatStore.calculation.income_tax"
        type="income_tax"
        @update:number="updateNumber"
      />
      <edit-input
        :name="t('pages.calculatorVat.placeholder.inpost_parcel_locker')"
        :number="calculatorVatStore.calculation.inpost_parcel_locker"
        type="inpost_parcel_locker"
        @update:number="updateNumber"
      ></edit-input>
      <edit-input
        :name="t('pages.calculatorVat.placeholder.inpost_courier')"
        :number="calculatorVatStore.calculation.inpost_courier"
        type="inpost_courier"
        @update:number="updateNumber"
      ></edit-input>
      <edit-input
        :name="t('pages.calculatorVat.placeholder.dpd')"
        :number="calculatorVatStore.calculation.dpd"
        type="dpd"
        @update:number="updateNumber"
      ></edit-input>
      <edit-input
        :name="t('pages.calculatorVat.placeholder.allegro_matt')"
        :number="calculatorVatStore.calculation.allegro_matt"
        type="allegro_matt"
        @update:number="updateNumber"
      ></edit-input>
      <edit-input
        :name="t('pages.calculatorVat.placeholder.without_smart')"
        :number="calculatorVatStore.calculation.without_smart"
        type="without_smart"
        @update:number="updateNumber"
      ></edit-input>
    </div>
    <div class="w-full">
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

//componets
import InputEdit from "./InputEdit.vue";

// stores
import { CalculatorVatStore } from "@/stores/patryk/calculatorVat";
import { Calculations } from "@/types/patryk/calculatorWork/types";

export default defineComponent({
  emits: ["close-edit-panel", "response-message"],
  components: {
    "edit-input": InputEdit,
  },
  setup(_, ctx) {
    const { t } = useI18n();
    const calculatorVatStore = CalculatorVatStore();

    const handlerSubmit = async () => {
      console.log("aa");
    };

    const close_edit_panel = () => {
      ctx.emit("close-edit-panel", false);
    };

    (async () => {
      await calculatorVatStore.apiFetch();
    })();

    const updateNumber = (
      num: number,
      type: keyof Omit<Calculations, "id">,
    ) => {
      calculatorVatStore.calculation[type] = num;
    };

    return {
      calculatorVatStore,
      close_edit_panel,
      handlerSubmit,
      updateNumber,
      t,
    };
  },
});
</script>
