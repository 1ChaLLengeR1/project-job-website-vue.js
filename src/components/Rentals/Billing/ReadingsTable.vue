<template>
  <div class="flex w-full flex-col gap-3">
    <div class="w-full overflow-x-auto">
      <DataTable :value="items" :loading="loading" showGridlines>
        <template #header>
          <div class="flex w-full flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold text-white">
              {{
                t("pages.rentals.billing.readings.quantity", {
                  quantity: items.length,
                })
              }}
            </span>
            <Button
              :label="t('pages.rentals.billing.readings.button.add')"
              severity="success"
              :disabled="readonly"
              @click="$emit('add')"
            />
          </div>
        </template>
        <template #empty>
          <span>{{ t("pages.rentals.billing.readings.empty") }}</span>
        </template>
        <Column :header="t('pages.rentals.billing.readings.columns.meter')">
          <template #body="slotProps">
            <span class="text-color-yellow">{{
              meterName(slotProps.data.meter_id)
            }}</span>
          </template>
        </Column>
        <Column :header="t('pages.rentals.billing.readings.columns.apartment')">
          <template #body="slotProps">
            <span>{{ meterApartment(slotProps.data.meter_id) }}</span>
          </template>
        </Column>
        <Column :header="t('pages.rentals.billing.readings.columns.mediaType')">
          <template #body="slotProps">
            <span>{{ meterMedia(slotProps.data.meter_id) }}</span>
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.billing.readings.columns.previousValue')"
        >
          <template #body="slotProps">
            <InputNumber
              v-if="draft[slotProps.data.id]"
              v-model="draft[slotProps.data.id].previous_value"
              :min="0"
              :maxFractionDigits="3"
              :disabled="readonly"
              class="w-28"
            />
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.billing.readings.columns.currentValue')"
        >
          <template #body="slotProps">
            <InputNumber
              v-if="draft[slotProps.data.id]"
              v-model="draft[slotProps.data.id].current_value"
              :min="0"
              :maxFractionDigits="3"
              :disabled="readonly"
              class="w-28"
            />
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.billing.readings.columns.errorCorrection')"
        >
          <template #body="slotProps">
            <InputNumber
              v-if="draft[slotProps.data.id]"
              v-model="draft[slotProps.data.id].error_correction"
              :maxFractionDigits="3"
              :disabled="readonly"
              class="w-28"
            />
          </template>
        </Column>
        <Column
          :header="t('pages.rentals.billing.readings.columns.consumption')"
        >
          <template #body="slotProps">
            <span class="font-bold">{{ consumption(slotProps.data.id) }}</span>
          </template>
        </Column>
        <Column :header="t('pages.rentals.billing.readings.columns.options')">
          <template #body="slotProps">
            <div class="flex w-fit flex-wrap gap-2">
              <Button
                :label="t('pages.rentals.billing.readings.button.save')"
                severity="success"
                text
                :disabled="readonly || !isDirty(slotProps.data)"
                @click="handlerSave(slotProps.data.id)"
              />
              <Button
                :label="t('pages.rentals.billing.readings.button.delete')"
                severity="danger"
                text
                :disabled="readonly"
                @click="$emit('delete', slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";

// types
import type { Reading } from "@/types/api/rentals/readings/types";
import type { Meter } from "@/types/api/rentals/meters/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { UpdateReadingBody } from "@/types/rentals/readings/types";

type Draft = Record<string, UpdateReadingBody>;

export default defineComponent({
  name: "ReadingsTable",
  components: { DataTable, Column, Button, InputNumber },
  props: {
    items: {
      required: true,
      type: Array as PropType<Reading[]>,
    },
    meters: {
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
    // zamknięty okres — edycja odczytów zablokowana
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ["add", "save", "delete"],
  setup(props, ctx) {
    const { t } = useI18n();

    // lokalny bufor edycji — wysyłamy dopiero po kliknięciu "Zapisz"
    const draft = reactive<Draft>({});

    watch(
      () => props.items,
      (items) => {
        for (const key of Object.keys(draft)) {
          delete draft[key];
        }
        items.forEach((item) => {
          draft[item.id] = {
            previous_value: item.previous_value,
            current_value: item.current_value,
            error_correction: item.error_correction,
          };
        });
      },
      { immediate: true, deep: false },
    );

    const findMeter = (meterId: string): Meter | undefined =>
      props.meters.find((item) => item.id === meterId);

    const meterName = (meterId: string): string => {
      const meter = findMeter(meterId);
      if (!meter) {
        return meterId;
      }
      return meter.name ?? t("pages.rentals.dictionaries.common.none");
    };

    const meterApartment = (meterId: string): string => {
      const meter = findMeter(meterId);
      if (!meter || meter.apartment_id === null) {
        return t("pages.rentals.dictionaries.meters.mainMeter");
      }
      const apartment = props.apartments.find(
        (item) => item.id === meter.apartment_id,
      );
      return apartment ? apartment.name : meter.apartment_id;
    };

    const meterMedia = (meterId: string): string => {
      const meter = findMeter(meterId);
      if (!meter) {
        return "—";
      }
      return t(
        `pages.rentals.dictionaries.meters.mediaType.${meter.media_type}`,
      );
    };

    // podgląd zużycia liczony lokalnie z bufora, zanim odczyt trafi na backend
    const consumption = (readingId: string): string => {
      const values = draft[readingId];
      if (!values) {
        return "—";
      }
      const result =
        values.current_value - values.previous_value + values.error_correction;
      return result.toFixed(2);
    };

    const isDirty = (reading: Reading): boolean => {
      const values = draft[reading.id];
      if (!values) {
        return false;
      }
      return (
        values.previous_value !== reading.previous_value ||
        values.current_value !== reading.current_value ||
        values.error_correction !== reading.error_correction
      );
    };

    const handlerSave = (readingId: string) => {
      const values = draft[readingId];
      if (!values) {
        return;
      }
      ctx.emit("save", readingId, {
        previous_value: values.previous_value ?? 0,
        current_value: values.current_value ?? 0,
        error_correction: values.error_correction ?? 0,
      });
    };

    return {
      t,
      draft,
      meterName,
      meterApartment,
      meterMedia,
      consumption,
      isDirty,
      handlerSave,
    };
  },
});
</script>

<style scoped></style>
