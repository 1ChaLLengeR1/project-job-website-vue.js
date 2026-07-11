<template>
  <section class="flex w-full flex-col gap-3">
    <BeneficiarySettlementsTable
      :items="settlementsStore.collection"
      :beneficiaries="beneficiariesStore.collection"
      :periods="periodsStore.collection"
      :loading="settlementsStore.isLoading"
      :periodId="periodId"
      :beneficiaryId="beneficiaryId"
      @update:periodId="handlerPeriod"
      @update:beneficiaryId="handlerBeneficiary"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { RentalBeneficiarySettlementsStore } from "@/stores/rentals/beneficiarySettlements";
import { RentalBeneficiariesStore } from "@/stores/rentals/beneficiaries";
import { RentalPeriodsStore } from "@/stores/rentals/periods";

// components
import BeneficiarySettlementsTable from "@/components/Rentals/Family/BeneficiarySettlementsTable.vue";

export default defineComponent({
  name: "BeneficiarySettlementsSection",
  components: { BeneficiarySettlementsTable },
  setup() {
    const { t } = useI18n();
    const settlementsStore = RentalBeneficiarySettlementsStore();
    const beneficiariesStore = RentalBeneficiariesStore();
    const periodsStore = RentalPeriodsStore();

    const periodId = ref<string | null>(null);
    const beneficiaryId = ref<string | null>(null);

    const fetchCollection = async () => {
      await settlementsStore.apiFetchCollection({
        period_id: periodId.value ?? undefined,
        beneficiary_id: beneficiaryId.value ?? undefined,
      });
    };

    onMounted(async () => {
      await fetchCollection();
      if (beneficiariesStore.collection.length === 0) {
        await beneficiariesStore.apiFetchCollection();
      }
      if (periodsStore.collection.length === 0) {
        await periodsStore.apiFetchCollection();
      }
    });

    const handlerPeriod = async (value: string | null) => {
      periodId.value = value;
      await fetchCollection();
    };

    const handlerBeneficiary = async (value: string | null) => {
      beneficiaryId.value = value;
      await fetchCollection();
    };

    return {
      t,
      settlementsStore,
      beneficiariesStore,
      periodsStore,
      periodId,
      beneficiaryId,
      handlerPeriod,
      handlerBeneficiary,
    };
  },
});
</script>

<style scoped></style>
