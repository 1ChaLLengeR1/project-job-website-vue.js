<template>
  <div class="flex w-full flex-wrap items-end gap-x-4 gap-y-3">
    <div class="flex w-full flex-col gap-1 sm:w-52">
      <label class="text-sm text-color-yellow" :for="`${id}-apartment`">
        {{ t("pages.rentals.dictionaries.common.filter.apartment") }}
      </label>
      <Select
        :inputId="`${id}-apartment`"
        :modelValue="apartmentId"
        :options="apartmentOptions"
        optionLabel="label"
        optionValue="value"
        showClear
        :placeholder="
          t('pages.rentals.dictionaries.common.filter.allApartments')
        "
        class="w-full"
        @update:modelValue="handlerApartment"
      />
    </div>

    <!-- opcjonalny filtr najemcy — używany tylko w tabeli najmów -->
    <div v-if="tenants" class="flex w-full flex-col gap-1 sm:w-52">
      <label class="text-sm text-color-yellow" :for="`${id}-tenant`">
        {{ t("pages.rentals.dictionaries.common.filter.tenant") }}
      </label>
      <Select
        :inputId="`${id}-tenant`"
        :modelValue="tenantId"
        :options="tenantOptions"
        optionLabel="label"
        optionValue="value"
        showClear
        :placeholder="t('pages.rentals.dictionaries.common.filter.allTenants')"
        class="w-full"
        @update:modelValue="handlerTenant"
      />
    </div>

    <div class="flex w-full flex-col gap-1 sm:w-56">
      <label class="text-sm text-color-yellow" :for="`${id}-active-on`">
        {{ t("pages.rentals.dictionaries.common.filter.activeOn") }}
        <span class="text-color-grey">
          ({{ t("pages.rentals.dictionaries.common.filter.activeOnHint") }})
        </span>
      </label>
      <DatePicker
        :inputId="`${id}-active-on`"
        :modelValue="activeOn"
        dateFormat="yy-mm-dd"
        showButtonBar
        class="w-full"
        @update:modelValue="handlerActiveOn"
      />
    </div>

    <div class="flex w-full shrink-0 gap-2 sm:w-auto">
      <Button
        :label="t('pages.rentals.dictionaries.common.filter.today')"
        severity="info"
        text
        @click="handlerToday"
      />
      <Button
        :label="t('pages.rentals.dictionaries.common.filter.reset')"
        severity="secondary"
        text
        @click="handlerReset"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";

// components
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

// types
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type { Tenant } from "@/types/api/rentals/tenants/types";

export default defineComponent({
  name: "HistoryFilters",
  components: { Select, DatePicker, Button },
  props: {
    // prefiks id pól — pozwala użyć paska dwa razy na jednej stronie
    id: {
      required: true,
      type: String,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
    // podanie najemców włącza dodatkowy filtr (tabela najmów)
    tenants: {
      required: false,
      type: Array as PropType<Tenant[] | null>,
      default: null,
    },
    apartmentId: {
      required: false,
      type: String as PropType<string | null>,
      default: null,
    },
    tenantId: {
      required: false,
      type: String as PropType<string | null>,
      default: null,
    },
    // null = cała historia; data = tylko wpisy obowiązujące tego dnia
    activeOn: {
      required: false,
      type: Date as PropType<Date | null>,
      default: null,
    },
  },
  emits: ["update:apartmentId", "update:tenantId", "update:activeOn"],
  setup(props, ctx) {
    const { t } = useI18n();

    const apartmentOptions = computed(() =>
      props.apartments.map((item) => ({ label: item.name, value: item.id })),
    );

    const tenantOptions = computed(() =>
      (props.tenants ?? []).map((item) => ({
        label: [item.first_name, item.last_name].filter(Boolean).join(" "),
        value: item.id,
      })),
    );

    const handlerApartment = (value: string | null) => {
      ctx.emit("update:apartmentId", value ?? null);
    };

    const handlerTenant = (value: string | null) => {
      ctx.emit("update:tenantId", value ?? null);
    };

    const handlerActiveOn = (value: Date | Date[] | (Date | null)[] | null) => {
      ctx.emit("update:activeOn", value instanceof Date ? value : null);
    };

    const handlerToday = () => {
      ctx.emit("update:activeOn", new Date());
    };

    const handlerReset = () => {
      ctx.emit("update:apartmentId", null);
      ctx.emit("update:tenantId", null);
      ctx.emit("update:activeOn", null);
    };

    return {
      t,
      apartmentOptions,
      tenantOptions,
      handlerApartment,
      handlerTenant,
      handlerActiveOn,
      handlerToday,
      handlerReset,
    };
  },
});
</script>

<style scoped></style>
