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
        :header="
          t('pages.rentals.dictionaries.apartmentCosts.columns.apartment')
        "
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            apartmentName(slotProps.data.apartment_id)
          }}</span>
        </template>
      </Column>
      <Column
        field="cost_type_id"
        :header="
          t('pages.rentals.dictionaries.apartmentCosts.columns.costType')
        "
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            costTypeName(slotProps.data.cost_type_id)
          }}</span>
        </template>
      </Column>
      <Column
        field="amount"
        :header="t('pages.rentals.dictionaries.apartmentCosts.columns.amount')"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data.amount }} zł</span>
        </template>
      </Column>
      <Column
        field="start_date"
        :header="
          t('pages.rentals.dictionaries.apartmentCosts.columns.startDate')
        "
      />
      <Column
        field="end_date"
        :header="t('pages.rentals.dictionaries.apartmentCosts.columns.endDate')"
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
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { CostType } from "@/types/api/rentals/costTypes/types";

export default defineComponent({
  name: "ApartmentCostsTable",
  components: { DataTable, Column, Button },
  props: {
    items: {
      required: true,
      type: Array as PropType<ApartmentCost[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    costTypes: {
      required: true,
      type: Array as PropType<CostType[]>,
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

    const costTypeName = (id: string): string => {
      const costType = props.costTypes.find((item) => item.id === id);
      return costType ? costType.name : id;
    };

    return { t, apartmentName, costTypeName };
  },
});
</script>

<style scoped></style>
