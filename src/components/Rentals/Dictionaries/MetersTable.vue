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
        :header="t('pages.rentals.dictionaries.meters.columns.name')"
      >
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            slotProps.data.name ?? t("pages.rentals.dictionaries.common.none")
          }}</span>
        </template>
      </Column>
      <Column
        field="media_type"
        :header="t('pages.rentals.dictionaries.meters.columns.mediaType')"
      >
        <template #body="slotProps">
          <span>{{
            t(
              `pages.rentals.dictionaries.meters.mediaType.${slotProps.data.media_type}`,
            )
          }}</span>
        </template>
      </Column>
      <Column
        field="apartment_id"
        :header="t('pages.rentals.dictionaries.meters.columns.apartment')"
      >
        <template #body="slotProps">
          <span>{{ apartmentName(slotProps.data.apartment_id) }}</span>
        </template>
      </Column>
      <Column
        field="is_master"
        :header="t('pages.rentals.dictionaries.meters.columns.isMaster')"
      >
        <template #body="slotProps">
          <Tag
            v-if="slotProps.data.is_master"
            :value="t('pages.rentals.dictionaries.meters.columns.isMaster')"
            severity="warn"
          />
          <span v-else>{{ t("pages.rentals.dictionaries.common.none") }}</span>
        </template>
      </Column>
      <Column
        field="is_active"
        :header="t('pages.rentals.dictionaries.meters.columns.status')"
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
import Tag from "primevue/tag";
import ActiveTag from "@/components/Rentals/utils/ActiveTag.vue";
import ActiveFilter from "@/components/Rentals/utils/ActiveFilter.vue";

// types
import type { Meter } from "@/types/api/rentals/meters/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "MetersTable",
  components: { DataTable, Column, Button, Tag, ActiveTag, ActiveFilter },
  props: {
    items: {
      required: true,
      type: Array as PropType<Meter[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
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
  setup(props) {
    const { t } = useI18n();

    const apartmentName = (id: string | null): string => {
      if (id === null) {
        return t("pages.rentals.dictionaries.meters.mainMeter");
      }
      const apartment = props.apartments.find((item) => item.id === id);
      return apartment ? apartment.name : id;
    };

    return { t, apartmentName };
  },
});
</script>

<style scoped></style>
