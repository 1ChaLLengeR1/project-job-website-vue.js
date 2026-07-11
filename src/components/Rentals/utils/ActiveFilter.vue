<template>
  <Select
    :modelValue="innerValue"
    :options="options"
    optionLabel="label"
    optionValue="value"
    class="w-44"
    @update:modelValue="handlerChange"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import Select from "primevue/select";

export default defineComponent({
  name: "ActiveFilter",
  components: { Select },
  props: {
    // null = wszystkie, true = aktywne, false = nieaktywne
    modelValue: {
      required: false,
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const { t } = useI18n();

    const options = computed(() => [
      {
        label: t("pages.rentals.dictionaries.common.filter.all"),
        value: "all",
      },
      {
        label: t("pages.rentals.dictionaries.common.filter.active"),
        value: "active",
      },
      {
        label: t("pages.rentals.dictionaries.common.filter.inactive"),
        value: "inactive",
      },
    ]);

    const innerValue = computed(() => {
      if (props.modelValue === null) {
        return "all";
      }
      return props.modelValue ? "active" : "inactive";
    });

    const handlerChange = (value: string) => {
      ctx.emit(
        "update:modelValue",
        value === "all" ? null : value === "active",
      );
    };

    return { t, options, innerValue, handlerChange };
  },
});
</script>

<style scoped></style>
