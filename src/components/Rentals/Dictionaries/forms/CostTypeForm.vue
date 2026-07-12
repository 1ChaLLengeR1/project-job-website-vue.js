<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="cost-type-name">
        {{ t("pages.rentals.dictionaries.costTypes.form.name") }}
      </label>
      <InputText id="cost-type-name" v-model="name" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="cost-type-charge">
        {{ t("pages.rentals.dictionaries.costTypes.form.chargeType") }}
      </label>
      <Select
        id="cost-type-charge"
        v-model="chargeType"
        :options="chargeTypeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isActive" inputId="cost-type-active" />
      <label class="text-sm" for="cost-type-active">
        {{ t("pages.rentals.dictionaries.common.isActive") }}
      </label>
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

// components
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";

// types
import type { CostType, ChargeType } from "@/types/api/rentals/costTypes/types";

export default defineComponent({
  name: "CostTypeForm",
  components: { InputText, Select, ToggleSwitch, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<CostType | null>,
      default: null,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const name = ref<string>("");
    const chargeType = ref<ChargeType | null>(null);
    const isActive = ref<boolean>(true);

    watch(
      () => props.initial,
      (value) => {
        name.value = value?.name ?? "";
        chargeType.value = value?.charge_type ?? null;
        isActive.value = value?.is_active ?? true;
      },
      { immediate: true },
    );

    const chargeTypeOptions = computed(() => [
      {
        label: t("pages.rentals.dictionaries.costTypes.chargeType.fixed"),
        value: "fixed",
      },
      {
        label: t("pages.rentals.dictionaries.costTypes.chargeType.per_person"),
        value: "per_person",
      },
    ]);

    const isValid = computed(
      () => name.value.trim().length > 0 && chargeType.value !== null,
    );

    const handlerSubmit = () => {
      ctx.emit("submit", {
        name: name.value.trim(),
        charge_type: chargeType.value as ChargeType,
        is_active: isActive.value,
      });
    };

    return {
      t,
      name,
      chargeType,
      isActive,
      chargeTypeOptions,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
