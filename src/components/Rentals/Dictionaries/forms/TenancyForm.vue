<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-apartment">
        {{ t("pages.rentals.dictionaries.tenancies.form.apartment") }}
      </label>
      <Select
        id="tenancy-apartment"
        v-model="apartmentId"
        :options="apartmentOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-tenant">
        {{ t("pages.rentals.dictionaries.tenancies.form.tenant") }}
      </label>
      <Select
        id="tenancy-tenant"
        v-model="tenantId"
        :options="tenantOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-rent">
        {{ t("pages.rentals.dictionaries.tenancies.form.rentAmount") }}
      </label>
      <InputNumber
        inputId="tenancy-rent"
        v-model="rentAmount"
        :min="0"
        :maxFractionDigits="2"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-persons">
        {{ t("pages.rentals.dictionaries.tenancies.form.personsCount") }}
      </label>
      <InputNumber inputId="tenancy-persons" v-model="personsCount" :min="1" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-start">
        {{ t("pages.rentals.dictionaries.tenancies.form.startDate") }}
      </label>
      <DatePicker
        inputId="tenancy-start"
        v-model="startDate"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenancy-end">
        {{ t("pages.rentals.dictionaries.tenancies.form.endDate") }}
      </label>
      <DatePicker
        inputId="tenancy-end"
        v-model="endDate"
        dateFormat="yy-mm-dd"
        showButtonBar
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
import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";
import { formatDateApi } from "@/utils/formats";

// components
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

// types
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { Tenant } from "@/types/api/rentals/tenants/types";

export default defineComponent({
  name: "TenancyForm",
  components: { Select, InputNumber, DatePicker, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<Tenancy | null>,
      default: null,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    tenants: {
      required: true,
      type: Array as PropType<Tenant[]>,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const apartmentId = ref<string | null>(null);
    const tenantId = ref<string | null>(null);
    const rentAmount = ref<number | null>(null);
    const personsCount = ref<number | null>(1);
    const startDate = ref<Date | null>(null);
    const endDate = ref<Date | null>(null);

    // backend nie pozwala zmienić mieszkania ani najemcy w istniejącym najmie
    const isEdit = computed(() => props.initial !== null);

    watch(
      () => props.initial,
      (value) => {
        apartmentId.value = value?.apartment_id ?? null;
        tenantId.value = value?.tenant_id ?? null;
        rentAmount.value = value?.rent_amount ?? null;
        personsCount.value = value?.persons_count ?? 1;
        startDate.value = value?.start_date ? new Date(value.start_date) : null;
        endDate.value = value?.end_date ? new Date(value.end_date) : null;
      },
      { immediate: true },
    );

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const tenantOptions = computed(() =>
      props.tenants.map((item) => ({
        label: [item.first_name, item.last_name].filter(Boolean).join(" "),
        value: item.id,
      })),
    );

    const isValid = computed(
      () =>
        apartmentId.value !== null &&
        tenantId.value !== null &&
        rentAmount.value !== null &&
        rentAmount.value >= 0 &&
        personsCount.value !== null &&
        personsCount.value > 0 &&
        startDate.value !== null,
    );

    const handlerSubmit = () => {
      const common = {
        rent_amount: rentAmount.value as number,
        persons_count: personsCount.value as number,
        start_date: formatDateApi(startDate.value as Date),
        end_date: endDate.value ? formatDateApi(endDate.value) : null,
      };

      if (isEdit.value) {
        ctx.emit("submit", common);
      } else {
        ctx.emit("submit", {
          apartment_id: apartmentId.value as string,
          tenant_id: tenantId.value as string,
          ...common,
        });
      }
    };

    return {
      t,
      apartmentId,
      tenantId,
      rentAmount,
      personsCount,
      startDate,
      endDate,
      isEdit,
      apartmentOptions,
      tenantOptions,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
