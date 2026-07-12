<template>
  <div class="w-full overflow-x-auto">
    <DataTable :value="items" :loading="loading" showGridlines>
      <template #header>
        <div class="flex w-full flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold text-white">
            {{
              t("pages.rentals.dictionaries.common.quantity", {
                quantity: items.length,
              })
            }}
          </span>
          <div class="flex flex-wrap items-center gap-3">
            <ActiveFilter
              :modelValue="activeFilter"
              @update:modelValue="(val) => $emit('update:activeFilter', val)"
            />
            <Button
              :label="t('pages.rentals.dictionaries.common.add')"
              severity="success"
              @click="$emit('add')"
            />
          </div>
        </div>
      </template>
      <Column
        field="name"
        :header="t('pages.rentals.dictionaries.costTypes.columns.name')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column
        field="charge_type"
        :header="t('pages.rentals.dictionaries.costTypes.columns.chargeType')"
      >
        <template #body="slotProps">
          <span>{{
            t(
              `pages.rentals.dictionaries.costTypes.chargeType.${slotProps.data.charge_type}`,
            )
          }}</span>
        </template>
      </Column>
      <Column
        field="is_active"
        :header="t('pages.rentals.dictionaries.costTypes.columns.status')"
      >
        <template #body="slotProps">
          <ActiveTag :active="slotProps.data.is_active" />
        </template>
      </Column>
      <Column :header="t('pages.rentals.dictionaries.common.options')">
        <template #body="slotProps">
          <div class="flex w-fit flex-wrap gap-2">
            <Button
              :label="t('pages.rentals.dictionaries.common.edit')"
              severity="info"
              text
              @click="$emit('edit', slotProps.data)"
            />
            <Button
              :label="t('pages.rentals.dictionaries.common.delete')"
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
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ActiveTag from "@/components/Rentals/utils/ActiveTag.vue";
import ActiveFilter from "@/components/Rentals/utils/ActiveFilter.vue";

// types
import type { CostType } from "@/types/api/rentals/costTypes/types";

export default defineComponent({
  name: "CostTypesTable",
  components: { DataTable, Column, Button, ActiveTag, ActiveFilter },
  props: {
    items: {
      required: true,
      type: Array as PropType<CostType[]>,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    activeFilter: {
      required: false,
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  },
  emits: ["add", "edit", "delete", "update:activeFilter"],
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style scoped></style>
