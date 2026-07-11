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
        field="first_name"
        :header="t('pages.rentals.dictionaries.tenants.columns.firstName')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{ slotProps.data.first_name }}</span>
        </template>
      </Column>
      <Column
        field="last_name"
        :header="t('pages.rentals.dictionaries.tenants.columns.lastName')"
      >
        <template #body="slotProps">
          <span>{{
            slotProps.data.last_name ??
            t("pages.rentals.dictionaries.common.none")
          }}</span>
        </template>
      </Column>
      <Column
        field="note"
        :header="t('pages.rentals.dictionaries.tenants.columns.note')"
      >
        <template #body="slotProps">
          <span>{{
            slotProps.data.note ?? t("pages.rentals.dictionaries.common.none")
          }}</span>
        </template>
      </Column>
      <Column
        field="is_active"
        :header="t('pages.rentals.dictionaries.tenants.columns.status')"
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
import type { Tenant } from "@/types/api/rentals/tenants/types";

export default defineComponent({
  name: "TenantsTable",
  components: { DataTable, Column, Button, ActiveTag, ActiveFilter },
  props: {
    items: {
      required: true,
      type: Array as PropType<Tenant[]>,
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
