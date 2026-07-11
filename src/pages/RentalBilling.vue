<template>
  <section class="flex w-full flex-col gap-3">
    <PeriodDetailSection
      v-if="selectedPeriodId"
      :periodId="selectedPeriodId"
      @back="selectedPeriodId = null"
    />
    <PeriodsSection v-else @open="handlerOpen" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import { savePage } from "@/composable/navigation";
import { paths } from "@/utils/paths";

// components
import PeriodsSection from "@/components/Rentals/Billing/sections/PeriodsSection.vue";
import PeriodDetailSection from "@/components/Rentals/Billing/sections/PeriodDetailSection.vue";

// types
import type { Period } from "@/types/api/rentals/periods/types";

export default defineComponent({
  name: "RentalBilling",
  components: { PeriodsSection, PeriodDetailSection },
  setup() {
    const { t } = useI18n();

    const selectedPeriodId = ref<string | null>(null);

    savePage(paths.rentalBilling);

    const handlerOpen = (period: Period) => {
      selectedPeriodId.value = period.id;
    };

    return { t, selectedPeriodId, handlerOpen };
  },
});
</script>

<style scoped></style>
