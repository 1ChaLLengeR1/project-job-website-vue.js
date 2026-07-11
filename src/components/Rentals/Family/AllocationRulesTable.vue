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
      <Column :header="t('pages.rentals.family.rules.columns.beneficiary')">
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            beneficiaryName(slotProps.data.beneficiary_id)
          }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.component')">
        <template #body="slotProps">
          <span>{{
            t(
              `pages.rentals.family.rules.component.${slotProps.data.component}`,
            )
          }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.mode')">
        <template #body="slotProps">
          <span>{{
            t(`pages.rentals.family.rules.mode.${slotProps.data.mode}`)
          }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.apartment')">
        <template #body="slotProps">
          <span>{{ apartmentName(slotProps.data.apartment_id) }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.costType')">
        <template #body="slotProps">
          <span>{{ costTypeName(slotProps.data.cost_type_id) }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.amount')">
        <template #body="slotProps">
          <span>{{
            slotProps.data.amount === null
              ? t("pages.rentals.dictionaries.common.none")
              : `${slotProps.data.amount} zł`
          }}</span>
        </template>
      </Column>
      <Column :header="t('pages.rentals.family.rules.columns.description')">
        <template #body="slotProps">
          <span>{{
            slotProps.data.description ??
            t("pages.rentals.dictionaries.common.none")
          }}</span>
        </template>
      </Column>
      <Column
        field="start_date"
        :header="t('pages.rentals.family.rules.columns.startDate')"
      />
      <Column :header="t('pages.rentals.family.rules.columns.endDate')">
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
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { CostType } from "@/types/api/rentals/costTypes/types";

export default defineComponent({
  name: "AllocationRulesTable",
  components: { DataTable, Column, Button },
  props: {
    items: {
      required: true,
      type: Array as PropType<AllocationRule[]>,
    },
    beneficiaries: {
      required: true,
      type: Array as PropType<Beneficiary[]>,
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

    const beneficiaryName = (id: string): string => {
      const beneficiary = props.beneficiaries.find((item) => item.id === id);
      return beneficiary ? beneficiary.name : id;
    };

    // null = reguła obejmuje wszystkie mieszkania
    const apartmentName = (id: string | null): string => {
      if (id === null) {
        return t("pages.rentals.family.rules.allApartments");
      }
      const apartment = props.apartments.find((item) => item.id === id);
      return apartment ? apartment.name : id;
    };

    const costTypeName = (id: string | null): string => {
      if (id === null) {
        return t("pages.rentals.dictionaries.common.none");
      }
      const costType = props.costTypes.find((item) => item.id === id);
      return costType ? costType.name : id;
    };

    return { t, beneficiaryName, apartmentName, costTypeName };
  },
});
</script>

<style scoped></style>
