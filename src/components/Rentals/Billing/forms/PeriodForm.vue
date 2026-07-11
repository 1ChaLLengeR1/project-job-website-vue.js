<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="period-month">
        {{ t("pages.rentals.billing.periods.form.periodMonth") }}
      </label>
      <DatePicker
        inputId="period-month"
        v-model="periodMonth"
        view="month"
        dateFormat="yy-mm"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="period-bill">
        {{ t("pages.rentals.billing.periods.form.electricityBillAmount") }}
      </label>
      <InputNumber
        inputId="period-bill"
        v-model="electricityBillAmount"
        :min="0"
        :maxFractionDigits="2"
      />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="electricityRateIsManual" inputId="period-manual" />
      <label class="text-sm" for="period-manual">
        {{ t("pages.rentals.billing.periods.form.electricityRateIsManual") }}
      </label>
    </div>
    <div v-if="electricityRateIsManual" class="flex flex-col gap-1">
      <label class="text-sm" for="period-rate">
        {{ t("pages.rentals.billing.periods.form.electricityRate") }}
      </label>
      <InputNumber
        inputId="period-rate"
        v-model="electricityRate"
        :min="0"
        :maxFractionDigits="4"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="period-water">
        {{ t("pages.rentals.billing.periods.form.waterRate") }}
      </label>
      <InputNumber
        inputId="period-water"
        v-model="waterRate"
        :min="0"
        :maxFractionDigits="2"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="period-note">
        {{ t("pages.rentals.billing.periods.form.note") }}
      </label>
      <Textarea id="period-note" v-model="note" rows="2" />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        :label="t('pages.rentals.dictionaries.common.cancel')"
        severity="secondary"
        text
        @click="$emit('cancel')"
      />
      <Button
        type="submit"
        :label="t('pages.rentals.dictionaries.common.save')"
        severity="success"
        :disabled="!isValid"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";
import { formatDateApi } from "@/utils/formats";

// components
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import ToggleSwitch from "primevue/toggleswitch";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

// types
import type { Period } from "@/types/api/rentals/periods/types";

const DEFAULT_WATER_RATE = 9;

export default defineComponent({
  name: "PeriodForm",
  components: { DatePicker, InputNumber, ToggleSwitch, Textarea, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<Period | null>,
      default: null,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const periodMonth = ref<Date | null>(null);
    const electricityBillAmount = ref<number | null>(null);
    const electricityRate = ref<number | null>(null);
    const electricityRateIsManual = ref<boolean>(false);
    const waterRate = ref<number | null>(DEFAULT_WATER_RATE);
    const note = ref<string>("");

    // miesiąc okresu jest niezmienny — backend nie ma go w body update
    const isEdit = computed(() => props.initial !== null);

    watch(
      () => props.initial,
      (value) => {
        periodMonth.value = value?.period_month
          ? new Date(value.period_month)
          : null;
        electricityBillAmount.value = value?.electricity_bill_amount ?? null;
        electricityRate.value = value?.electricity_rate ?? null;
        electricityRateIsManual.value =
          value?.electricity_rate_is_manual ?? false;
        waterRate.value = value?.water_rate ?? DEFAULT_WATER_RATE;
        note.value = value?.note ?? "";
      },
      { immediate: true },
    );

    const isValid = computed(
      () =>
        (isEdit.value || periodMonth.value !== null) &&
        waterRate.value !== null &&
        waterRate.value >= 0,
    );

    const handlerSubmit = () => {
      const common = {
        electricity_bill_amount: electricityBillAmount.value,
        electricity_rate: electricityRateIsManual.value
          ? electricityRate.value
          : null,
        electricity_rate_is_manual: electricityRateIsManual.value,
        water_rate: waterRate.value as number,
        note: note.value.trim() || null,
      };

      if (isEdit.value) {
        ctx.emit("submit", common);
      } else {
        // okres zawsze zaczyna się 1. dnia miesiąca
        const month = periodMonth.value as Date;
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
        ctx.emit("submit", {
          period_month: formatDateApi(firstDay),
          ...common,
        });
      }
    };

    return {
      t,
      periodMonth,
      electricityBillAmount,
      electricityRate,
      electricityRateIsManual,
      waterRate,
      note,
      isEdit,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
