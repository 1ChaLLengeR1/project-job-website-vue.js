<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-name">
        {{ t("pages.rentals.dictionaries.apartments.form.name") }}
      </label>
      <InputText id="apartment-name" v-model="name" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="apartment-description">
        {{ t("pages.rentals.dictionaries.apartments.form.description") }}
      </label>
      <Textarea id="apartment-description" v-model="description" rows="3" />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isActive" inputId="apartment-active" />
      <label class="text-sm" for="apartment-active">
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
import Textarea from "primevue/textarea";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";

// types
import type { Apartment } from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "ApartmentForm",
  components: { InputText, Textarea, ToggleSwitch, Button },
  props: {
    // null = formularz tworzenia, obiekt = edycja
    initial: {
      required: false,
      type: Object as PropType<Apartment | null>,
      default: null,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const name = ref<string>("");
    const description = ref<string>("");
    const isActive = ref<boolean>(true);

    watch(
      () => props.initial,
      (value) => {
        name.value = value?.name ?? "";
        description.value = value?.description ?? "";
        isActive.value = value?.is_active ?? true;
      },
      { immediate: true },
    );

    const isValid = computed(() => name.value.trim().length > 0);

    const handlerSubmit = () => {
      ctx.emit("submit", {
        name: name.value.trim(),
        description: description.value.trim() || null,
        is_active: isActive.value,
      });
    };

    return { t, name, description, isActive, isValid, handlerSubmit };
  },
});
</script>

<style scoped></style>
