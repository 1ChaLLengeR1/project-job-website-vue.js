<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-cost-apartment">
        {{ t("pages.rentals.dictionaries.apartmentCosts.form.apartment") }}
      </label>
      <Select
        id="apartment-cost-apartment"
        v-model="apartmentId"
        :options="apartmentOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-cost-type">
        {{ t("pages.rentals.dictionaries.apartmentCosts.form.costType") }}
      </label>
      <Select
        id="apartment-cost-type"
        v-model="costTypeId"
        :options="costTypeOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-cost-amount">
        {{ t("pages.rentals.dictionaries.apartmentCosts.form.amount") }}
      </label>
      <InputNumber
        inputId="apartment-cost-amount"
        v-model="amount"
        :min="0"
        :maxFractionDigits="2"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-cost-start">
        {{ t("pages.rentals.dictionaries.apartmentCosts.form.startDate") }}
      </label>
      <DatePicker
        inputId="apartment-cost-start"
        v-model="startDate"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-cost-end">
        {{ t("pages.rentals.dictionaries.apartmentCosts.form.endDate") }}
      </label>
      <DatePicker
        inputId="apartment-cost-end"
        v-model="endDate"
        dateFormat="yy-mm-dd"
        showButtonBar
      />
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
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

// types
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { CostType } from "@/types/api/rentals/costTypes/types";

export default defineComponent({
  name: "ApartmentCostForm",
  components: { Select, InputNumber, DatePicker, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<ApartmentCost | null>,
      default: null,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    costTypes: {
      required: true,
      type: Array as PropType<CostType[]>,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const apartmentId = ref<string | null>(null);
    const costTypeId = ref<string | null>(null);
    const amount = ref<number | null>(null);
    const startDate = ref<Date | null>(null);
    const endDate = ref<Date | null>(null);

    // backend nie pozwala zmienić mieszkania ani rodzaju kosztu w istniejącym koszcie
    const isEdit = computed(() => props.initial !== null);

    watch(
      () => props.initial,
      (value) => {
        apartmentId.value = value?.apartment_id ?? null;
        costTypeId.value = value?.cost_type_id ?? null;
        amount.value = value?.amount ?? null;
        startDate.value = value?.start_date ? new Date(value.start_date) : null;
        endDate.value = value?.end_date ? new Date(value.end_date) : null;
      },
      { immediate: true },
    );

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const costTypeOptions = computed(() =>
      props.costTypes.map((item) => ({ label: item.name, value: item.id })),
    );

    const isValid = computed(
      () =>
        apartmentId.value !== null &&
        costTypeId.value !== null &&
        amount.value !== null &&
        amount.value >= 0 &&
        startDate.value !== null,
    );

    const handlerSubmit = () => {
      const common = {
        amount: amount.value as number,
        start_date: formatDateApi(startDate.value as Date),
        end_date: endDate.value ? formatDateApi(endDate.value) : null,
      };

      if (isEdit.value) {
        ctx.emit("submit", common);
      } else {
        ctx.emit("submit", {
          apartment_id: apartmentId.value as string,
          cost_type_id: costTypeId.value as string,
          ...common,
        });
      }
    };

    return {
      t,
      apartmentId,
      costTypeId,
      amount,
      startDate,
      endDate,
      isEdit,
      apartmentOptions,
      costTypeOptions,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
