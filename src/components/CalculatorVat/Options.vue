<template>
  <div class="flex w-96 rounded-3xl bg-color-bg-dark p-2 sm:w-[70rem]">
    <div class="flex w-full flex-col justify-between gap-3">
      <div
        class="relative flex w-full justify-end rounded-t-3xl bg-color-yellow px-2 py-5"
      >
        <EllipsisSvgVue
          @open-edit-panel="openPanel"
          color="black"
          height="30px"
        />
        <EditOptionsVue @close-edit-panel="openPanel" v-if="panelEdit" />
      </div>
      <div class="flex w-full flex-wrap gap-3 sm:flex-nowrap">
        <input
          type="number"
          :placeholder="t('pages.calculatorVat.placeholder.brutto')"
          class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
          v-model="input_values.gross_sales"
        />
        <input
          type="number"
          :placeholder="t('pages.calculatorVat.placeholder.netto')"
          class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
          v-model="input_values.gross_purchase"
        />
        <input
          type="number"
          :placeholder="t('pages.calculatorVat.placeholder.commission')"
          class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
          v-model="input_values.provision"
        />
        <input
          type="number"
          :placeholder="t('pages.calculatorVat.placeholder.distinction')"
          class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
          v-model="input_values.distinction"
        />
      </div>
      <div class="w-full">
        <select
          class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
          v-model="input_values.referrer"
        >
          <option
            v-for="(item, index) in select_value"
            :key="index"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="w-full">
        <button
          class="me-auto w-full rounded-b-3xl bg-color-yellow py-3 text-3xl font-bold"
          @click="submit"
        >
          {{ t("pages.calculatorVat.button.calculate") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

//componets
import EllipsisSvgVue from "../CalculatorVat/EllipsisSvg.vue";
import EditOptionsVue from "./EditOptions.vue";

// stores
import { CalculatorVatStore } from "@/stores/patryk/calculatorVat";
import { CalculationsBody } from "@/types/patryk/calculatorWork/types";

export default defineComponent({
  components: {
    EllipsisSvgVue,
    EditOptionsVue,
  },
  setup() {
    const { t } = useI18n();
    const calculatorVatStore = CalculatorVatStore();
    const input_values = reactive<{
      gross_sales: number | null;
      gross_purchase: number | null;
      provision: number | null;
      distinction: number | null;
      referrer: string;
    }>({
      gross_sales: null,
      gross_purchase: null,
      provision: null,
      distinction: null,
      referrer: "nothing",
    });
    const panelEdit = ref<boolean>(false);
    const select_value = ref<{ text: string; value: string }[]>([
      { text: t("pages.calculatorVat.select.title"), value: "nothing" },
      {
        text: t("pages.calculatorVat.select.inpost_parcel_locker"),
        value: "inpost_parcel_locker",
      },
      {
        text: t("pages.calculatorVat.select.inpost_courier"),
        value: "inpost_courier",
      },
      {
        text: t("pages.calculatorVat.select.inpost_cash_of_delivery_courier"),
        value: "inpost_cash_of_delivery_courier",
      },
      {
        text: t("pages.calculatorVat.select.dpd"),
        value: "dpd",
      },
      {
        text: t("pages.calculatorVat.select.allegro_matt"),
        value: "allegro_matt",
      },
      {
        text: t("pages.calculatorVat.select.without_smart"),
        value: "without_smart",
      },
    ]);

    const openPanel = (val: boolean) => {
      panelEdit.value = val;
    };

    const submit = async () => {
      const obj: CalculationsBody = {
        referrer: input_values.referrer,
        gross_sales: input_values.gross_sales || 0,
        gross_purchase: input_values.gross_purchase || 0,
        provision: input_values.provision || 0,
        distinction: input_values.distinction || 0,
      };

      if (obj.gross_sales === null) {
        obj.gross_sales = 0;
      }

      if (obj.gross_purchase === null) {
        obj.gross_purchase = 0;
      }

      if (obj.provision === null) {
        obj.provision = 0;
      }

      if (obj.distinction === null) {
        obj.distinction = 0;
      }

      await calculatorVatStore.apiCalculations(obj);
    };

    return {
      input_values,
      select_value,
      panelEdit,
      submit,
      openPanel,
      t,
    };
  },
});
</script>
