<template>
  <section class="flex w-full flex-col gap-5">
    <!-- pasek okresu -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <Button
          :label="t('pages.rentals.billing.detail.back')"
          severity="secondary"
          text
          @click="$emit('back')"
        />
        <span class="font-syne text-xl text-color-yellow">
          {{
            t("pages.rentals.billing.detail.period", {
              month: period ? period.period_month : "",
            })
          }}
        </span>
        <Tag
          v-if="period"
          :value="t(`pages.rentals.billing.periods.status.${period.status}`)"
          :severity="isClosed ? 'danger' : 'success'"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <Button
          :label="t('pages.rentals.billing.detail.button.note')"
          severity="secondary"
          :disabled="!periodsStore.calculation"
          @click="handlerNote"
        />
        <Button
          :label="t('pages.rentals.billing.detail.button.preview')"
          severity="info"
          :loading="periodsStore.isCalculating"
          @click="handlerPreview"
        />
        <Button
          v-if="!isClosed"
          :label="t('pages.rentals.billing.detail.button.close')"
          severity="success"
          :loading="periodsStore.isCalculating"
          @click="handlerClose"
        />
        <Button
          v-else
          :label="t('pages.rentals.billing.detail.button.reopen')"
          severity="warn"
          @click="handlerReopen"
        />
      </div>
    </div>

    <!-- odczyty liczników -->
    <div class="flex w-full flex-col gap-2">
      <h3 class="font-syne text-2xl text-color-yellow">
        {{ t("pages.rentals.billing.readings.title") }}
      </h3>
      <ReadingsTable
        :items="readingsStore.collection"
        :meters="metersStore.collection"
        :apartments="apartmentsStore.collection"
        :loading="readingsStore.isLoading"
        :readonly="isClosed"
        @add="dialogVisible = true"
        @save="handlerSaveReading"
        @delete="handlerDeleteReading"
      />
    </div>

    <!-- korekty jednorazowe -->
    <AdjustmentsPanel
      :items="adjustments"
      :apartments="apartmentsStore.collection"
      :readonly="isClosed"
      @add="handlerAddAdjustment"
      @remove="handlerRemoveAdjustment"
    />

    <!-- wynik preview/close -->
    <CalculationView
      :calculation="periodsStore.calculation"
      :meters="metersStore.collection"
      :apartments="apartmentsStore.collection"
    />

    <FormDialog
      v-model:visible="dialogVisible"
      :header="t('pages.rentals.billing.readings.form.titleCreate')"
    >
      <ReadingForm
        :meters="metersWithoutReading"
        :apartments="apartmentsStore.collection"
        @submit="handlerCreateReading"
        @cancel="dialogVisible = false"
      />
    </FormDialog>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { buildRentalNote, downloadTextFile } from "@/utils/rentalNote";

// stores
import { RentalPeriodsStore } from "@/stores/rentals/periods";
import { RentalReadingsStore } from "@/stores/rentals/readings";
import { RentalMetersStore } from "@/stores/rentals/meters";
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import Button from "primevue/button";
import Tag from "primevue/tag";
import ReadingsTable from "@/components/Rentals/Billing/ReadingsTable.vue";
import ReadingForm from "@/components/Rentals/Billing/forms/ReadingForm.vue";
import AdjustmentsPanel from "@/components/Rentals/Billing/AdjustmentsPanel.vue";
import CalculationView from "@/components/Rentals/Billing/CalculationView.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Reading } from "@/types/api/rentals/readings/types";
import type { Meter } from "@/types/api/rentals/meters/types";
import type { UpdateReadingBody } from "@/types/rentals/readings/types";
import type { PeriodAdjustment } from "@/types/rentals/periods/types";

export default defineComponent({
  name: "PeriodDetailSection",
  components: {
    Button,
    Tag,
    ReadingsTable,
    ReadingForm,
    AdjustmentsPanel,
    CalculationView,
    FormDialog,
  },
  props: {
    periodId: {
      required: true,
      type: String,
    },
  },
  emits: ["back"],
  setup(props) {
    const { t } = useI18n();
    const periodsStore = RentalPeriodsStore();
    const readingsStore = RentalReadingsStore();
    const metersStore = RentalMetersStore();
    const apartmentsStore = RentalApartmentsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    // korekty żyją tylko lokalnie — backend przyjmuje je w body preview/close
    const adjustments = ref<PeriodAdjustment[]>([]);

    // bierzemy okres ze store'a, żeby status odświeżał się po close/reopen
    const period = computed(
      () =>
        periodsStore.collection.find((item) => item.id === props.periodId) ??
        null,
    );

    const isClosed = computed(() => period.value?.status === "closed");

    // liczniki bez odczytu w tym okresie — tylko dla nich ma sens ręczny odczyt
    const metersWithoutReading = computed<Meter[]>(() => {
      const usedMeterIds = new Set(
        readingsStore.collection.map((reading) => reading.meter_id),
      );
      return metersStore.collection.filter(
        (meter) => !usedMeterIds.has(meter.id),
      );
    });

    const loadPeriodData = async (periodId: string) => {
      periodsStore.calculation = null;
      adjustments.value = [];
      await readingsStore.apiFetchCollection(periodId);
    };

    onMounted(async () => {
      if (periodsStore.collection.length === 0) {
        await periodsStore.apiFetchCollection();
      }
      if (metersStore.collection.length === 0) {
        await metersStore.apiFetchCollection();
      }
      if (apartmentsStore.collection.length === 0) {
        await apartmentsStore.apiFetchCollection();
      }
      await loadPeriodData(props.periodId);
    });

    watch(
      () => props.periodId,
      async (periodId) => {
        await loadPeriodData(periodId);
      },
    );

    const handlerSaveReading = async (
      readingId: string,
      body: UpdateReadingBody,
    ) => {
      await readingsStore.apiUpdate(readingId, body);
    };

    const handlerDeleteReading = (reading: Reading) => {
      confirmBoxStore.info = t("pages.rentals.billing.readings.confirm.delete");
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await readingsStore.apiDelete(reading.id);
      });
    };

    const handlerCreateReading = async (body: {
      meter_id: string;
      previous_value: number;
      current_value: number;
      error_correction: number;
    }) => {
      const isValid = await readingsStore.apiCreate({
        period_id: props.periodId,
        ...body,
      });
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    const handlerAddAdjustment = (adjustment: PeriodAdjustment) => {
      adjustments.value = [...adjustments.value, adjustment];
    };

    const handlerRemoveAdjustment = (index: number) => {
      adjustments.value = adjustments.value.filter(
        (_, position) => position !== index,
      );
    };

    const handlerPreview = async () => {
      await periodsStore.apiPreview(props.periodId, {
        adjustments: adjustments.value,
      });
    };

    // notatka .txt z aktualnego wyliczenia (preview lub close)
    const handlerNote = () => {
      const calculation = periodsStore.calculation;
      if (!calculation) {
        return;
      }
      const note = buildRentalNote({
        calculation,
        readings: readingsStore.collection,
        meters: metersStore.collection,
        apartments: apartmentsStore.collection,
      });
      const month = period.value?.period_month ?? props.periodId;
      downloadTextFile(`rozliczenie_${month}.txt`, note);
    };

    const handlerClose = () => {
      confirmBoxStore.info = t("pages.rentals.billing.periods.confirm.close");
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await periodsStore.apiClose(props.periodId, {
          adjustments: adjustments.value,
        });
      });
    };

    const handlerReopen = () => {
      confirmBoxStore.info = t("pages.rentals.billing.periods.confirm.reopen");
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        const isValid = await periodsStore.apiReopen(props.periodId);
        if (isValid) {
          await readingsStore.apiFetchCollection(props.periodId);
        }
      });
    };

    return {
      t,
      periodsStore,
      readingsStore,
      metersStore,
      apartmentsStore,
      dialogVisible,
      adjustments,
      period,
      isClosed,
      metersWithoutReading,
      handlerSaveReading,
      handlerDeleteReading,
      handlerCreateReading,
      handlerAddAdjustment,
      handlerRemoveAdjustment,
      handlerPreview,
      handlerNote,
      handlerClose,
      handlerReopen,
    };
  },
});
</script>

<style scoped></style>
