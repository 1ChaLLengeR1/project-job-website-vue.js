<template>
  <div class="w-full overflow-x-auto">
    <DataTable :value="items" :loading="loading" showGridlines>
      <template #header>
        <div class="flex w-full flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold text-white">
            {{
              t("pages.rentals.billing.periods.quantity", {
                quantity: items.length,
              })
            }}
          </span>
          <div class="flex flex-wrap items-center gap-3">
            <Select
              :modelValue="statusFilter ?? 'all'"
              :options="statusOptions"
              optionLabel="label"
              optionValue="value"
              class="w-44"
              @update:modelValue="handlerFilter"
            />
            <Button
              :label="t('pages.rentals.billing.periods.button.add')"
              severity="success"
              @click="$emit('add')"
            />
          </div>
        </div>
      </template>
      <Column
        field="period_month"
        :header="t('pages.rentals.billing.periods.columns.month')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            slotProps.data.period_month
          }}</span>
        </template>
      </Column>
      <Column
        field="status"
        :header="t('pages.rentals.billing.periods.columns.status')"
      >
        <template #body="slotProps">
          <Tag
            :value="
              t(`pages.rentals.billing.periods.status.${slotProps.data.status}`)
            "
            :severity="
              slotProps.data.status === 'closed' ? 'danger' : 'success'
            "
          />
        </template>
      </Column>
      <Column
        field="electricity_bill_amount"
        :header="t('pages.rentals.billing.periods.columns.electricityBill')"
      >
        <template #body="slotProps">
          <span>{{ money(slotProps.data.electricity_bill_amount) }}</span>
        </template>
      </Column>
      <Column
        field="electricity_rate"
        :header="t('pages.rentals.billing.periods.columns.electricityRate')"
      >
        <template #body="slotProps">
          <span>{{ rate(slotProps.data.electricity_rate) }}</span>
        </template>
      </Column>
      <Column
        field="water_rate"
        :header="t('pages.rentals.billing.periods.columns.waterRate')"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.water_rate }} zł/m³</span>
        </template>
      </Column>
      <Column
        field="note"
        :header="t('pages.rentals.billing.periods.columns.note')"
      >
        <template #body="slotProps">
          <span>{{
            slotProps.data.note ?? t("pages.rentals.dictionaries.common.none")
          }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.billing.periods.columns.options')">
        <template #body="slotProps">
          <div class="flex w-fit flex-wrap gap-2">
            <Button
              :label="t('pages.rentals.billing.periods.button.open')"
              severity="success"
              text
              @click="$emit('open', slotProps.data)"
            />
            <Button
              :label="t('pages.rentals.billing.periods.button.edit')"
              severity="info"
              text
              :disabled="slotProps.data.status === 'closed'"
              @click="$emit('edit', slotProps.data)"
            />
            <Button
              :label="t('pages.rentals.billing.periods.button.delete')"
              severity="danger"
              text
              @click="$emit('delete', slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Select from "primevue/select";

// types
import type { Period, PeriodStatus } from "@/types/api/rentals/periods/types";

export default defineComponent({
  name: "PeriodsTable",
  components: { DataTable, Column, Button, Tag, Select },
  props: {
    items: {
      required: true,
      type: Array as PropType<Period[]>,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    statusFilter: {
      required: false,
      type: String as PropType<PeriodStatus | null>,
      default: null,
    },
  },
  emits: ["add", "edit", "delete", "open", "update:statusFilter"],
  setup(_, ctx) {
    const { t } = useI18n();

    const statusOptions = computed(() => [
      {
        label: t("pages.rentals.billing.periods.filter.all"),
        value: "all",
      },
      {
        label: t("pages.rentals.billing.periods.filter.draft"),
        value: "draft",
      },
      {
        label: t("pages.rentals.billing.periods.filter.closed"),
        value: "closed",
      },
    ]);

    const handlerFilter = (value: string) => {
      ctx.emit("update:statusFilter", value === "all" ? null : value);
    };

    const money = (value: number | null): string =>
      value === null ? "—" : `${value} zł`;

    const rate = (value: number | null): string =>
      value === null ? "—" : `${value} zł/kWh`;

    return { t, statusOptions, handlerFilter, money, rate };
  },
});
</script>

<style scoped></style>
