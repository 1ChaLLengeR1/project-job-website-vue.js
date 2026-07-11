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
          <Button
            :label="t('pages.rentals.dictionaries.common.add')"
            severity="success"
            @click="$emit('add')"
          />
        </div>
      </template>
      <Column
        field="apartment_id"
        :header="t('pages.rentals.dictionaries.tenancies.columns.apartment')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            apartmentName(slotProps.data.apartment_id)
          }}</span>
        </template>
      </Column>
      <Column
        field="tenant_id"
        :header="t('pages.rentals.dictionaries.tenancies.columns.tenant')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            tenantName(slotProps.data.tenant_id)
          }}</span>
        </template>
      </Column>
      <Column
        field="rent_amount"
        :header="t('pages.rentals.dictionaries.tenancies.columns.rentAmount')"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.rent_amount }} zł</span>
        </template>
      </Column>
      <Column
        field="persons_count"
        :header="t('pages.rentals.dictionaries.tenancies.columns.personsCount')"
      />
      <Column
        field="start_date"
        :header="t('pages.rentals.dictionaries.tenancies.columns.startDate')"
      />
      <Column
        field="end_date"
        :header="t('pages.rentals.dictionaries.tenancies.columns.endDate')"
      >
        <template #body="slotProps">
          <span>{{
            slotProps.data.end_date ??
            t("pages.rentals.dictionaries.common.none")
          }}</span>
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

// types
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { Tenant } from "@/types/api/rentals/tenants/types";

export default defineComponent({
  name: "TenanciesTable",
  components: { DataTable, Column, Button },
  props: {
    items: {
      required: true,
      type: Array as PropType<Tenancy[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    tenants: {
      required: true,
      type: Array as PropType<Tenant[]>,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ["add", "edit", "delete"],
  setup(props) {
    const { t } = useI18n();

    const apartmentName = (id: string): string => {
      const apartment = props.apartments.find((item) => item.id === id);
      return apartment ? apartment.name : id;
    };

    const tenantName = (id: string): string => {
      const tenant = props.tenants.find((item) => item.id === id);
      if (!tenant) {
        return id;
      }
      return [tenant.first_name, tenant.last_name].filter(Boolean).join(" ");
    };

    return { t, apartmentName, tenantName };
  },
});
</script>

<style scoped></style>
