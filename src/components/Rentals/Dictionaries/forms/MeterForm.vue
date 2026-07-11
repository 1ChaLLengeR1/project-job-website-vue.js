<template>
  <form class="flex flex-col gap-4" @submit.prevent="handlerSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="meter-media-type">
        {{ t("pages.rentals.dictionaries.meters.form.mediaType") }}
      </label>
      <Select
        id="meter-media-type"
        v-model="mediaType"
        :options="mediaTypeOptions"
        optionLabel="label"
        optionValue="value"
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="meter-apartment">
        {{ t("pages.rentals.dictionaries.meters.form.apartment") }}
      </label>
      <Select
        id="meter-apartment"
        v-model="apartmentId"
        :options="apartmentOptions"
        optionLabel="label"
        optionValue="value"
        showClear
        :disabled="isEdit"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm" for="meter-name">
        {{ t("pages.rentals.dictionaries.meters.form.name") }}
      </label>
      <InputText id="meter-name" v-model="name" />
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isMaster" inputId="meter-master" />
      <label class="text-sm" for="meter-master">
        {{ t("pages.rentals.dictionaries.meters.form.isMaster") }}
      </label>
    </div>
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="isActive" inputId="meter-active" />
      <label class="text-sm" for="meter-active">
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
import type { Meter, MediaType } from "@/types/api/rentals/meters/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "MeterForm",
  components: { InputText, Select, ToggleSwitch, Button },
  props: {
    initial: {
      required: false,
      type: Object as PropType<Meter | null>,
      default: null,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
  },
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { t } = useI18n();

    const mediaType = ref<MediaType | null>(null);
    const apartmentId = ref<string | null>(null);
    const name = ref<string>("");
    const isMaster = ref<boolean>(false);
    const isActive = ref<boolean>(true);

    // backend nie pozwala zmienić medium ani mieszkania w istniejącym liczniku
    const isEdit = computed(() => props.initial !== null);

    watch(
      () => props.initial,
      (value) => {
        mediaType.value = value?.media_type ?? null;
        apartmentId.value = value?.apartment_id ?? null;
        name.value = value?.name ?? "";
        isMaster.value = value?.is_master ?? false;
        isActive.value = value?.is_active ?? true;
      },
      { immediate: true },
    );

    const mediaTypeOptions = computed(() => [
      {
        label: t("pages.rentals.dictionaries.meters.mediaType.electricity"),
        value: "electricity",
      },
      {
        label: t("pages.rentals.dictionaries.meters.mediaType.water"),
        value: "water",
      },
    ]);

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const isValid = computed(() => mediaType.value !== null);

    const handlerSubmit = () => {
      const common = {
        is_master: isMaster.value,
        name: name.value.trim() || null,
        is_active: isActive.value,
      };

      if (isEdit.value) {
        ctx.emit("submit", common);
      } else {
        ctx.emit("submit", {
          media_type: mediaType.value as MediaType,
          apartment_id: apartmentId.value,
          ...common,
        });
      }
    };

    return {
      t,
      mediaType,
      apartmentId,
      name,
      isMaster,
      isActive,
      isEdit,
      mediaTypeOptions,
      apartmentOptions,
      isValid,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
