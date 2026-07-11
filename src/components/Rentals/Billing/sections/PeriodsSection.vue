<template>
  <section class="flex w-full flex-col gap-3">
    <PeriodsTable
      :items="periodsStore.collection"
      :loading="periodsStore.isLoading"
      :statusFilter="statusFilter"
      @update:statusFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
      @open="(period) => $emit('open', period)"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <PeriodForm
        :initial="editedItem"
        @submit="handlerSubmit"
        @cancel="dialogVisible = false"
      />
    </FormDialog>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { RentalPeriodsStore } from "@/stores/rentals/periods";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import PeriodsTable from "@/components/Rentals/Billing/PeriodsTable.vue";
import PeriodForm from "@/components/Rentals/Billing/forms/PeriodForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Period, PeriodStatus } from "@/types/api/rentals/periods/types";
import type {
  CreatePeriodBody,
  UpdatePeriodBody,
} from "@/types/rentals/periods/types";

export default defineComponent({
  name: "PeriodsSection",
  components: { PeriodsTable, PeriodForm, FormDialog },
  emits: ["open"],
  setup() {
    const { t } = useI18n();
    const periodsStore = RentalPeriodsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Period | null>(null);
    const statusFilter = ref<PeriodStatus | null>(null);

    onMounted(async () => {
      await periodsStore.apiFetchCollection();
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.billing.periods.form.titleEdit")
        : t("pages.rentals.billing.periods.form.titleCreate"),
    );

    const handlerFilter = async (value: PeriodStatus | null) => {
      statusFilter.value = value;
      await periodsStore.apiFetchCollection(value ?? undefined);
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Period) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Period) => {
      confirmBoxStore.info = t("pages.rentals.billing.periods.confirm.delete");
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await periodsStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (body: CreatePeriodBody | UpdatePeriodBody) => {
      const isValid = editedItem.value
        ? await periodsStore.apiUpdate(
            editedItem.value.id,
            body as UpdatePeriodBody,
          )
        : await periodsStore.apiCreate(body as CreatePeriodBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      periodsStore,
      dialogVisible,
      editedItem,
      statusFilter,
      dialogHeader,
      handlerFilter,
      handlerAdd,
      handlerEdit,
      handlerDelete,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
