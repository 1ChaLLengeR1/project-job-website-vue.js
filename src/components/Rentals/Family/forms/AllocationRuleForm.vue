<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-beneficiary">
        {{ t("pages.rentals.family.rules.form.beneficiary") }}
      </label>
      <Select
        id="rule-beneficiary"
        v-model="beneficiaryId"
        :options="beneficiaryOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-component">
        {{ t("pages.rentals.family.rules.form.component") }}
      </label>
      <Select
        id="rule-component"
        v-model="component"
        :options="componentOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-mode">
        {{ t("pages.rentals.family.rules.form.mode") }}
      </label>
      <Select
        id="rule-mode"
        v-model="mode"
        :options="modeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-apartment">
        {{ t("pages.rentals.family.rules.form.apartment") }}
      </label>
      <Select
        id="rule-apartment"
        v-model="apartmentId"
        :options="apartmentOptions"
        optionLabel="label"
        optionValue="value"
        showClear
      />
    </div>
    <!-- rodzaj kosztu wymagany tylko dla składnika "cost_type" -->
    <div v-if="needsCostType" class="flex flex-col gap-1">
      <label class="text-sm" for="rule-cost-type">
        {{ t("pages.rentals.family.rules.form.costType") }}
      </label>
      <Select
        id="rule-cost-type"
        v-model="costTypeId"
        :options="costTypeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <!-- kwota wymagana dla trybu "fixed_amount" i składnika "recurring" -->
    <div v-if="needsAmount" class="flex flex-col gap-1">
      <label class="text-sm" for="rule-amount">
        {{ t("pages.rentals.family.rules.form.amount") }}
      </label>
      <InputNumber
        inputId="rule-amount"
        v-model="amount"
        :maxFractionDigits="2"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-description">
        {{ t("pages.rentals.family.rules.form.description") }}
      </label>
      <InputText id="rule-description" v-model="description" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-start">
        {{ t("pages.rentals.family.rules.form.startDate") }}
      </label>
      <DatePicker
        inputId="rule-start"
        v-model="startDate"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="rule-end">
        {{ t("pages.rentals.family.rules.form.endDate") }}
      </label>
      <DatePicker
        inputId="rule-end"
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
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

// types
import type {
  AllocationRule,
  RuleComponent,
  RuleMode,
} from "@/types/api/rentals/allocationRules/types";
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { CostType } from "@/types/api/rentals/costTypes/types";

const COMPONENTS: RuleComponent[] = [
  "rent",
  "electricity",
  "water",
  "cost_type",
  "recurring",
];

const MODES: RuleMode[] = ["full", "fixed_amount"];

export default defineComponent({
  name: "AllocationRuleForm",
  components: { Select, InputText, InputNumber, DatePicker, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<AllocationRule | null>,
      default: null,
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
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const beneficiaryId = ref<string | null>(null);
    const component = ref<RuleComponent | null>(null);
    const mode = ref<RuleMode | null>(null);
    const apartmentId = ref<string | null>(null);
    const costTypeId = ref<string | null>(null);
    const amount = ref<number | null>(null);
    const description = ref<string>("");
    const startDate = ref<Date | null>(null);
    const endDate = ref<Date | null>(null);

    // backend nie ma beneficiary_id w body update — beneficjenta nie zmieniamy
    const isEdit = computed(() => props.initial !== null);

    watch(
      () => props.initial,
      (value) => {
        beneficiaryId.value = value?.beneficiary_id ?? null;
        component.value = value?.component ?? null;
        mode.value = value?.mode ?? null;
        apartmentId.value = value?.apartment_id ?? null;
        costTypeId.value = value?.cost_type_id ?? null;
        amount.value = value?.amount ?? null;
        description.value = value?.description ?? "";
        startDate.value = value?.start_date ? new Date(value.start_date) : null;
        endDate.value = value?.end_date ? new Date(value.end_date) : null;
      },
      { immediate: true },
    );

    const beneficiaryOptions = computed(() =>
      props.beneficiaries.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    );

    const componentOptions = computed(() =>
      COMPONENTS.map((value) => ({
        label: t(`pages.rentals.family.rules.component.${value}`),
        value,
      })),
    );

    const modeOptions = computed(() =>
      MODES.map((value) => ({
        label: t(`pages.rentals.family.rules.mode.${value}`),
        value,
      })),
    );

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const costTypeOptions = computed(() =>
      props.costTypes.map((item) => ({ label: item.name, value: item.id })),
    );

    const needsCostType = computed(() => component.value === "cost_type");

    const needsAmount = computed(
      () => mode.value === "fixed_amount" || component.value === "recurring",
    );

    const isValid = computed(() => {
      if (
        beneficiaryId.value === null ||
        component.value === null ||
        mode.value === null ||
        startDate.value === null
      ) {
        return false;
      }
      if (needsCostType.value && costTypeId.value === null) {
        return false;
      }
      if (needsAmount.value && amount.value === null) {
        return false;
      }
      return true;
    });

    const handlerSubmit = () => {
      const common = {
        component: component.value as RuleComponent,
        mode: mode.value as RuleMode,
        start_date: formatDateApi(startDate.value as Date),
        apartment_id: apartmentId.value,
        cost_type_id: needsCostType.value ? costTypeId.value : null,
        amount: needsAmount.value ? amount.value : null,
        description: description.value.trim() || null,
        end_date: endDate.value ? formatDateApi(endDate.value) : null,
      };

      if (isEdit.value) {
        ctx.emit("submit", common);
      } else {
        ctx.emit("submit", {
          beneficiary_id: beneficiaryId.value as string,
          ...common,
        });
      }
    };

    return {
      t,
      beneficiaryId,
      component,
      mode,
      apartmentId,
      costTypeId,
      amount,
      description,
      startDate,
      endDate,
      isEdit,
      beneficiaryOptions,
      componentOptions,
      modeOptions,
      apartmentOptions,
      costTypeOptions,
      needsCostType,
      needsAmount,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
