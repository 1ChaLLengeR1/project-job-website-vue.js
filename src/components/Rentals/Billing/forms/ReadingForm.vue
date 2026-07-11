<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="reading-meter">
        {{ t("pages.rentals.billing.readings.form.meter") }}
      </label>
      <Select
        id="reading-meter"
        v-model="meterId"
        :options="meterOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="reading-previous">
        {{ t("pages.rentals.billing.readings.form.previousValue") }}
      </label>
      <InputNumber
        inputId="reading-previous"
        v-model="previousValue"
        :min="0"
        :maxFractionDigits="3"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="reading-current">
        {{ t("pages.rentals.billing.readings.form.currentValue") }}
      </label>
      <InputNumber
        inputId="reading-current"
        v-model="currentValue"
        :min="0"
        :maxFractionDigits="3"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="reading-correction">
        {{ t("pages.rentals.billing.readings.form.errorCorrection") }}
      </label>
      <InputNumber
        inputId="reading-correction"
        v-model="errorCorrection"
        :maxFractionDigits="3"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        :label="t('pages.rentals.dictionaries.common.cancel')"
        severity="secondary"
        text
        @click="$emit('cancel')"
      />
      <Button
        type="submit"
        :label="t('pages.rentals.dictionaries.common.save')"
        severity="success"
        :disabled="!isValid"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

// types
import type { Meter } from "@/types/api/rentals/meters/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "ReadingForm",
  components: { Select, InputNumber, Button },
  props: {
    // liczniki bez odczytu w tym okresie — tylko dla nich ma sens ręczny odczyt
    meters: {
      required: true,
      type: Array as PropType<Meter[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const meterId = ref<string | null>(null);
    const previousValue = ref<number | null>(0);
    const currentValue = ref<number | null>(0);
    const errorCorrection = ref<number | null>(0);

    const meterOptions = computed(() =>
      props.meters.map((meter) => {
        const apartment = props.apartments.find(
          (item) => item.id === meter.apartment_id,
        );
        const place = apartment
          ? apartment.name
          : t("pages.rentals.dictionaries.meters.mainMeter");
        const media = t(
          `pages.rentals.dictionaries.meters.mediaType.${meter.media_type}`,
        );
        return {
          label: `${meter.name ?? media} — ${place}`,
          value: meter.id,
        };
      }),
    );

    const isValid = computed(
      () =>
        meterId.value !== null &&
        previousValue.value !== null &&
        currentValue.value !== null,
    );

    const handlerSubmit = () => {
      ctx.emit("submit", {
        meter_id: meterId.value as string,
        previous_value: previousValue.value as number,
        current_value: currentValue.value as number,
        error_correction: errorCorrection.value ?? 0,
      });
    };

    return {
      t,
      meterId,
      previousValue,
      currentValue,
      errorCorrection,
      meterOptions,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
