<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenant-first-name">
        {{ t("pages.rentals.dictionaries.tenants.form.firstName") }}
      </label>
      <InputText id="tenant-first-name" v-model="firstName" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenant-last-name">
        {{ t("pages.rentals.dictionaries.tenants.form.lastName") }}
      </label>
      <InputText id="tenant-last-name" v-model="lastName" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="tenant-note">
        {{ t("pages.rentals.dictionaries.tenants.form.note") }}
      </label>
      <Textarea id="tenant-note" v-model="note" rows="3" />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isActive" inputId="tenant-active" />
      <label class="text-sm" for="tenant-active">
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
import type { Tenant } from "@/types/api/rentals/tenants/types";

export default defineComponent({
  name: "TenantForm",
  components: { InputText, Textarea, ToggleSwitch, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<Tenant | null>,
      default: null,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const note = ref<string>("");
    const isActive = ref<boolean>(true);

    watch(
      () => props.initial,
      (value) => {
        firstName.value = value?.first_name ?? "";
        lastName.value = value?.last_name ?? "";
        note.value = value?.note ?? "";
        isActive.value = value?.is_active ?? true;
      },
      { immediate: true },
    );

    const isValid = computed(() => firstName.value.trim().length > 0);

    const handlerSubmit = () => {
      ctx.emit("submit", {
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim() || null,
        note: note.value.trim() || null,
        is_active: isActive.value,
      });
    };

    return { t, firstName, lastName, note, isActive, isValid, handlerSubmit };
  },
});
</script>

<style scoped></style>
