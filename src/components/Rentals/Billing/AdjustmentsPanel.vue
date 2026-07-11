<template>
  <div class="flex w-full flex-col gap-3 rounded-lg bg-color-bg p-3">
    <div class="flex flex-col gap-1">
      <h3 class="font-syne text-xl text-color-yellow">
        {{ t("pages.rentals.billing.adjustments.title") }}
      </h3>
      <p class="text-sm text-color-grey">
        {{ t("pages.rentals.billing.adjustments.description") }}
      </p>
    </div>

    <ul v-if="items.length > 0" class="flex flex-col gap-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-2"
      >
        <span class="text-color-grey">
          {{ apartmentName(item.apartment_id) }} — {{ item.name }}
        </span>
        <div class="flex items-center gap-3">
          <span class="font-bold text-color-yellow">{{ item.amount }} zł</span>
          <Button
            :label="t('pages.rentals.billing.adjustments.remove')"
            severity="danger"
            text
            :disabled="readonly"
            @click="$emit('remove', index)"
          />
        </div>
      </li>
    </ul>
    <p v-else class="text-sm text-color-grey">
      {{ t("pages.rentals.billing.adjustments.empty") }}
    </p>

    <form
      v-if="!readonly"
      class="flex flex-wrap items-end gap-3"
      @submit.prevent="handlerAdd"
    >
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="adjustment-apartment">
          {{ t("pages.rentals.billing.adjustments.apartment") }}
        </label>
        <Select
          id="adjustment-apartment"
          v-model="apartmentId"
          :options="apartmentOptions"
          optionLabel="label"
          optionValue="value"
          class="w-52"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="adjustment-name">
          {{ t("pages.rentals.billing.adjustments.name") }}
        </label>
        <InputText id="adjustment-name" v-model="name" class="w-52" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="adjustment-amount">
          {{ t("pages.rentals.billing.adjustments.amount") }}
        </label>
        <InputNumber
          inputId="adjustment-amount"
          v-model="amount"
          :maxFractionDigits="2"
          class="w-36"
        />
      </div>
      <Button
        type="submit"
        :label="t('pages.rentals.billing.adjustments.add')"
        severity="success"
        :disabled="!isValid"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

// types
import type { PeriodAdjustment } from "@/types/rentals/periods/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "AdjustmentsPanel",
  components: { Select, InputText, InputNumber, Button },
  props: {
    items: {
      required: true,
      type: Array as PropType<PeriodAdjustment[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ["add", "remove"],
  setup(props, ctx) {
    const { t } = useI18n();

    const apartmentId = ref<string | null>(null);
    const name = ref<string>("");
    const amount = ref<number | null>(null);

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const apartmentName = (id: string): string => {
      const apartment = props.apartments.find((item) => item.id === id);
      return apartment ? apartment.name : id;
    };

    const isValid = computed(
      () =>
        apartmentId.value !== null &&
        name.value.trim().length > 0 &&
        amount.value !== null,
    );

    const handlerAdd = () => {
      ctx.emit("add", {
        apartment_id: apartmentId.value as string,
        name: name.value.trim(),
        amount: amount.value as number,
      });
      name.value = "";
      amount.value = null;
    };

    return {
      t,
      apartmentId,
      name,
      amount,
      apartmentOptions,
      apartmentName,
      isValid,
      handlerAdd,
    };
  },
});
</script>

<style scoped></style>
