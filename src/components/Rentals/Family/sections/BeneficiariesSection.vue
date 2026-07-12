<template>
  <section class="flex w-full flex-col gap-3">
    <BeneficiariesTable
      :items="beneficiariesStore.collection"
      :loading="beneficiariesStore.isLoading"
      :activeFilter="activeFilter"
      @update:activeFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <BeneficiaryForm
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
import { RentalBeneficiariesStore } from "@/stores/rentals/beneficiaries";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import BeneficiariesTable from "@/components/Rentals/Family/BeneficiariesTable.vue";
import BeneficiaryForm from "@/components/Rentals/Family/forms/BeneficiaryForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Beneficiary } from "@/types/api/rentals/beneficiaries/types";
import type {
  CreateBeneficiaryBody,
  UpdateBeneficiaryBody,
} from "@/types/rentals/beneficiaries/types";

export default defineComponent({
  name: "BeneficiariesSection",
  components: { BeneficiariesTable, BeneficiaryForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const beneficiariesStore = RentalBeneficiariesStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Beneficiary | null>(null);
    const activeFilter = ref<boolean | null>(null);

    onMounted(async () => {
      await beneficiariesStore.apiFetchCollection();
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.family.beneficiaries.form.titleEdit")
        : t("pages.rentals.family.beneficiaries.form.titleCreate"),
    );

    const handlerFilter = async (value: boolean | null) => {
      activeFilter.value = value;
      await beneficiariesStore.apiFetchCollection(value ?? undefined);
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Beneficiary) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Beneficiary) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await beneficiariesStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateBeneficiaryBody | UpdateBeneficiaryBody,
    ) => {
      const isValid = editedItem.value
        ? await beneficiariesStore.apiUpdate(
            editedItem.value.id,
            body as UpdateBeneficiaryBody,
          )
        : await beneficiariesStore.apiCreate(body as CreateBeneficiaryBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      beneficiariesStore,
      dialogVisible,
      editedItem,
      activeFilter,
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
