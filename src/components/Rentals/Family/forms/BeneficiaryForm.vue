<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="beneficiary-name">
        {{ t("pages.rentals.family.beneficiaries.form.name") }}
      </label>
      <InputText id="beneficiary-name" v-model="name" />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isActive" inputId="beneficiary-active" />
      <label class="text-sm" for="beneficiary-active">
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
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";

// types
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";

export default defineComponent({
  name: "BeneficiaryForm",
  components: { InputText, ToggleSwitch, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<Beneficiary | null>,
      default: null,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const name = ref<string>("");
    const isActive = ref<boolean>(true);

    watch(
      () => props.initial,
      (value) => {
        name.value = value?.name ?? "";
        isActive.value = value?.is_active ?? true;
      },
      { immediate: true },
    );

    const isValid = computed(() => name.value.trim().length > 0);

    const handlerSubmit = () => {
      ctx.emit("submit", {
        name: name.value.trim(),
        is_active: isActive.value,
      });
    };

    return { t, name, isActive, isValid, handlerSubmit };
  },
});
</script>

<style scoped></style>
