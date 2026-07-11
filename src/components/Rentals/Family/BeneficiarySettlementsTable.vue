<template>
  <div class="flex w-full flex-col gap-3">
    <!-- filtry snapshotów -->
    <div class="flex flex-wrap items-end gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="settlement-period">
          {{ t("pages.rentals.family.settlements.filter.period") }}
        </label>
        <Select
          id="settlement-period"
          :modelValue="periodId"
          :options="periodOptions"
          optionLabel="label"
          optionValue="value"
          showClear
          class="w-52"
          @update:modelValue="handlerPeriod"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="settlement-beneficiary">
          {{ t("pages.rentals.family.settlements.filter.beneficiary") }}
        </label>
        <Select
          id="settlement-beneficiary"
          :modelValue="beneficiaryId"
          :options="beneficiaryOptions"
          optionLabel="label"
          optionValue="value"
          showClear
          class="w-52"
          @update:modelValue="handlerBeneficiary"
        />
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <DataTable :value="items" :loading="loading" showGridlines>
        <template #empty>
          <span>{{ t("pages.rentals.family.settlements.empty") }}</span>
        </template>
        <Column :header="t('pages.rentals.family.settlements.columns.period')">
          <template #body="slotProps">
            <span>{{ periodMonth(slotProps.data.period_id) }}</span>
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.family.settlements.columns.beneficiary')"
        >
          <template #body="slotProps">
            <span class="text-color-yellow">{{
              beneficiaryName(slotProps.data.beneficiary_id)
            }}</span>
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.family.settlements.columns.totalAmount')"
        >
          <template #body="slotProps">
            <span class="font-bold">
              {{ slotProps.data.total_amount.toFixed(2) }} zł
            </span>
          </template>
        </Column>
        <Column :header="t('pages.rentals.family.settlements.items')">
          <template #body="slotProps">
            <ul class="flex flex-col gap-1 text-sm">
              <li
                v-for="item in slotProps.data.items"
                :key="item.id"
                class="flex justify-between gap-3"
              >
                <span>{{ item.description }}</span>
                <span>{{ item.amount.toFixed(2) }} zł</span>
              </li>
            </ul>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Select from "primevue/select";

// types
import type { BeneficiarySettlement } from "@/types/api/rentals/beneficiarySettlements/types";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type { Period } from "@/types/api/rentals/periods/types";

export default defineComponent({
  name: "BeneficiarySettlementsTable",
  components: { DataTable, Column, Select },
  props: {
    items: {
      required: true,
      type: Array as PropType<BeneficiarySettlement[]>,
    },
    beneficiaries: {
      required: true,
      type: Array as PropType<Beneficiary[]>,
    },
    periods: {
      required: true,
      type: Array as PropType<Period[]>,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    periodId: {
      required: false,
      type: String as PropType<string | null>,
      default: null,
    },
    beneficiaryId: {
      required: false,
      type: String as PropType<string | null>,
      default: null,
    },
  },
  emits: ["update:periodId", "update:beneficiaryId"],
  setup(props, ctx) {
    const { t } = useI18n();

    const handlerPeriod = (value: string | null) => {
      ctx.emit("update:periodId", value ?? null);
    };

    const handlerBeneficiary = (value: string | null) => {
      ctx.emit("update:beneficiaryId", value ?? null);
    };

    const periodOptions = computed(() =>
      props.periods.map((item) => ({
        label: item.period_month,
        value: item.id,
      })),
    );

    const beneficiaryOptions = computed(() =>
      props.beneficiaries.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    );

    const periodMonth = (id: string): string => {
      const period = props.periods.find((item) => item.id === id);
      return period ? period.period_month : id;
    };

    const beneficiaryName = (id: string): string => {
      const beneficiary = props.beneficiaries.find((item) => item.id === id);
      return beneficiary ? beneficiary.name : id;
    };

    return {
      t,
      periodOptions,
      beneficiaryOptions,
      periodMonth,
      beneficiaryName,
      handlerPeriod,
      handlerBeneficiary,
    };
  },
});
</script>

<style scoped></style>
